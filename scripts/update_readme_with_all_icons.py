import json
import re

with open("src/metadata.json", encoding="utf-8") as f:
    items = json.load(f)

# Sort items alphabetically by name
items.sort(key=lambda x: x["name"])

sch_a = [i for i in items if i["schedule"] == "A"]
sch_b = [i for i in items if i["schedule"] == "B"]

# Popular / Major parties first
major_party_order = [
    ("elephant", "UNP (United National Party)"),
    ("telephone", "SJB (Samagi Jana Balawegaya)"),
    ("compass", "NPP / JVP (National People's Power)"),
    ("flower-bud", "SLPP (Sri Lanka Podujana Peramuna)"),
    ("hand", "SLFP (Sri Lanka Freedom Party)"),
    ("house", "ITAK / TNA (Ilankai Tamil Arasu Kadchi)"),
    ("betel-leaf", "UPFA (United People's Freedom Alliance)"),
    ("bell", "JVP (Historic)"),
    ("sun", "TULF (Tamil United Liberation Front)"),
    ("tree", "SLMC (Sri Lanka Muslim Congress)"),
    ("peacock", "ACMC (All Ceylon Makkal Congress)"),
    ("veena", "EPDP (Eelam People's Democratic Party)"),
    ("pair-of-scales", "NDF (New Democratic Front - Scales)"),
    ("swan", "NDF (New Democratic Front - Swan)"),
    ("tractor", "Jana Setha Peramuna"),
    ("cockerel", "CWC (Ceylon Workers' Congress)"),
    ("chair", "PA (People's Alliance)"),
    ("cart-wheel", "NFF (National Freedom Front)"),
]

id_to_item = {i["id"]: i for i in items}
major_symbols_list = []
for mid, party_label in major_party_order:
    if mid in id_to_item:
        item_copy = dict(id_to_item[mid])
        item_copy["party_label"] = party_label
        major_symbols_list.append(item_copy)

def make_featured_grid(symbol_list, cols=6):
    rows = []
    rows.append("<table>")
    for i in range(0, len(symbol_list), cols):
        chunk = symbol_list[i:i+cols]
        rows.append("  <tr>")
        for s in chunk:
            si_text = f"<br><sub>{s['nameSi']}</sub>" if s.get('nameSi') else ""
            party_badge = f"<br><sub><code>{s['party_label'].split(' ')[0]}</code></sub>" if s.get('party_label') else ""
            rows.append(
                f'    <td align="center" width="16.6%">'
                f'<a href="src/icons/{s["id"]}.svg" title="{s["name"]} ({s.get("nameSi","")} / {s.get("nameTa","")})">'
                f'<img src="src/icons/{s["id"]}.svg" width="68" height="68" alt="{s["name"]}" />'
                f'</a><br><b>{s["name"]}</b>{si_text}{party_badge}'
                f'<br><sub><a href="dist/png/{s["id"]}.png">PNG 512px</a></sub></td>'
            )
        if len(chunk) < cols:
            for _ in range(cols - len(chunk)):
                rows.append('    <td align="center" width="16.6%"></td>')
        rows.append("  </tr>")
    rows.append("</table>")
    return "\n".join(rows)

def make_visual_grid(symbol_list, cols=5):
    col_width = "20%"
    rows = []
    rows.append("<table>")
    for i in range(0, len(symbol_list), cols):
        chunk = symbol_list[i:i+cols]
        rows.append("  <tr>")
        for s in chunk:
            si_text = f"<br><sub>{s['nameSi']}</sub>" if s.get('nameSi') else ""
            rows.append(
                f'    <td align="center" width="{col_width}">'
                f'<a href="src/icons/{s["id"]}.svg" title="Click for 512px SVG: {s["name"]}">'
                f'<img src="src/icons/{s["id"]}.svg" width="60" height="60" alt="{s["name"]}" />'
                f'</a><br><b><sub>{s["name"]}</sub></b>{si_text}'
                f'<br><sub><a href="src/icons/{s["id"]}.svg">SVG</a> • <a href="dist/png/{s["id"]}.png">PNG</a></sub></td>'
            )
        # Pad empty cells if last row
        if len(chunk) < cols:
            for _ in range(cols - len(chunk)):
                rows.append(f'    <td align="center" width="{col_width}"></td>')
        rows.append("  </tr>")
    rows.append("</table>")
    return "\n".join(rows)

