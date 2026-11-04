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
  // names are semantic (no domain prefix): "play_reverse_fill" -> "Play Reverse Fill"
  return name
    .split(/[_-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// テンプレートを読み込む
console.log('🔄 テンプレートを読み込んでいます...');
const templateRaw = fs.readFileSync(templatePath, 'utf8');
// Use version query on versionless filenames to avoid stale caches while keeping release filenames clean
const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const version = (pkg.version || Date.now().toString()).replace(/[^0-9A-Za-z_.-]/g, '');
// For Pages, point to versioned subfolder to defeat CDN caches
const assetPrefix = `assets/${version}`;
let template = templateRaw
  .replace(/fukiai\.woff/g, `${assetPrefix}/fukiai.woff`)
  .replace(/fukiai\.ttf/g, `${assetPrefix}/fukiai.ttf`);

// Inline WOFF as data URL to avoid any external font caching issues on GH Pages
try {
  const woffPath = path.join(rootDir, 'docs', assetPrefix, 'fukiai.woff');
  const woffData = fs.readFileSync(woffPath);
  const woffB64 = woffData.toString('base64');
  const dataUrl = `data:font/woff;base64,${woffB64}`;
  template = template.replace(`${assetPrefix}/fukiai.woff`, dataUrl);
} catch (e) {
  // If missing, keep URL fallback
}

// glyphs_structured.jsonを読み込む
console.log('🔄 glyphs_structured.jsonを読み込んでいます...');
const structured = JSON.parse(fs.readFileSync(structuredPath, 'utf8'));

// カテゴリーリンクを生成（ミニマルUIラッパー付き）
const categoryLinks = '<div class="cat-links">' +
  Object.keys(structured).map(category => 
    `<a href="#${category}" class="cat-link">${category}</a>`
  ).join('\n') + '</div>';

// Pre-1.0 names, so that a search for control_play_f still finds play_fill
const aliases = require(path.join(rootDir, 'aliases.json'));
const oldNames = {};
Object.entries(aliases).forEach(([old, current]) => { (oldNames[current] = oldNames[current] || []).push(old); });

// Glyphs with layers (primary / secondary / background) are also embedded as inline SVG, so that Tint and
// Multicolor can be shown; the icon font is monochrome.
function layeredSvg(name) {
  const file = path.join(rootDir, 'svg', name + '.svg');
  if (!fs.existsSync(file)) return null;
  const src = fs.readFileSync(file, 'utf8');
  if (!/<g id="(primary|secondary|background)"/.test(src)) return null;
  return src
    .slice(src.indexOf('<svg'))
    .replace(/<svg[^>]*>/, '<svg class="glyph-svg" viewBox="0 0 500 500" aria-hidden="true">')
    .replace(/<g id="(background|base|primary|secondary)"[^>]*>/g, '<g class="layer layer-$1">')
    .replace(/\s*\n\s*/g, '');
}

function entity(code) {
  return '&#x' + code + ';';
}

// グリフブロックを生成
const glyphBlocks = [];


Object.entries(structured).forEach(([category, items]) => {
  const byName = {};
  items.forEach(item => { byName[item.name] = item; });
  let block = `<h2 id="${category}">${category}</h2>\n<div class="category">`;
  let group = null;

  items.forEach(item => {
    if (item.name.endsWith('_fill') && byName[item.name.slice(0, -5)]) return;   // shown on the card of its Outline
    if (item.group !== group) {
      group = item.group;
      if (group !== category) block += `\n<h3 class="group-title">${group}</h3>`;   // not when it only repeats the category
    }
    const fill = byName[item.name + '_fill'];
    const svg = layeredSvg(item.name);
    const title = formatTitle(item.name);
    const names = [item.name].concat(fill ? [fill.name] : []);
    const search = names.concat(names.flatMap(n => oldNames[n] || []), [group, category]).join(' ');
    block += `
<div class="glyph${svg ? ' layered' : ''}${fill ? ' has-fill' : ''}" data-name="${item.name}" data-search="${search}"` +
      `${fill ? ` data-fill-name="${fill.name}" data-fill-code="${fill.code}"` : ''} data-code="${item.code}">
  <div class="glyph-art" title="Click to copy the character">
    <div class="glyph-char">${entity(item.code)}</div>${svg || ''}
  </div>
  <div class="glyph-title">${title}</div>
  <div class="glyph-meta">
    <span class="badge copy-name" data-copy="${item.name}" title="Copy name">${item.name}</span>
    <span class="badge copy-unicode" data-copy="x${item.code}" title="Copy unicode">x${item.code}</span>
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
