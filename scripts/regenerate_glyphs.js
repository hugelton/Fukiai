const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const svgDir = path.join(rootDir, 'svg');
const glyphsPath = path.join(rootDir, 'glyphs.json');

console.log('🔄 Regenerating glyphs.json from current SVG files...');

// Get all SVG files and sort them
const svgFiles = fs.readdirSync(svgDir)
  .filter(file => file.endsWith('.svg'))
  .map(file => file.replace('.svg', ''))
  .sort();

console.log(`📁 Found ${svgFiles.length} SVG files`);

// Generate new glyphs mapping starting from EA01
const glyphs = {};
let codePoint = 0xEA01;

svgFiles.forEach(fileName => {
  glyphs[fileName] = codePoint.toString(16).toUpperCase();
  codePoint++;
});

// Write to glyphs.json
fs.writeFileSync(glyphsPath, JSON.stringify(glyphs, null, 2));

console.log(`✅ Generated glyphs.json with ${Object.keys(glyphs).length} icons`);
console.log(`🔗 Unicode range: EA01 - ${(0xEA01 + svgFiles.length - 1).toString(16).toUpperCase()}`);