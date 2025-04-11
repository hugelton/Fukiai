/**
 * Unicode情報を検証するためのユーティリティスクリプト
 * このスクリプトはSVGファイルとglyphs.jsonのUnicodeマッピングを比較します
 */

const fs = require('fs');
const path = require('path');

// プロジェクトのルートディレクトリを取得
const rootDir = path.join(__dirname, '..');

// glyphs.jsonを読み込む
const glyphsPath = path.join(rootDir, 'glyphs.json');
const glyphs = require(glyphsPath);

// temp_svgディレクトリのパス
const tempSvgDir = path.join(rootDir, 'temp_svg');

console.log('🔍 Checking Unicode mappings in SVG files...\n');
console.log('NAME                     | EXPECTED     | ACTUAL       | STATUS');
console.log('-------------------------|--------------|--------------|-------');

// 各グリフをチェック
let correct = 0;
let missing = 0;
let incorrect = 0;
let noUnicode = 0;

Object.entries(glyphs).forEach(([name, hex]) => {
  const svgPath = path.join(tempSvgDir, `${name}.svg`);
  
  if (!fs.existsSync(svgPath)) {
    console.log(`${name.padEnd(25)} | U+${hex.padEnd(10)} | MISSING      | ❌`);
    missing++;
    return;
  }
  
  // SVGファイルを読み込む
  const content = fs.readFileSync(svgPath, 'utf8');
  
  // Unicode属性を抽出
  const unicodeMatch = content.match(/unicode="([^"]*)"/);
  
  if (!unicodeMatch) {
    console.log(`${name.padEnd(25)} | U+${hex.padEnd(10)} | NO UNICODE   | ❌`);
    noUnicode++;
    return;
  }
  
  const unicodeValue = unicodeMatch[1];
  
  // Unicode文字をコードポイントに変換（16進数表記）
  const codePoint = unicodeValue.codePointAt(0).toString(16).toUpperCase();
  
  // 期待されるコードポイントと比較
  const expectedHex = hex.toUpperCase();
  
  if (codePoint === expectedHex) {
    console.log(`${name.padEnd(25)} | U+${hex.padEnd(10)} | U+${codePoint.padEnd(10)} | ✅`);
    correct++;
  } else {
    console.log(`${name.padEnd(25)} | U+${hex.padEnd(10)} | U+${codePoint.padEnd(10)} | ❌`);
    incorrect++;
  }
});

// 結果の概要
console.log('\n📊 SUMMARY:');
console.log(`✅ Correct: ${correct}`);
console.log(`❌ Incorrect: ${incorrect}`);
console.log(`❌ Missing Unicode: ${noUnicode}`);
console.log(`❌ Missing SVG files: ${missing}`);
console.log(`Total: ${correct + incorrect + noUnicode + missing}/${Object.keys(glyphs).length}`);

// 問題解決のためのヒント
if (incorrect > 0 || noUnicode > 0) {
  console.log('\n💡 RECOMMENDATIONS:');
  console.log('1. Use the build-debug script to rebuild the font with strict Unicode embedding');
  console.log('2. Check if SVG files have correct unicode attributes');
  console.log('3. Verify that the SVG to TTF conversion preserves Unicode mappings');
}
