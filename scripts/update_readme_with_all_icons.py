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

RAW_BASE = "https://raw.githubusercontent.com/numberslk/icons/main"
REPO_URL = "https://github.com/numberslk/icons"

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
                f'<a href="{REPO_URL}/blob/main/dist/svg/{s["id"]}.svg" title="{s["name"]} ({s.get("nameSi","")} / {s.get("nameTa","")})">'
                f'<img src="{RAW_BASE}/dist/svg/{s["id"]}.svg" width="68" height="68" alt="{s["name"]}" />'
                f'</a><br><b>{s["name"]}</b>{si_text}{party_badge}'
                f'<br><sub><a href="{REPO_URL}/raw/main/dist/svg/{s["id"]}.svg">SVG</a> • <a href="{REPO_URL}/raw/main/dist/png/{s["id"]}.png">PNG</a></sub></td>'
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
                f'<a href="{REPO_URL}/blob/main/dist/svg/{s["id"]}.svg" title="Click for 512px SVG: {s["name"]}">'
                f'<img src="{RAW_BASE}/dist/svg/{s["id"]}.svg" width="56" height="56" alt="{s["name"]}" />'
                f'</a><br><b><sub>{s["name"]}</sub></b>{si_text}'
                f'<br><sub><a href="{REPO_URL}/raw/main/dist/svg/{s["id"]}.svg">SVG</a> • <a href="{REPO_URL}/raw/main/dist/png/{s["id"]}.png">PNG</a></sub></td>'
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
        "| Icon | Symbol Name | Component | සිංහල | தமிழ் | Party / Allotment | Formats |",
        "| :---: | :--- | :--- | :--- | :--- | :--- | :---: |"
    ]
    for s in symbol_list:
        icon_img = f'<a href="{REPO_URL}/blob/main/dist/svg/{s["id"]}.svg"><img src="{RAW_BASE}/dist/svg/{s["id"]}.svg" width="36" height="36" alt="{s["name"]}" /></a>'
        parties_str = ", ".join(s.get("parties", [])) if s.get("parties") else "-"
        si = s.get("nameSi") or "-"
        ta = s.get("nameTa") or "-"
        downloads = f'[`SVG`]({REPO_URL}/raw/main/dist/svg/{s["id"]}.svg) • [`PNG`]({REPO_URL}/raw/main/dist/png/{s["id"]}.png)'
        lines.append(f'| {icon_img} | **{s["name"]}** | `{s["componentName"]}` | {si} | {ta} | {parties_str} | {downloads} |')
    return "\n".join(lines)

grid_featured = make_featured_grid(major_symbols_list, cols=6)
grid_all = make_visual_grid(items, cols=5)
table_a = make_detailed_table(sch_a)
table_b = make_detailed_table(sch_b)

