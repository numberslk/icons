import os
import re
import vtracer
from PIL import Image, ImageFilter
import numpy as np
import scipy.ndimage as ndimage
import fitz

INPUT_IMAGE = r"C:\Users\ROG STRIX\.gemini\antigravity-ide\brain\fe757bb3-1f49-458d-bbcb-ef056219f1c4\.user_uploaded\media_1789788093605.png"
SRC_SVG = "src/icons/eagle.svg"
DIST_SVG = "dist/svg/eagle.svg"
SRC_PNG = "src/png/eagle.png"
DIST_PNG = "dist/png/eagle.png"
DIST_PNG_1024 = "dist/png-1024/eagle.png"
SHOWCASE_PNG = "showcase/png/eagle.png"
TEMP_PNG = "src/png/temp_eagle_build.png"
TEMP_SVG = "src/png/temp_eagle_build.svg"

print(f"Loading user reference image: {INPUT_IMAGE}")
img = Image.open(INPUT_IMAGE).convert('L')
arr = np.array(img)

# Find tight bounding box of eagle artwork
is_dark = arr < 128
ys, xs = np.where(is_dark)
y0, y1 = int(ys.min()), int(ys.max())
x0, x1 = int(xs.min()), int(xs.max())
bw = x1 - x0 + 1
bh = y1 - y0 + 1
print(f"Detected artwork bounding box: {bw}x{bh} (x: {x0}..{x1}, y: {y0}..{y1})")

# Save high-res master source PNG in src/png
master_img = Image.fromarray(arr[y0:y1+1, x0:x1+1])
master_img.save(SRC_PNG)
print(f"Saved master high-res PNG to {SRC_PNG}: {master_img.size}")

# Map to 1600x1600 canvas centered at (800, 800)
# Width 425.9 on 512 corresponds to 1331px on 1600 canvas
scale_512 = 425.9 / bw
target_w_1600 = int(round(bw * scale_512 * (1600.0 / 512.0)))
target_h_1600 = int(round(bh * scale_512 * (1600.0 / 512.0)))
print(f"Scaled dimensions on 1600x1600 canvas: {target_w_1600}x{target_h_1600}")

resized = master_img.resize((target_w_1600, target_h_1600), Image.Resampling.LANCZOS)
canvas = Image.new('L', (1600, 1600), 255)
off_x = (1600 - target_w_1600) // 2
off_y = (1600 - target_h_1600) // 2
canvas.paste(resized, (off_x, off_y))

# Gaussian level-set curve smoothing with small hole filtering
c_arr = np.array(canvas, dtype=np.float32) / 255.0
mask = c_arr < 0.70
smooth = ndimage.gaussian_filter(mask.astype(np.float32), sigma=1.0)
bin_arr = smooth > 0.52

# Clean tiny cross-hatching speckles (< 40px)
labeled, num_features = ndimage.label(~bin_arr)
sizes = ndimage.sum(~bin_arr, labeled, range(1, num_features + 1))
clean_bin = bin_arr.copy()
for i, s in enumerate(sizes):
    if s < 40:
        clean_bin[labeled == (i + 1)] = True

final_arr = (1 - clean_bin.astype(np.uint8)) * 255
clean_img = Image.fromarray(final_arr, mode='L').filter(ImageFilter.GaussianBlur(radius=0.25))
clean_img.save(TEMP_PNG)

# Spline vectorization with vtracer
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
    length_threshold=4.5,
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
normalized_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="512" height="512" data-name="eagle">
  <style>:root{{color:#212529;}}@media(prefers-color-scheme:dark){{:root{{color:#f8fafc;}}}}</style>
  <g transform="scale({scale_svg:.5f})">
    {paths_str}
  </g>
</svg>
'''

# Write to src/icons and dist/svg
with open(SRC_SVG, "w", encoding="utf-8") as f:
    f.write(normalized_svg)
with open(DIST_SVG, "w", encoding="utf-8") as f:
    f.write(normalized_svg)
print(f"Written updated SVG to {SRC_SVG} and {DIST_SVG}")

# Render crisp PNGs at 512x512 and 1024x1024
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

print("Eagle icon successfully updated and synchronized!")
