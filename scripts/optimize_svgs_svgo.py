import os
import glob
import subprocess

def optimize_all_svgs():
    svgs = sorted(glob.glob("src/icons/*.svg"))
    print(f"Optimizing {len(svgs)} SVGs with SVGO...")
    
    total_orig = 0
    total_new = 0
    
    for i, svg in enumerate(svgs, 1):
        orig_size = os.path.getsize(svg)
        total_orig += orig_size
        
        # run svgo in place
        cmd = f'npx.cmd svgo "{svg}" -o "{svg}"'
        res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"Error on {svg}: {res.stderr}")
            continue
            
        new_size = os.path.getsize(svg)
        total_new += new_size
        
        if i % 30 == 0 or i == len(svgs):
            print(f"  [{i}/{len(svgs)}] Processed... Running savings: {(total_orig - total_new) / 1024 / 1024:.2f} MB")
            
    saved = total_orig - total_new
    saved_pct = (saved / total_orig) * 100
    print("\n=======================================================")
    print(f"SVGO Optimization Complete:")
    print(f"  Original total: {total_orig / 1024 / 1024:.2f} MB")
    print(f"  Optimized total: {total_new / 1024 / 1024:.2f} MB")
    print(f"  Disk saved:     {saved / 1024 / 1024:.2f} MB ({saved_pct:.1f}%)")
    print("=======================================================")

if __name__ == "__main__":
    optimize_all_svgs()
