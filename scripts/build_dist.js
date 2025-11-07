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

if (fs.existsSync(jsPath)) {
  fs.copyFileSync(jsPath, jsDestPath);
  console.log('✅ Copied fukiai.js to dist/');
} else {
  console.error('❌ fukiai.js not found in src/');
}

// Create CSS file with embedded font
const cssContent = `@font-face {
  font-family: 'Fukiai';
  src: url('fukiai.woff') format('woff'),
       url('fukiai.ttf') format('truetype');
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