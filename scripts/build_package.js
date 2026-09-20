const fs = require('fs');
const path = require('path');

const svgDir = path.join(__dirname, '..', 'src', 'icons');
const distDir = path.join(__dirname, '..', 'dist');
const distSvgDir = path.join(distDir, 'svg');
const distElectionSymbolsDir = path.join(distDir, 'election-symbols');
const metadataPath = path.join(__dirname, '..', 'src', 'metadata.json');
const electionsPath = path.join(__dirname, '..', 'src', 'elections.json');
const electionsData = fs.existsSync(electionsPath)
  ? JSON.parse(fs.readFileSync(electionsPath, 'utf-8'))
  : { partyMap: {}, aliases: {}, independentScheduleBSymbols: [] };

// Ensure output directories
fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(distSvgDir, { recursive: true });
fs.mkdirSync(distElectionSymbolsDir, { recursive: true });

const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
console.log(`Building package for ${metadata.length} election symbols...`);

const reactComponents = [];
const reactDeclarations = [];
const svgExports = [];
const svgDeclarations = [];
const cjsExports = [];
const compMapEntries = [];

metadata.forEach((item) => {
  const svgFile = path.join(svgDir, `${item.id}.svg`);
  if (!fs.existsSync(svgFile)) {
    console.warn(`Missing SVG for ${item.id}`);
    return;
  }

  const rawSvg = fs.readFileSync(svgFile, 'utf-8');
  
  // Copy raw SVG to dist/svg
  fs.writeFileSync(path.join(distSvgDir, `${item.id}.svg`), rawSvg);

  // Extract inner paths inside <svg>...</svg>
  const innerMatch = rawSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  let innerSvg = innerMatch ? innerMatch[1].trim() : '';
  // Remove style tag from React component markup so props and className directly control fill/color
  innerSvg = innerSvg.replace(/<style>[\s\S]*?<\/style>/g, '').trim();

  // Component Name (e.g. ElephantIcon)
  const compName = item.componentName;
  const camelId = item.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  const svgConstName = `${camelId}Svg`;

  // React Component (compatible with React 16, 17, 18, 19, Preact, and standard JSX/hyperscript)
  // We produce clean, robust React.createElement code that works WITHOUT requiring an external JSX transpiler runtime
  const reactCompCode = `
export const ${compName} = /* @__PURE__ */ createIcon('${item.id}', '${item.name}');
`;
  reactComponents.push(reactCompCode);
  cjsExports.push(`${compName}`);
  compMapEntries.push(`  '${item.id}': ${compName}`);

  reactDeclarations.push(`export declare const ${compName}: React.ForwardRefExoticComponent<ElectionSymbolIconProps & React.RefAttributes<SVGSVGElement>>;`);

  svgExports.push(`export const ${svgConstName} = /* @__PURE__ */ getSymbolSvg('${item.id}');`);
  cjsExports.push(`${svgConstName}`);
  svgDeclarations.push(`export declare const ${svgConstName}: string;`);
});

