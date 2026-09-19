import fitz
import io
import os
import re
import shutil
import numpy as np
import scipy.ndimage as ndi
from PIL import Image, ImageFilter
import vtracer

doc2263 = fitz.open("gazettes/Pol_Party_2263-24_E.pdf")
doc2020 = fitz.open("gazettes/partylist_2020_E.pdf")

SYMBOLS_CONFIG = {
    "pineapple": {
        "doc": doc2263,
        "page": 2,
        "rect": fitz.Rect(490.0, 422.0, 520.0, 478.0),
        "thresh": 180,
        "target_h_512": 420, # tall vertical fruit
        "sigma": 2.0,
        "bin_thresh": 0.46,
        "len_thresh": 5.5,
        "speckle": 15,
        "hole_max": 20,
    },
    "shield": {
        "doc": doc2263,
        "page": 2,
        "rect": fitz.Rect(340.0, 130.0, 385.0, 178.0),
        "thresh": 175,
        "target_h_512": 390, # tall shield
        "sigma": 2.0,
        "bin_thresh": 0.46,
        "len_thresh": 5.5,
        "speckle": 15,
        "hole_max": 20,
    },
    "kite": {
        "doc": doc2263,
        "page": 2,
        "rect": fitz.Rect(200.0, 415.0, 243.0, 472.0),
        "thresh": 175,
        "target_h_512": 415, # tall diamond kite with tail streamers
        "sigma": 2.0,
        "bin_thresh": 0.46,
        "len_thresh": 5.5,
        "speckle": 15,
        "hole_max": 20,
    },
    "key": {
        "doc": doc2263,
        "page": 1,
        "rect": fitz.Rect(204.0, 528.0, 262.0, 555.0),
        "thresh": 175,
        "target_w_512": 435, # wide horizontal key
        "sigma": 2.0,
        "bin_thresh": 0.46,
        "len_thresh": 5.5,
        "speckle": 15,
        "hole_max": 20,
    },
    "giraffe": {
        "doc": doc2263,
        "page": 3,
        "rect": fitz.Rect(70.0, 174.0, 116.0, 234.0),
        "thresh": 175,
        "target_h_512": 420, # tall upright giraffe
        "sigma": 1.8, # fine sigma for spot patterns
        "bin_thresh": 0.46,
        "len_thresh": 5.0,
        "speckle": 15,
        "hole_max": 0, # preserve spots
    },
    "sun": {
        "doc": doc2263,
        "page": 1,
        "rect": fitz.Rect(268.0, 280.0, 334.0, 314.0),
        "thresh": 175,
        "target_w_512": 435, # wide rising sun
        "sigma": 2.0,
        "bin_thresh": 0.46,
        "len_thresh": 5.5,
        "speckle": 15,
        "hole_max": 20,
    },
    "safety-pin": {
        "doc": doc2020,
        "page": 3,
        "rect": fitz.Rect(1800/600*72, 4460/600*72, 2300/600*72, 4880/600*72),
        "thresh": 185,
        "target_h_512": 400, # angled safety pin
        "sigma": 1.8, # preserve open wire loop and clasp
        "bin_thresh": 0.46,
        "len_thresh": 5.0,
        "speckle": 15,
        "hole_max": 0, # preserve loop and clasp holes
    }
}

scratch_temp = "scratch/temp_proc"
os.makedirs(scratch_temp, exist_ok=True)

print(f"Updating {len(SYMBOLS_CONFIG)} symbols to authentic gazette proportions...")

