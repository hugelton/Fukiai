#!/bin/bash

# Unicode問題の解決と完全なリビルドを行うスクリプト

set -e  # エラーがあれば停止

echo "🔧 Fukiai フォントのUnicode問題を修正します"

# 作業ディレクトリをプロジェクトルートに設定
cd "$(dirname "$0")/.."

# 1. Unicodeマッピングを修正 (E001→EA01)
echo "🔄 Unicodeマッピングを修正しています..."
node scripts/remap_unicode.js

# 2. SVGファイルを最適化
echo "🔄 SVGファイルを最適化しています..."
npx svgo -f svg/ -o temp_svg/ --config=svgo.config.js

# 3. 一時ディレクトリを準備
rm -rf temp_ordered
mkdir -p temp_ordered

# 4. 正しいUnicodeでSVGファイルを準備
echo "🔄 正しいUnicodeでSVGファイルを準備しています..."
node -e '
const fs = require("fs");
const path = require("path");
const glyphs = require("./glyphs.json");

// グリフを処理
Object.entries(glyphs).forEach(([name, code], index) => {
  // 元のSVGファイルパス
  const sourcePath = path.join("temp_svg", `${name}.svg`);
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`Missing SVG: ${name}.svg`);
    return;
  }
  
  // 16進数から実際のUnicode文字に変換
  const unicodeChar = String.fromCodePoint(parseInt(code, 16));
  
  // コンテンツを読み込む
  let content = fs.readFileSync(sourcePath, "utf8");
  
  // ファイル名にインデックスを含める（順序付けのため）
  const paddedIndex = String(index).padStart(4, "0");
  const destPath = path.join("temp_ordered", `${paddedIndex}-${code}-${name}.svg`);
  
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

# 5. ビルドディレクトリを作成
mkdir -p build

# 6. SVGフォントを生成
echo "🔄 SVGフォントを生成しています..."
npx svgicons2svgfont -f Fukiai -o build/fukiai.svg temp_ordered/*.svg

# 7. TTFフォントに変換
echo "🔄 TTFフォントに変換しています..."
npx svg2ttf build/fukiai.svg build/fukiai.ttf

# 8. WOFFフォントに変換
echo "🔄 WOFFフォントに変換しています..."
npx ttf2woff build/fukiai.ttf build/fukiai.woff

# 9. docsディレクトリを作成
mkdir -p docs

# 10. WOFFファイルをdocsディレクトリにコピー
echo "🔄 WOFFファイルをdocsディレクトリにコピーしています..."
cp build/fukiai.woff docs/

# 11. HTML実体参照を使用したプレビューページを生成
echo "🔄 プレビューページを生成しています..."
node scripts/regenerate_preview.js

# 12. EA01テストページを作成
echo "🔄 テストページを作成しています..."
cat > docs/ea-test.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fukiai EA Unicode Test</title>
    <style>
        @font-face {
            font-family: 'Fukiai';
            src: url('fukiai.woff') format('woff');
            font-weight: normal;
            font-style: normal;
            font-display: block;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
        }
        
        h1 {
            margin-bottom: 2rem;
        }
        
        .test-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        
        .glyph {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 1rem;
            text-align: center;
        }
        
        .icon {
            font-family: 'Fukiai';
            font-size: 2.5rem;
            height: 4rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .code {
            font-family: monospace;
            font-size: 0.8rem;
            margin-top: 0.5rem;
        }
    </style>
</head>
<body>
    <h1>Fukiai EA Unicode Test</h1>
    
    <p>HTML実体参照を使用したテスト</p>
    
    <div class="test-grid">
        <div class="glyph">
            <div class="icon">&#xEA01;</div>
            <div class="code">U+EA01</div>
        </div>
        <div class="glyph">
            <div class="icon">&#xEA02;</div>
            <div class="code">U+EA02</div>
        </div>
        <div class="glyph">
            <div class="icon">&#xEA03;</div>
            <div class="code">U+EA03</div>
        </div>
    </div>
    
    <p><a href="index.html">メインプレビューページに戻る</a></p>
</body>
</html>
EOF

echo "✅ 完了しました！"
echo "🔍 以下のファイルを確認してください:"
echo "  - docs/index.html (メインプレビューページ)"
echo "  - docs/ea-test.html (テストページ)"
echo ""
echo "🚀 問題が解決したら、GitHubにプッシュしてください!"
