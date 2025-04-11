/**
 * SVGファイルのUnicode属性を修正するスクリプト
 * EA01形式のUnicodeを正しく処理します
 */

const fs = require('fs');
const path = require('path');

// 作業ディレクトリ
const rootDir = path.join(__dirname, '..');
const tempSvgDir = path.join(rootDir, 'temp_svg');
const tempOrderedDir = path.join(rootDir, 'temp_ordered');

// glyphs.jsonを読み込む
const glyphsPath = path.join(rootDir, 'glyphs.json');
const glyphs = JSON.parse(fs.readFileSync(glyphsPath, 'utf8'));

// temp_orderedディレクトリが存在しない場合は作成
if (!fs.existsSync(tempOrderedDir)) {
  fs.mkdirSync(tempOrderedDir, { recursive: true });
}

console.log('🔄 SVGファイルに正しいUnicode属性を追加しています...');

// 各グリフを処理
Object.entries(glyphs).forEach(([name, code], index) => {
  // 元のSVGファイルパス
  const sourcePath = path.join(tempSvgDir, `${name}.svg`);
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`⚠️ Missing SVG: ${name}.svg`);
    return;
  }
  
  // コンテンツを読み込む
  let content = fs.readFileSync(sourcePath, 'utf8');
  
  // ファイル名にインデックスを含める（順序付けのため）
  const paddedIndex = String(index).padStart(4, "0");
  const destPath = path.join(tempOrderedDir, `${paddedIndex}-${code}-${name}.svg`);
  
  // Unicode属性を設定
  // ここでは文字変換ではなく、直接16進数の文字列を使用
  if (content.includes('unicode=')) {
    content = content.replace(/unicode="[^"]*"/, `unicode="&#x${code};"` );
  } else {
    content = content.replace(/<svg/, `<svg unicode="&#x${code};"` );
  }
  
  // glyph-name属性を設定
  if (content.includes('glyph-name=')) {
    content = content.replace(/glyph-name="[^"]*"/, `glyph-name="${name}"`);
  } else {
    content = content.replace(/<svg/, `<svg glyph-name="${name}"`);
  }
  
  // ファイルに書き込む
  fs.writeFileSync(destPath, content);
  console.log(`✅ 処理: ${name}.svg (${code})`);
});

console.log(`\n✅ 完了: ${tempOrderedDir}ディレクトリにSVGファイルを準備しました`);
