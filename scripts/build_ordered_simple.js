/**
 * glyphs.jsonの順序でフォントを生成するスクリプト
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const glyphs = require('../glyphs.json');

// 一時ディレクトリを作成
const tempDir = path.join(__dirname, '..', 'temp_ordered');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// ビルドディレクトリを作成
const buildDir = path.join(__dirname, '..', 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

console.log('🔄 SVGファイルを順序付きでコピーしています...');

// glyphs.jsonから順序付きのSVGリストを作成
const orderedList = [];
let index = 0;

Object.entries(glyphs).forEach(([name, code]) => {
  const sourcePath = path.join(__dirname, '..', 'temp_svg', `${name}.svg`);
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`⚠️ ファイルが見つかりません: ${name}.svg`);
    return;
  }
  
  // 順序を付けてファイル名を作成
  const paddedIndex = String(index).padStart(4, '0');
  const destPath = path.join(tempDir, `${paddedIndex}-${name}.svg`);
  
  // SVGファイルの内容を読み込む
  let content = fs.readFileSync(sourcePath, 'utf8');
  
  // フォントのUnicodeマッピングを設定
  // E001 → EA01 に変換
  let unicodeStr = code;
  if (code.startsWith('E') && !code.startsWith('EA')) {
    unicodeStr = 'EA' + code.substring(1);
  }
  
  // SVGのunicode属性を設定（SVGアイコンツールがこれを使用）
  const unicodeChar = `&#x${unicodeStr};`;
  
  if (content.includes('unicode=')) {
    content = content.replace(/unicode="[^"]*"/, `unicode="${unicodeChar}"`);
  } else {
    content = content.replace(/<svg/, `<svg unicode="${unicodeChar}"`);
  }
  
  // グリフ名も設定
  if (content.includes('glyph-name=')) {
    content = content.replace(/glyph-name="[^"]*"/, `glyph-name="${name}"`);
  } else {
    content = content.replace(/<svg/, `<svg glyph-name="${name}"`);
  }
  
  // 修正したSVGを書き込む
  fs.writeFileSync(destPath, content);
  
  // リストに追加
  orderedList.push(destPath);
  index++;
});

console.log(`✅ ${orderedList.length}個のSVGファイルを準備しました`);

// SVGフォントを生成
console.log('🔄 SVGフォントを生成しています...');
const svgFontPath = path.join(buildDir, 'fukiai.svg');

// 一時ファイルにファイルリストを書き出し
const listFile = path.join(tempDir, '_file_list.txt');
fs.writeFileSync(listFile, orderedList.join('\n'));

// svgicons2svgfontコマンドを実行（ファイルリストを使用）
try {
  execSync(`npx svgicons2svgfont -f Fukiai -o ${svgFontPath} $(cat ${listFile})`, { stdio: 'inherit' });
  console.log('✅ SVGフォント生成完了');
} catch (err) {
  console.error('⚠️ SVGフォント生成でエラーが発生しました:', err.message);
  process.exit(1);
}

// TTFに変換
console.log('🔄 TTFフォントに変換しています...');
const ttfPath = path.join(buildDir, 'fukiai.ttf');

try {
  execSync(`npx svg2ttf ${svgFontPath} ${ttfPath}`, { stdio: 'inherit' });
  console.log('✅ TTF変換完了');
} catch (err) {
  console.error('⚠️ TTF変換でエラーが発生しました:', err.message);
  process.exit(1);
}

// WOFFに変換
console.log('🔄 WOFFフォントに変換しています...');
const woffPath = path.join(buildDir, 'fukiai.woff');

try {
  execSync(`npx ttf2woff ${ttfPath} ${woffPath}`, { stdio: 'inherit' });
  console.log('✅ WOFF変換完了');
} catch (err) {
  console.error('⚠️ WOFF変換でエラーが発生しました:', err.message);
  process.exit(1);
}

// docsディレクトリにコピー
console.log('🔄 docsディレクトリにコピーしています...');
const docsDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

fs.copyFileSync(woffPath, path.join(docsDir, 'fukiai.woff'));
console.log('✅ docs/fukiai.woffにコピー完了');

console.log('🎉 ビルドが正常に完了しました！');
