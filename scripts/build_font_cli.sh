#!/bin/bash

set -e

echo "🛠 Building Fukiai Font using CLI tools"

# 作業ディレクトリをプロジェクトルートに設定
cd "$(dirname "$0")/.."

# ビルドディレクトリの作成
mkdir -p build

# グリフのJSONからUnicodeマッピングを一時ファイルに抽出
echo "🔍 Creating Unicode mapping from glyphs.json..."
node -e "
const fs = require('fs');
const glyphs = require('./glyphs.json');
const unicodeMap = {};

Object.entries(glyphs).forEach(([name, code]) => {
  // コードポイントを16進数から10進数に変換してから文字に
  const unicodeChar = String.fromCodePoint(parseInt(code, 16));
  unicodeMap[name] = unicodeChar;
});

fs.writeFileSync('temp_unicode_map.json', JSON.stringify(unicodeMap, null, 2));
console.log('✅ Created temporary Unicode mapping');
"

# SVGに明示的にUnicodeを埋め込むためのスクリプト実行
echo "🔄 Embedding Unicode characters in SVG files..."
node -e "
const fs = require('fs');
const path = require('path');
const unicodeMap = require('./temp_unicode_map.json');

// temp_svgディレクトリが存在するか確認
const tempSvgDir = 'temp_svg';
if (!fs.existsSync(tempSvgDir)) {
  console.error('❌ temp_svg directory does not exist');
  process.exit(1);
}

let modified = 0;

// 各SVGファイルにユニコードを埋め込む
Object.entries(unicodeMap).forEach(([name, unicodeChar]) => {
  const svgPath = path.join(tempSvgDir, `${name}.svg`);
  
  if (fs.existsSync(svgPath)) {
    let content = fs.readFileSync(svgPath, 'utf8');
    
    // unicode属性を設定
    if (content.includes('unicode=\"')) {
      content = content.replace(/unicode=\"[^\"]*\"/, `unicode=\"${unicodeChar}\"`);
    } else {
      content = content.replace(/<svg/, `<svg unicode=\"${unicodeChar}\"`);
    }
    
    fs.writeFileSync(svgPath, content);
    modified++;
  }
});

console.log(`✅ Unicode values embedded in ${modified} SVG files`);
"

# SVGをSVGフォントに変換
echo "🔄 Converting SVGs to SVG font..."
npx svgicons2svgfont -f Fukiai -o build/fukiai.svg temp_svg/*.svg

# SVGフォントをTTFに変換
echo "🔄 Converting SVG font to TTF..."
npx svg2ttf build/fukiai.svg build/fukiai.ttf

# TTFをWOFFに変換
echo "🔄 Converting TTF to WOFF..."
npx ttf2woff build/fukiai.ttf build/fukiai.woff

# 一時ファイルの削除
rm -f temp_unicode_map.json

echo "✅ Font built successfully in ./build"