// Helper and base code for React icons
const baseIconHelper = `
let _React;
try {
  _React = (typeof window !== 'undefined' && window.React) ? window.React : (typeof React !== 'undefined' ? React : undefined);
} catch (e) {}

/**
 * Higher-order icon component factory
 */
function createIcon(id, name, innerSvg) {
  const Icon = function (props) {
    const React = _React || (typeof window !== 'undefined' && window.React);
    if (!React) {
      throw new Error('[lk-election-symbols] React is not loaded in this environment. Please ensure React is installed or use getSymbolSvg() for vanilla SVG strings.');
    }
    const {
      size = 24,
      color = 'currentColor',
      className = '',
      style = {},
      title = name,
      ...restProps
    } = props || {};

    const inner = innerSvg || (typeof rawSvgMap !== 'undefined' && rawSvgMap[id]) || '';
    const svgProps = {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 512 512',
      width: size,
      height: size,
      fill: color,
      className: ['lk-election-symbol', 'lk-symbol-' + id, className].filter(Boolean).join(' '),
      style: { display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style },
      'aria-hidden': !title ? 'true' : undefined,
      role: title ? 'img' : 'presentation',
      dangerouslySetInnerHTML: { __html: inner },
      ...restProps
    };

    return React.createElement('svg', svgProps);
  };

  // If React.forwardRef exists at runtime, wrap it
  if (_React && _React.forwardRef) {
    const Forwarded = _React.forwardRef(function (props, ref) {
      const {
        size = 24,
        color = 'currentColor',
        className = '',
        style = {},
        title = name,
        ...restProps
      } = props || {};

      const inner = innerSvg || (typeof rawSvgMap !== 'undefined' && rawSvgMap[id]) || '';
      return _React.createElement('svg', {
        ref,
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 512 512',
        width: size,
        height: size,
        fill: color,
        className: ['lk-election-symbol', 'lk-symbol-' + id, className].filter(Boolean).join(' '),
        style: { display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style },
        'aria-hidden': !title ? 'true' : undefined,
        role: title ? 'img' : 'presentation',
        dangerouslySetInnerHTML: { __html: inner },
        ...restProps
      });
    });
    Forwarded.displayName = name.replace(/\\s+/g, '') + 'Icon';
    Forwarded.symbolId = id;
    return Forwarded;
  }

  Icon.displayName = name.replace(/\\s+/g, '') + 'Icon';
  Icon.symbolId = id;
  return Icon;
}
`;

// Vanilla SVG string renderer helper
const vanillaHelper = `
/**
 * Render any Sri Lanka Election Symbol as an SVG HTML string
 * @param {string} id - Symbol kebab-case ID (e.g. 'elephant', 'telephone')
 * @param {object} options - Sizing and styling options
 */
export function getSymbolSvg(id, options = {}) {
  const {
    size = 512,
    color = 'currentColor',
    className = '',
    style = ''
  } = options;
  const symbol = electionSymbols.find(s => s.id === id);
  if (!symbol) return '';
  const inner = rawSvgMap[id] || '';
  const classAttr = ['lk-election-symbol', 'lk-symbol-' + id, className].filter(Boolean).join(' ');
  const styleAttr = style ? \` style="\${style}"\` : '';
  return \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="\${size}" height="\${size}" fill="\${color}" class="\${classAttr}"\${styleAttr}>\${inner}</svg>\`;
}
`;

// Build rawSvgMap
const rawSvgMapCode = `
export const rawSvgMap = {
${metadata.map(m => {
  const svgFile = path.join(svgDir, `${m.id}.svg`);
  const rawSvg = fs.existsSync(svgFile) ? fs.readFileSync(svgFile, 'utf-8') : '';
  const innerMatch = rawSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  let innerSvg = innerMatch ? innerMatch[1].trim() : '';
  innerSvg = innerSvg.replace(/<style>[\s\S]*?<\/style>/g, '').trim();
  return `  '${m.id}': \`${innerSvg.replace(/`/g, '\\`')}\``;
}).join(',\n')}
};
`;

// ESM index.mjs
const esmContent = `
${baseIconHelper}

export const electionSymbols = ${JSON.stringify(metadata, null, 2)};

export function getSymbolById(id) {
  return electionSymbols.find(s => s.id === id);
}

export function searchSymbols(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return electionSymbols;
  return electionSymbols.filter(s => 
    s.name.toLowerCase().includes(q) ||
    (s.nameSi && s.nameSi.includes(q)) ||
    (s.nameTa && s.nameTa.includes(q)) ||
    (s.tags && s.tags.some(t => t.toLowerCase().includes(q))) ||
    (s.parties && s.parties.some(p => p.toLowerCase().includes(q)))
  );
}

${rawSvgMapCode}

${vanillaHelper}

// =========================================================================
// Election Context Syntax & Web Components
// =========================================================================
export const electionMap = ${JSON.stringify(electionsData.aliases || {}, null, 2)};
export const partyMap = ${JSON.stringify(electionsData.partyMap || {}, null, 2)};
const independentScheduleBSymbols = ${JSON.stringify(electionsData.independentScheduleBSymbols || [], null, 2)};

