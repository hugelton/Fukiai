/**
 * Fukiaiフォント用のCSSを生成するスクリプト
 * すべてのUnicodeマッピングをCSS形式で出力します
 */

const fs = require('fs');
const path = require('path');

// パス設定
const rootDir = path.join(__dirname, '..');
const docsDir = path.join(rootDir, 'docs');
const glyphsPath = path.join(rootDir, 'glyphs.json');

// docs ディレクトリを確保
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

// glyphs.jsonを読み込み
const glyphs = JSON.parse(fs.readFileSync(glyphsPath, 'utf8'));

console.log('🔄 CSSファイルを生成しています...');

// CSSファイルの内容を作成
let cssContent = `/* 
 * Fukiai Icon Font CSS
 * 自動生成: ${new Date().toISOString()}
 */

@font-face {
  font-family: 'Fukiai';
  src: url('fukiai.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

.fukiai {
  font-family: 'Fukiai';
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* マッピングのバリエーション - 両方のUnicode形式をサポート */
`;

// E001形式のクラスを生成
Object.entries(glyphs).forEach(([name, code]) => {
  cssContent += `
.${name}::before {
  content: "\\${code}";
}`;
});

// EA01形式のクラスも生成（E001 → EA01の変換）
cssContent += `

/* EA01形式のクラス（フォントの実際のマッピング） */`;

Object.entries(glyphs).forEach(([name, code]) => {
  if (code.startsWith('E') && !code.startsWith('EA')) {
    const numericPart = code.substring(1);
    const eaCode = `EA${numericPart}`;
    cssContent += `
.${name}-ea::before {
  content: "\\${eaCode}";
}`;
  }
});

// CSSファイルを保存
const cssPath = path.join(docsDir, 'fukiai.css');
fs.writeFileSync(cssPath, cssContent);
console.log(`✅ CSS生成完了: ${cssPath}`);

// デモ用HTMLファイルも生成
let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fukiai Font CSS Demo</title>
    <link rel="stylesheet" href="fukiai.css">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        h1, h2 {
            margin-bottom: 1.5rem;
        }
        
        .demo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        
        .demo-icon {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 1rem;
            text-align: center;
        }
        
        .fukiai {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        
        .name {
            font-size: 0.8rem;
            color: #666;
            font-family: monospace;
        }
        
        .code {
            font-size: 0.7rem;
            color: #999;
        }
        
        .method-title {
            margin-top: 2rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #eee;
        }
        
        .entity-demo {
            margin: 2rem 0;
            padding: 1rem;
            background: #f7f7f7;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1>Fukiai Icon Font CSS Demo</h1>
    
    <p>このページはCSS classes経由でFukiaiフォントを表示します。</p>
    
    <h2 class="method-title">方法1: CSS Classes (.fukiai + .icon-name)</h2>
    
    <div class="demo-grid">`;

// 各アイコンのHTMLを生成
Object.entries(glyphs).forEach(([name, code]) => {
  htmlContent += `
        <div class="demo-icon">
            <i class="fukiai ${name}"></i>
            <div class="name">${name}</div>
            <div class="code">U+${code}</div>
        </div>`;
});

// HTML entityテストセクションも追加
htmlContent += `
    </div>
    
    <h2 class="method-title">方法2: HTML Entities</h2>
    
    <div class="entity-demo">
        <h3>EA01形式のHTML実体参照</h3>
        <div style="font-family: 'Fukiai'; font-size: 2.5rem; margin: 1rem 0;">
            &#xEA01; &#xEA02; &#xEA03; &#xEA04; &#xEA05; &#xEA06;
        </div>
        
        <h3>E001形式のHTML実体参照</h3>
        <div style="font-family: 'Fukiai'; font-size: 2.5rem; margin: 1rem 0;">
            &#xE001; &#xE002; &#xE003; &#xE004; &#xE005; &#xE006;
        </div>
        
        <p>注: これらの2つのアプローチのどちらが機能するかは、フォントの内部Unicodeマッピングによります。</p>
    </div>
    
</body>
</html>`;

// HTMLファイルを保存
const htmlPath = path.join(docsDir, 'css-demo.html');
fs.writeFileSync(htmlPath, htmlContent);
console.log(`✅ HTML生成完了: ${htmlPath}`);

console.log(`\n💡 次のステップ:`);
console.log(`1. woff フォントファイルを docs ディレクトリにコピー: cp build/fukiai.woff docs/`);
console.log(`2. ブラウザで css-demo.html を開く`);
