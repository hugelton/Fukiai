#!/bin/bash

set -e

echo "🛠 Building Fukiai Font with correct glyph order from glyphs.json"

# 作業ディレクトリをプロジェクトルートに設定
cd "$(dirname "$0")/.."

# ビルドディレクトリの作成
mkdir -p build

# 一時ディレクトリを作成
rm -rf temp_ordered
mkdir -p temp_ordered

# グリフを正しい順序でコピー
echo "🔄 Preparing SVGs in the correct order..."
node -e '
const fs = require("fs");
const path = require("path");
const glyphs = require("./glyphs.json");

// 各グリフを処理
Object.entries(glyphs).forEach(([name, code], index) => {
  const sourcePath = path.join("temp_svg", `${name}.svg`);
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`Missing SVG: ${name}.svg`);
    return;
  }
  
  // ファイル名に順序インデックスを付ける（ソート用）
  const paddedIndex = String(index).padStart(4, "0");
  const destPath = path.join("temp_ordered", `${paddedIndex}-${name}.svg`);
  
  // SVGの内容を読み込む
  let content = fs.readFileSync(sourcePath, "utf8");
  
  // SVGにUnicode属性を設定
  const unicodeChar = String.fromCodePoint(parseInt(code, 16));
  
  if (content.includes("unicode=")) {
    content = content.replace(/unicode="[^"]*"/, `unicode="${unicodeChar}"`);
  } else {
    content = content.replace(/<svg/, `<svg unicode="${unicodeChar}"`);
  }
  
  // glyph-name属性も設定
  if (content.includes("glyph-name=")) {
    content = content.replace(/glyph-name="[^"]*"/, `glyph-name="${name}"`);
  } else {
    content = content.replace(/<svg/, `<svg glyph-name="${name}"`);
  }
  
  // 新しいSVGを書き込む
  fs.writeFileSync(destPath, content);
  console.log(`Prepared ${paddedIndex}-${name}.svg with Unicode ${code}`);
});
'

# SVGフォントを生成（ファイル名順で処理）
echo "🔄 Creating SVG font with ordered glyphs..."
npx svgicons2svgfont -f Fukiai -o build/fukiai.svg temp_ordered/*.svg

# TTFに変換
echo "🔄 Converting to TTF..."
npx svg2ttf build/fukiai.svg build/fukiai.ttf

# WOFFに変換
echo "🔄 Converting to WOFF..."
npx ttf2woff build/fukiai.ttf build/fukiai.woff

# docsディレクトリにコピー
mkdir -p docs
cp build/fukiai.woff docs/

echo "✅ Font built with correct glyph order in ./build"
echo "✅ WOFF file copied to ./docs for preview"
