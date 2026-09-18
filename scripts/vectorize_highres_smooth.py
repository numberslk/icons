import os
import re
import vtracer
from PIL import Image, ImageFilter
import numpy as np
import scipy.ndimage as ndimage
import fitz

os.makedirs("src/icons", exist_ok=True)
os.makedirs("dist/svg", exist_ok=True)
os.makedirs("dist/png", exist_ok=True)
os.makedirs("dist/png-1024", exist_ok=True)
os.makedirs("gazettes/extracted_temp", exist_ok=True)

png_dir = "src/png"
svg_dir = "src/icons"
files = [f for f in os.listdir(png_dir) if f.endswith(".png")]
files.sort()

print(f"Starting Optical Padding & Centered 512px Spline Vectorization for {len(files)} symbols...")

# All symbols are strictly extracted and vectorized from official Government Gazettes.
# High-fidelity smoothing parameters preserving fine authentic gazette details
CUSTOM_PARAMS = {
    'orange': {
        'threshold': 160,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.4,
        'len_thresh': 6.5,
        'speckle': 20
    },
    'bell': {
        'threshold': 160,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.6,
        'len_thresh': 6.5,
        'speckle': 20
    },
    'bat': {
        'threshold': 180,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.0,
        'len_thresh': 5.5,
        'speckle': 10
    },
    'eagle': {
        'threshold': 180,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.2,
        'len_thresh': 6.0,
        'speckle': 15
    },
    'foot-ball': {
        'threshold': 180,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.0,
        'len_thresh': 5.5,
        'speckle': 10
    },
    'giraffe': {
        'threshold': 180,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.4,
        'len_thresh': 6.0,
        'speckle': 15
    },
    'sun': {
        'threshold': 180,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.0,
        'len_thresh': 5.5,
        'speckle': 10
    },
    'kite': {
        'threshold': 180,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.0,
        'len_thresh': 5.5,
        'speckle': 10
    },
    'ice-cream': {
        'threshold': 180,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.2,
        'len_thresh': 5.5,
        'speckle': 10
    },
    'light-pole': {
        'threshold': 180,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.2,
        'len_thresh': 6.0,
        'speckle': 15
    },
    'cup': {
        'threshold': 160,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.6,
        'len_thresh': 6.5,
        'speckle': 20
    },
    'eye': {
        'threshold': 160,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.6,
        'len_thresh': 6.5,
        'speckle': 20
    },
    'safety-pin': {
        'threshold': 210,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.4,
        'len_thresh': 6.0,
        'speckle': 20
    },
    'teapoy': {
        'threshold': 160,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.4,
        'len_thresh': 6.0,
        'speckle': 15
    },
    'tabla': {
        'threshold': 160,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.2,
        'len_thresh': 6.0,
        'speckle': 15
    },
    'pair-of-scales': {
        'threshold': 160,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.2,
        'len_thresh': 6.0,
        'speckle': 15,
        'bin_thresh': 0.46
    },
    'corn': {
        'threshold': 160,
        'hole_max_fill': 0,
        'morph_close': 0,
        'sigma': 2.2,
        'len_thresh': 6.0,
        'speckle': 15
    },
}

