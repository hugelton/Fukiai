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

// Compatibility aliases (old name -> current name)
const aliasesPath = path.join(rootDir, 'aliases.json');
const aliases = fs.existsSync(aliasesPath) ? require(aliasesPath) : {};

Object.entries(aliases).forEach(([oldName, newName]) => {
  if (!glyphs[newName]) {
    console.error(`❌ Alias "${oldName}" points to unknown glyph "${newName}"`);
    process.exit(1);
  }
  if (glyphs[oldName]) {
    console.error(`❌ Alias "${oldName}" collides with an existing glyph`);
    process.exit(1);
  }
});

const aliasMapEntries = Object.entries(aliases)
  .map(([oldName, newName]) => `    "${oldName}": "${newName}"`)
  .join(',\n');

const newAliasMap = `  const ALIASES = {
${aliasMapEntries}
  };`;

// Replace the ICON_MAP and ALIASES in the JavaScript file
const iconMapRegex = /const ICON_MAP = {[\s\S]*?};/;
jsContent = jsContent.replace(iconMapRegex, newIconMap);
jsContent = jsContent.replace(/const ALIASES = {[\s\S]*?};/, newAliasMap);

// Write updated file
fs.writeFileSync(srcPath, jsContent);

console.log(`✅ Updated JavaScript library with ${Object.keys(glyphs).length} icons`);