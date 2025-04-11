#!/bin/bash

set -e

echo "🔍 Building Fukiai Font with direct Unicode embedding"

# 作業ディレクトリをプロジェクトルートに設定
cd "$(dirname "$0")/.."

# ビルドディレクトリの作成
mkdir -p build

# Unicode情報を一時ファイルに抽出
echo "🔄 Preparing Unicode mapping from glyphs.json..."
node -e '
const fs = require("fs");
const glyphs = require("./glyphs.json");

// Unicode情報を保存
fs.writeFileSync("unicode_map.json", JSON.stringify(glyphs, null, 2));
console.log("✅ Created Unicode mapping file");
'

# SVGにUnicodeを埋め込む単純なスクリプト
echo "🔄 Embedding Unicode in SVG files..."
node -e '
const fs = require("fs");
const path = require("path");
const glyphs = require("./unicode_map.json");

// 各SVGファイルを処理
Object.entries(glyphs).forEach(([name, hex]) => {
  // SVGファイルパス
  const svgPath = path.join("temp_svg", `${name}.svg`);
  
  if (!fs.existsSync(svgPath)) {
    console.log(`Missing SVG: ${name}.svg`);
    return;
  }
  
  // SVG内容を読み込み
  let content = fs.readFileSync(svgPath, "utf8");
  
  // 16進数から実際のUnicode文字に変換
  const unicodeChar = String.fromCodePoint(parseInt(hex, 16));
  
  // Unicode属性がすでにあるか確認
  if (content.includes("unicode=")) {
    // 既存のunicode属性を置換
    content = content.replace(/unicode="[^"]*"/, `unicode="${unicodeChar}"`);
  } else {
    // unicode属性を追加
    content = content.replace(/<svg/, `<svg unicode="${unicodeChar}"`);
  }
  
  // 更新したSVGを保存
  fs.writeFileSync(svgPath, content);
  console.log(`Updated ${name}.svg with Unicode U+${hex}`);
});
'

# SVGをSVGフォントに変換
echo "🔄 Converting SVGs to SVG font..."
npx svgicons2svgfont -f Fukiai -o build/fukiai.svg temp_svg/*.svg

# SVGからTTFへ変換
echo "🔄 Converting SVG to TTF..."
npx svg2ttf build/fukiai.svg build/fukiai.ttf

# TTFからWOFFへ変換
echo "🔄 Converting TTF to WOFF..."
npx ttf2woff build/fukiai.ttf build/fukiai.woff

# 一時ファイルを削除
rm unicode_map.json

echo "✅ Font built in ./build"