export function resolveElectionSymbol(query) {
  if (!query) return undefined;
  let q = '';
  if (typeof query === 'object' && query !== null) {
    const y = query.year || '2024';
    const t = query.type || 'parl';
    const d = query.district || query.scope || 'national';
    const p = query.party || query.group || query.candidate || '';
    q = \`\${y}-\${t}-\${d}-\${p}\`;
  } else {
    q = String(query).trim();
  }

  q = q.replace(/^<+/, '').replace(/>+$/, '').trim();
  q = q.replace(/^lk-election-symbols-?/i, '').replace(/^lk-election-?/i, '');
  const lowerQ = q.toLowerCase();

  if (electionMap[lowerQ]) {
    return getSymbolById(electionMap[lowerQ]);
  }

  const parts = lowerQ.split('-');
  if (parts.length >= 4) {
    const year = parts[0];
    const electionType = parts[1];
    const district = parts[2];
    const partyOrGroup = parts.slice(3).join('-');

    if ((year === '2024' || year === '2025') && electionType === 'pres') {
      if (partyOrGroup === 'npp' || partyOrGroup === 'jvp' || partyOrGroup === 'anura') return getSymbolById('compass');
      if (partyOrGroup === 'sjb' || partyOrGroup === 'sajith') return getSymbolById('telephone');
      if (partyOrGroup === 'slpp' || partyOrGroup === 'namal') return getSymbolById('flower-bud');
      if (partyOrGroup === 'ind16' || partyOrGroup === 'ind-16' || partyOrGroup === 'gas-cylinder' || partyOrGroup === 'ranil') return getSymbolById('gas-cylinder');
      if (partyOrGroup === 'mjp' || partyOrGroup === 'dilith') return getSymbolById('brass-lamp');
    }

    if (partyOrGroup.startsWith('ind-') || partyOrGroup.startsWith('ind')) {
      const indNum = parseInt(partyOrGroup.replace(/\\D/g, ''), 10) || 1;
      const indSymbolId = independentScheduleBSymbols[(indNum - 1) % independentScheduleBSymbols.length] || 'anchor';
      return getSymbolById(indSymbolId);
    }

    if (partyMap[partyOrGroup]) {
      return getSymbolById(partyMap[partyOrGroup]);
    }

    const direct = getSymbolById(partyOrGroup);
    if (direct) return direct;
  }

  if (partyMap[lowerQ]) {
    return getSymbolById(partyMap[lowerQ]);
  }

  return getSymbolById(lowerQ);
}

export const getSymbolByElection = resolveElectionSymbol;

export function getElectionTag(symbolId, options = {}) {
  const { year = '2024', type = 'parl', district = 'national', party } = options;
  if (symbolId === 'compass') return '<lk-election-symbols-2025-pres-national-NPP>';
  if (symbolId === 'telephone') return '<lk-election-symbols-2024-pres-national-SJB>';
  if (symbolId === 'flower-bud') return '<lk-election-symbols-2024-pres-national-SLPP>';
  if (symbolId === 'elephant') return '<lk-election-symbols-2024-parl-national-UNP>';
  if (symbolId === 'gas-cylinder') return '<lk-election-symbols-2024-pres-national-IND16>';
  if (symbolId === 'house') return '<lk-election-symbols-2024-parl-national-ITAK>';
  const partyCode = party || symbolId.toUpperCase();
  return \`<lk-election-symbols-\${year}-\${type}-\${district}-\${partyCode}>\`;
}

// Web Component Custom Element support (<lk-election-symbols-2025-pres-national-NPP>)
export function registerElectionSymbolsWebComponents() {
  if (typeof window === 'undefined' || typeof customElements === 'undefined' || typeof HTMLElement === 'undefined') return;

  class LkElectionSymbolElement extends HTMLElement {
    connectedCallback() {
      this.render();
    }
    static get observedAttributes() {
      return ['name', 'size', 'color', 'fill', 'class'];
    }
    attributeChangedCallback() {
      this.render();
    }
    render() {
      const tagName = this.tagName.toLowerCase();
      const nameAttr = this.getAttribute('name');
      const query = nameAttr || tagName;
      const symbol = resolveElectionSymbol(query);
      if (!symbol) return;
      const size = this.getAttribute('size') || this.getAttribute('width') || 512;
      const color = this.getAttribute('color') || this.getAttribute('fill') || 'currentColor';
      const className = this.getAttribute('class') || '';
      this.innerHTML = getSymbolSvg(symbol.id, { size, color, className });
    }
  }

  if (!customElements.get('lk-election-symbol')) {
    try {
      customElements.define('lk-election-symbol', LkElectionSymbolElement);
    } catch (e) {}
  }

  Object.keys(electionMap).forEach(key => {
    const customTagName = 'lk-election-symbols-' + key.toLowerCase();
    if (!customElements.get(customTagName)) {
      try {
        customElements.define(customTagName, class extends LkElectionSymbolElement {});
      } catch (e) {}
    }
  });

  try {
    const observer = new MutationObserver(() => {
      document.querySelectorAll('*').forEach(el => {
        const tag = el.tagName.toLowerCase();
        if (tag.startsWith('lk-election-symbols-') && !customElements.get(tag)) {
          try {
            customElements.define(tag, class extends LkElectionSymbolElement {});
          } catch (e) {}
        }
      });
    });
    if (document.documentElement) {
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
  } catch (e) {}
}

if (typeof window !== 'undefined') {
  try {
    registerElectionSymbolsWebComponents();
  } catch (e) {}
}

// Standalone raw SVG strings
${svgExports.join('\n')}

// React Components
${reactComponents.join('\n')}

// React components dictionary for dynamic lookup
export const reactComponentsMap = {
${compMapEntries.join(',\n')}
};

// React ElectionSymbol component accepting election syntax tag
export const ElectionSymbol = function (props) {
  const { name, election, ...restProps } = props || {};
  const query = name || election;
  const symbol = resolveElectionSymbol(query);
  if (!symbol) return null;
  const Comp = reactComponentsMap[symbol.id];
  if (Comp) {
    const React = _React || (typeof window !== 'undefined' && window.React);
    if (React) return React.createElement(Comp, restProps);
  }
  return null;
};
`;

fs.writeFileSync(path.join(distDir, 'index.mjs'), esmContent, 'utf-8');
fs.writeFileSync(path.join(distElectionSymbolsDir, 'index.mjs'), "export * from '../index.mjs';\n", 'utf-8');

// CJS index.js
const cjsContent = `
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

let React;
try {
  React = require("react");
} catch (e) {
  // React not present in environment
}

function createIcon(id, name, innerSvg) {
  const Icon = function (props) {
    if (!React) {
      try {
        React = require("react");
      } catch (e) {}
    }
    if (!React) {
      throw new Error('[lk-election-symbols] React is not installed. Please install react or use getSymbolSvg() for raw SVG.');
    }
    const {
      size = 24,
      color = 'currentColor',
      className = '',
      style = {},
      title = name,
      ...restProps
    } = props || {};

    const inner = innerSvg || (typeof rawSvgMap !== 'undefined' && rawSvgMap[id]) || '';
    const svgProps = {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 512 512',
      width: size,
      height: size,
      fill: color,
      className: ['lk-election-symbol', 'lk-symbol-' + id, className].filter(Boolean).join(' '),
      style: { display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style },
      'aria-hidden': !title ? 'true' : undefined,
      role: title ? 'img' : 'presentation',
      dangerouslySetInnerHTML: { __html: inner },
      ...restProps
    };

    return React.createElement('svg', svgProps);
  };

  if (React && React.forwardRef) {
    const Forwarded = React.forwardRef(function (props, ref) {
      const {
        size = 24,
        color = 'currentColor',
        className = '',
        style = {},
        title = name,
        ...restProps
      } = props || {};

      const inner = innerSvg || (typeof rawSvgMap !== 'undefined' && rawSvgMap[id]) || '';
      return React.createElement('svg', {
        ref,
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 512 512',
        width: size,
        height: size,
        fill: color,
        className: ['lk-election-symbol', 'lk-symbol-' + id, className].filter(Boolean).join(' '),
        style: { display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style },
        'aria-hidden': !title ? 'true' : undefined,
        role: title ? 'img' : 'presentation',
        dangerouslySetInnerHTML: { __html: inner },
        ...restProps
      });
    });
    Forwarded.displayName = name.replace(/\\s+/g, '') + 'Icon';
    Forwarded.symbolId = id;
    return Forwarded;
  }

  Icon.displayName = name.replace(/\\s+/g, '') + 'Icon';
  Icon.symbolId = id;
  return Icon;
}

const electionSymbols = ${JSON.stringify(metadata, null, 2)};
exports.electionSymbols = electionSymbols;

function getSymbolById(id) {
  return electionSymbols.find(s => s.id === id);
}
exports.getSymbolById = getSymbolById;

function searchSymbols(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return electionSymbols;
  return electionSymbols.filter(s => 
    s.name.toLowerCase().includes(q) ||
    (s.nameSi && s.nameSi.includes(q)) ||
    (s.nameTa && s.nameTa.includes(q)) ||
    (s.tags && s.tags.some(t => t.toLowerCase().includes(q))) ||
    (s.parties && s.parties.some(p => p.toLowerCase().includes(q)))
  );
}
exports.searchSymbols = searchSymbols;

const rawSvgMap = {
${metadata.map(m => {
  const svgFile = path.join(svgDir, `${m.id}.svg`);
  const rawSvg = fs.existsSync(svgFile) ? fs.readFileSync(svgFile, 'utf-8') : '';
  const innerMatch = rawSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  let innerSvg = innerMatch ? innerMatch[1].trim() : '';
  innerSvg = innerSvg.replace(/<style>[\s\S]*?<\/style>/g, '').trim();
  return `  '${m.id}': \`${innerSvg.replace(/`/g, '\\`')}\``;
}).join(',\n')}
};
exports.rawSvgMap = rawSvgMap;

