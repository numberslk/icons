import fitz
import io
import os
import numpy as np
import scipy.ndimage as ndi
from PIL import Image

os.makedirs("src/png", exist_ok=True)

# Render pages directly from authentic 2020 Gazette PDF at 300 DPI
doc = fitz.open("gazettes/partylist_2020_E.pdf")
p2 = Image.open(io.BytesIO(doc[1].get_pixmap(dpi=300).tobytes("png"))).convert("L")
p3 = Image.open(io.BytesIO(doc[2].get_pixmap(dpi=300).tobytes("png"))).convert("L")
p4 = Image.open(io.BytesIO(doc[3].get_pixmap(dpi=300).tobytes("png"))).convert("L")

# Precise bounding boxes excluding any outside text
# (page, (x0, y0, x1, y1), thresh)
boxes = {
    "candle": (p2, (380, 1310, 580, 1565), 160),
    "snail": (p3, (520, 1140, 850, 1380), 160),
    "tray": (p3, (1980, 1500, 2400, 1680), 160),
    "spider": (p3, (250, 2285, 520, 2460), 160),
    "camera": (p3, (1500, 2285, 1780, 2450), 160),
    "orange": (p4, (320, 1520, 560, 1780), 160),
    "rocket": (p4, (1540, 1520, 1780, 1775), 160),
    "spiral": (p4, (2200, 1560, 2400, 1760), 160),
    "dog": (p4, (880, 1870, 1160, 2090), 160),
    "safety-pin": (p4, (880, 2220, 1150, 2440), 200)
}

for name, (pg, bbox, thresh) in boxes.items():
    crop = pg.crop(bbox)
    arr = np.array(crop)
    binary = arr < thresh
    
    # Filter dust specks (< 15 px)
    labeled, num_features = ndi.label(binary)
    if num_features > 0:
        sizes = ndi.sum(binary, labeled, range(num_features + 1))
        clean_binary = np.zeros_like(binary, dtype=bool)
        for i in range(1, num_features + 1):
            if sizes[i] >= 15:
                clean_binary |= (labeled == i)
    else:
        clean_binary = binary
        
    ys, xs = np.where(clean_binary)
    if len(ys) == 0:
        print(f"Error: Empty {name}")
        continue
    y_min, y_max = ys.min(), ys.max() + 1
    x_min, x_max = xs.min(), xs.max() + 1
    content = clean_binary[y_min:y_max, x_min:x_max]
    
    ch, cw = content.shape
    max_d = max(ch, cw)
    pad = int(max_d * 0.15)
    canvas_d = max_d + 2 * pad
    canvas = np.zeros((canvas_d, canvas_d), dtype=bool)
    off_y = (canvas_d - ch) // 2
    off_x = (canvas_d - cw) // 2
    canvas[off_y:off_y+ch, off_x:off_x+cw] = content
    
    out_img = Image.fromarray((~canvas * 255).astype(np.uint8))
    # Save 512x512 PNG directly to src/png
    out_512 = out_img.resize((512, 512), Image.Resampling.NEAREST)
    out_512.save(f"src/png/{name}.png")
    print(f"Extracted perfect {name}: content {cw}x{ch}")

print("All 10 extras saved to src/png/!")