template = """# 🏛️ @numberslk/icons

> **182 Sri Lanka election symbols as smooth, standardized vector icons, React components, and Web Components.**  
> An open-source civic design library by [numbers.lk](https://numbers.lk) based on public Sri Lanka Government Gazette records.

[![NPM Version](https://img.shields.io/npm/v/@numberslk/icons?color=amber&style=flat-square)](https://www.npmjs.com/package/@numberslk/icons)
[![License: BSD-3-Clause](https://img.shields.io/badge/License-BSD%203--Clause-blue?style=flat-square)](https://github.com/numberslk/icons/blob/main/LICENSE)
[![Symbols Count](https://img.shields.io/badge/Election%20Symbols-182%20Smooth%20Vectors-sky?style=flat-square)](https://github.com/numberslk/icons)
[![Package Size](https://img.shields.io/badge/Package%20Size-2.7%20MB-emerald?style=flat-square)](https://www.npmjs.com/package/@numberslk/icons)
[![Legal Disclaimer](https://img.shields.io/badge/Disclaimer-TERMS.md-orange?style=flat-square)](https://github.com/numberslk/icons/blob/main/TERMS.md)
[![Live Showcase](https://img.shields.io/badge/Showcase-icons.numbers.lk-indigo?style=flat-square)](https://icons.numbers.lk)

```bash
npm install @numberslk/icons
```

---

## ⚡ Quick Start

### React / Next.js

```tsx
import { ElephantIcon, TelephoneIcon, CompassIcon, FlowerBudIcon } from '@numberslk/icons';

export default function App() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {/* Default 24px, or custom sizes and colors */}
      <ElephantIcon size={36} className="text-amber-500" />
      <TelephoneIcon size={36} className="text-sky-500" />
      <CompassIcon size={36} className="text-rose-500" />
      <FlowerBudIcon size={36} className="text-pink-500" />
    </div>
  );
}
```

### Vanilla HTML / SVG String

```javascript
import { getSymbolSvg } from '@numberslk/icons';

// Returns clean <svg> string with custom size & fill
const svgMarkup = getSymbolSvg('compass', { size: 48, color: '#e11d48' });
```

---

## ⭐ Featured Election Symbols

Widely recognized party symbols in Sri Lanka:

__FEATURED_GRID__

---

## 🖼️ Complete Visual Icon Gallery (All 182 Symbols)

Every symbol is vectorized with smooth cubic curves to a standard **`512×512 viewBox`**, inheriting **`fill="currentColor"`**. Click any icon to view its vector SVG or download PNG assets.

__ALL_GRID__

---

## ✨ Key Features

- 🏛️ **100% Gazette-Matched Proportions**: Vectorized directly from public Sri Lanka Gazette Extraordinaries (`No. 2315/06`, `No. 2263/24`, `No. 2165/45 & 2166/16`) with true un-distorted printed aspect ratios.
- 📦 **Modern Subpath Exports**: Modular import structure allowing `import { ... } from '@numberslk/icons/election-symbols'` as well as root `@numberslk/icons`.
- 💎 **High-Resolution & Silky Smooth**: Standardized **`512×512 viewBox`** with sub-pixel Gaussian curve smoothing. Free of jagged edges, pixelation, and staircase cuts.
- ⭕ **Optical Keyline & Circular Mask Safe**: Calibrated optical sizing and centering with safe clearance inside circular avatars, round badges, and buttons without clipping.
- 🎨 **Heroicons / Lucide Standard**: Standardized `viewBox="0 0 512 512"`, styled with `fill="currentColor"`. Scales smoothly (`24px`, `32px`, `48px`, `64px`, `128px`, `512px`) and inherits CSS or Tailwind text colors (`text-amber-500`, `text-rose-600`, `text-sky-500`).
- 🌓 **Automatic Dark / Light Mode**: Standalone SVGs include responsive styling so they look crisp on both light and dark markdown themes.
- ⚛️ **Multi-Framework**: Out-of-the-box components for **React**, **Next.js**, **Vue 3**, **Vanilla JS**, and **Raw SVG**.
- 🌐 **Multilingual Search**: Trilingual dictionary with English, Sinhala (සිංහල), and Tamil (தமிழ்) names.
- 📋 **Political Party Registry**: Linked with recognized Sri Lankan political parties (UNP, SJB, NPP, SLPP, SLFP, ITAK, ACMC, EPDP, CWC, etc.).
- 📜 **BSD-3-Clause Permissive Licensing**: Free for commercial, personal, and civic use with simple attribution.

---

## 📖 Component Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `number | string` | `24` | Width and height in pixels (e.g. `24`, `32`, `48`, `64`, `128`, `512`) |
| `color` | `string` | `'currentColor'` | Fill color of the icon |
| `className` | `string` | `''` | CSS / Tailwind classes |
| `title` | `string` | Official symbol name | Accessible `<title>` element |
| `...props` | `React.SVGProps` | — | Native SVG attributes (`onClick`, `style`, `aria-*`) |

---

## 📦 Subpath Exports & Asset Imports

### 1. Subpath Module Import
```javascript
// Import from specific category subpath:
import { ElephantIcon, CompassIcon } from '@numberslk/icons/election-symbols';

// Or from root umbrella:
import { ElephantIcon, CompassIcon } from '@numberslk/icons';
```

### 2. Direct Vector SVG File Import
Every symbol is included in [`dist/svg/*.svg`](https://github.com/numberslk/icons/tree/main/dist/svg) and exported via `@numberslk/icons/svg/*`:

```html
<!-- Import raw vector SVG (512x512 viewBox) -->
<img src="node_modules/@numberslk/icons/dist/svg/elephant.svg" width="64" height="64" alt="Elephant" />
```

Or import raw SVG string constants in JavaScript:
```javascript
import { elephantSvg, compassSvg } from '@numberslk/icons';
console.log(elephantSvg); // "<svg viewBox=\"0 0 512 512\"..."
```

---

## 🔍 Multilingual Search API

Search symbols by English, Sinhala, Tamil, or political party abbreviation:

```javascript
import { searchSymbols, getSymbolById } from '@numberslk/icons';

// Search by political party acronym
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

Symbols designated for recognized political parties in Sri Lanka under the *Parliamentary Elections Act, No. 1 of 1981* and *Local Authorities Elections Ordinance*:

<details>
<summary><b>Click to expand Schedule A Table (78 symbols)</b></summary>

__TABLE_A__

</details>

---

## 👥 Schedule B: Independent Groups & Alliances (104 Symbols)

Symbols designated for independent groups and non-party candidate lists:

<details>
<summary><b>Click to expand Schedule B Table (104 symbols)</b></summary>

__TABLE_B__

</details>

---

## 📜 Public Gazette Records & Sources

Election symbols in this library are derived from public gazette records published by the Government of Sri Lanka:
- **Gazette Extraordinary No. 2315/06** (16 January 2023) — *Local Authorities Elections Ordinance (Chapter 262) / Parliamentary Elections Act*: Schedules (A) and (B).
- **Gazette Extraordinary No. 2263/24** (21 January 2022) — *Parliamentary Elections Act, No. 1 of 1981*: Schedule (A) and Schedule (B).
- **Gazette Extraordinary No. 2165/45 & 2166/16** (March 2020) — Approved Parliamentary Election Symbols.
- **Recognized Political Parties Register** — Public notices of the Election Commission of Sri Lanka.

---

## ⚠️ Terms of Use, Legal Disclaimer & Limitation of Liability

Please review our full **[Terms of Use & Legal Disclaimer (TERMS.md)](https://github.com/numberslk/icons/blob/main/TERMS.md)** before deploying:

1. **Independent Project / Not Official**: This is an **independent, community open-source project by numbers.lk**. It is **not** affiliated with, authorized, certified, maintained, or endorsed by the **Election Commission of Sri Lanka (ECSL)**, the Department of Elections, or the Government of Sri Lanka.
2. **Strictly for Software UI, Journalism, and Research**: Symbols and metadata are provided solely for user interfaces, data visualization, journalistic reporting, education, and civic-tech software. They must **never** be used as official ballot printing artwork or authoritative legal determination materials.
3. **Disclaimer of Warranties ("AS IS")**: All software, vectors, and metadata are provided on an **"AS IS"** basis without warranties of any kind (express, implied, or statutory), including merchantability, fitness for a particular purpose, or accuracy.
4. **Total Limitation of Liability**: In no event shall numbers.lk, its founders, authors, contributors, or copyright holders be liable for any direct, indirect, incidental, special, exemplary, punitive, or consequential damages, or any electoral, political, legal, or commercial claims resulting from the use or distribution of these assets.
5. **No Endorsement**: Inclusion of any political party emblem or candidate symbol does not imply endorsement by numbers.lk of any party or candidate, nor does it imply endorsement of numbers.lk by any entity.

---

## ⚖️ License & Attribution

This project is licensed under the **[BSD 3-Clause License](https://github.com/numberslk/icons/blob/main/LICENSE)**.

### Permitted Uses
- ✅ **Free for Personal, Civic, and Commercial Software**: You can freely use, modify, embed, and distribute these icons in web apps, mobile apps, print publications, dashboards, and research.
- ✅ **Modification Allowed**: You may adapt, resize, recolor, and vectorize the assets.

### Attribution
Redistribution in source or binary/visual form must reproduce the copyright notice and attribution to **numbers.lk**:

```markdown
Icons provided by [numbers.lk](https://numbers.lk) (@numberslk/icons) under BSD-3-Clause License.
```
"""

readme_content = template.replace("__FEATURED_GRID__", grid_featured)
readme_content = readme_content.replace("__ALL_GRID__", grid_all)
readme_content = readme_content.replace("__TABLE_A__", table_a)
readme_content = readme_content.replace("__TABLE_B__", table_b)

with open("README.md", "w", encoding="utf-8") as f:
    f.write(readme_content)

print("Updated README.md successfully with simplified intro and absolute GitHub raw URLs for all icons!")
