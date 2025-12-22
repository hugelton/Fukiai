#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const svgDir = path.join(rootDir, 'svg');
const glyphsPath = path.join(rootDir, 'glyphs.json');

if (!fs.existsSync(svgDir)) {
  console.error('❌ svg/ directory not found');
  process.exit(1);
}
if (!fs.existsSync(glyphsPath)) {
  console.error('❌ glyphs.json not found');
  process.exit(1);
}

const glyphs = JSON.parse(fs.readFileSync(glyphsPath, 'utf8'));

// Collect existing names and max codepoint
const existingNames = new Set(Object.keys(glyphs));
const existingCodes = Object.values(glyphs).map((h) => parseInt(h, 16));
const maxCode = existingCodes.length ? Math.max(...existingCodes) : 0xE9FF;

// Find svg basenames
const svgNames = fs
  .readdirSync(svgDir)
  .filter((f) => f.endsWith('.svg'))
  .map((f) => f.replace(/\.svg$/i, ''));

// Determine missing
const missing = svgNames.filter((name) => !existingNames.has(name)).sort();

if (missing.length === 0) {
  console.log('✅ No missing SVGs. glyphs.json is up to date.');
  process.exit(0);
}

console.log(`🔎 Found ${missing.length} missing SVGs to append`);

// Append sequential codes after current max, uppercase hex
let next = maxCode + 1;
for (const name of missing) {
  const hex = next.toString(16).toUpperCase();
  glyphs[name] = hex;
  console.log(`  + ${name} -> ${hex}`);
  next += 1;
}

// Write back, preserving insertion order by writing the same object
fs.writeFileSync(glyphsPath, JSON.stringify(glyphs, null, 2));

console.log('✅ Updated glyphs.json with appended mappings.');
console.log(
  `🔗 Unicode range now: ${Object.values(glyphs)[0]} - ${
    Object.values(glyphs)[Object.values(glyphs).length - 1]
  }`
);

