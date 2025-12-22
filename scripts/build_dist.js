const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const buildDir = path.join(rootDir, 'build');
const srcDir = path.join(rootDir, 'src');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('🛠 Building distribution files...');

// Keep JS icon map in sync with glyphs.json before packaging
try {
  require(path.join(__dirname, 'update_js_library.js'));
} catch (e) {
  console.warn('⚠️ Failed to update JS library mapping before dist:', e.message);
}

// Copy font files from build to dist
const fontFiles = ['fukiai.woff', 'fukiai.ttf', 'fukiai.svg'];

fontFiles.forEach(file => {
  const srcPath = path.join(buildDir, file);
  const destPath = path.join(distDir, file);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Copied ${file} to dist/`);
  } else {
    console.warn(`⚠️ Font file not found: ${file}`);
  }
});

// Copy JavaScript library
const jsPath = path.join(srcDir, 'fukiai.js');
const jsDestPath = path.join(distDir, 'fukiai.js');
const jsMinDestPath = path.join(distDir, 'fukiai.min.js');

if (fs.existsSync(jsPath)) {
  // Copy original
  fs.copyFileSync(jsPath, jsDestPath);
  console.log('✅ Copied fukiai.js to dist/');
  
  // Create minified version (simple minification)
  const jsContent = fs.readFileSync(jsPath, 'utf8');
  const minified = jsContent
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
    .replace(/\/\/.*$/gm, '') // Remove line comments
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/;\s*}/g, '}') // Remove semicolons before closing braces
    .trim();
  
  fs.writeFileSync(jsMinDestPath, minified);
  console.log('✅ Created fukiai.min.js in dist/');
} else {
  console.error('❌ fukiai.js not found in src/');
}

// Create CSS file with CDN font URLs
const cssContent = `@font-face {
  font-family: 'Fukiai';
  src: url('https://cdn.jsdelivr.net/npm/fukiai@latest/dist/fukiai.woff') format('woff'),
       url('https://cdn.jsdelivr.net/npm/fukiai@latest/dist/fukiai.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.fukiai {
  font-family: 'Fukiai', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  speak: none;
  display: inline-block;
}`;

fs.writeFileSync(path.join(distDir, 'fukiai.css'), cssContent);
console.log('✅ Created fukiai.css in dist/');

console.log('🎉 Distribution files built successfully!');
console.log('📦 Ready for npm publishing!');
