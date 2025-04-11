/**
 * HTMLプレビューを修正して正しいEA01形式のHTMLエンティティを使用するスクリプト
 */

const fs = require('fs');
const path = require('path');
const glyphs = require('../glyphs.json');

// htmlテンプレート
const templatePath = path.join(__dirname, 'preview_template.html');
const outputPath = path.join(__dirname, '..', 'docs', 'index.html');

// テンプレートの読み込み
console.log('🔄 テンプレートを読み込んでいます...');
const template = fs.readFileSync(templatePath, 'utf8');

// グリフをカテゴリーごとに分類
const categories = {};

Object.entries(glyphs).forEach(([name, code]) => {
  const category = name.split('_')[0];
  if (!categories[category]) {
    categories[category] = [];
  }
  
  // 小文字に統一したうえでE001→EA01に変換
  let newCode = code.toUpperCase();
  if (newCode.startsWith('E') && !newCode.startsWith('EA')) {
    const numOnly = newCode.substring(1);
    newCode = 'EA' + numOnly;
  }
  
  categories[category].push({
    name,
    code: newCode
  });
});

// カテゴリーリンクを生成
const categoryLinks = Object.keys(categories).map(cat => 
  `<a href="#${cat}" class="cat-link">${cat}</a>`
).join('\n');

// グリフブロックを生成
const glyphBlocks = [];

Object.entries(categories).forEach(([category, items]) => {
  let block = `<h2 id="${category}">${category}</h2>\n<div class="category">`;
  
  items.forEach(item => {
    block += `
<div class="glyph" data-name="${item.name}">
  <div class="glyph-char">&#x${item.code};</div>
  <div class="glyph-name">${item.name}</div>
  <div class="codepoint">U+${item.code}</div>
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
console.log(`✅ プレビューHTMLを保存しました: ${outputPath}`);
