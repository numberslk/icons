# `@numberslk/icons` Usage Examples

This folder contains plug-and-play code examples showing how to use `@numberslk/icons` in different application environments:

| Example File | Environment | Description |
| :--- | :--- | :--- |
| [`node-demo.cjs`](node-demo.cjs) | **Node.js (Backend)** | Demonstrates CommonJS `require()`, metadata lookup, multilingual search, and SVG generator |
| [`react-demo.jsx`](react-demo.jsx) | **React / Next.js / Vite** | Demonstrates tree-shaken icon components, prop customization (`size`, `color`), and `<ElectionSymbol />` |
| [`vanilla-html.html`](vanilla-html.html) | **Browser / HTML** | Demonstrates zero-dependency custom Web Components `<lk-election-symbol>` |

---

## 1. Node.js

Run the demonstration script directly in your terminal:

```bash
node examples/node-demo.cjs
```

### Quick Snippet:
```javascript
const { getSymbolById, searchSymbols, getSymbolSvg } = require('@numberslk/icons');

// 1. Metadata lookup
const elephant = getSymbolById('elephant');
console.log(elephant.nameSi); // 'අලියා'

// 2. Multilingual search
const npp = searchSymbols('NPP');
const sinhala = searchSymbols('දුරකථනය');

// 3. Generate raw SVG HTML string
const svg = getSymbolSvg('compass', { size: 32, color: '#e11d48' });
```

---

## 2. React & Next.js

```bash
npm install @numberslk/icons
```

```jsx
import { ElephantIcon, TelephoneIcon, CompassIcon, ElectionSymbol } from '@numberslk/icons';

export function Header() {
  return (
    <div>
      {/* Individual tree-shakeable icons */}
      <ElephantIcon size={32} color="#0284c7" />
      <TelephoneIcon size={32} color="#16a34a" />
      <CompassIcon size={32} color="#dc2626" />

      {/* Dynamic Election Context Resolver */}
      <ElectionSymbol election="2025-pres-national-NPP" size={40} />
    </div>
  );
}
```

---

## 3. Web Components (Zero Frameworks)

Open [`vanilla-html.html`](vanilla-html.html) directly in your browser.

```html
<!-- Load from CDN -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@numberslk/icons/dist/index.mjs"></script>

<!-- Render anywhere in HTML -->
<lk-election-symbol name="elephant" size="48" color="#0284c7"></lk-election-symbol>

<!-- Or use election context syntax -->
<lk-election-symbols-2025-pres-national-NPP size="48" color="#dc2626"></lk-election-symbols-2025-pres-national-NPP>
```

---

## 4. Direct Asset Imports

You can also import raw SVGs and PNGs directly using your bundler (Vite, Webpack, Next.js):

```javascript
// Raw SVG file path
import elephantSvgUrl from '@numberslk/icons/svg/elephant.svg';

// High-resolution 512px raster PNG
import telephonePngUrl from '@numberslk/icons/png/telephone.png';

// Ultra-high-resolution 1024px raster PNG
import compass1024PngUrl from '@numberslk/icons/png-1024/compass.png';

// Full raw JSON metadata
import metadata from '@numberslk/icons/metadata';
```

---

## ⚠️ Legal Disclaimer

This is an independent, community open-source project by [numbers.lk](https://numbers.lk) and is **not** affiliated with or endorsed by the Election Commission of Sri Lanka (ECSL). Provided strictly "AS IS" for software UI, journalism, and research. Please see [TERMS.md](../TERMS.md) for full terms and limitation of liability.

