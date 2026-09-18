const fs = require('fs');
const path = require('path');

const metadata = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'metadata.json'), 'utf-8'));
const svgDir = path.join(__dirname, '..', 'src', 'icons');
const showcaseDir = path.join(__dirname, '..', 'showcase');

fs.mkdirSync(showcaseDir, { recursive: true });

const symbolsWithSvg = metadata.map(item => {
  const svgPath = path.join(svgDir, `${item.id}.svg`);
  let svgContent = '';
  if (fs.existsSync(svgPath)) {
    svgContent = fs.readFileSync(svgPath, 'utf-8');
  }
  return {
    ...item,
    svg: svgContent
  };
});

const electionsPath = path.join(__dirname, '..', 'src', 'elections.json');
const electionsData = fs.existsSync(electionsPath)
  ? JSON.parse(fs.readFileSync(electionsPath, 'utf-8'))
  : { partyMap: {}, aliases: {}, independentScheduleBSymbols: [] };

const fileContent = `// Auto-generated symbols dataset and election context resolver for showcase
window.LK_ELECTION_SYMBOLS = ${JSON.stringify(symbolsWithSvg, null, 2)};
window.LK_FACTORY_ELECTION_ALIASES = ${JSON.stringify(electionsData.aliases || {}, null, 2)};
window.LK_FACTORY_ELECTION_PARTY_MAP = ${JSON.stringify(electionsData.partyMap || {}, null, 2)};
window.LK_ELECTION_DISTRICTS = ${JSON.stringify(electionsData.districts || [], null, 2)};
window.LK_ELECTION_INDEPENDENT_SYMBOLS = ${JSON.stringify(electionsData.independentScheduleBSymbols || [], null, 2)};

window.LK_ELECTION_ALIASES = Object.assign({}, window.LK_FACTORY_ELECTION_ALIASES);
window.LK_ELECTION_PARTY_MAP = Object.assign({}, window.LK_FACTORY_ELECTION_PARTY_MAP);

// Overlay custom overrides from localStorage if present
if (typeof localStorage !== 'undefined') {
  try {
    const customConfig = JSON.parse(localStorage.getItem('lk_election_config_custom'));
    if (customConfig && customConfig.aliases) {
      Object.assign(window.LK_ELECTION_ALIASES, customConfig.aliases);
    }
    if (customConfig && customConfig.partyMap) {
      Object.assign(window.LK_ELECTION_PARTY_MAP, customConfig.partyMap);
    }
  } catch (e) {}
}

/**
 * Resolves election syntax e.g. "<lk-election-symbols-2025-pres-national-NPP>"
 */
window.resolveElectionSymbol = function(query) {
  if (!query) return null;
  let q = '';
  if (typeof query === 'object' && query !== null) {
    const y = query.year || '2024';
    const t = query.type || 'parl';
    const d = query.district || query.scope || 'national';
    const p = query.party || query.group || query.candidate || '';
    q = y + '-' + t + '-' + d + '-' + p;
  } else {
    q = String(query).trim();
  }

  q = q.replace(/^<+/, '').replace(/>+$/, '').trim();
  q = q.replace(/^lk-election-symbols-?/i, '').replace(/^lk-election-?/i, '');
  const lowerQ = q.toLowerCase();

  const aliases = window.LK_ELECTION_ALIASES || {};
  const partyMap = window.LK_ELECTION_PARTY_MAP || {};
  const indSymbols = window.LK_ELECTION_INDEPENDENT_SYMBOLS || [];

  if (aliases[lowerQ]) {
    return window.LK_ELECTION_SYMBOLS.find(s => s.id === aliases[lowerQ]);
  }

  const parts = lowerQ.split('-');
  if (parts.length >= 4) {
    const year = parts[0];
    const electionType = parts[1];
    const district = parts[2];
    const partyOrGroup = parts.slice(3).join('-');

    if ((year === '2024' || year === '2025') && electionType === 'pres') {
      if (partyOrGroup === 'npp' || partyOrGroup === 'jvp' || partyOrGroup === 'anura') {
        return window.LK_ELECTION_SYMBOLS.find(s => s.id === 'compass');
      }
      if (partyOrGroup === 'sjb' || partyOrGroup === 'sajith') {
        return window.LK_ELECTION_SYMBOLS.find(s => s.id === 'telephone');
      }
      if (partyOrGroup === 'slpp' || partyOrGroup === 'namal') {
        return window.LK_ELECTION_SYMBOLS.find(s => s.id === 'flower-bud');
      }
      if (partyOrGroup === 'ind16' || partyOrGroup === 'ind-16' || partyOrGroup === 'gas-cylinder' || partyOrGroup === 'ranil') {
        return window.LK_ELECTION_SYMBOLS.find(s => s.id === 'gas-cylinder');
      }
      if (partyOrGroup === 'mjp' || partyOrGroup === 'dilith') {
        return window.LK_ELECTION_SYMBOLS.find(s => s.id === 'brass-lamp');
      }
    }

    if (partyOrGroup.startsWith('ind-') || partyOrGroup.startsWith('ind')) {
      const indNum = parseInt(partyOrGroup.replace(/\\D/g, ''), 10) || 1;
      const indSymbolId = indSymbols[(indNum - 1) % indSymbols.length] || 'anchor';
      return window.LK_ELECTION_SYMBOLS.find(s => s.id === indSymbolId);
    }

    if (partyMap[partyOrGroup]) {
      return window.LK_ELECTION_SYMBOLS.find(s => s.id === partyMap[partyOrGroup]);
    }

    const direct = window.LK_ELECTION_SYMBOLS.find(s => s.id === partyOrGroup);
    if (direct) return direct;
  }

  if (partyMap[lowerQ]) {
    return window.LK_ELECTION_SYMBOLS.find(s => s.id === partyMap[lowerQ]);
  }

  return window.LK_ELECTION_SYMBOLS.find(s => s.id === lowerQ);
};

// Web Component registration
(function registerWebComponents() {
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
      const symbol = window.resolveElectionSymbol ? window.resolveElectionSymbol(query) : null;
      if (!symbol || !symbol.svg) return;
      const size = this.getAttribute('size') || this.getAttribute('width') || 64;
      const color = this.getAttribute('color') || this.getAttribute('fill') || 'currentColor';
      const customSvg = symbol.svg
        .replace(/width="[^"]+"/, 'width="' + size + '"')
        .replace(/height="[^"]+"/, 'height="' + size + '"')
        .replace(/<svg/, '<svg style="width:' + size + 'px; height:' + size + 'px; display:inline-block; vertical-align:middle;"');
      this.innerHTML = customSvg;
    }
  }

  if (!customElements.get('lk-election-symbol')) {
    try {
      customElements.define('lk-election-symbol', LkElectionSymbolElement);
    } catch (e) {}
  }

  const aliases = window.LK_ELECTION_ALIASES || {};
  Object.keys(aliases).forEach(key => {
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
})();
`;

fs.writeFileSync(path.join(showcaseDir, 'symbols-data.js'), fileContent, 'utf-8');
console.log(`Generated showcase/symbols-data.js with ${symbolsWithSvg.length} symbols and election context resolver.`);

// Sync dist/png to showcase/png for static web hosting support (e.g. GitHub Pages)
const distPngDir = path.join(__dirname, '..', 'dist', 'png');
const showcasePngDir = path.join(showcaseDir, 'png');
if (fs.existsSync(distPngDir)) {
  fs.mkdirSync(showcasePngDir, { recursive: true });
  fs.readdirSync(distPngDir).filter(f => f.endsWith('.png')).forEach(f => {
    fs.copyFileSync(path.join(distPngDir, f), path.join(showcasePngDir, f));
  });
  console.log(`Synchronized ${symbolsWithSvg.length} PNG assets to showcase/png/`);
}
