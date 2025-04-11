#!/bin/bash

# Unicode属性なしでシンプルにフォントをビルドするスクリプト

set -e  # エラーがあれば停止

echo "🔄 シンプルなフォントビルドを開始します..."

# 作業ディレクトリをプロジェクトルートに設定
cd "$(dirname "$0")/.."

# 1. SVGファイルを最適化
echo "🔄 SVGファイルを最適化しています..."
npx svgo -f svg/ -o temp_svg/ --config=svgo.config.js

# 2. ビルドディレクトリを作成
mkdir -p build

# 3. SVGフォントを生成（Unicode属性なし）
echo "🔄 SVGフォントを生成しています..."
npx svgicons2svgfont -f Fukiai -o build/fukiai.svg temp_svg/*.svg

# 4. TTFフォントに変換
echo "🔄 TTFフォントに変換しています..."
npx svg2ttf build/fukiai.svg build/fukiai.ttf

# 5. WOFFフォントに変換
echo "🔄 WOFFフォントに変換しています..."
npx ttf2woff build/fukiai.ttf build/fukiai.woff

# 6. docsディレクトリを作成
mkdir -p docs

# 7. WOFFファイルをdocsディレクトリにコピー
echo "🔄 WOFFファイルをdocsディレクトリにコピーしています..."
cp build/fukiai.woff docs/

# 8. CSSファイルを生成
echo "🔄 CSSファイルを生成しています..."
node scripts/generate_css_font.js

echo "✅ 完了しました！"
echo "🔍 ブラウザでdocs/css-demo.htmlを開いてください"
