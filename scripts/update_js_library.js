const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const glyphsPath = path.join(rootDir, 'glyphs.json');
const srcPath = path.join(rootDir, 'src', 'fukiai.js');

console.log('🔄 Updating JavaScript library with latest glyph mapping...');

// Read glyphs.json
const glyphs = require(glyphsPath);

// Read current JavaScript file
let jsContent = fs.readFileSync(srcPath, 'utf8');

// Generate new icon map
const iconMapEntries = Object.entries(glyphs)
  .map(([name, code]) => `    "${name}": "${code}"`)
  .join(',\n');

const newIconMap = `  const ICON_MAP = {
${iconMapEntries}
  };`;

// Replace the ICON_MAP in the JavaScript file
const iconMapRegex = /const ICON_MAP = {[\s\S]*?};/;
jsContent = jsContent.replace(iconMapRegex, newIconMap);

// Write updated file
fs.writeFileSync(srcPath, jsContent);

console.log(`✅ Updated JavaScript library with ${Object.keys(glyphs).length} icons`);