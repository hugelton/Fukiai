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

// グリフ名を読みやすいタイトルに変換する関数
function formatTitle(name) {
  // プレフィックスを削除
  let title = name
    .replace(/^control[-_]/, '')
    .replace(/^function[-_]/, '')
    .replace(/^symbol[-_]/, '')
    .replace(/^waveform[-_]/, '')
    .replace(/^port[-_]/, '')
    .replace(/^ui[-_]/, '')
    .replace(/^numbers[-_]/, '');

  // アンダースコアをスペースに変換し、各単語の最初を大文字に
  return title
    .split(/[_-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// テンプレートを読み込む
console.log('🔄 テンプレートを読み込んでいます...');
const templateRaw = fs.readFileSync(templatePath, 'utf8');
// Use versioned filenames to avoid GH Pages cache issues
const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const version = (pkg.version || Date.now().toString()).replace(/[^0-9A-Za-z_.-]/g, '');
const template = templateRaw
  .replace(/fukiai\.woff/g, `fukiai.v${version}.woff`)
  .replace(/fukiai\.ttf/g, `fukiai.v${version}.ttf`);

// glyphs_structured.jsonを読み込む
console.log('🔄 glyphs_structured.jsonを読み込んでいます...');
const structured = JSON.parse(fs.readFileSync(structuredPath, 'utf8'));

// カテゴリーリンクを生成（ミニマルUIラッパー付き）
const categoryLinks = '<div class="cat-links">' +
  Object.keys(structured).map(category => 
    `<a href="#${category}" class="cat-link">${category}</a>`
  ).join('\n') + '</div>';

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
    
    // ミニマル表示: タイトル + アイコン + コピー用バッジ（name / unicode[xEEEE]）
    const title = formatTitle(item.name);
    const unicodeX = `x${displayCode}`;
    block += `
<div class="glyph" data-name="${item.name}">
  <div class="glyph-char" title="Click to copy entity">&#x${displayCode};</div>
  <div class="glyph-title">${title}</div>
  <div class="glyph-meta">
    <span class="badge copy-name" data-copy="${item.name}" title="Copy name">${item.name}</span>
    <span class="badge copy-unicode" data-copy="${unicodeX}" title="Copy unicode">${unicodeX}</span>
  </div>
</div>
`;
  });
  
  block += '</div>';
  glyphBlocks.push(block);
});

// テンプレートに挿入
let finalHtml = template.replace('{{category_links}}', categoryLinks);
finalHtml = finalHtml.replace('{{glyph_blocks}}', glyphBlocks.join('\n'));
finalHtml = finalHtml.replace(/{{version}}/g, version);

// HTMLをファイルに保存
fs.writeFileSync(outputPath, finalHtml);
console.log(`✅ プレビューHTMLを生成しました: ${outputPath}`);
