import os
import re

svg_dir = "src/icons"
files = [f for f in os.listdir(svg_dir) if f.endswith(".svg")]
files.sort()

report = []
for f in files:
    name = f[:-4]
    content = open(os.path.join(svg_dir, f), encoding='utf-8').read()
    paths = re.findall(r'<path[^>]+d="([^"]+)"', content)
    
    # Check number of paths
    num_paths = len(paths)
    
    # Check paths that are very short (usually noise specks or dots)
    # Short path definition: d attribute has fewer than 150 characters
    short_paths = [p for p in paths if len(p) < 150]
    
    report.append({
        "name": name,
        "num_paths": num_paths,
        "short_paths": len(short_paths),
        "total_chars": sum(len(p) for p in paths)
    })

# Sort by short_paths descending
report.sort(key=lambda x: x["short_paths"], reverse=True)

print(f"Total SVGs audited: {len(report)}")
print("\nTop 30 SVGs with highest number of short paths (speckles/noise):")
for r in report[:30]:
    print(f"  {r['name']:<25} paths: {r['num_paths']:<3} short (<150 chars): {r['short_paths']:<3} total_chars: {r['total_chars']}")