for name, cfg in SYMBOLS_CONFIG.items():
    page = cfg["doc"][cfg["page"]]
    pix = page.get_pixmap(clip=cfg["rect"], dpi=1200)
    raw_img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("L")
    arr = np.array(raw_img)
    
    # 1. Binarize
    fg = arr < cfg["thresh"]
    
    # 2. Filter dust speckles (< 40 px at 1200 DPI)
    labeled, num_features = ndi.label(fg)
    sizes = ndi.sum(fg, labeled, range(num_features + 1))
    clean_fg = np.zeros_like(fg, dtype=bool)
    for i in range(1, num_features + 1):
        if sizes[i] >= 40:
            clean_fg |= (labeled == i)
            
    # 3. Solid region hole filling
    if cfg["hole_max"] > 0:
        inv = ~clean_fg
        inv_labeled, inv_num = ndi.label(inv)
        inv_sizes = ndi.sum(inv, inv_labeled, range(inv_num + 1))
        bg_label = inv_labeled[0, 0]
        for i in range(1, inv_num + 1):
            if i != bg_label and inv_sizes[i] < cfg["hole_max"]:
                clean_fg[inv_labeled == i] = True
                
    # 4. Tight bounding box
    ys, xs = np.where(clean_fg)
    y0, y1 = ys.min(), ys.max()
    x0, x1 = xs.min(), xs.max()
    w = x1 - x0 + 1
    h = y1 - y0 + 1
    aspect = w / h
    
    tight_content = clean_fg[y0:y1+1, x0:x1+1]
    
    # Save clean tight master PNG to src/png
    master_png = Image.fromarray((~tight_content * 255).astype(np.uint8))
    master_png.save(f"src/png/{name}.png")
    
    # 5. Target scaling to 1600x1600 working canvas
    if "target_w_512" in cfg:
        target_w = int(round(cfg["target_w_512"] * (1600.0 / 512.0)))
        target_h = int(round(target_w / aspect))
    elif "target_h_512" in cfg:
        target_h = int(round(cfg["target_h_512"] * (1600.0 / 512.0)))
        target_w = int(round(target_h * aspect))
        
    resized = master_png.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # 6. Paste centered on 1600x1600 canvas
    canvas = Image.new("L", (1600, 1600), 255)
    off_x = (1600 - target_w) // 2
    off_y = (1600 - target_h) // 2
    canvas.paste(resized, (off_x, off_y))
    
    # 7. Level-set smoothing
    c_arr = np.array(canvas, dtype=np.float32) / 255.0
    mask = c_arr < 0.65
    smooth = ndi.gaussian_filter(mask.astype(np.float32), sigma=cfg["sigma"])
    bin_arr = ((smooth > cfg["bin_thresh"]).astype(np.uint8)) * 255
    final_arr = 255 - bin_arr
    clean_img = Image.fromarray(final_arr, mode="L").filter(ImageFilter.GaussianBlur(radius=0.4))
    
    temp_png = os.path.join(scratch_temp, f"{name}.png")
    temp_svg = os.path.join(scratch_temp, f"{name}.svg")
    clean_img.save(temp_png)
    
    # 8. Spline vectorization
    vtracer.convert_image_to_svg_py(
        temp_png,
        temp_svg,
        colormode="binary",
        hierarchical="stacked",
        mode="spline",
        filter_speckle=cfg["speckle"],
        color_precision=6,
        layer_difference=16,
        corner_threshold=65,
        length_threshold=cfg["len_thresh"],
        max_iterations=15,
        splice_threshold=55,
        path_precision=3
    )
    
    with open(temp_svg, "r", encoding="utf-8") as tf:
        raw_svg = tf.read()
        
    paths = re.findall(r'<path[^>]+/>', raw_svg)
    clean_paths = [re.sub(r'fill="[^"]+"', 'fill="currentColor"', p) for p in paths]
    paths_str = "\n    ".join(clean_paths)
    
    scale_svg = 512.0 / 1600.0
    normalized_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="512" height="512" data-name="{name}">
  <style>:root{{color:#212529;}}@media(prefers-color-scheme:dark){{:root{{color:#f8fafc;}}}}</style>
  <g transform="scale({scale_svg:.5f})">
    {paths_str}
  </g>
</svg>
'''
    # 9. Save SVGs
    with open(f"src/icons/{name}.svg", "w", encoding="utf-8") as out_f:
        out_f.write(normalized_svg)
    with open(f"dist/svg/{name}.svg", "w", encoding="utf-8") as dist_f:
        dist_f.write(normalized_svg)
        
    # 10. Generate crisp raster PNGs
    doc_out = fitz.open(f"src/icons/{name}.svg")
    page_out = doc_out[0]
    
    # 512x512
    mat_512 = fitz.Matrix(512 / page_out.rect.width, 512 / page_out.rect.height)
    pix_512 = page_out.get_pixmap(matrix=mat_512, alpha=True)
    pix_512.save(f"dist/png/{name}.png")
    pix_512.save(f"showcase/png/{name}.png")
    
    # 1024x1024
    mat_1024 = fitz.Matrix(1024 / page_out.rect.width, 1024 / page_out.rect.height)
    pix_1024 = page_out.get_pixmap(matrix=mat_1024, alpha=True)
    pix_1024.save(f"dist/png-1024/{name}.png")
    
    print(f"✓ Updated {name:15}: aspect {aspect:.3f}, {len(paths)} paths, {len(normalized_svg)} chars")

shutil.rmtree(scratch_temp, ignore_errors=True)
print("All 7 symbols successfully updated!")
