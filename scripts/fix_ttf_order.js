/**
 * TTFフォントのグリフ順序を修正するための準備スクリプト
 * 順序付きSVGファイルを生成します
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// パス設定
const rootDir = path.join(__dirname, '..');
const tempSvgDir = path.join(rootDir, 'temp_svg');
const tempOrderedDir = path.join(rootDir, 'temp_ordered');
const glyphsPath = path.join(rootDir, 'glyphs.json');

// glyphs.jsonを読み込む
console.log('🔄 glyphs.jsonを読み込みます...');
const glyphs = require(glyphsPath);

// temp_orderedディレクトリを準備
if (fs.existsSync(tempOrderedDir)) {
  // ディレクトリ内のファイルをクリア
  fs.readdirSync(tempOrderedDir).forEach(file => {
    fs.unlinkSync(path.join(tempOrderedDir, file));
  });
} else {
  // ディレクトリを作成
  fs.mkdirSync(tempOrderedDir, { recursive: true });
}

// SVGファイルを順序付きでコピー
console.log('🔄 SVGファイルを順序付きでコピーします...');

let index = 0;
const orderedFiles = [];

Object.entries(glyphs).forEach(([name, code]) => {
  const sourcePath = path.join(tempSvgDir, `${name}.svg`);
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`⚠️ ファイルが見つかりません: ${name}.svg`);
    return;
  }
  
  // ファイル名に順序を追加（svgicons2svgfontがファイル名順に処理するため）
  const paddedIndex = String(index).padStart(4, '0');
  const destPath = path.join(tempOrderedDir, `${paddedIndex}-${name}.svg`);
  
  // ファイルをコピー
  fs.copyFileSync(sourcePath, destPath);
  
  // 順序付きファイル名を保存
  orderedFiles.push(destPath);
  
  console.log(`✅ コピー: ${name}.svg → ${paddedIndex}-${name}.svg`);
  index++;
});

// SVGフォントを生成するコマンドを準備
console.log('\n🔄 SVGフォントを生成するコマンド:');
const svgFontCmd = `npx svgicons2svgfont -f Fukiai -o build/fukiai.svg ${orderedFiles.join(' ')}`;
console.log(svgFontCmd);

// コマンドをファイルに保存
const cmdFilePath = path.join(rootDir, 'scripts', 'generate_svg_font.sh');
fs.writeFileSync(cmdFilePath, `#!/bin/bash\n\nset -e\n\nmkdir -p build\n\n${svgFontCmd}\n\n# TTFに変換\nnpx svg2ttf build/fukiai.svg build/fukiai.ttf\n\n# WOFFに変換\nnpx ttf2woff build/fukiai.ttf build/fukiai.woff\n\n# docsディレクトリにコピー\nmkdir -p docs\ncp build/fukiai.woff docs/\n\necho "✅ Font built successfully"\n`);

// 実行権限を付与
try {
  execSync(`chmod +x ${cmdFilePath}`);
  console.log(`✅ スクリプトを作成しました: ${cmdFilePath}`);
} catch (err) {
  console.log(`⚠️ 実行権限の設定に失敗しました。手動で設定してください: chmod +x ${cmdFilePath}`);
}

console.log('\n📝 次のステップ:');
console.log(`1. シェルスクリプトを実行: bash ${cmdFilePath}`);
console.log('2. フォントのグリフ順序を確認');