def make_detailed_table(symbol_list):
    lines = [
        "| Icon (512px) | Symbol Name | Component | සිංහල | தமிழ் | Party / Allotment | Downloads |",
        "| :---: | :--- | :--- | :--- | :--- | :--- | :---: |"
    ]
    for s in symbol_list:
        icon_img = f'<a href="src/icons/{s["id"]}.svg"><img src="src/icons/{s["id"]}.svg" width="40" height="40" alt="{s["name"]}" /></a>'
        parties_str = ", ".join(s.get("parties", [])) if s.get("parties") else "-"
        si = s.get("nameSi") or "-"
        ta = s.get("nameTa") or "-"
        downloads = f'[`SVG`](src/icons/{s["id"]}.svg) • [`PNG`](dist/png/{s["id"]}.png)'
        lines.append(f'| {icon_img} | **{s["name"]}** | `{s["componentName"]}` | {si} | {ta} | {parties_str} | {downloads} |')
    return "\n".join(lines)

grid_featured = make_featured_grid(major_symbols_list, cols=6)
grid_all = make_visual_grid(items, cols=5)
table_a = make_detailed_table(sch_a)
table_b = make_detailed_table(sch_b)

template = """# 🏛️ numbers.lk Icons (`@numberslk/icons`)

> **The official open-source civic and organizational vector icon library for Sri Lanka by [numbers.lk](https://numbers.lk)**. Featuring 182 official Sri Lanka election symbols sourced directly from Government Gazettes, with subpath export support (`@numberslk/icons/election-symbols`) and expanding collections for Sri Lankan banks and public institutions.

[![NPM Version](https://img.shields.io/npm/v/@numberslk/icons?color=amber&style=flat-square)](https://www.npmjs.com/package/@numberslk/icons)
[![License: BSD-3-Clause](https://img.shields.io/badge/License-BSD%203--Clause-blue?style=flat-square)](LICENSE)
[![Symbols Count](https://img.shields.io/badge/Election%20Symbols-182%20Ultra--Smooth%20Vectors-sky?style=flat-square)](https://github.com/numberslk/icons)
[![High Resolution](https://img.shields.io/badge/Resolution-512px%20%26%201024px-violet?style=flat-square)](https://github.com/numberslk/icons)
[![Gazette Verified](https://img.shields.io/badge/Gazette-Election%20Commission%20LK-rose?style=flat-square)](https://elections.gov.lk)
[![Interactive Showcase](https://img.shields.io/badge/Live%20Showcase-Local%20%3A3456-indigo?style=flat-square)](http://localhost:3456)

---

## ⭐ Prominent Political Party Symbols

A quick reference for the most widely recognized party election symbols in Sri Lanka:

__FEATURED_GRID__

---

## 🖼️ Complete Visual Icon Gallery (All 182 Symbols)

Every symbol below is an authentic vector plate normalized to a standard **`512×512 viewBox`** with smooth cubic bezier splines, **`fill="currentColor"`**, and responsive Light/Dark mode styling. Click any icon to view its raw 512px SVG or download its 512px PNG.

__ALL_GRID__

---

## ✨ Key Features

- 🏛️ **100% Gazette Verified Proportions**: Sourced directly from official Democratic Socialist Republic of Sri Lanka Gazette Extraordinaries (`No. 2315/06`, `No. 2263/24`, `No. 2165/45 & 2166/16`) with true un-distorted printed aspect ratios.
- 📦 **Modern Subpath Exports**: Modular import structure allowing `import { ... } from '@numberslk/icons/election-symbols'` as well as root `@numberslk/icons`, with built-in architectural support for upcoming sets (`@numberslk/icons/banks`).
- 💎 **High-Resolution & Silky Smooth**: Standardized **`512×512 viewBox`** with sub-pixel Gaussian level-set curve smoothing. Free of jagged edges, pixelation, and staircase cuts.
- ⭕ **Optical Keyline & Circular Mask Safe**: Calibrated optical sizing and centering with guaranteed &ge; 42px safe breathing clearance inside a circular boundary ($R=256$). Icons fit cleanly into circular avatars, round badges, and buttons without clipping.
- 🖼️ **Dual Format Exports (SVG + High-Res PNG)**: Includes 182 standalone 512px SVGs, plus 512×512px and 1024×1024px transparent PNGs in `dist/png/` and `dist/png-1024/`.
- 🎨 **Heroicons / Lucide Standard**: Standardized `viewBox="0 0 512 512"`, styled with `fill="currentColor"`. Scales smoothly (`24px`, `32px`, `48px`, `64px`, `128px`, `512px`) and inherits CSS or Tailwind text colors (`text-amber-500`, `text-rose-600`, `text-sky-500`).
- 🌓 **Automatic Dark / Light Mode**: Standalone SVGs include responsive media queries so they look crisp on both light and dark GitHub or markdown themes.
- ⚛️ **Multi-Framework**: Out-of-the-box components for **React**, **Next.js**, **Vue 3**, **Vanilla JS**, and **Raw SVG**.
- 🌐 **Multilingual Search**: Trilingual dictionary with English, Sinhala (සිංහල), and Tamil (தமிழ்) names.
- 📋 **Political Party Registry**: Pre-linked with official Sri Lankan political parties (UNP, SJB, NPP, SLPP, SLFP, ITAK, ACMC, EPDP, CWC, etc.).
- 📜 **BSD-3-Clause Permissive Licensing**: Free for commercial, personal, and civic use with simple attribution.

---

## 🚀 Installation

```bash
# npm
npm install @numberslk/icons

# pnpm
pnpm add @numberslk/icons

# yarn
yarn add @numberslk/icons
```

---

## 📖 Quickstart & Usage

### 1. React / Next.js

Import components using the subpath `@numberslk/icons/election-symbols` (or umbrella `@numberslk/icons`):

```tsx
import React from 'react';
// Import from specific category subpath:
import { 
  ElephantIcon, 
  CompassIcon, 
  TelephoneIcon, 
  FlowerBudIcon 
} from '@numberslk/icons/election-symbols';

// Or from the root umbrella package:
// import { ElephantIcon } from '@numberslk/icons';

export default function ElectionDashboard() {
  return (
    <div className="flex items-center gap-6 p-4">
      {/* Default size (24px) */}
      <ElephantIcon className="text-amber-500" />

      {/* Larger smooth high-res sizes */}
      <CompassIcon size={48} className="text-rose-600" />

      {/* Tailwind hover animation */}
      <TelephoneIcon size={64} className="text-sky-500 hover:scale-110 transition-transform" />
      
      <FlowerBudIcon size={48} className="text-pink-600" />
    </div>
  );
}
```

#### Supported Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `number | string` | `24` | Width and height in pixels (e.g. `24`, `32`, `48`, `64`, `128`, `512`) |
| `color` | `string` | `'currentColor'` | Fill color of the icon |
| `className` | `string` | `''` | CSS / Tailwind classes |
| `title` | `string` | Official symbol name | Accessible `<title>` element |
| `...props` | `React.SVGProps` | — | Native SVG attributes (`onClick`, `style`, `aria-*`) |

---

### 2. Vanilla JavaScript / HTML

Render any symbol as an SVG HTML string:

```javascript
import { getSymbolSvg, searchSymbols } from '@numberslk/icons/election-symbols';

// Render ultra-smooth SVG string with custom options
const svgHtml = getSymbolSvg('compass', {
  size: 64,
  color: '#e11d48',
  className: 'symbol-badge'
});

document.getElementById('symbol-box').innerHTML = svgHtml;
```

---

### 3. Direct SVG & PNG File Import

Every symbol is available in [`dist/svg/*.svg`](dist/svg/) and [`dist/png/*.png`](dist/png/):

```html
<!-- High-Res Vector SVG (512x512 viewBox) -->
<img src="node_modules/@numberslk/icons/dist/svg/elephant.svg" width="64" height="64" alt="Elephant" />

<!-- Transparent High-Res PNG (512x512) -->
<img src="node_modules/@numberslk/icons/dist/png/compass.png" width="64" height="64" alt="Compass" />
```

Or import raw SVG strings in JavaScript:

```javascript
import { elephantSvg, compassSvg } from '@numberslk/icons/election-symbols';
console.log(elephantSvg); // "<svg viewBox=\"0 0 512 512\"..."
```

---

### 4. Search & Metadata API

Search symbols by English, Sinhala, Tamil, or Political Party abbreviation:

```javascript
import { searchSymbols, getSymbolById } from '@numberslk/icons/election-symbols';

// Search by political party
const npp = searchSymbols('NPP'); 
// => [{ id: 'compass', name: 'Compass', nameSi: 'මාලිමාව', ... }]

// Search by Sinhala
const phone = searchSymbols('දුරකථනය'); 
// => [{ id: 'telephone', name: 'Telephone', nameSi: 'දුරකථනය', ... }]

// Search by Tamil
const elephant = searchSymbols('யானை'); 
// => [{ id: 'elephant', name: 'Elephant', nameTa: 'யானை', ... }]
```

---

## 🏛️ Schedule A: Recognized Political Parties (78 Symbols)

Symbols officially allotted to recognized political parties in Sri Lanka under the *Parliamentary Elections Act, No. 1 of 1981* and *Local Authorities Elections Ordinance*:

<details open>
<summary><b>Click to expand / collapse Schedule A Table (78 symbols)</b></summary>

__TABLE_A__

</details>

---

## 👥 Schedule B: Independent Groups & Alliances (104 Symbols)

Symbols designated for independent groups and non-party candidate lists:

<details open>
<summary><b>Click to expand / collapse Schedule B Table (104 symbols)</b></summary>

__TABLE_B__

</details>

---

## 📜 Official Gazette Legal Citations

All election symbols in this library are authentic civic insignia sourced directly from:
- **Gazette Extraordinary No. 2315/06** (16 January 2023) — *Local Authorities Elections Ordinance (Chapter 262) / Parliamentary Elections Act*: Schedules (A) and (B).
- **Gazette Extraordinary No. 2263/24** (21 January 2022) — *Parliamentary Elections Act, No. 1 of 1981*: Schedule (A) and Schedule (B).
- **Gazette Extraordinary No. 2165/45 & 2166/16** (March 2020) — Approved Parliamentary Election Symbols.
- **Recognized Political Parties Register (2024)** — Election Commission of Sri Lanka.

---

## ⚖️ License & Attribution

This project is licensed under the **[BSD 3-Clause License](LICENSE)**.

### Permitted Uses
- ✅ **Free for Personal, Civic, and Commercial Use**: You can freely use, modify, embed, and distribute these icons in web apps, mobile apps, print publications, dashboards, and research.
- ✅ **Modification Allowed**: You may adapt, resize, recolor, and vectorize the assets.

### Attribution Requirement
Under the BSD 3-Clause License, redistribution in source or binary/visual form must reproduce the copyright notice and attribution to **numbers.lk**:

```markdown
<!-- Attribution snippet for credits or footer: -->
Icons provided by [numbers.lk](https://numbers.lk) (@numberslk/icons) under BSD-3-Clause License.
```
"""

readme_content = template.replace("__FEATURED_GRID__", grid_featured)
readme_content = readme_content.replace("__ALL_GRID__", grid_all)
readme_content = readme_content.replace("__TABLE_A__", table_a)
readme_content = readme_content.replace("__TABLE_B__", table_b)

with open("README.md", "w", encoding="utf-8") as f:
    f.write(readme_content)

print("Updated README.md successfully with 512px smooth vector gallery, larger icons, and PNG download links!")
