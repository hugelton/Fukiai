#!/bin/bash

set -e

echo "🚀 Fukiai フォント完全ビルドプロセスを開始します"

# 作業ディレクトリをプロジェクトルートに設定
cd "$(dirname "$0")/.."

# 1. SVGファイルを最適化
echo "🔄 SVGファイルを最適化しています..."
npx svgo -f svg/ -o temp_svg/ --config=svgo.config.js

# 2. 一時ディレクトリを作成
rm -rf temp_ordered
mkdir -p temp_ordered

# 3. SVGファイルを順序付けしてコピー
echo "🔄 SVGファイルを順序付けしています..."
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
});
'

# 4. ビルドディレクトリを作成
mkdir -p build

# 5. SVGフォントを生成
echo "🔄 SVGフォントを生成しています..."
npx svgicons2svgfont -f Fukiai -o build/fukiai.svg temp_ordered/*.svg

# 6. TTFフォントに変換
echo "🔄 TTFフォントに変換しています..."
npx svg2ttf build/fukiai.svg build/fukiai.ttf

# 7. WOFFフォントに変換
echo "🔄 WOFFフォントに変換しています..."
npx ttf2woff build/fukiai.ttf build/fukiai.woff

# 8. docsディレクトリを作成
mkdir -p docs

# 9. WOFFファイルをdocsディレクトリにコピー
echo "🔄 WOFFファイルをdocsディレクトリにコピーしています..."
cp build/fukiai.woff docs/

# 10. プレビューページを生成
echo "🔄 プレビューページを生成しています..."
node scripts/regenerate_preview.js

echo "✅ ビルドプロセスが完了しました！"
echo "🔍 docs/index.htmlでプレビューを確認できます"
