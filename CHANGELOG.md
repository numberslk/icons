# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-09-20

### Added
- **182 Official Sri Lanka Election Symbols**: Authentic civic insignia sourced directly from Gazette Extraordinary No. 2315/06 and 2263/24 Schedule (A) and Schedule (B).
- **Dual Module Exports**: First-class support for modern ESM (`import`) and CommonJS (`require`).
- **Tree-shakeable React Components**:
  - 182 individual icon components (`ElephantIcon`, `TelephoneIcon`, `CompassIcon`, `FlowerBudIcon`, etc.).
  - Compatible with React 16.8+, React 17, React 18, and React 19 without external transpilation.
  - Supports `size`, `color` (`currentColor`), `className`, `style`, and `ref` forwarding.
- **Dynamic `<ElectionSymbol>` Component**:
  - Supports election syntax tags (e.g. `<ElectionSymbol election="2025-pres-national-NPP" />` or `name="telephone"`).
- **Custom Web Components**:
  - Zero-dependency `<lk-election-symbol name="elephant">` and `<lk-election-symbols-2025-pres-national-NPP>` custom elements.
- **Multilingual Metadata & Search**:
  - `getSymbolById(id)`: Lookup symbol details including English, Sinhala (`nameSi`), Tamil (`nameTa`), party codes, schedule, and category.
  - `searchSymbols(query)`: Unified search across English, Sinhala, Tamil, and political acronyms (`UNP`, `SJB`, `NPP`, `JVP`, `SLPP`, `ITAK`, etc.).
  - `getSymbolSvg(id, options)`: Dynamic vanilla SVG HTML string generator.
  - `resolveElectionSymbol(query)`: Resolves election syntax queries or party codes to symbol metadata.
- **Asset Subpath Exports**:
  - `@numberslk/icons/svg/<id>.svg`: Clean raw SVGs with 512x512 viewBox.
  - `@numberslk/icons/png/<id>.png`: 512px rasterized PNG assets.
  - `@numberslk/icons/png-1024/<id>.png`: 1024px high-resolution PNG assets.
  - `@numberslk/icons/metadata`: Direct JSON metadata import.
- **TypeScript Typings**: Complete `.d.ts` declarations included in the package.
