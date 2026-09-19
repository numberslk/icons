import os
import re
import vtracer
from PIL import Image, ImageFilter
import numpy as np
import scipy.ndimage as ndimage
import fitz

# Paths
INPUT_IMAGE = r"C:\Users\ROG STRIX\.gemini\antigravity-ide\brain\fe757bb3-1f49-458d-bbcb-ef056219f1c4\.user_uploaded\media_1789787663258.png"
SRC_SVG = "src/icons/gas-cylinder.svg"
DIST_SVG = "dist/svg/gas-cylinder.svg"
SRC_PNG = "src/png/gas-cylinder.png"
DIST_PNG = "dist/png/gas-cylinder.png"
DIST_PNG_1024 = "dist/png-1024/gas-cylinder.png"
SHOWCASE_PNG = "showcase/png/gas-cylinder.png"
TEMP_PNG = "src/png/temp_gas_cylinder.png"
TEMP_SVG = "src/png/temp_gas_cylinder.svg"

print(f"Loading user reference image: {INPUT_IMAGE}")
img = Image.open(INPUT_IMAGE).convert('L')
arr = np.array(img)

# 1. Crop above y=946 to remove the VectorStock footer watermark banner
clean_crop_arr = arr[:946, :]

# Find tight bounding box of cylinder artwork
is_dark = clean_crop_arr < 128
ys, xs = np.where(is_dark)
y0, y1 = int(ys.min()), int(ys.max())
x0, x1 = int(xs.min()), int(xs.max())
bw = x1 - x0 + 1
bh = y1 - y0 + 1
print(f"Detected artwork bounding box: {bw}x{bh} (x: {x0}..{x1}, y: {y0}..{y1})")

# Save high-res master PNG in src/png
master_img = Image.fromarray(clean_crop_arr[y0:y1+1, x0:x1+1])
master_img.save(SRC_PNG)
print(f"Saved master high-res PNG to {SRC_PNG}: {master_img.size}")

# 2. Map to 1600x1600 canvas centered at (800, 800)
# Height 416.6 on 512 corresponds to 1302px on 1600 canvas
target_h_1600 = 1302
scale_1600 = target_h_1600 / bh
target_w_1600 = int(round(bw * scale_1600))
print(f"Scaled dimensions on 1600x1600 canvas: {target_w_1600}x{target_h_1600}")

resized = master_img.resize((target_w_1600, target_h_1600), Image.Resampling.LANCZOS)
canvas = Image.new('L', (1600, 1600), 255)
off_x = (1600 - target_w_1600) // 2
off_y = (1600 - target_h_1600) // 2
canvas.paste(resized, (off_x, off_y))

# 3. Gaussian level-set curve smoothing
c_arr = np.array(canvas, dtype=np.float32) / 255.0
mask = c_arr < 0.70
smooth = ndimage.gaussian_filter(mask.astype(np.float32), sigma=1.0)
bin_arr = ((smooth > 0.50).astype(np.uint8)) * 255
final_arr = 255 - bin_arr
clean_img = Image.fromarray(final_arr, mode='L').filter(ImageFilter.GaussianBlur(radius=0.3))
clean_img.save(TEMP_PNG)

# 4. Spline vectorization with vtracer
print("Running vtracer spline vectorization...")
vtracer.convert_image_to_svg_py(
    TEMP_PNG,
    TEMP_SVG,
    colormode='binary',
    hierarchical='stacked',
    mode='spline',
    filter_speckle=10,
    color_precision=6,
    layer_difference=16,
    corner_threshold=60,
    length_threshold=5.0,
    max_iterations=15,
    splice_threshold=55,
    path_precision=3
)

with open(TEMP_SVG, "r", encoding="utf-8") as tf:
    raw_svg = tf.read()

paths = re.findall(r'<path[^>]+/>', raw_svg)
print(f"Extracted {len(paths)} spline paths from vtracer")

clean_paths = [re.sub(r'fill="[^"]+"', 'fill="currentColor"', p) for p in paths]
paths_str = "\n    ".join(clean_paths)

scale_svg = 512.0 / 1600.0
normalized_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="512" height="512" data-name="gas-cylinder">
  <style>:root{{color:#212529;}}@media(prefers-color-scheme:dark){{:root{{color:#f8fafc;}}}}</style>
  <g transform="scale({scale_svg:.5f})">
    {paths_str}
  </g>
</svg>
'''

# 5. Write to src/icons and dist/svg
with open(SRC_SVG, "w", encoding="utf-8") as f:
    f.write(normalized_svg)
with open(DIST_SVG, "w", encoding="utf-8") as f:
    f.write(normalized_svg)
print(f"Written updated SVG to {SRC_SVG} and {DIST_SVG}")

# 6. Render crisp PNGs at 512x512 and 1024x1024
doc = fitz.open(SRC_SVG)
page = doc[0]

# 512x512
pix_512 = page.get_pixmap(dpi=72)
pix_512.save(DIST_PNG)
pix_512.save(SHOWCASE_PNG)
print(f"Generated 512x512 PNG at {DIST_PNG} and {SHOWCASE_PNG}")

# 1024x1024
pix_1024 = page.get_pixmap(dpi=144)
pix_1024.save(DIST_PNG_1024)
print(f"Generated 1024x1024 PNG at {DIST_PNG_1024}")

# Cleanup temp files
for p in [TEMP_PNG, TEMP_SVG]:
    if os.path.exists(p):
        os.remove(p)

print("Gas cylinder icon successfully updated and synchronized!")
