#!/bin/bash

set -e

echo "🔍 DEBUG: Building Fukiai Font with detailed Unicode verification"

# 作業ディレクトリをプロジェクトルートに設定
cd "$(dirname "$0")/.."

# ビルドディレクトリの作成
mkdir -p build

# 一時ディレクトリを作成
mkdir -p temp_unicode

# 1. 確実にSVGファイルにUnicodeを埋め込む（より厳密な方法）
echo "🔄 Embedding Unicode in SVG files (strict method)..."

# SVGファイルをコピーして一時ディレクトリに保存
cp -r temp_svg/* temp_unicode/

# glyph.jsonを解析して各SVGファイルを更新
node -e "
const fs = require('fs');
const path = require('path');
const glyphs = require('./glyphs.json');

let processed = 0;
let missing = 0;

Object.entries(glyphs).forEach(([name, hex]) => {
  const svgPath = path.join('temp_unicode', `${name}.svg`);
  
  if (!fs.existsSync(svgPath)) {
    console.log(`⚠️ Missing SVG: ${name}.svg`);
    missing++;
    return;
  }
  
  // 16進数コードからUnicode文字に変換
  const codePoint = parseInt(hex, 16);
  const unicodeChar = String.fromCodePoint(codePoint);
  
  // SVGファイルを読み込み
  let content = fs.readFileSync(svgPath, 'utf8');
  
  // Unicode属性を更新/追加
  if (content.includes('unicode=')) {
    // 既存のunicode属性を置換
    content = content.replace(/unicode=(\"|')[^\"']*(\"|')/, `unicode=\"${unicodeChar}\"`);
  } else {
    // unicode属性がない場合は追加
    content = content.replace(/<svg/, `<svg unicode=\"${unicodeChar}\"`);
  }
  
  // glyph-name属性を追加（これも重要）
  if (!content.includes('glyph-name=')) {
    content = content.replace(/<svg/, `<svg glyph-name=\"${name}\"`);
  }
  
  // id属性を追加（これも役立つ場合がある）
  if (!content.includes(' id=')) {
    content = content.replace(/<svg/, `<svg id=\"${name}\"`);
  }
  
  // 更新したSVGを保存
  fs.writeFileSync(svgPath, content);
  processed++;
  
  // デバッグ出力
  console.log(\`✓ ${name} => U+${hex} (${unicodeChar})\`);
});

console.log(\`\\nProcessed ${processed} SVG files (${missing} missing)\`);
"

# 2. SVGフォント生成
echo -e "\n🔄 Converting SVGs to SVG font..."
npx svgicons2svgfont -f Fukiai -o build/fukiai.svg temp_unicode/*.svg

# 3. SVGフォント検証
echo -e "\n🔍 Verifying SVG font Unicode mappings..."
grep -o 'unicode=\"[^\"]*\"' build/fukiai.svg | wc -l

# 4. TTF変換（特別なオプション付き）
echo -e "\n🔄 Converting SVG font to TTF with precision options..."
npx svg2ttf build/fukiai.svg build/fukiai.ttf --ts=72 --tm=1.0

# 5. TTFからWOFFへの変換
echo -e "\n🔄 Converting TTF to WOFF..."
npx ttf2woff build/fukiai.ttf build/fukiai.woff

echo -e "\n✅ Font built in ./build"
echo "🔍 Check if Unicode mappings are correct in the resulting font"

# クリーンアップ
rm -rf temp_unicode
