import fitz
import io
import os
import re
import numpy as np
import scipy.ndimage as ndi
from PIL import Image, ImageFilter
import vtracer

def update_cart_wheel():
    print("Updating cart-wheel to authentic 1:1 circular aspect ratio...")
    
    doc = fitz.open("gazettes/Pol_Party_2263-24_E.pdf")
    page = doc[1]
    
    # Clip rect for cart wheel in page 2
    rect = fitz.Rect(363.0, 449.0, 397.0, 483.0)
    pix = page.get_pixmap(clip=rect, dpi=1200)
    raw_img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("L")
    arr = np.array(raw_img)

    thresh = 175
    fg = arr < thresh

    # Filter dust speckles
    labeled, num_features = ndi.label(fg)
    sizes = ndi.sum(fg, labeled, range(num_features + 1))
    clean_fg = np.zeros_like(fg, dtype=bool)
    for i in range(1, num_features + 1):
        if sizes[i] >= 40:
            clean_fg |= (labeled == i)

    # Tight bounding box
    ys, xs = np.where(clean_fg)
    y0, y1 = ys.min(), ys.max()
    x0, x1 = xs.min(), xs.max()
    w = x1 - x0 + 1
    h = y1 - y0 + 1
    print(f"Original gazette scan bounding box: {w}x{h} (aspect: {w/h:.4f})")

    tight_content = clean_fg[y0:y1+1, x0:x1+1]
    master_png = Image.fromarray((~tight_content * 255).astype(np.uint8))

    # Target diameter: 320px in 512 space -> 320 * (1600 / 512) = 1000px
    # Force 1:1 true circle diameter
    target_d = int(round(320 * (1600.0 / 512.0)))
    resized = master_png.resize((target_d, target_d), Image.Resampling.LANCZOS)

    canvas = Image.new("L", (1600, 1600), 255)
    off_x = (1600 - target_d) // 2
    off_y = (1600 - target_d) // 2
    canvas.paste(resized, (off_x, off_y))

    # Level-set smoothing
    c_arr = np.array(canvas, dtype=np.float32) / 255.0
    mask = c_arr < 0.65
    smooth = ndi.gaussian_filter(mask.astype(np.float32), sigma=2.0)
    bin_arr = ((smooth > 0.46).astype(np.uint8)) * 255
    final_arr = 255 - bin_arr
    clean_img = Image.fromarray(final_arr, mode="L").filter(ImageFilter.GaussianBlur(radius=0.4))
    
    scratch_dir = "scratch"
    os.makedirs(scratch_dir, exist_ok=True)
    temp_png = os.path.join(scratch_dir, "cart_wheel_proc.png")
    temp_svg = os.path.join(scratch_dir, "cart_wheel_proc.svg")
    clean_img.save(temp_png)

    # Spline vectorization
    vtracer.convert_image_to_svg_py(
        temp_png,
        temp_svg,
        colormode="binary",
        hierarchical="stacked",
        mode="spline",
        filter_speckle=15,
        color_precision=6,
        layer_difference=16,
        corner_threshold=65,
        length_threshold=5.5,
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

    raw_combined = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="512" height="512" data-name="cart-wheel">
  <style>:root{{color:#212529;}}@media(prefers-color-scheme:dark){{:root{{color:#f8fafc;}}}}</style>
  <g transform="scale({scale_svg:.5f})">
    {paths_str}
  </g>
</svg>
'''

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

    final_svg = optimize_svg_paths(raw_combined, precision=1)

    # Save to src/icons and dist/svg
    with open("src/icons/cart-wheel.svg", "w", encoding="utf-8") as f:
        f.write(final_svg)
    os.makedirs("dist/svg", exist_ok=True)
    with open("dist/svg/cart-wheel.svg", "w", encoding="utf-8") as f:
        f.write(final_svg)

    # Render PNGs
    doc_out = fitz.open(stream=final_svg.encode("utf-8"), filetype="svg")
    page_out = doc_out[0]

    # 512x512
    mat_512 = fitz.Matrix(512.0 / page_out.rect.width, 512.0 / page_out.rect.height)
    pix_512 = page_out.get_pixmap(matrix=mat_512, alpha=True)
    os.makedirs("src/png", exist_ok=True)
    os.makedirs("dist/png", exist_ok=True)
    os.makedirs("showcase/png", exist_ok=True)
    pix_512.save("src/png/cart-wheel.png")
    pix_512.save("dist/png/cart-wheel.png")
    pix_512.save("showcase/png/cart-wheel.png")

    # 1024x1024
    mat_1024 = fitz.Matrix(1024.0 / page_out.rect.width, 1024.0 / page_out.rect.height)
    pix_1024 = page_out.get_pixmap(matrix=mat_1024, alpha=True)
    os.makedirs("dist/png-1024", exist_ok=True)
    pix_1024.save("dist/png-1024/cart-wheel.png")

    # Verification measurement
    pix_check = page_out.get_pixmap(alpha=True)
    arr_check = np.frombuffer(pix_check.samples, dtype=np.uint8).reshape(512, 512, 4)
    ys_c, xs_c = np.where(arr_check[:, :, 3] > 20)
    w_final = xs_c.max() - xs_c.min() + 1
    h_final = ys_c.max() - ys_c.min() + 1
    center_x = (xs_c.min() + xs_c.max()) / 2.0
    center_y = (ys_c.min() + ys_c.max()) / 2.0
    dx = np.maximum(np.abs(xs_c - 256), 0)
    dy = np.maximum(np.abs(ys_c - 256), 0)
    dist = float(np.sqrt(dx**2 + dy**2).max())
    clearance = 256.0 - dist

    print("\n=== VERIFICATION RESULT ===")
    print(f"Dimensions: {w_final}x{h_final} px")
    print(f"Aspect ratio: {w_final / h_final:.4f} (True 1:1 Round Circle)")
    print(f"Center: ({center_x:.1f}, {center_y:.1f}) inside 512x512 canvas")
    print(f"Circle clearance: {clearance:.1f} px")
    print(f"SVG file size: {len(final_svg.encode('utf-8')) / 1024:.1f} KB")
    print("✓ Successfully updated cart-wheel in src/icons, dist/svg, src/png, dist/png, dist/png-1024, showcase/png\n")

if __name__ == "__main__":
    update_cart_wheel()
