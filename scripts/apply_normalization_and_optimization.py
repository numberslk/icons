import fitz
import numpy as np
import re
import os
import glob

# 1. Visually oversized icons to normalize to 330-340px
RESCALE_ICONS = {
    "violin": 330.0,
    "giraffe": 340.0,
    "sun": 340.0,
    "kite": 340.0,
    "bat": 340.0,
    "eagle": 340.0,
    "shield": 340.0,
    "key": 340.0,
    "gas-cylinder": 340.0,
    "pineapple": 340.0,
}

SRC_ICONS = "src/icons"
DIST_SVG = "dist/svg"
SRC_PNG = "src/png"
DIST_PNG = "dist/png"
DIST_PNG_1024 = "dist/png-1024"
SHOWCASE_PNG = "showcase/png"

def optimize_path_d(d_str, precision=1):
    def repl(m):
        val = float(m.group(0))
        r = round(val, precision)
        if r == int(r):
            return str(int(r))
        return f"{r:.1f}"
    d_opt = re.sub(r'[-+]?\d*\.\d+', repl, d_str)
    d_opt = re.sub(r'\s{2,}', ' ', d_opt).strip()
    return d_opt

def optimize_svg_paths(svg_text, precision=1):
    def repl_d(match):
        d_content = match.group(1)
        return f'd="{optimize_path_d(d_content, precision)}"'
    return re.sub(r'd="([^"]+)"', repl_d, svg_text)

def render_pngs(svg_content, name):
    doc = fitz.open(stream=svg_content.encode("utf-8"), filetype="svg")
    page = doc[0]
    
    # 512x512
    mat_512 = fitz.Matrix(512.0 / page.rect.width, 512.0 / page.rect.height)
    pix_512 = page.get_pixmap(matrix=mat_512, alpha=True)
    pix_512.save(os.path.join(SRC_PNG, f"{name}.png"))
    pix_512.save(os.path.join(DIST_PNG, f"{name}.png"))
    pix_512.save(os.path.join(SHOWCASE_PNG, f"{name}.png"))
    
    # 1024x1024
    mat_1024 = fitz.Matrix(1024.0 / page.rect.width, 1024.0 / page.rect.height)
    pix_1024 = page.get_pixmap(matrix=mat_1024, alpha=True)
    pix_1024.save(os.path.join(DIST_PNG_1024, f"{name}.png"))

def process_all():
    svg_files = sorted(glob.glob(os.path.join(SRC_ICONS, "*.svg")))
    print(f"Applying Visual Normalization and SVG Coordinate Optimization on {len(svg_files)} icons...\n")
    
    total_old_size = 0
    total_new_size = 0
    rescaled_count = 0
    
    for svg_path in svg_files:
        name = os.path.splitext(os.path.basename(svg_path))[0]
        
        with open(svg_path, "r", encoding="utf-8") as f:
            svg_raw = f.read()
            
        old_size = len(svg_raw.encode("utf-8"))
        total_old_size += old_size
        current_svg = svg_raw
        
        # Step 1: Rescale if visually oversized
        is_rescaled = name in RESCALE_ICONS
        if is_rescaled:
            target = RESCALE_ICONS[name]
            doc = fitz.open(stream=current_svg.encode("utf-8"), filetype="svg")
            pix = doc[0].get_pixmap(alpha=True)
            arr = np.frombuffer(pix.samples, dtype=np.uint8).reshape(512, 512, 4)
            ys, xs = np.where(arr[:, :, 3] > 20)
            max_dim = max(xs.max() - xs.min() + 1, ys.max() - ys.min() + 1)
            
            s = target / max_dim
            tx = 256.0 * (1.0 - s)
            ty = 256.0 * (1.0 - s)
            
            m_trans = re.search(r'<g transform="([^"]+)">', current_svg)
            if m_trans:
                old_trans = m_trans.group(1)
                m_scale = re.search(r'scale\(([-+0-9.]+)\)', old_trans)
                if m_scale:
                    old_scale = float(m_scale.group(1))
                    new_scale = old_scale * s
                    new_trans = f'translate({tx:.3f}, {ty:.3f}) scale({new_scale:.5f})'
                    current_svg = current_svg.replace(f'<g transform="{old_trans}">', f'<g transform="{new_trans}">')
                else:
                    new_trans = f'translate({tx:.3f}, {ty:.3f}) scale({s:.5f}) {old_trans}'
                    current_svg = current_svg.replace(f'<g transform="{old_trans}">', f'<g transform="{new_trans}">')
            else:
                current_svg = current_svg.replace('</style>', f'</style>\n  <g transform="translate({tx:.3f}, {ty:.3f}) scale({s:.5f})">')
                current_svg = current_svg.replace('</svg>', '  </g>\n</svg>')
            rescaled_count += 1

        # Step 2: Path coordinate precision optimization (only inside d="...")
        optimized_svg = optimize_svg_paths(current_svg, precision=1)
        
        # Step 3: Save to src/icons and dist/svg
        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(optimized_svg)
        os.makedirs(DIST_SVG, exist_ok=True)
        with open(os.path.join(DIST_SVG, f"{name}.svg"), "w", encoding="utf-8") as f:
            f.write(optimized_svg)
            
        new_size = len(optimized_svg.encode("utf-8"))
        total_new_size += new_size
        
        # Step 4: Render updated PNGs
        render_pngs(optimized_svg, name)
        
        # Measure clearance and dimensions for reporting
        if is_rescaled or old_size > 100 * 1024:
            doc_final = fitz.open(stream=optimized_svg.encode("utf-8"), filetype="svg")
            pix_final = doc_final[0].get_pixmap(alpha=True)
            arr_final = np.frombuffer(pix_final.samples, dtype=np.uint8).reshape(512, 512, 4)
            ys_f, xs_f = np.where(arr_final[:, :, 3] > 20)
            w_f = xs_f.max() - xs_f.min() + 1
            h_f = ys_f.max() - ys_f.min() + 1
            dx = np.maximum(np.abs(xs_f - 256), 0)
            dy = np.maximum(np.abs(ys_f - 256), 0)
            dist = float(np.sqrt(dx**2 + dy**2).max())
            clearance = 256.0 - dist
            
            saved_pct = (1.0 - new_size / old_size) * 100
            rescaled_tag = " [RESCALED]" if is_rescaled else ""
            print(f"{name:20s}{rescaled_tag:12s} | {w_f:3d}x{h_f:3d} (max {max(w_f,h_f):3d}px) | Clearance: {clearance:4.1f}px | Size: {old_size/1024:5.1f}KB -> {new_size/1024:5.1f}KB ({saved_pct:+5.1f}%)")

    total_saved = total_old_size - total_new_size
    print(f"\n=======================================================")
    print(f"Summary:")
    print(f"  Total icons processed: {len(svg_files)}")
    print(f"  Icons rescaled (1):   {rescaled_count}")
    print(f"  Total SVG size:        {total_old_size/1024/1024:.2f} MB -> {total_new_size/1024/1024:.2f} MB")
    print(f"  Total disk space saved:{total_saved/1024/1024:.2f} MB ({(total_saved/total_old_size)*100:.1f}%)")
    print(f"=======================================================\n")

if __name__ == "__main__":
    process_all()
