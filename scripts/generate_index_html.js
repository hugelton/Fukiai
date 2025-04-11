/**
 * index.htmlを生成するスクリプト
 * entity-test.htmlと同じ手法（HTML実体参照）を使用します
 */
const fs = require('fs');
const path = require('path');

// パス設定
const rootDir = path.join(__dirname, '..');
const templatePath = path.join(__dirname, 'preview_template.html');
const outputPath = path.join(rootDir, 'docs', 'index.html');
const structuredPath = path.join(rootDir, 'glyphs_structured.json');

// テンプレートを読み込む
console.log('🔄 テンプレートを読み込んでいます...');
const template = fs.readFileSync(templatePath, 'utf8');

// glyphs_structured.jsonを読み込む
console.log('🔄 glyphs_structured.jsonを読み込んでいます...');
const structured = JSON.parse(fs.readFileSync(structuredPath, 'utf8'));

// カテゴリーリンクを生成
const categoryLinks = Object.keys(structured).map(category => 
  `<a href="#${category}" class="cat-link">${category}</a>`
).join('\n');

// グリフブロックを生成
const glyphBlocks = [];

Object.entries(structured).forEach(([category, items]) => {
  let block = `<h2 id="${category}">${category}</h2>\n<div class="category">`;
  
  items.forEach(item => {
    // HTML実体参照を使用（&#xEA01;形式）
    // コードポイントを正規化（EA001 → EA01）
    let displayCode = item.code;
    
    // すべてのEAで始まるコードが2桁になるように確実にパディング
    if (displayCode.startsWith('EA')) {
      const num = parseInt(displayCode.substring(2), 16);
      displayCode = 'EA' + num.toString(16).toUpperCase().padStart(2, '0');
    }
    
    block += `
<div class="glyph" data-name="${item.name}">
  <div class="glyph-char">&#x${displayCode};</div>
  <div class="glyph-name">${item.name}</div>
  <div class="codepoint">U+${displayCode}</div>
</div>
`;
  });
  
  block += '</div>';
  glyphBlocks.push(block);
});

// テンプレートに挿入
let finalHtml = template.replace('{{category_links}}', categoryLinks);
finalHtml = finalHtml.replace('{{glyph_blocks}}', glyphBlocks.join('\n'));

// HTMLをファイルに保存
fs.writeFileSync(outputPath, finalHtml);
console.log(`✅ プレビューHTMLを生成しました: ${outputPath}`);
