const fs = require('fs');
const path = require('path');
const { createReadStream, createWriteStream } = require('fs');
const SVGIcons2SVGFontStream = require('svgicons2svgfont');
const svg2ttf = require('svg2ttf');
const ttf2woff = require('ttf2woff');

// プロジェクトのルートディレクトリを取得
const rootDir = path.join(__dirname, '..');

// glyphs.jsonを読み込む
const glyphsPath = path.join(rootDir, 'glyphs.json');
const glyphs = require(glyphsPath);

console.log('🛠 Building Fukiai Font from glyphs.json...');

// ビルドディレクトリの準備
const buildDir = path.join(rootDir, 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// temp_svgディレクトリの確認
const tempSvgDir = path.join(rootDir, 'temp_svg');
if (!fs.existsSync(tempSvgDir)) {
  console.log('📁 Creating temp_svg directory...');
  fs.mkdirSync(tempSvgDir, { recursive: true });
  console.log('✅ temp_svg directory created');
  
  // 注意: SVG最適化を進める必要があります
  console.log('⚠️ Please optimize SVG files by running: npm run optimize-svg');
}

// フォント生成ストリームの作成
const fontStream = new SVGIcons2SVGFontStream({
  fontName: 'Fukiai',
  fontHeight: 1000,
  normalize: true,
  centerHorizontally: true,
  fixedWidth: true
});

// 出力ファイルパス
const svgFontPath = path.join(buildDir, 'fukiai.svg');
const ttfFontPath = path.join(buildDir, 'fukiai.ttf');
const woffFontPath = path.join(buildDir, 'fukiai.woff');

// SVGフォントの出力ストリームを設定
const outputStream = createWriteStream(svgFontPath);

// 完了ハンドラ
outputStream.on('finish', () => {
  console.log('✅ SVG font generated!');
  
  // SVG -> TTF 変換
  console.log('🔄 Converting SVG to TTF...');
  const svgFont = fs.readFileSync(svgFontPath, 'utf8');
  const ttf = svg2ttf(svgFont, {});
  fs.writeFileSync(ttfFontPath, Buffer.from(ttf.buffer));
  console.log('✅ TTF font generated!');
  
  // TTF -> WOFF 変換
  console.log('🔄 Converting TTF to WOFF...');
  const ttfFile = fs.readFileSync(ttfFontPath);
  const woff = ttf2woff(ttfFile, {});
  fs.writeFileSync(woffFontPath, Buffer.from(woff.buffer));
  console.log('✅ WOFF font generated!');
  
  console.log('🎉 All font files successfully created in the build directory!');
});

// エラーハンドラ
fontStream.on('error', (error) => {
  console.error('❌ Font generation error:', error);
  process.exit(1);
});

// SVGフォントストリームをファイルに接続
fontStream.pipe(outputStream);

// 各グリフを追加（glyphs.jsonの順番を保持）
console.log('📦 Adding glyphs to font...');

// グリフの数をカウント
const totalGlyphs = Object.keys(glyphs).length;
let addedGlyphs = 0;
let missingGlyphs = 0;

Object.entries(glyphs).forEach(([name, code]) => {
  const svgPath = path.join(tempSvgDir, `${name}.svg`);
  
  if (fs.existsSync(svgPath)) {
    const glyph = createReadStream(svgPath);
    
    // Unicode値を明示的に指定（16進数コードポイントから実際のUnicode文字に変換）
    const unicodeChar = String.fromCodePoint(parseInt(code, 16));
    
    // メタデータの設定
    glyph.metadata = {
      unicode: [unicodeChar],
      name: name
    };
    
    fontStream.write(glyph);
    addedGlyphs++;
    
    // 詳細なログを出力（環境変数で制御可能）
    if (process.env.VERBOSE) {
      console.log(`  Added: ${name} (U+${code} → "${unicodeChar}")`);
    }
  } else {
    console.warn(`⚠️ Missing SVG: ${name}.svg`);
    missingGlyphs++;
  }
});

// ストリームを終了
fontStream.end();

// 進捗状況のサマリー
console.log(`📊 Summary: Added ${addedGlyphs}/${totalGlyphs} glyphs (${missingGlyphs} missing)`);
