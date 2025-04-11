/**
 * EA01形式のHTML実体参照を使用してプレビューページを生成するスクリプト
 */

const fs = require('fs');
const path = require('path');

// パス設定
const rootDir = path.join(__dirname, '..');
const glyphsPath = path.join(rootDir, 'glyphs.json');
const templatePath = path.join(__dirname, 'preview_template.html');
const outputPath = path.join(rootDir, 'docs', 'index.html');

// データ読み込み
const glyphs = require(glyphsPath);
const template = fs.readFileSync(templatePath, 'utf8');

// カテゴリー別にグリフを整理
const categories = {};
Object.entries(glyphs).forEach(([name, code]) => {
  const category = name.split('_')[0];
  
  if (!categories[category]) {
    categories[category] = [];
  }
  
  // E001 → EA01 に変換（E001の1部分だけを抽出）
  let eaCode = code;
  if (code.startsWith('E') && !code.startsWith('EA')) {
    // 例: E001 → EA01 (数字部分を抽出してEAを付ける)
    const numericPart = code.substring(1);  // "001"
    eaCode = 'EA' + numericPart;  // "EA001"
  }
  
  categories[category].push({
    name: name,
    code: eaCode // EA01形式のコード
  });
});

// カテゴリーリンクを生成
const categoryLinks = Object.keys(categories).map(category => 
  `<a href="#${category}" class="cat-link">${category}</a>`
).join('\n');

// グリフブロックを生成
const glyphBlocks = Object.entries(categories).map(([category, items]) => {
  let block = `<h2 id="${category}">${category}</h2>\n<div class="category">`;
  
  items.forEach(item => {
    // HTML実体参照を使用（&#xEA01; 形式）
    block += `
<div class="glyph" data-name="${item.name}">
  <div class="glyph-char">&#x${item.code};</div>
  <div class="glyph-name">${item.name}</div>
  <div class="codepoint">U+${item.code}</div>
</div>
`;
  });
  
  block += '</div>';
  return block;
});

// テンプレートに挿入
let finalHtml = template.replace('{{category_links}}', categoryLinks);
finalHtml = finalHtml.replace('{{glyph_blocks}}', glyphBlocks.join('\n'));

// 出力
fs.writeFileSync(outputPath, finalHtml);
console.log(`✅ プレビューページを生成しました: ${outputPath}`);
