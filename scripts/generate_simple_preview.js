/**
 * シンプルなHTMLプレビューを生成するスクリプト
 * 明示的にEA01形式のHTMLエンティティを使用
 */

const fs = require('fs');
const path = require('path');
const glyphs = require('../glyphs.json');

// パス設定
const outputPath = path.join(__dirname, '..', 'docs', 'simple-preview.html');

// HTMLの生成
let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fukiai Simple Preview</title>
    <style>
        @font-face {
            font-family: 'Fukiai';
            src: url('fukiai.woff') format('woff');
            font-weight: normal;
            font-style: normal;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
        }
        
        h1, h2 {
            margin-bottom: 1.5rem;
        }
        
        .category {
            margin: 2rem 0;
        }
        
        .icon-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
            margin: 1rem 0;
        }
        
        .glyph {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 1rem;
            text-align: center;
        }
        
        .icon {
            font-family: 'Fukiai';
            font-size: 2.5rem;
            display: block;
            height: 3rem;
            line-height: 1.2;
            margin-bottom: 0.5rem;
        }
        
        .name {
            font-size: 0.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .code {
            font-family: monospace;
            font-size: 0.7rem;
            color: #666;
        }
        
        .note {
            margin: 2rem 0;
            padding: 1rem;
            background: #f5f5f5;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1>Fukiai Icons - Simple Preview</h1>
    
    <div class="note">
        <p>このプレビューページは明示的にEA01形式のHTMLエンティティを使用しています。</p>
        <p>フォントファイル（fukiai.woff）がdocsディレクトリに存在することを確認してください。</p>
    </div>
`;

// カテゴリーごとにグリフを分類
const categories = {};
Object.entries(glyphs).forEach(([name, code]) => {
  const category = name.split('_')[0];
  if (!categories[category]) {
    categories[category] = [];
  }
  categories[category].push({ name, code });
});

// カテゴリーごとのグリフをHTMLに追加
Object.entries(categories).forEach(([category, items]) => {
  html += `
    <h2>${category}</h2>
    <div class="category">
        <div class="icon-grid">
`;

  items.forEach(({ name, code }) => {
    // E001 → EA01 に変換
    let eaCode = code;
    if (code.startsWith('E') && !code.startsWith('EA')) {
      eaCode = 'EA' + code.substring(1);
    }
    
    html += `
            <div class="glyph">
                <div class="icon">&#x${eaCode};</div>
                <div class="name">${name}</div>
                <div class="code">U+${eaCode}</div>
            </div>
`;
  });

  html += `
        </div>
    </div>
`;
});

// HTMLの終了
html += `
</body>
</html>
`;

// HTMLをファイルに保存
fs.writeFileSync(outputPath, html);
console.log(`✅ シンプルなプレビューHTMLを生成: ${outputPath}`);
