#!/bin/bash

# 処理対象フォルダ（Fukiai/svg）
SVG_DIR="$(cd "$(dirname "$0")/../svg" && pwd)"

echo "▶ SVGアウトライン処理を開始します（$SVG_DIR）"

for file in "$SVG_DIR"/*.svg; do
    filename=$(basename "$file")
    temp_svg="/tmp/$filename"

    # 1. fill="#000000" を強制適用
    sed 's/fill="[^"]*"/fill="#000000"/g' "$file" > "$temp_svg"

    # 2. Inkscapeで上書き処理（ストロークをパス化）
    inkscape "$temp_svg" \
  --actions="EditSelectAll;SelectionStrokeToPath;SelectionUnGroup;SelectionCombine;object-to-path;export-filename:$file;export-do"

    echo "  ✅ $filename を上書きしました"
done

echo "🎉 svg/*.svg のアウトライン化が完了しました"