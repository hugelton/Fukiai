const fs = require('fs');
const path = require('path');

// ファイルのパス
const baseDir = path.join(__dirname, '..');
const glyphsPath = path.join(baseDir, 'glyphs.json');
const templatePath = path.join(__dirname, 'preview_template.html');
const outputPath = path.join(baseDir, 'docs', 'index.html');
const glyphsStructuredPath = path.join(baseDir, 'glyphs_structured.json');
const cssPath = path.join(baseDir, 'docs', 'style.css');

// カテゴリー別にグループ化されたglyphs.jsonの読み込み
const glyphsStructured = JSON.parse(fs.readFileSync(glyphsStructuredPath, 'utf8'));

// テンプレートの読み込み
const template = fs.readFileSync(templatePath, 'utf8');

// カテゴリーリンクとグリフブロックの生成
const categoryLinks = [];
const glyphBlocks = [];

Object.entries(glyphsStructured).forEach(([category, items]) => {
  // カテゴリーリンクを追加
  categoryLinks.push(`<a href="#${category}" class="cat-link">${category}</a>`);
  
  // カテゴリーブロックを開始
  let block = `<h2 id="${category}">${category}</h2>\n<div class="category">`;
  
  // 各グリフのHTMLを追加
  items.forEach(item => {
  // コードを調整（E001 → EA01 変換が必要な場合）
  let codeForEntity = item.code;
  if (codeForEntity.startsWith('E') && !codeForEntity.startsWith('EA')) {
    const numericPart = codeForEntity.substring(1);
    codeForEntity = `EA${numericPart}`;
  }
    
    // グリフHTML（HTML実体参照を使用）
    const glyphHtml = `
<div class="glyph" data-name="${item.name}">
  <div class="glyph-char">&#x${codeForEntity};</div>
  <div class="glyph-name">${item.name}</div>
  <div class="codepoint">U+${item.code}</div>
</div>
`;
    block += glyphHtml;
  });
  
  // カテゴリーブロックを閉じる
  block += "</div>";
  glyphBlocks.push(block);
});

// テンプレートにデータを挿入
let finalHtml = template.replace("{{category_links}}", categoryLinks.join("\n"));
finalHtml = finalHtml.replace("{{glyph_blocks}}", glyphBlocks.join("\n"));

// ディレクトリが存在することを確認
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 最終的なHTMLを保存
fs.writeFileSync(outputPath, finalHtml);

console.log(`✅ Preview page regenerated: ${outputPath}`);

// CSSファイルのglyph-charルールを修正（オプション）
if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  
  // glyph-charのCSSルールを探す
  const glyphCharRule = /\.glyph-char\s*\{[^}]*\}/;
  
  // 新しいルール
  const newRule = `.glyph-char {
  font-family: "Fukiai";
  font-size: 54px;
  margin-bottom: var(--spacing-md);
  cursor: pointer;
  transition: transform var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
}`;
  
  // ルールを置き換えるか追加
  if (glyphCharRule.test(css)) {
    css = css.replace(glyphCharRule, newRule);
  } else {
    css += "\n\n" + newRule;
  }
  
  // 更新したCSSを保存
  fs.writeFileSync(cssPath, css);
  console.log(`✅ CSS updated for better glyph display`);
}
