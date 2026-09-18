#!/usr/bin/env node
/**
 * save_election_map.js
 * 
 * Validates, formats, and saves election configuration to `src/elections.json`,
 * then triggers package build and showcase data regeneration.
 * 
 * Usage:
 *   node scripts/save_election_map.js
 *   node scripts/save_election_map.js path/to/downloaded_elections.json
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetPath = path.join(__dirname, '..', 'src', 'elections.json');

const args = process.argv.slice(2);
let sourcePath = targetPath;

if (args.length > 0 && args[0]) {
  sourcePath = path.resolve(process.cwd(), args[0]);
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Source file not found: ${sourcePath}`);
    process.exit(1);
  }
}

try {
  console.log(`📖 Reading election configuration from: ${sourcePath}`);
  const rawData = fs.readFileSync(sourcePath, 'utf-8');
  const parsed = JSON.parse(rawData);

  if (!parsed.aliases || typeof parsed.aliases !== 'object') {
    throw new Error('Missing or invalid "aliases" object in election configuration.');
  }
  if (!parsed.partyMap || typeof parsed.partyMap !== 'object') {
    throw new Error('Missing or invalid "partyMap" object in election configuration.');
  }

  // Format and save to src/elections.json
  const formatted = JSON.stringify(parsed, null, 2) + '\n';
  fs.writeFileSync(targetPath, formatted, 'utf-8');
  console.log(`✅ Successfully validated and saved to: ${targetPath}`);
  console.log(`   - Context Aliases: ${Object.keys(parsed.aliases).length}`);
  console.log(`   - Recognized Parties: ${Object.keys(parsed.partyMap).length}`);

  // Re-run build pipeline
  console.log('🔄 Re-building metadata, package bundles, and showcase data...');
  execSync('npm run metadata', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  console.log('🎉 Election configuration is synchronized and live!');

} catch (err) {
  console.error('❌ Error saving election map:', err.message);
  process.exit(1);
}
