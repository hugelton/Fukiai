/**
 * 様々なコード形式でテストするHTMLを生成する
 */

const fs = require('fs');
const path = require('path');
const glyphs = require('../glyphs.json');

// 出力ファイルパス
const outputPath = path.join(__dirname, '..', 'docs', 'test-all.html');

// テスト対象とするコード形式
const testFormats = [
  { name: 'Original (E001 format)', prefix: 'E', digits: 3 },
  { name: 'EA01 format', prefix: 'EA', digits: 2 },
  { name: 'F001 format', prefix: 'F', digits: 3 },
  { name: 'FA01 format', prefix: 'FA', digits: 2 }
];

// HTMLの開始部分
let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fukiai All Code Formats Test</title>
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
        
        h1, h2, h3 {
            margin-bottom: 1rem;
        }
        
        .format-section {
            margin: 2rem 0;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 8px;
        }
        
        .icon-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 0.5rem;
            margin: 1rem 0;
        }
        
        .icon-item {
            border: 1px solid #eee;
            border-radius: 4px;
            padding: 0.5rem;
            text-align: center;
            position: relative;
        }
        
        .icon {
            font-family: 'Fukiai';
            font-size: 2rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .name {
            font-size: 0.75rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .code {
            font-family: monospace;
            font-size: 0.7rem;
            color: #666;
        }
        
        .has-icon {
            background-color: #f0fff0;
        }
        
        .no-icon {
            background-color: #fff0f0;
        }
        
        .success-label {
            position: absolute;
            top: 0;
            right: 0;
            background: #4caf50;
            color: white;
            font-size: 0.6rem;
            padding: 0.1rem 0.3rem;
            border-radius: 0 4px 0 4px;
        }
    </style>
</head>
<body>
    <h1>Fukiai Unicode Code Formats Test</h1>
    
    <p>このページは様々なUnicodeコード形式でアイコンの表示を試みます。</p>
`;

// 各フォーマットセクションを生成
testFormats.forEach(format => {
  html += `
    <div class="format-section">
        <h2>${format.name}</h2>
        <div class="icon-grid">
`;

  // 最初の15個のグリフだけを表示
  Object.entries(glyphs).slice(0, 15).forEach(([name, originalCode]) => {
    // 数値部分を取得
    const numericPart = parseInt(originalCode.substring(1), 16);
    
    // 新しいフォーマットでコードを生成
    const formattedNum = numericPart.toString(16).toUpperCase().padStart(format.digits, '0');
    const newCode = format.prefix + formattedNum;
    
    html += `
            <div class="icon-item" id="${newCode}">
                <div class="icon">&#x${newCode};</div>
                <div class="name">${name}</div>
                <div class="code">U+${newCode}</div>
            </div>
`;
  });

  html += `
        </div>
    </div>
`;
});

// HTMLの終了部分
html += `
    <script>
        // フォントが読み込まれたか確認
        document.fonts.ready.then(function() {
            console.log('Fukiaiフォントが読み込まれました');
            
            // 各アイコン要素をチェック
            document.querySelectorAll('.icon').forEach(icon => {
                // アイコンに中身があるか確認（デフォルトの四角や？マークでないか）
                const rect = icon.getBoundingClientRect();
                const computed = window.getComputedStyle(icon);
                const parent = icon.parentElement;
                
                // アイコンが表示されていると判断する基準
                if (rect.width > 0 && rect.height > 0 && computed.fontFamily.includes('Fukiai')) {
                    parent.classList.add('has-icon');
                    
                    // 成功ラベルを追加
                    const label = document.createElement('span');
                    label.className = 'success-label';
                    label.textContent = '✓';
                    parent.appendChild(label);
                } else {
                    parent.classList.add('no-icon');
                }
            });
        });
    </script>
</body>
</html>`;

// ファイルに保存
fs.writeFileSync(outputPath, html);
console.log(`テストHTMLを生成しました: ${outputPath}`);
