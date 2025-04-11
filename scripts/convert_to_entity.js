/**
 * Unicode文字をHTML実体参照に変換するスクリプト
 */

const fs = require('fs');
const path = require('path');

// パス設定
const rootDir = path.join(__dirname, '..');
const indexPath = path.join(rootDir, 'docs', 'index.html');

// index.htmlを読み込む
console.log(`🔄 ${indexPath} を読み込み中...`);
let html = fs.readFileSync(indexPath, 'utf8');

// 各glyph-charのdivを処理
console.log('🔄 Unicode文字をHTML実体参照に変換中...');

// 正規表現でglyph-charクラスのdivを検索
const pattern = /<div class="glyph-char">([^<]+)<\/div>\s*<div class="glyph-name">([^<]+)<\/div>\s*<div class="codepoint">U\+([^<]+)<\/div>/g;

// 変換して置換
let replaced = 0;
html = html.replace(pattern, (match, unicodeChar, name, codepoint) => {
  replaced++;
  return `<div class="glyph-char">&#x${codepoint};</div>
  <div class="glyph-name">${name}</div>
  <div class="codepoint">U+${codepoint}</div>`;
});

// 変更をファイルに保存
fs.writeFileSync(indexPath, html);
console.log(`✅ ${replaced}個のUnicode文字をHTML実体参照に変換しました`);
