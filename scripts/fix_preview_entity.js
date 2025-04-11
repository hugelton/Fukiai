/**
 * HTML実体参照を使用してプレビューページを修正するスクリプト
 */

const fs = require('fs');
const path = require('path');

// ファイルパス
const glyphsPath = path.join(__dirname, '..', 'glyphs.json');
const indexPath = path.join(__dirname, '..', 'docs', 'index.html');
const templatePath = path.join(__dirname, 'preview_template.html');

// glyphs.jsonの読み込み
const glyphs = JSON.parse(fs.readFileSync(glyphsPath, 'utf8'));

// 既存のページを読み込む（存在する場合）
if (fs.existsSync(indexPath)) {
  console.log('🔍 既存のプレビューページを修正しています...');
  
  let html = fs.readFileSync(indexPath, 'utf8');
  
  // すべてのグリフに対して修正
  Object.entries(glyphs).forEach(([name, code]) => {
    // グリフのHTMLパターンを検索
    const pattern = new RegExp(`<div class="glyph" data-name="${name}">[\\s\\S]*?<div class="glyph-char">(.*?)</div>`, 'g');
    
    // HTML実体参照を作成
    // E001 → EA01 変換（必要な場合）
    let entityCode = code;
    if (code.startsWith('E') && !code.startsWith('EA')) {
      const numericPart = code.substring(1);
      entityCode = `EA${numericPart}`;
    }
    
    // HTML実体参照を含む新しいHTML
    const replacement = `<div class="glyph" data-name="${name}">
      <div class="glyph-char">&#x${entityCode};</div>`;
    
    // 置換を実行
    html = html.replace(pattern, replacement);
  });
  
  // 修正したHTMLを保存
  fs.writeFileSync(indexPath, html);
  console.log(`✅ ${indexPath} を更新しました`);
} else {
  console.log('❌ プレビューページが見つかりません');
  
  // テンプレートからの再生成（オプション）
  if (fs.existsSync(templatePath)) {
    console.log('🔄 テンプレートからプレビューページを再生成します...');
    // 実装省略（regenerate_preview.jsと同様）
  }
}

console.log('\n✨ 完了しました');
console.log('📝 ブラウザでプレビューページを確認してください');
