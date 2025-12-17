const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const buildDir = path.join(rootDir, 'build');
const docsDir = path.join(rootDir, 'docs');

// Ensure docs directory exists
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const fonts = ['fukiai.woff', 'fukiai.ttf'];

console.log('🪄 Syncing docs preview assets...');
fonts.forEach((file) => {
  const src = path.join(buildDir, file);
  const dest = path.join(docsDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    const size = (fs.statSync(dest).size / 1024).toFixed(1);
    console.log(`✅ Copied ${file} → docs/ (${size}KB)`);
  } else {
    console.warn(`⚠️  Missing build artifact: ${file} (skip docs copy)`);
  }
});

console.log('📑 Docs assets sync complete.');
