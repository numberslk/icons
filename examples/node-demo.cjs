/**
 * Node.js (CommonJS) Example for @numberslk/icons
 * Run directly with: node examples/node-demo.cjs
 */

// In an installed project you would do:
// const { getSymbolById, searchSymbols, getSymbolSvg, resolveElectionSymbol } = require('@numberslk/icons');
const {
  getSymbolById,
  searchSymbols,
  getSymbolSvg,
  resolveElectionSymbol,
  elephantSvg,
  electionSymbols
} = require('../dist/index.js');

console.log('--- @numberslk/icons Node.js Demonstration ---');
console.log(`Total symbols available: ${electionSymbols.length}\n`);

// 1. Metadata Lookup
const elephant = getSymbolById('elephant');
console.log('1. Metadata Lookup for "elephant":');
console.log(`   Name (EN): ${elephant.name}`);
console.log(`   Name (SI): ${elephant.nameSi}`);
console.log(`   Name (TA): ${elephant.nameTa}`);
console.log(`   Schedule:  ${elephant.schedule}`);
console.log(`   Parties:   ${elephant.parties.join(', ')}\n`);

// 2. Multilingual Search
console.log('2. Search Results:');
console.log('   Search "NPP":', searchSymbols('NPP').map(s => `${s.name} (${s.id})`));
console.log('   Search Sinhala "දුරකථනය":', searchSymbols('දුරකථනය').map(s => `${s.name} (${s.id})`));
console.log('   Search Tamil "யானை":', searchSymbols('யானை').map(s => `${s.name} (${s.id})`));
console.log();

// 3. Election Context Resolver
const resolved = resolveElectionSymbol('2024-pres-national-NPP');
console.log('3. Election Query "2024-pres-national-NPP" resolved to:');
console.log(`   ID: ${resolved.id} (${resolved.name})\n`);

// 4. SVG Generator
const customSvg = getSymbolSvg('compass', {
  size: 64,
  color: '#e11d48',
  className: 'custom-compass-icon'
});
console.log('4. Dynamically Generated SVG String (compass, 64px, #e11d48):');
console.log(`   ${customSvg.slice(0, 140)}...\n`);

console.log('✓ All Node.js functions executed successfully!');
