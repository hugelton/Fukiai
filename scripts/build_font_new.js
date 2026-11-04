#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createReadStream, createWriteStream } = require('fs');
const { Readable } = require('stream');
const SVGIcons2SVGFontStream = require('svgicons2svgfont');
const svg2ttf = require('svg2ttf');
const ttf2woff = require('ttf2woff');

console.log('🚀 FUKIAI FONT BUILDER v2.0 - Complete Rebuild');
console.log('===============================================');

const rootDir = path.join(__dirname, '..');
const svgDir = path.join(rootDir, 'svg');
const buildDir = path.join(rootDir, 'build');
const glyphsPath = path.join(rootDir, 'glyphs.json');

// 1. 前準備
console.log('📁 Preparing directories...');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

if (!fs.existsSync(svgDir)) {
  console.error('❌ SVG directory not found!');
  process.exit(1);
}

if (!fs.existsSync(glyphsPath)) {
  console.error('❌ glyphs.json not found!');
  process.exit(1);
}

// 2. データ読み込み
console.log('📖 Loading glyph mappings...');
const glyphs = require(glyphsPath);
const glyphCount = Object.keys(glyphs).length;
console.log(`   Found ${glyphCount} glyph definitions`);

// 3. SVGファイル存在確認
console.log('🔍 Verifying SVG files...');
const missingSvgs = [];
const availableSvgs = [];

Object.keys(glyphs).forEach(iconName => {
  const svgPath = path.join(svgDir, `${iconName}.svg`);
  if (fs.existsSync(svgPath)) {
    availableSvgs.push(iconName);
  } else {
    missingSvgs.push(iconName);
  }
});

console.log(`   ✅ Available SVGs: ${availableSvgs.length}`);
if (missingSvgs.length > 0) {
  console.log(`   ⚠️  Missing SVGs: ${missingSvgs.length}`);
  missingSvgs.forEach(name => console.log(`      - ${name}.svg`));
}

// 4. フォントストリーム設定（新しい設定）
console.log('⚙️  Configuring font stream...');
const fontStream = new SVGIcons2SVGFontStream({
  fontName: 'Fukiai',
  fontHeight: 2048,
  normalize: true,
  centerHorizontally: true,
  fixedWidth: false,
  log: (message) => console.log(`   SVG2Font: ${message}`)
});

// 5. 出力パス
const svgFontPath = path.join(buildDir, 'fukiai.svg');
const ttfFontPath = path.join(buildDir, 'fukiai.ttf');
const woffFontPath = path.join(buildDir, 'fukiai.woff');

console.log('🔧 Setting up output stream...');
const outputStream = createWriteStream(svgFontPath);

// 6. 完了ハンドラ
outputStream.on('finish', () => {
  console.log('✅ SVG font generation completed!');
  
  try {
    // TTF変換
    console.log('🔄 Converting SVG → TTF...');
    const svgFontData = fs.readFileSync(svgFontPath, 'utf8');
    const ttfBuffer = svg2ttf(svgFontData, {});
    fs.writeFileSync(ttfFontPath, Buffer.from(ttfBuffer.buffer));
    console.log('✅ TTF conversion completed!');
    
    // WOFF変換
    console.log('🔄 Converting TTF → WOFF...');
    const ttfBuffer2 = fs.readFileSync(ttfFontPath);
    const woffBuffer = ttf2woff(ttfBuffer2);
    fs.writeFileSync(woffFontPath, Buffer.from(woffBuffer.buffer));
    console.log('✅ WOFF conversion completed!');
    
    // ファイルサイズ報告
    console.log('📊 Build Results:');
    console.log(`   SVG:  ${(fs.statSync(svgFontPath).size / 1024).toFixed(1)}KB`);
    console.log(`   TTF:  ${(fs.statSync(ttfFontPath).size / 1024).toFixed(1)}KB`);
    console.log(`   WOFF: ${(fs.statSync(woffFontPath).size / 1024).toFixed(1)}KB`);
    console.log(`   Glyphs: ${availableSvgs.length}/${glyphCount}`);
    
    console.log('🎉 FONT BUILD COMPLETED SUCCESSFULLY!');
    
  } catch (error) {
    console.error('❌ Font conversion failed:', error);
    process.exit(1);
  }
});

// 7. エラーハンドラ
fontStream.on('error', (error) => {
  console.error('❌ Font generation error:', error);
  process.exit(1);
});

// 8. ストリーム接続
fontStream.pipe(outputStream);

// 9. グリフ追加（新しいロジック）
console.log('📦 Adding glyphs to font...');
let processedCount = 0;

availableSvgs.forEach((iconName, index) => {
  const svgPath = path.join(svgDir, `${iconName}.svg`);
  const unicodeHex = glyphs[iconName];
  
  try {
    // The icon font is monochrome: the `background` layer (filled face, only for Tint / Multicolor) must not
    // reach the font, or every outlined glyph would turn into a solid shape.
    const svgText = fs.readFileSync(svgPath, 'utf8').replace(/<g id="background"[^>]*>[\s\S]*?<\/g>\s*/g, '');
    const glyph = Readable.from([svgText]);
    const unicodeChar = String.fromCodePoint(parseInt(unicodeHex, 16));
    
    glyph.metadata = {
      unicode: [unicodeChar],
      name: iconName
    };
    
    fontStream.write(glyph);
    processedCount++;
    
    // プログレス表示
    const progress = Math.round((processedCount / availableSvgs.length) * 100);
    if (processedCount % 20 === 0 || processedCount === availableSvgs.length) {
      console.log(`   Progress: ${processedCount}/${availableSvgs.length} (${progress}%)`);
    }
    
  } catch (error) {
    console.error(`   ❌ Error processing ${iconName}:`, error.message);
  }
});

// 10. ストリーム終了
fontStream.end();

console.log(`✨ Font stream processing started with ${processedCount} glyphs...`);