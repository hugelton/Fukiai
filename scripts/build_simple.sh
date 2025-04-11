#!/bin/bash

set -e

echo "🛠 Building Fukiai Font (simplified version)"

# 作業ディレクトリをプロジェクトルートに設定
cd "$(dirname "$0")/.."

# ビルドディレクトリの作成
mkdir -p build

# SVGに直接Unicode情報を埋め込む
echo "🔄 Processing SVG files..."
for svg in temp_svg/*.svg; do
  name=$(basename "$svg" .svg)
  # glyphs.jsonからUnicodeコードを取得
  code=$(grep "\"$name\":" glyphs.json | cut -d'"' -f4)
  
  if [ -n "$code" ]; then
    # SVGファイルを更新
    sed -i "" "s/<svg/<svg unicode=\"&#x$code;\"/" "$svg"
    echo "  Updated $name (U+$code)"
  fi
done

# SVGをSVGフォントに変換
echo "🔄 Converting SVGs to SVG font..."
npx svgicons2svgfont -f Fukiai -o build/fukiai.svg temp_svg/*.svg

# SVGフォントをTTFに変換
echo "🔄 Converting SVG font to TTF..."
npx svg2ttf build/fukiai.svg build/fukiai.ttf

# TTFをWOFFに変換
echo "🔄 Converting TTF to WOFF..."
npx ttf2woff build/fukiai.ttf build/fukiai.woff

echo "✅ Font built successfully in ./build"
