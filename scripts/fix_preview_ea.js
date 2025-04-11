/**
 * プレビューページをEA01形式のHTML実体参照に修正するスクリプト
 */

const fs = require('fs');
const path = require('path');
const glyphs = require('../glyphs.json');

// パス設定
const templatePath = path.join(__dirname, 'preview_template.html');
const docsPath = path.join(__dirname, '..', 'docs');
const outputPath = path.join(docsPath, 'index.html');

// テンプレートを読み込む
console.log('🔄 テンプレートを読み込み中...');
const template = fs.readFileSync(templatePath, 'utf8');

// カテゴリー別にグリフを整理
const categories = {};
Object.entries(glyphs).forEach(([name, code]) => {
  const category = name.split('_')[0];
  
  if (!categories[category]) {
    categories[category] = [];
  }
  
  // E001 → EA01 に変換
  let eaCode = code;
  if (code.startsWith('E') && !code.startsWith('EA')) {
    eaCode = 'EA' + code.substring(1);
  }
  
  categories[category].push({
    name: name,
    code: eaCode
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
    // HTML実体参照を使用
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
console.log('🔄 プレビューページを生成中...');
fs.writeFileSync(outputPath, finalHtml);
console.log(`✅ プレビューページを保存しました: ${outputPath}`);

// docs/fukiai.woffの存在を確認
const fontPath = path.join(docsPath, 'fukiai.woff');
if (!fs.existsSync(fontPath)) {
  console.warn('⚠️ docs/fukiai.woffが見つかりません。build/fukiai.woffをコピーしてください。');
  
  const sourceFontPath = path.join(__dirname, '..', 'build', 'fukiai.woff');
  if (fs.existsSync(sourceFontPath)) {
    console.log('🔄 フォントファイルをコピー中...');
    fs.copyFileSync(sourceFontPath, fontPath);
    console.log(`✅ フォントをコピーしました: ${fontPath}`);
  }
}
