/**
 * glyphs.jsonとglyphs_structured.jsonのUnicodeを修正するスクリプト
 * EAAA001形式をEA01形式に修正します
 */
const fs = require('fs');
const path = require('path');

// パス設定
const rootDir = path.join(__dirname, '..');
const glyphsPath = path.join(rootDir, 'glyphs.json');
const structuredPath = path.join(rootDir, 'glyphs_structured.json');

// 現在のglyphs.jsonを読み込む
console.log('🔄 glyphs.jsonを読み込んでいます...');
const glyphs = require(glyphsPath);

// 修正済みのデータを作成
const fixedGlyphs = {};

Object.entries(glyphs).forEach(([name, code]) => {
  // EAAA001 形式を EA01 形式に修正
  let fixedCode = code;
  if (code.startsWith('EAAA')) {
    // EAAA001 → EA01 に変換
    const num = parseInt(code.substring(4), 16);
    fixedCode = 'EA' + num.toString(16).toUpperCase().padStart(2, '0');
  } else if (code.startsWith('EA')) {
    // すべてのEAで始まるコードに対して2桁パディングを適用
    const num = parseInt(code.substring(2), 16);
    fixedCode = 'EA' + num.toString(16).toUpperCase().padStart(2, '0');
  } else if (code.startsWith('E') && !code.startsWith('EA')) {
    // E001 → EA01 に変換
    const num = parseInt(code.substring(1), 16);
    fixedCode = 'EA' + num.toString(16).toUpperCase().padStart(2, '0');
  }
  
  fixedGlyphs[name] = fixedCode;
});

// 修正したglyphs.jsonを保存
fs.writeFileSync(glyphsPath, JSON.stringify(fixedGlyphs, null, 2));
console.log('✅ glyphs.jsonを修正しました');

// glyphs_structured.jsonを修正
if (fs.existsSync(structuredPath)) {
  console.log('🔄 glyphs_structured.jsonを読み込んでいます...');
  const structured = JSON.parse(fs.readFileSync(structuredPath, 'utf8'));
  
  // 各カテゴリのアイテムを修正
  Object.keys(structured).forEach(category => {
    structured[category].forEach(item => {
      // EAAA001 形式を EA01 形式に修正
      if (item.code.startsWith('EAAA')) {
        const num = parseInt(item.code.substring(4), 16);
        item.code = 'EA' + num.toString(16).toUpperCase().padStart(2, '0');
      } else if (item.code.startsWith('EA')) {
        // すべてのEAで始まるコードに対して2桁パディングを適用
        const num = parseInt(item.code.substring(2), 16);
        item.code = 'EA' + num.toString(16).toUpperCase().padStart(2, '0');
      } else if (item.code.startsWith('E') && !item.code.startsWith('EA')) {
        const num = parseInt(item.code.substring(1), 16);
        item.code = 'EA' + num.toString(16).toUpperCase().padStart(2, '0');
      }
    });
  });
  
  // 修正したglyphs_structured.jsonを保存
  fs.writeFileSync(structuredPath, JSON.stringify(structured, null, 2));
  console.log('✅ glyphs_structured.jsonを修正しました');
}
