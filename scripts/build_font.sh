#!/bin/bash

set -e

echo "🛠 Building Fukiai Font from glyphs.json order"

mkdir -p build

# 順番を glyphs.json に基づいて明示
svg_list=$(jq -r 'to_entries[] | .key | @sh' glyphs.json | xargs -n1 -I{} echo "temp_svg/{}.svg")

# svgicons2svgfont に明示的に順番付きで渡す
npx svgicons2svgfont $svg_list \
  --centerHorizontally --fixedWidth \
  -o build/fukiai.svg

# 変換
npx svg2ttf build/fukiai.svg build/fukiai.ttf
npx ttf2woff build/fukiai.ttf build/fukiai.woff

echo "✅ Font built in ./build"