success_count = 0
for i, f in enumerate(files):
    name = f[:-4]
    in_png = os.path.join(png_dir, f)
    out_svg = os.path.join(svg_dir, f"{name}.svg")
    dist_svg = os.path.join("dist/svg", f"{name}.svg")
    temp_png = os.path.join("gazettes/extracted_temp", f"temp_{name}.png")
    temp_svg = os.path.join("gazettes/extracted_temp", f"temp_{name}.svg")
    
    try:
        img = Image.open(in_png).convert("L")
        arr = np.array(img)
        
        cp = None
        if name in CUSTOM_PARAMS:
            cp = CUSTOM_PARAMS[name]
            thresh = cp.get('threshold', 140)
            fg = arr < thresh
            
            # Fill small noise speckle holes inside black shapes
            inv = ~fg
            labeled, num_features = ndimage.label(inv)
            sizes = ndimage.sum(inv, labeled, range(num_features + 1))
            bg_label = labeled[0, 0]
            clean_fg = fg.copy()
            for fi in range(1, num_features + 1):
                if fi != bg_label and sizes[fi] < cp.get('hole_max_fill', 0):
                    clean_fg[labeled == fi] = True
                    
            # Remove isolated foreground dust specks
            fg_labeled, fg_num = ndimage.label(clean_fg)
            fg_sizes = ndimage.sum(clean_fg, fg_labeled, range(fg_num + 1))
            for fi in range(1, fg_num + 1):
                if fg_sizes[fi] < 25:
                    clean_fg[fg_labeled == fi] = False
                    
            # Morphological closing to bridge broken hatch gaps
            m_close = cp.get('morph_close', 0)
            if m_close > 0:
                kernel = np.ones((m_close, m_close), dtype=bool)
                clean_fg = ndimage.binary_closing(clean_fg, structure=kernel)
                
            sigma = cp['sigma']
            len_thresh = cp['len_thresh']
            speckle = cp['speckle']
        else:
            fg = arr < 175
            # Filter noise dust specks if any (< 12 pixels in raw image)
            labeled, num_features = ndimage.label(fg)
            if num_features > 1:
                sizes = ndimage.sum(fg, labeled, range(num_features + 1))
                clean_fg = np.zeros_like(fg, dtype=bool)
                for fi in range(1, num_features + 1):
                    if sizes[fi] >= 12:
                        clean_fg |= (labeled == fi)
            else:
                clean_fg = fg
            
            sigma = None
            len_thresh = None
            speckle = 15
            
        ys, xs = np.where(clean_fg)
        if len(ys) == 0:
            print(f"  Warning: Empty mask for {name}")
            continue
            
        x0, x1 = xs.min(), xs.max()
        y0, y1 = ys.min(), ys.max()
        w = x1 - x0 + 1
        h = y1 - y0 + 1
        cx = (x0 + x1) / 2.0
        cy = (y0 + y1) / 2.0
        
        dx = xs - cx
        dy = ys - cy
        r_orig = np.max(np.sqrt(dx**2 + dy**2))
        aspect = w / h
        
        # Optical Keyline & Circular Mask Targets:
        # 1. Square/Circle archetype (0.85 <= aspect <= 1.18): Target box 320x320
        # 2. Rectangular archetype (wide or tall): Target box 372x372
        # 3. Circular Mask constraint: Maximum radius from (256, 256) <= 212.0 px
        #    (leaving 44px safe breathing clearance inside 256 radius circle!)
        if 0.85 <= aspect <= 1.18:
            s_box = 320.0 / max(w, h)
        else:
            s_box = 372.0 / max(w, h)
        s_circle = 212.0 / max(r_orig, 1.0)
        s_512 = min(s_box, s_circle)
        
        # Map to 1600x1600 working canvas
        scale_1600 = s_512 * (1600.0 / 512.0)
        target_w = max(1, int(round(w * scale_1600)))
        target_h = max(1, int(round(h * scale_1600)))
        
        # Extract tight content from master image
        crop_arr = (~clean_fg[y0:y1+1, x0:x1+1] * 255).astype(np.uint8)
        crop_img = Image.fromarray(crop_arr, mode='L')
        resized = crop_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Paste onto 1600x1600 canvas centered at (800, 800)
        canvas = Image.new('L', (1600, 1600), 255)
        off_x = (1600 - target_w) // 2
        off_y = (1600 - target_h) // 2
        canvas.paste(resized, (off_x, off_y))
        
        # Gaussian level-set curve smoothing
        c_arr = np.array(canvas, dtype=np.float32) / 255.0
        mask = c_arr < 0.65
        
        if sigma is None:
            if max(w, h) < 250:
                sigma = 2.4
                len_thresh = 6.0
            elif max(w, h) < 500:
                sigma = 2.4
                len_thresh = 6.0
            else:
                sigma = 2.2
                len_thresh = 5.5
            
        smooth = ndimage.gaussian_filter(mask.astype(np.float32), sigma=sigma)
        b_thresh = cp.get('bin_thresh', 0.46) if cp else 0.46
        bin_arr = ((smooth > b_thresh).astype(np.uint8)) * 255
        final_arr = 255 - bin_arr
        clean_img = Image.fromarray(final_arr, mode='L').filter(ImageFilter.GaussianBlur(radius=0.4))
        clean_img.save(temp_png)
        
        # Spline vectorization with vtracer
        vtracer.convert_image_to_svg_py(
            temp_png,
            temp_svg,
            colormode='binary',
            hierarchical='stacked',
            mode='spline',
            filter_speckle=speckle,
            color_precision=6,
            layer_difference=16,
            corner_threshold=65,
            length_threshold=len_thresh,
            max_iterations=15,
            splice_threshold=55,
            path_precision=3
        )
        
        with open(temp_svg, "r", encoding="utf-8") as tf:
            raw_svg = tf.read()
            
        paths = re.findall(r'<path[^>]+/>', raw_svg)
        if not paths:
            print(f"  Warning: No paths found for {name}")
            continue
            
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

        # Write to src/icons and dist/svg
        with open(out_svg, "w", encoding="utf-8") as out_f:
            out_f.write(normalized_svg)
        with open(dist_svg, "w", encoding="utf-8") as dist_f:
            dist_f.write(normalized_svg)
            
        # Generate crisp 512x512 and 1024x1024 PNGs
        doc = fitz.open(out_svg)
        page = doc[0]
        
        # 512x512 PNG
        mat_512 = fitz.Matrix(512 / page.rect.width, 512 / page.rect.height)
        pix_512 = page.get_pixmap(matrix=mat_512, alpha=True)
        pix_512.save(f"dist/png/{name}.png")
        
        # 1024x1024 Ultra-Res PNG
        mat_1024 = fitz.Matrix(1024 / page.rect.width, 1024 / page.rect.height)
        pix_1024 = page.get_pixmap(matrix=mat_1024, alpha=True)
        pix_1024.save(f"dist/png-1024/{name}.png")
        
        # Clean up temporary files
        if os.path.exists(temp_png):
            try: os.remove(temp_png)
            except OSError: pass
        if os.path.exists(temp_svg):
            try: os.remove(temp_svg)
            except OSError: pass
        
        success_count += 1
        if (i + 1) % 20 == 0 or (i + 1) == len(files):
            print(f"  [{i+1}/{len(files)}] Optical padded & centered {name} ({success_count} success)")
            
    except Exception as e:
        print(f"  Error processing {name}: {e}")

# Clean up temp folder if empty
if os.path.exists("gazettes/extracted_temp") and not os.listdir("gazettes/extracted_temp"):
    try: os.rmdir("gazettes/extracted_temp")
    except OSError: pass

print(f"\nCompleted! Successfully vectorized {success_count} / {len(files)} symbols with optical padding and circular mask clearance!")
