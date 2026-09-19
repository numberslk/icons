import os
import re
import vtracer
from PIL import Image, ImageFilter
import numpy as np
import scipy.ndimage as ndimage
import fitz

INPUT_IMAGE = r"C:\Users\ROG STRIX\.gemini\antigravity-ide\brain\82fe4f05-d591-4b59-9fd5-8bbfd057eab0\.user_uploaded\media_1789806677464.png"
SRC_SVG = "src/icons/safety-pin.svg"
DIST_SVG = "dist/svg/safety-pin.svg"
SRC_PNG = "src/png/safety-pin.png"
DIST_PNG = "dist/png/safety-pin.png"
DIST_PNG_1024 = "dist/png-1024/safety-pin.png"
SHOWCASE_PNG = "showcase/png/safety-pin.png"
TEMP_PNG = "src/png/temp_pin_build.png"
TEMP_SVG = "src/png/temp_pin_build.svg"

print(f"Loading user reference image: {INPUT_IMAGE}")
img = Image.open(INPUT_IMAGE).convert('L')
arr = np.array(img)

# Find tight bounding box of safety pin artwork
is_dark = arr < 200
ys, xs = np.where(is_dark)
y0, y1 = int(ys.min()), int(ys.max())
x0, x1 = int(xs.min()), int(xs.max())
bw = x1 - x0 + 1
bh = y1 - y0 + 1
print(f"Detected artwork bounding box: {bw}x{bh} (x: {x0}..{x1}, y: {y0}..{y1})")

# Crop tight artwork
cropped = img.crop((x0, y0, x1 + 1, y1 + 1))

# Scale for 512x512 canvas:
# Target dimension 330px centered at (256, 256)
# On a 1600x1600 canvas, 330px corresponds to 330 * (1600 / 512) = 1031px
TARGET_512 = 330.0
target_1600 = int(round(TARGET_512 * (1600.0 / 512.0)))
scale = target_1600 / max(bw, bh)
tw = int(round(bw * scale))
th = int(round(bh * scale))
print(f"Scaled dimensions on 1600x1600 canvas: {tw}x{th}")

resized = cropped.resize((tw, th), Image.Resampling.LANCZOS)
canvas = Image.new('L', (1600, 1600), 255)
off_x = (1600 - tw) // 2
off_y = (1600 - th) // 2
canvas.paste(resized, (off_x, off_y))

# High-quality binarization and slight curve smoothing
c_arr = np.array(canvas, dtype=np.float32) / 255.0
mask = c_arr < 0.70
smooth = ndimage.gaussian_filter(mask.astype(np.float32), sigma=1.2)
bin_arr = smooth > 0.50

# Clean tiny specks (< 12px)
labeled_b, num_b = ndimage.label(bin_arr)
sizes_b = ndimage.sum(bin_arr, labeled_b, range(1, num_b + 1))
clean_bin = bin_arr.copy()
for i, s in enumerate(sizes_b):
    if s < 12:
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
    filter_speckle=4,
    color_precision=6,
    layer_difference=16,
    corner_threshold=60,
    length_threshold=3.5,
    max_iterations=15,
    splice_threshold=55,
    path_precision=3
)

with open(TEMP_SVG, "r", encoding="utf-8") as tf:
    raw_svg = tf.read()

# Parse paths
paths = re.findall(r'<path[^>]+/>', raw_svg)
print(f"Extracted {len(paths)} spline paths from vtracer")

# In stacked binary mode, background path has fill="#ffffff" or fill="#fff"
# Black foreground paths have fill="#000000" or similar
fg_paths = []
for p in paths:
    fill_match = re.search(r'fill="([^"]+)"', p)
    if fill_match:
        fill_val = fill_match.group(1).lower()
        if fill_val in ['#ffffff', '#fff', 'white']:
            continue
    fg_paths.append(p)

print(f"Foreground paths count: {len(fg_paths)}")

# Transform coordinate system from 1600x1600 to standard 512x512
scale_factor = 512.0 / 1600.0  # 0.32
clean_paths = [re.sub(r'fill="[^"]+"', 'fill="currentColor"', p) for p in fg_paths]
paths_str = "\n    ".join(clean_paths)

svg_512 = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="512" height="512" data-name="safety-pin">
  <style>:root{{color:#212529;}}@media(prefers-color-scheme:dark){{:root{{color:#f8fafc;}}}}</style>
  <g transform="scale({scale_factor:.5f})">
    {paths_str}
  </g>
</svg>
'''

# Save standard SVG
with open(SRC_SVG, "w", encoding="utf-8") as sf:
    sf.write(svg_512)
with open(DIST_SVG, "w", encoding="utf-8") as df:
    df.write(svg_512)
print(f"Successfully wrote 512x512 SVG to {SRC_SVG} and {DIST_SVG}")

# Render crisp PNGs at 512px and 1024px using PyMuPDF (fitz)
def render_png(svg_content, out_path, dim):
    doc = fitz.open(stream=svg_content.encode('utf-8'), filetype="svg")
    page = doc[0]
    mat = fitz.Matrix(dim / 512.0, dim / 512.0)
    pix = page.get_pixmap(matrix=mat, alpha=True)
    pix.save(out_path)
    print(f"Rendered PNG ({dim}x{dim}) -> {out_path}")

render_png(svg_512, SRC_PNG, 512)
render_png(svg_512, DIST_PNG, 512)
render_png(svg_512, SHOWCASE_PNG, 512)
render_png(svg_512, DIST_PNG_1024, 1024)

# Measure final bounding box in rendered 512px PNG
doc = fitz.open(stream=svg_512.encode('utf-8'), filetype="svg")
pix = doc[0].get_pixmap(alpha=True)
arr_512 = np.frombuffer(pix.samples, dtype=np.uint8).reshape(512, 512, 4)
alpha = arr_512[:, :, 3]
ys, xs = np.where(alpha > 20)
print(f"Final 512x512 bounding box: {xs.max() - xs.min() + 1}x{ys.max() - ys.min() + 1} (x: {xs.min()}..{xs.max()}, y: {ys.min()}..{ys.max()})")

# Cleanup temp files
for tmp in [TEMP_PNG, TEMP_SVG]:
    if os.path.exists(tmp):
        os.remove(tmp)

print("Safety pin vectorization complete!")