function getSymbolSvg(id, options = {}) {
  const {
    size = 512,
    color = 'currentColor',
    className = '',
    style = ''
  } = options;
  const symbol = electionSymbols.find(s => s.id === id);
  if (!symbol) return '';
  const inner = rawSvgMap[id] || '';
  const classAttr = ['lk-election-symbol', 'lk-symbol-' + id, className].filter(Boolean).join(' ');
  const styleAttr = style ? \` style="\${style}"\` : '';
  return \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="\${size}" height="\${size}" fill="\${color}" class="\${classAttr}"\${styleAttr}>\${inner}</svg>\`;
}
exports.getSymbolSvg = getSymbolSvg;

// =========================================================================
// Election Context Syntax & Web Components (CJS)
// =========================================================================
const electionMap = ${JSON.stringify(electionsData.aliases || {}, null, 2)};
exports.electionMap = electionMap;

const partyMap = ${JSON.stringify(electionsData.partyMap || {}, null, 2)};
exports.partyMap = partyMap;

const independentScheduleBSymbols = ${JSON.stringify(electionsData.independentScheduleBSymbols || [], null, 2)};

function resolveElectionSymbol(query) {
  if (!query) return undefined;
  let q = '';
  if (typeof query === 'object' && query !== null) {
    const y = query.year || '2024';
    const t = query.type || 'parl';
    const d = query.district || query.scope || 'national';
    const p = query.party || query.group || query.candidate || '';
    q = \`\${y}-\${t}-\${d}-\${p}\`;
  } else {
    q = String(query).trim();
  }

  q = q.replace(/^<+/, '').replace(/>+$/, '').trim();
  q = q.replace(/^lk-election-symbols-?/i, '').replace(/^lk-election-?/i, '');
  const lowerQ = q.toLowerCase();

  if (electionMap[lowerQ]) {
    return getSymbolById(electionMap[lowerQ]);
  }

  const parts = lowerQ.split('-');
  if (parts.length >= 4) {
    const year = parts[0];
    const electionType = parts[1];
    const district = parts[2];
    const partyOrGroup = parts.slice(3).join('-');

    if ((year === '2024' || year === '2025') && electionType === 'pres') {
      if (partyOrGroup === 'npp' || partyOrGroup === 'jvp' || partyOrGroup === 'anura') return getSymbolById('compass');
      if (partyOrGroup === 'sjb' || partyOrGroup === 'sajith') return getSymbolById('telephone');
      if (partyOrGroup === 'slpp' || partyOrGroup === 'namal') return getSymbolById('flower-bud');
      if (partyOrGroup === 'ind16' || partyOrGroup === 'ind-16' || partyOrGroup === 'gas-cylinder' || partyOrGroup === 'ranil') return getSymbolById('gas-cylinder');
      if (partyOrGroup === 'mjp' || partyOrGroup === 'dilith') return getSymbolById('brass-lamp');
    }

    if (partyOrGroup.startsWith('ind-') || partyOrGroup.startsWith('ind')) {
      const indNum = parseInt(partyOrGroup.replace(/\\D/g, ''), 10) || 1;
      const indSymbolId = independentScheduleBSymbols[(indNum - 1) % independentScheduleBSymbols.length] || 'anchor';
      return getSymbolById(indSymbolId);
    }

    if (partyMap[partyOrGroup]) {
      return getSymbolById(partyMap[partyOrGroup]);
    }

    const direct = getSymbolById(partyOrGroup);
    if (direct) return direct;
  }

  if (partyMap[lowerQ]) {
    return getSymbolById(partyMap[lowerQ]);
  }

  return getSymbolById(lowerQ);
}
exports.resolveElectionSymbol = resolveElectionSymbol;
exports.getSymbolByElection = resolveElectionSymbol;

function getElectionTag(symbolId, options = {}) {
  const { year = '2024', type = 'parl', district = 'national', party } = options;
  if (symbolId === 'compass') return '<lk-election-symbols-2025-pres-national-NPP>';
  if (symbolId === 'telephone') return '<lk-election-symbols-2024-pres-national-SJB>';
  if (symbolId === 'flower-bud') return '<lk-election-symbols-2024-pres-national-SLPP>';
  if (symbolId === 'elephant') return '<lk-election-symbols-2024-parl-national-UNP>';
  if (symbolId === 'gas-cylinder') return '<lk-election-symbols-2024-pres-national-IND16>';
  if (symbolId === 'house') return '<lk-election-symbols-2024-parl-national-ITAK>';
  const partyCode = party || symbolId.toUpperCase();
  return \`<lk-election-symbols-\${year}-\${type}-\${district}-\${partyCode}>\`;
}
exports.getElectionTag = getElectionTag;

${metadata.map(item => {
  const compName = item.componentName;
  const camelId = item.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  const svgConstName = `${camelId}Svg`;
  return `
exports.${svgConstName} = getSymbolSvg('${item.id}');
exports.${compName} = createIcon('${item.id}', '${item.name}');
`;
}).join('')}

const reactComponentsMap = {
${compMapEntries.map(e => e.replace(/'([a-z0-9\-]+)':\s*([A-Za-z0-9]+)/, "'$1': exports.$2")).join(',\n')}
};
exports.reactComponentsMap = reactComponentsMap;

const ElectionSymbol = function (props) {
  if (!React) {
    try { React = require("react"); } catch (e) {}
  }
  const { name, election, ...restProps } = props || {};
  const query = name || election;
  const symbol = resolveElectionSymbol(query);
  if (!symbol) return null;
  const Comp = reactComponentsMap[symbol.id];
  if (Comp && React) {
    return React.createElement(Comp, restProps);
  }
  return null;
};
exports.ElectionSymbol = ElectionSymbol;

function registerElectionSymbolsWebComponents() {
  if (typeof window === 'undefined' || typeof customElements === 'undefined' || typeof HTMLElement === 'undefined') return;

  class LkElectionSymbolElement extends HTMLElement {
    connectedCallback() {
      this.render();
    }
    static get observedAttributes() {
      return ['name', 'size', 'color', 'fill', 'class'];
    }
    attributeChangedCallback() {
      this.render();
    }
    render() {
      const tagName = this.tagName.toLowerCase();
      const nameAttr = this.getAttribute('name');
      const query = nameAttr || tagName;
      const symbol = resolveElectionSymbol(query);
      if (!symbol) return;
      const size = this.getAttribute('size') || this.getAttribute('width') || 512;
      const color = this.getAttribute('color') || this.getAttribute('fill') || 'currentColor';
      const className = this.getAttribute('class') || '';
      this.innerHTML = getSymbolSvg(symbol.id, { size, color, className });
    }
  }

  if (!customElements.get('lk-election-symbol')) {
    try {
      customElements.define('lk-election-symbol', LkElectionSymbolElement);
    } catch (e) {}
  }

  Object.keys(electionMap).forEach(key => {
    const customTagName = 'lk-election-symbols-' + key.toLowerCase();
    if (!customElements.get(customTagName)) {
      try {
        customElements.define(customTagName, class extends LkElectionSymbolElement {});
      } catch (e) {}
    }
  });

  try {
    const observer = new MutationObserver(() => {
      document.querySelectorAll('*').forEach(el => {
        const tag = el.tagName.toLowerCase();
        if (tag.startsWith('lk-election-symbols-') && !customElements.get(tag)) {
          try {
            customElements.define(tag, class extends LkElectionSymbolElement {});
          } catch (e) {}
        }
      });
    });
    if (document.documentElement) {
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
  } catch (e) {}
}
exports.registerElectionSymbolsWebComponents = registerElectionSymbolsWebComponents;

if (typeof window !== 'undefined') {
  try {
    registerElectionSymbolsWebComponents();
  } catch (e) {}
}
`;

fs.writeFileSync(path.join(distDir, 'index.js'), cjsContent, 'utf-8');
fs.writeFileSync(path.join(distElectionSymbolsDir, 'index.js'), "module.exports = require('../index.js');\n", 'utf-8');

// TypeScript Definitions dist/index.d.ts
const dtsContent = `
import * as React from 'react';

export interface ElectionSymbolMetadata {
  id: string;
  name: string;
  nameSi: string;
  nameTa: string;
  componentName: string;
  schedule: 'A' | 'B';
  category: string;
  parties: string[];
  primaryElectionTag?: string;
  electionAliases?: string[];
  tags: string[];
  isPopular: boolean;
}

export interface ElectionSymbolIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

export interface GetSymbolSvgOptions {
  size?: number | string;
  color?: string;
  className?: string;
  style?: string;
}

export declare const electionSymbols: ElectionSymbolMetadata[];
export declare function getSymbolById(id: string): ElectionSymbolMetadata | undefined;
export declare function searchSymbols(query: string): ElectionSymbolMetadata[];
export declare function getSymbolSvg(id: string, options?: GetSymbolSvgOptions): string;
export declare const rawSvgMap: Record<string, string>;

// Election Context Syntax & Web Components
export declare const electionMap: Record<string, string>;
export declare const partyMap: Record<string, string>;
export declare function resolveElectionSymbol(query: string | { year?: string | number; type?: string; district?: string; party?: string }): ElectionSymbolMetadata | undefined;
export declare const getSymbolByElection: typeof resolveElectionSymbol;
export declare function getElectionTag(symbolId: string, options?: { year?: string | number; type?: string; district?: string; party?: string }): string;

export interface ElectionSymbolProps extends ElectionSymbolIconProps {
  name?: string;
  election?: string;
}

export declare const ElectionSymbol: React.FC<ElectionSymbolProps>;
export declare function registerElectionSymbolsWebComponents(): void;

// Standalone SVG strings
${svgDeclarations.join('\n')}

// React Components (Heroicons / Lucide style)
${reactDeclarations.join('\n')}
`;

fs.writeFileSync(path.join(distDir, 'index.d.ts'), dtsContent, 'utf-8');
fs.writeFileSync(path.join(distElectionSymbolsDir, 'index.d.ts'), "export * from '../index';\n", 'utf-8');

console.log('Build complete! Generated dist/index.*, dist/election-symbols/index.*, and dist/svg/*.svg');
