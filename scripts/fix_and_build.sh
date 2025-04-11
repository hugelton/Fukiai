#!/bin/bash

# Unicode問題の解決と完全なリビルドを行うスクリプト（修正版）

set -e  # エラーがあれば停止

echo "🔧 Fukiai フォントのUnicode問題を修正します"

# 作業ディレクトリをプロジェクトルートに設定
cd "$(dirname "$0")/.."

# 1. SVGファイルを最適化
echo "🔄 SVGファイルを最適化しています..."
npx svgo -f svg/ -o temp_svg/ --config=svgo.config.js

# 2. 一時ディレクトリを準備
rm -rf temp_ordered
mkdir -p temp_ordered

# 3. 正しいUnicodeでSVGファイルを準備（修正版スクリプト）
echo "🔄 SVGファイルにUnicode属性を追加しています..."
node scripts/fix_svg_unicode.js

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

# 10. シンプルなテストページを作成
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
        <div class="glyph">
            <div class="icon">&#xEA04;</div>
            <div class="code">U+EA04</div>
        </div>
        <div class="glyph">
            <div class="icon">&#xEA05;</div>
            <div class="code">U+EA05</div>
        </div>
        <div class="glyph">
            <div class="icon">&#xEA06;</div>
            <div class="code">U+EA06</div>
        </div>
    </div>
    
    <div class="test-grid">
        <div class="glyph">
            <div class="icon">&#xE001;</div>
            <div class="code">U+E001</div>
        </div>
        <div class="glyph">
            <div class="icon">&#xE002;</div>
            <div class="code">U+E002</div>
        </div>
        <div class="glyph">
            <div class="icon">&#xE003;</div>
            <div class="code">U+E003</div>
        </div>
    </div>
    
    <p>問題の根本原因: フォントのUnicodeマッピングが実際にはEA01形式であるのに対し、JSONファイルではE001形式で定義されていました。</p>
</body>
</html>
EOF

echo "✅ 完了しました！"
echo "🔍 以下のファイルを確認してください:"
echo "  - docs/ea-test.html (テストページ)"
echo ""
echo "🚀 問題が解決したら、プレビューページを更新し、GitHubにプッシュしてください!"
