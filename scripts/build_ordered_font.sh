#!/bin/bash

set -e

echo "🛠 Building Fukiai Font with explicit order from glyphs.json"

# 作業ディレクトリをプロジェクトルートに設定
cd "$(dirname "$0")/.."

# ビルドディレクトリの作成
mkdir -p build

# SVGファイルをglyphs.jsonの順序で取得
echo "🔄 Preparing SVG files in correct order..."
svg_list=$(jq -r 'to_entries[] | .key | @sh' glyphs.json | xargs -n1 -I{} echo "temp_svg/{}.svg")

# SVGをSVGフォントに変換（順序を明示的に指定）
echo "🔄 Converting SVGs to SVG font with explicit order..."
npx svgicons2svgfont $svg_list \
  -f Fukiai \
  -o build/fukiai.svg

# TTFに変換
echo "🔄 Converting SVG font to TTF..."
npx svg2ttf build/fukiai.svg build/fukiai.ttf

# WOFFに変換
echo "🔄 Converting TTF to WOFF..."
npx ttf2woff build/fukiai.ttf build/fukiai.woff

# docsディレクトリにコピー
echo "🔄 Copying WOFF to docs directory..."
mkdir -p docs
cp build/fukiai.woff docs/

echo "✅ Font built successfully in ./build"
echo "✅ Font copied to ./docs for preview"
