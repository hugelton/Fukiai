const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const glyphsPath = path.join(rootDir, 'glyphs.json');
const categoriesPath = path.join(rootDir, 'categories.json');
const outputPath = path.join(rootDir, 'glyphs_structured.json');

console.log('🔄 Generating glyphs_structured.json from glyphs.json + categories.json...');

const glyphs = require(glyphsPath);
const categories = require(categoriesPath);

// Display order of the top-level categories (anything new is appended alphabetically)
const ORDER = ['transport', 'arrow', 'action', 'ui', 'audio', 'function', 'wave', 'hardware', 'symbol'];

const meta = {};
categories.forEach(c => { meta[c.name] = c; });

const missing = Object.keys(glyphs).filter(name => !meta[name]);
if (missing.length) {
  console.error('❌ Glyphs without a category in categories.json: ' + missing.join(', '));
  process.exit(1);
}
const stale = categories.filter(c => !glyphs[c.name]).map(c => c.name);
if (stale.length) {
  console.error('❌ categories.json lists unknown glyphs: ' + stale.join(', '));
  process.exit(1);
}

const structured = {};
Object.entries(glyphs).forEach(([name, code]) => {
  const { category, group } = meta[name];
  if (!structured[category]) structured[category] = [];
  structured[category].push({ name, code, group });
});

const keys = Object.keys(structured).sort((a, b) => {
  const ia = ORDER.indexOf(a), ib = ORDER.indexOf(b);
  return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
});

const sorted = {};
keys.forEach(category => {
  sorted[category] = structured[category].sort((a, b) =>
    a.group.localeCompare(b.group) || a.name.localeCompare(b.name));
});

fs.writeFileSync(outputPath, JSON.stringify(sorted, null, 2));

console.log(`✅ Generated glyphs_structured.json with ${keys.length} categories`);
