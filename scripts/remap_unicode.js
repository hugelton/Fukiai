/**
 * Unicode マッピングの修正スクリプト
 * E001 → EA01 のように、プレフィックスを変更します
 */

const fs = require('fs');
const path = require('path');

// 設定
const sourcePrefix = 'E'; // 元のプレフィックス (E001)
const targetPrefix = 'EA'; // 新しいプレフィックス (EA01)

// ファイルパス
const glyphsPath = path.join(__dirname, '..', 'glyphs.json');
const structuredPath = path.join(__dirname, '..', 'glyphs_structured.json');

// glyphs.jsonの読み込み
const glyphs = JSON.parse(fs.readFileSync(glyphsPath, 'utf8'));

// マッピングの変換
const remappedGlyphs = {};
let count = 0;

for (const [name, code] of Object.entries(glyphs)) {
  // コードがsourcePrefixで始まるか確認
  if (code.startsWith(sourcePrefix)) {
    // 数値部分を抽出
    const numericPart = code.substring(sourcePrefix.length);
    // 新しいコードを作成
    const newCode = `${targetPrefix}${numericPart}`;
    remappedGlyphs[name] = newCode;
    count++;
  } else {
    // 既にターゲットプレフィックスを持っているか、別のプレフィックスの場合はそのまま
    remappedGlyphs[name] = code;
  }
}

// 変更を確認
console.log(`🔄 Unicode マッピングを変更: ${sourcePrefix}xxx → ${targetPrefix}xx`);
console.log(`✅ ${count}個のグリフのUnicodeが変更されました`);

// ファイルに書き込み
fs.writeFileSync(glyphsPath, JSON.stringify(remappedGlyphs, null, 2));
console.log(`✅ ${glyphsPath} を更新しました`);

// structured.jsonも更新
if (fs.existsSync(structuredPath)) {
  // glyphs_structured.jsonの読み込み
  const structured = JSON.parse(fs.readFileSync(structuredPath, 'utf8'));
  
  // 各カテゴリの各グリフのコードを更新
  for (const category in structured) {
    structured[category].forEach(item => {
      if (item.code.startsWith(sourcePrefix)) {
        const numericPart = item.code.substring(sourcePrefix.length);
        item.code = `${targetPrefix}${numericPart}`;
      }
    });
  }
  
  // ファイルに書き込み
  fs.writeFileSync(structuredPath, JSON.stringify(structured, null, 2));
  console.log(`✅ ${structuredPath} を更新しました`);
}

console.log(`\n🔍 次のステップ:`);
console.log(`1. フォントを再ビルドしてください: npm run full-build`);
console.log(`2. プレビューをテストしてください: docs/direct-test.html`);
