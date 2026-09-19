import os
import glob
import fitz
import numpy as np

svgs = glob.glob('src/icons/*.svg')
data = []

for s in svgs:
    name = os.path.basename(s)[:-4]
    sz_kb = os.path.getsize(s) / 1024.0
    
    doc = fitz.open(s)
    pix = doc[0].get_pixmap()
    arr = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
    mask = (arr[:, :, 0] < 200)
    if mask.any():
        ys, xs = np.where(mask)
        w = int(xs.max() - xs.min() + 1)
        h = int(ys.max() - ys.min() + 1)
        x_min, x_max = int(xs.min()), int(xs.max())
        y_min, y_max = int(ys.min()), int(ys.max())
        # Distance from center (256, 256)
        dx = np.maximum(np.abs(xs - 256), 0)
        dy = np.maximum(np.abs(ys - 256), 0)
        dist = float(np.sqrt(dx**2 + dy**2).max())
        ink_area = int(mask.sum())
        data.append({
            'name': name,
            'file_kb': sz_kb,
            'w': w,
            'h': h,
            'max_dim': max(w, h),
            'radius': dist,
            'clearance': 256.0 - dist,
            'x_span': f"{x_min}..{x_max}",
            'y_span': f"{y_min}..{y_max}",
            'ink_area': ink_area
        })

print(f"Total icons audited: {len(data)}")

# Group 1: Visually oversized (max_dim >= 400px or clearance <= 35px)
oversized_visual = [d for d in data if d['max_dim'] >= 400 or d['clearance'] <= 35]
oversized_visual.sort(key=lambda d: d['max_dim'], reverse=True)
print("\n=== TOP VISUALLY OVERSIZED / CLOSE TO CIRCLE FRAME ===")
for d in oversized_visual:
    print(f"{d['name']:22s} | {d['w']:3d}x{d['h']:3d} (max {d['max_dim']:3d}px) | Circle clearance: {d['clearance']:4.1f}px | x:[{d['x_span']:8s}] y:[{d['y_span']:8s}] | File: {d['file_kb']:5.1f}KB")

# Group 2: Heavy File Sizes (>= 80 KB)
heavy_files = [d for d in data if d['file_kb'] >= 80]
heavy_files.sort(key=lambda d: d['file_kb'], reverse=True)
print("\n=== HEAVY SVG FILE SIZES (>= 80 KB) ===")
for d in heavy_files:
    print(f"{d['name']:22s} | File: {d['file_kb']:5.1f} KB | Dim: {d['w']:3d}x{d['h']:3d} | Ink: {d['ink_area']:,}px")
