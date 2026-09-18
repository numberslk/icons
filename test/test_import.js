const assert = require('assert');
const icons = require('../dist/index.js');
const electionSymbols = require('../dist/election-symbols/index.js');

console.log('=== Testing @numberslk/icons Library Suite ===');

// 1. Symbol Counts
assert.strictEqual(icons.electionSymbols.length, 182, 'Root export must contain 182 symbols');
assert.strictEqual(electionSymbols.electionSymbols.length, 182, 'Subpath export must contain 182 symbols');
console.log('✓ Symbol counts match: 182 symbols');

// 2. Constants & Components
assert.strictEqual(typeof icons.elephantSvg, 'string', 'Elephant SVG constant must exist in root export');
assert.ok(icons.elephantSvg.startsWith('<svg'), 'Elephant SVG constant must be valid SVG markup');
assert.ok(
  typeof electionSymbols.ElephantIcon === 'object' || typeof electionSymbols.ElephantIcon === 'function',
  'ElephantIcon React component must exist in subpath export'
);
console.log('✓ SVG string constants and React components verified');

// 3. Lookup & Metadata
const elephantMeta = electionSymbols.getSymbolById('elephant');
assert.ok(elephantMeta, 'getSymbolById("elephant") must return metadata');
assert.strictEqual(elephantMeta.name, 'Elephant');
assert.strictEqual(elephantMeta.nameSi, 'අලියා');
console.log('✓ getSymbolById metadata lookup verified');

// 4. Multilingual & Acronym Search
const nppResults = electionSymbols.searchSymbols('NPP');
assert.ok(nppResults.some(s => s.id === 'compass'), 'Search "NPP" must return Compass');

const unpResults = electionSymbols.searchSymbols('UNP');
assert.ok(unpResults.some(s => s.id === 'elephant'), 'Search "UNP" must return Elephant');

const sinhalaResults = electionSymbols.searchSymbols('දුරකථනය');
assert.ok(sinhalaResults.some(s => s.id === 'telephone'), 'Search "දුරකථනය" must return Telephone');

const tamilResults = electionSymbols.searchSymbols('யானை');
assert.ok(tamilResults.some(s => s.id === 'elephant'), 'Search "யானை" must return Elephant');
console.log('✓ Multilingual (EN/SI/TA) and political acronym search verified');

// 5. SVG Generator Function
const svgString = electionSymbols.getSymbolSvg('compass', { size: 32, color: '#e11d48' });
assert.ok(svgString.includes('width="32"'), 'getSymbolSvg must apply width option');
assert.ok(svgString.includes('height="32"'), 'getSymbolSvg must apply height option');
assert.ok(svgString.includes('fill="#e11d48"'), 'getSymbolSvg must apply fill option');
assert.ok(svgString.includes('lk-symbol-compass'), 'getSymbolSvg must include class name');
console.log('✓ getSymbolSvg dynamic generator verified');

// 6. Election Context Resolver
if (typeof electionSymbols.resolveElectionSymbol === 'function') {
  const nppPres = electionSymbols.resolveElectionSymbol('<lk-election-symbols-2025-pres-national-NPP>');
  assert.ok(nppPres && nppPres.id === 'compass', 'Election resolver must map 2025 presidential NPP to compass');

  const sjbParl = electionSymbols.resolveElectionSymbol('2024-parl-national-SJB');
  assert.ok(sjbParl && sjbParl.id === 'telephone', 'Election resolver must map 2024 SJB to telephone');

  const unpParl = electionSymbols.resolveElectionSymbol('2024-parl-national-UNP');
  assert.ok(unpParl && unpParl.id === 'elephant', 'Election resolver must map 2024 UNP to elephant');
  console.log('✓ Election context syntax resolver verified');
}

console.log('\n🎉 All 6 test suites passed successfully for @numberslk/icons and subpath exports!');
