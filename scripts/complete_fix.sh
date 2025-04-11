#!/bin/bash

set -e

echo "🚀 Fukiai フォントと HTML プレビューの問題を完全に修正します"

# 作業ディレクトリをプロジェクトルートに設定
cd "$(dirname "$0")/.."

# 1. SVGの最適化
echo "🔄 SVG ファイルを最適化しています..."
npx svgo -f svg/ -o temp_svg/ --config=svgo.config.js

# 2. 正しい順序でフォントを生成
echo "🔄 正しい順序でフォントを生成しています..."
chmod +x scripts/build_ordered_font_v2.sh
bash scripts/build_ordered_font_v2.sh

# 3. HTML プレビューを修正
echo "🔄 HTML プレビューを修正しています..."
node scripts/fix_html_preview.js

echo "✅ 全ての修正が完了しました！"
echo "🔍 ブラウザで docs/index.html を開いて確認してください"
