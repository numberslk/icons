/**
 * Sri Lanka Election Symbols - Election Context Syntax Resolver & Web Components
 * 
 * Supports queries like:
 * - "<lk-election-symbols-2025-pres-national-NPP>"
 * - "lk-election-symbols-2025-pres-national-NPP"
 * - "2024-pres-national-SJB"
 * - "2024-parl-colombo-NPP"
 * - "2024-pres-national-ind-16"
 * - "{ year: '2025', type: 'pres', district: 'national', party: 'NPP' }"
 */

const electionsData = require('./elections.json');

const partyMap = electionsData.partyMap || {};
const aliases = electionsData.aliases || {};
const independentScheduleBSymbols = electionsData.independentScheduleBSymbols || [];

/**
 * Resolves an election syntax string or object to an official election symbol ID.
 * @param {string|object} query - e.g. "<lk-election-symbols-2025-pres-national-NPP>"
 * @returns {string|null} The resolved symbol ID (e.g. "compass") or null
 */
function resolveElectionSymbolId(query) {
  if (!query) return null;

  let q = '';
  if (typeof query === 'object' && query !== null) {
    const y = query.year || '2024';
    const t = query.type || 'parl';
    const d = query.district || query.scope || 'national';
    const p = query.party || query.group || query.candidate || '';
    q = `${y}-${t}-${d}-${p}`;
  } else {
    q = String(query).trim();
  }

  // Strip leading/trailing XML/HTML braces <...>
  q = q.replace(/^<+/, '').replace(/>+$/, '').trim();

  // Strip standard prefixes
  q = q.replace(/^lk-election-symbols-?/i, '').replace(/^lk-election-?/i, '');

  const lowerQ = q.toLowerCase();

  // 1. Direct match in registered aliases
  if (aliases[lowerQ]) {
    return aliases[lowerQ];
  }

  // 2. Parse structured tokens: [year]-[type]-[district]-[party_or_group]
  const parts = lowerQ.split('-');
  if (parts.length >= 4) {
    const year = parts[0];
    const electionType = parts[1];
    const district = parts[2];
    const partyOrGroup = parts.slice(3).join('-');

    // Specific presidential overrides
    if ((year === '2024' || year === '2025') && electionType === 'pres') {
      if (partyOrGroup === 'npp' || partyOrGroup === 'jvp' || partyOrGroup === 'anura') return 'compass';
      if (partyOrGroup === 'sjb' || partyOrGroup === 'sajith') return 'telephone';
      if (partyOrGroup === 'slpp' || partyOrGroup === 'namal') return 'flower-bud';
      if (partyOrGroup === 'ind16' || partyOrGroup === 'ind-16' || partyOrGroup === 'gas-cylinder' || partyOrGroup === 'ranil') return 'gas-cylinder';
      if (partyOrGroup === 'mjp' || partyOrGroup === 'dilith') return 'brass-lamp';
    }

    // Independent group identifier (e.g. ind-1, ind-2)
    if (partyOrGroup.startsWith('ind-') || partyOrGroup.startsWith('ind')) {
      const indNum = parseInt(partyOrGroup.replace(/\D/g, ''), 10) || 1;
      const indSymbol = independentScheduleBSymbols[(indNum - 1) % independentScheduleBSymbols.length];
      return indSymbol || 'anchor';
    }

    // Check party abbreviation
    if (partyMap[partyOrGroup]) {
      return partyMap[partyOrGroup];
    }

    // Check direct symbol ID
    return partyOrGroup;
  }

  // 3. Direct party acronym match (e.g. "npp" -> "compass")
  if (partyMap[lowerQ]) {
    return partyMap[lowerQ];
  }

  return lowerQ;
}

/**
 * Resolves election syntax query to full symbol metadata and SVG.
 * @param {string|object} query - e.g. "<lk-election-symbols-2025-pres-national-NPP>"
 * @param {Array} symbolsCatalog - array of symbols
 * @returns {object|null}
 */
function resolveElectionSymbol(query, symbolsCatalog) {
  const symbolId = resolveElectionSymbolId(query);
  if (!symbolId) return null;

  if (Array.isArray(symbolsCatalog)) {
    const found = symbolsCatalog.find(s => s.id === symbolId);
    if (found) return found;
  }

  return { id: symbolId };
}

/**
 * Generate primary canonical election tag for a symbol
 * @param {string} symbolId
 * @param {object} options
 */
function getElectionTag(symbolId, options = {}) {
  const {
    year = '2024',
    type = 'parl',
    district = 'national',
    party
  } = options;

  if (symbolId === 'compass') return '<lk-election-symbols-2025-pres-national-NPP>';
  if (symbolId === 'telephone') return '<lk-election-symbols-2024-pres-national-SJB>';
  if (symbolId === 'flower-bud') return '<lk-election-symbols-2024-pres-national-SLPP>';
  if (symbolId === 'elephant') return '<lk-election-symbols-2024-parl-national-UNP>';
  if (symbolId === 'gas-cylinder') return '<lk-election-symbols-2024-pres-national-IND16>';
  if (symbolId === 'house') return '<lk-election-symbols-2024-parl-national-ITAK>';

  const partyCode = party || symbolId.toUpperCase();
  return `<lk-election-symbols-${year}-${type}-${district}-${partyCode}>`;
}

module.exports = {
  electionMap: aliases,
  partyMap,
  districts: electionsData.districts,
  resolveElectionSymbolId,
  resolveElectionSymbol,
  getSymbolByElection: resolveElectionSymbol,
  getElectionTag
};
