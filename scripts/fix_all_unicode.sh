#!/bin/bash

set -e

echo "🚀 Fukiai Font プロジェクトの全ての問題を修正します"

# 作業ディレクトリをプロジェクトルートに設定
cd "$(dirname "$0")/.."

# 1. SVGファイルを最適化
echo "🔄 SVGファイルを最適化しています..."
npx svgo -f svg/ -o temp_svg/ --config=svgo.config.js

# 2. 明示的な順序でフォントを生成
echo "🔄 明示的な順序でフォントを生成しています..."
bash scripts/build_ordered_font.sh

# 3. EA01形式のHTMLプレビューを生成
echo "🔄 正しいEA01形式でHTMLプレビューを生成しています..."
node scripts/generate_ea01_preview.js

# 4. テストHTMLも生成
echo "🔄 各種テストHTMLも生成しています..."
node scripts/generate_test_html.js

echo "✅ 全ての修正が完了しました！"
echo "🔍 ブラウザで docs/index.html を開いて確認してください"
