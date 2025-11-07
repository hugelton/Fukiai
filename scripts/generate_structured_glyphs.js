const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const glyphsPath = path.join(rootDir, 'glyphs.json');
const outputPath = path.join(rootDir, 'glyphs_structured.json');

console.log('🔄 Generating glyphs_structured.json from glyphs.json...');

// Load glyphs.json
const glyphs = require(glyphsPath);

// Group glyphs by category (prefix before first underscore)
const structured = {};

Object.entries(glyphs).forEach(([name, code]) => {
  const category = name.split('_')[0];
  
  if (!structured[category]) {
    structured[category] = [];
  }
  
  structured[category].push({
    name: name,
    code: code
  });
});

// Sort categories and items within each category
const sortedStructured = {};
Object.keys(structured).sort().forEach(category => {
  sortedStructured[category] = structured[category].sort((a, b) => 
    a.name.localeCompare(b.name)
  );
});

// Write the structured JSON
fs.writeFileSync(outputPath, JSON.stringify(sortedStructured, null, 2));

console.log(`✅ Generated glyphs_structured.json with ${Object.keys(sortedStructured).length} categories`);