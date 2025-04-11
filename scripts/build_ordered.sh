#!/bin/bash

set -e

echo "🛠 Building Fukiai Font with ordered glyphs"

# 作業ディレクトリをプロジェクトルートに設定
cd "$(dirname "$0")/.."

# ビルドディレクトリの作成
mkdir -p build

# 一時ディレクトリを作成（既存のものを削除）
rm -rf temp_ordered
mkdir -p temp_ordered

# glyphs.json の順序に基づいてSVGファイルをコピーし、名前を変更
echo "🔄 Preparing ordered SVG files..."
node -e '
const fs = require("fs");
const path = require("path");
const glyphs = require("./glyphs.json");

// グリフを処理
Object.entries(glyphs).forEach(([name, hex], index) => {
  // 元のSVGファイルパス
  const sourcePath = path.join("temp_svg", `${name}.svg`);
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`Missing SVG: ${name}.svg`);
    return;
  }
  
  // 16進数から実際のUnicode文字に変換
  const unicodeChar = String.fromCodePoint(parseInt(hex, 16));
  
  // コンテンツを読み込む
  let content = fs.readFileSync(sourcePath, "utf8");
  
  // ファイル名にインデックスと16進コードを含める（順序付けのため）
  const paddedIndex = String(index).padStart(4, "0");
  const destPath = path.join("temp_ordered", `${paddedIndex}-${hex}-${name}.svg`);
  
  // Unicode属性を設定
  if (content.includes("unicode=")) {
    content = content.replace(/unicode="[^"]*"/, `unicode="${unicodeChar}"`);
  } else {
    content = content.replace(/<svg/, `<svg unicode="${unicodeChar}"`);
  }
  
  // glyph-name属性を設定
  if (content.includes("glyph-name=")) {
    content = content.replace(/glyph-name="[^"]*"/, `glyph-name="${name}"`);
  } else {
    content = content.replace(/<svg/, `<svg glyph-name="${name}"`);
  }
  
  // ファイルに書き込む
  fs.writeFileSync(destPath, content);
  console.log(`Created ordered SVG: ${paddedIndex}-${hex}-${name}.svg`);
});
'

# SVG2SVGフォントの実行（ファイル名でソート）
echo "🔄 Converting ordered SVGs to SVG font..."
npx svgicons2svgfont -f Fukiai -o build/fukiai.svg temp_ordered/*.svg

# SVGからTTFへ変換
echo "🔄 Converting SVG to TTF (preserving order)..."
npx svg2ttf build/fukiai.svg build/fukiai.ttf

# TTFからWOFFへ変換
echo "🔄 Converting TTF to WOFF..."
npx ttf2woff build/fukiai.ttf build/fukiai.woff

# 成功メッセージ
echo "✅ Font built with ordered glyphs in ./build"
echo ""
echo "Please check if the Unicode mappings are correct in the TTF font."
