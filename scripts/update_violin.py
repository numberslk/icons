import os
import re
import vtracer
from PIL import Image, ImageFilter
import numpy as np
import scipy.ndimage as ndimage
import fitz

INPUT_IMAGE = r"C:\Users\ROG STRIX\.gemini\antigravity-ide\brain\82fe4f05-d591-4b59-9fd5-8bbfd057eab0\.user_uploaded\media_1789798578421.png"
SRC_SVG = "src/icons/violin.svg"
DIST_SVG = "dist/svg/violin.svg"
SRC_PNG = "src/png/violin.png"
DIST_PNG = "dist/png/violin.png"
DIST_PNG_1024 = "dist/png-1024/violin.png"
SHOWCASE_PNG = "showcase/png/violin.png"
TEMP_PNG = "src/png/temp_violin_build.png"
TEMP_SVG = "src/png/temp_violin_build.svg"

print(f"Loading user reference image: {INPUT_IMAGE}")
img = Image.open(INPUT_IMAGE).convert('L')
arr = np.array(img)

# Find tight bounding box of violin artwork
is_dark = arr < 180
ys, xs = np.where(is_dark)
y0, y1 = int(ys.min()), int(ys.max())
x0, x1 = int(xs.min()), int(xs.max())
bw = x1 - x0 + 1
bh = y1 - y0 + 1
print(f"Detected artwork bounding box: {bw}x{bh} (x: {x0}..{x1}, y: {y0}..{y1})")

# Save master high-res crop PNG in src/png
master_img = Image.fromarray(arr[y0:y1+1, x0:x1+1])
master_img.save(SRC_PNG)
print(f"Saved master high-res PNG to {SRC_PNG}: {master_img.size}")

# Map to 1600x1600 canvas centered at (800, 800)
# Max dimension 420.0 on 512 corresponds to 1312px on 1600 canvas
scale_512 = 420.0 / max(bw, bh)
target_w_1600 = int(round(bw * scale_512 * (1600.0 / 512.0)))
target_h_1600 = int(round(bh * scale_512 * (1600.0 / 512.0)))
print(f"Scaled dimensions on 1600x1600 canvas: {target_w_1600}x{target_h_1600}")

resized = master_img.resize((target_w_1600, target_h_1600), Image.Resampling.LANCZOS)
canvas = Image.new('L', (1600, 1600), 255)
off_x = (1600 - target_w_1600) // 2
off_y = (1600 - target_h_1600) // 2
canvas.paste(resized, (off_x, off_y))

# Gaussian level-set curve smoothing
c_arr = np.array(canvas, dtype=np.float32) / 255.0
mask = c_arr < 0.65
smooth = ndimage.gaussian_filter(mask.astype(np.float32), sigma=1.4)
bin_arr = smooth > 0.50

# 1. Clean tiny white holes (< 25px) inside black regions
labeled_w, num_w = ndimage.label(~bin_arr)
sizes_w = ndimage.sum(~bin_arr, labeled_w, range(1, num_w + 1))
clean_bin = bin_arr.copy()
for i, s in enumerate(sizes_w):
    if s < 25:
        clean_bin[labeled_w == (i + 1)] = True

# 2. Clean tiny black specks (< 25px) in white regions
labeled_b, num_b = ndimage.label(clean_bin)
sizes_b = ndimage.sum(clean_bin, labeled_b, range(1, num_b + 1))
for i, s in enumerate(sizes_b):
    if s < 25:
        clean_bin[labeled_b == (i + 1)] = False

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
normalized_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="512" height="512" data-name="violin">
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

# Render crisp transparent PNGs at 512x512 and 1024x1024
doc = fitz.open(SRC_SVG)
page = doc[0]

# 512x512 transparent PNG
mat_512 = fitz.Matrix(512 / page.rect.width, 512 / page.rect.height)
pix_512 = page.get_pixmap(matrix=mat_512, alpha=True)
pix_512.save(DIST_PNG)
pix_512.save(SHOWCASE_PNG)
print(f"Generated 512x512 PNG at {DIST_PNG} and {SHOWCASE_PNG}")

# 1024x1024 transparent PNG
mat_1024 = fitz.Matrix(1024 / page.rect.width, 1024 / page.rect.height)
pix_1024 = page.get_pixmap(matrix=mat_1024, alpha=True)
pix_1024.save(DIST_PNG_1024)
print(f"Generated 1024x1024 PNG at {DIST_PNG_1024}")

# Cleanup temp files
for p in [TEMP_PNG, TEMP_SVG]:
    if os.path.exists(p):
        os.remove(p)

print("Violin icon successfully updated and synchronized!")
