const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const buildDir = path.join(rootDir, 'build');
const docsDir = path.join(rootDir, 'docs');

// Ensure docs directory exists
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const version = (pkg.version || Date.now().toString()).replace(/[^0-9A-Za-z_.-]/g, '');
const fonts = ['fukiai.woff', 'fukiai.ttf'];

console.log('🪄 Syncing docs preview assets...');
fonts.forEach((file) => {
  const src = path.join(buildDir, file);
  const dest = path.join(docsDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    const size = (fs.statSync(dest).size / 1024).toFixed(1);
    console.log(`✅ Copied ${file} → docs/ (${size}KB)`);
    // Also copy versioned filenames for cache busting
    const ext = path.extname(file);
    const base = path.basename(file, ext);
    const vname = `${base}.v${version}${ext}`;
    const vdest = path.join(docsDir, vname);
    fs.copyFileSync(src, vdest);
    console.log(`✅ Copied ${file} → docs/${vname}`);
  } else {
    console.warn(`⚠️  Missing build artifact: ${file} (skip docs copy)`);
  }
});

console.log('📑 Docs assets sync complete.');
