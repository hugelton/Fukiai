/**
 * glyphs.jsonの順序でフォントを生成する超シンプルなスクリプト
 * Unicode属性を使わないアプローチ
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const glyphs = require('../glyphs.json');

// 変換ツールのパス
const rootDir = path.join(__dirname, '..');
const tempDir = path.join(rootDir, 'temp_ordered');
const buildDir = path.join(rootDir, 'build');
const docsDir = path.join(rootDir, 'docs');

// ディレクトリを準備
[tempDir, buildDir, docsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 既存のファイルをクリア
fs.readdirSync(tempDir).forEach(file => {
  if (file.endsWith('.svg')) {
    fs.unlinkSync(path.join(tempDir, file));
  }
});

console.log('🔄 SVGファイルを順序付きでコピーしています...');

// glyphs.jsonから順序付きのファイルリストを作成
const orderedFiles = [];
let index = 0;

// グリフをコピー（Unicode属性なし）
Object.entries(glyphs).forEach(([name, code]) => {
  const srcPath = path.join(rootDir, 'temp_svg', `${name}.svg`);
  
  if (!fs.existsSync(srcPath)) {
    console.log(`⚠️ ファイルが見つかりません: ${name}.svg`);
    return;
  }
  
  // 順序を付けてファイル名を作成（先頭に番号を付ける）
  const paddedIndex = String(index).padStart(4, '0');
  const destPath = path.join(tempDir, `${paddedIndex}-${name}.svg`);
  
  // ファイルをそのままコピー（Unicode属性は設定しない）
  fs.copyFileSync(srcPath, destPath);
  
  // リストに追加
  orderedFiles.push(destPath);
  index++;
});

console.log(`✅ ${orderedFiles.length}個のSVGファイルを順序付きでコピーしました`);

// シェルスクリプトを作成（実行しやすい形式）
const shellScript = `#!/bin/bash

set -e

# SVGフォントを生成
echo "🔄 SVGフォントを生成しています..."
npx svgicons2svgfont -f Fukiai -o ${buildDir}/fukiai.svg \\
${orderedFiles.map(f => `  "${f}" \\`).join('\n')}

# TTFに変換
echo "🔄 TTFに変換しています..."
npx svg2ttf ${buildDir}/fukiai.svg ${buildDir}/fukiai.ttf

# WOFFに変換
echo "🔄 WOFFに変換しています..."
npx ttf2woff ${buildDir}/fukiai.ttf ${buildDir}/fukiai.woff

# docsにコピー
echo "🔄 docsにコピーしています..."
cp ${buildDir}/fukiai.woff ${docsDir}/

echo "✅ フォントのビルドが完了しました"
`;

// シェルスクリプトを保存
const scriptPath = path.join(__dirname, 'generate_font.sh');
fs.writeFileSync(scriptPath, shellScript);
fs.chmodSync(scriptPath, '755'); // 実行権限を付与

console.log(`✅ シェルスクリプトを生成しました: ${scriptPath}`);
console.log('🔄 シェルスクリプトを実行します...');

// シェルスクリプトを実行
try {
  execSync(scriptPath, { stdio: 'inherit' });
  console.log('🎉 フォントのビルドが正常に完了しました！');
} catch (error) {
  console.error('⚠️ フォントのビルドでエラーが発生しました:', error.message);
  process.exit(1);
}
