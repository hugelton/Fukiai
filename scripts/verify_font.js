/**
 * フォントファイルの存在と正しいパスを検証するスクリプト
 */

const fs = require('fs');
const path = require('path');

// フォントのパス
const paths = {
  svg: path.join(__dirname, '..', 'build', 'fukiai.svg'),
  ttf: path.join(__dirname, '..', 'build', 'fukiai.ttf'),
  woff: path.join(__dirname, '..', 'build', 'fukiai.woff'),
  woffDocs: path.join(__dirname, '..', 'docs', 'fukiai.woff')
};

console.log('🔍 Fukiaiフォントファイルを検証中...\n');

// 各フォントファイルをチェック
Object.entries(paths).forEach(([type, filepath]) => {
  if (fs.existsSync(filepath)) {
    const stats = fs.statSync(filepath);
    const size = (stats.size / 1024).toFixed(2);
    console.log(`✅ ${type} フォント: ${filepath} (${size} KB)`);
  } else {
    console.log(`❌ ${type} フォント: ${filepath} (存在しません)`);
  }
});

// docsディレクトリのフォントが存在しない場合は、コピーするためのコマンドを表示
if (!fs.existsSync(paths.woffDocs) && fs.existsSync(paths.woff)) {
  console.log('\n⚠️ docs/ ディレクトリにWOFFフォントがありません');
  console.log('以下のコマンドを実行してフォントをコピーしてください:');
  console.log(`cp ${paths.woff} ${paths.woffDocs}`);
}

// HTML検証
const htmlPaths = {
  index: path.join(__dirname, '..', 'docs', 'index.html'),
  test: path.join(__dirname, '..', 'docs', 'test.html'),
  directTest: path.join(__dirname, '..', 'docs', 'direct-test.html')
};

console.log('\n🔍 HTMLファイルを検証中...\n');

Object.entries(htmlPaths).forEach(([type, filepath]) => {
  if (fs.existsSync(filepath)) {
    console.log(`✅ ${type} HTML: ${filepath}`);
  } else {
    console.log(`❌ ${type} HTML: ${filepath} (存在しません)`);
  }
});

// フォントに関する一般的な問題の解決方法
console.log('\n🛠️ 一般的な問題の解決方法:');
console.log('1. フォントファイルがビルドディレクトリにあるか確認してください');
console.log('2. フォントファイルをdocsディレクトリにコピーしてください: cp build/fukiai.woff docs/');
console.log('3. ブラウザのキャッシュをクリアして再読み込みしてください');
console.log('4. 開発者ツールでフォントの読み込みエラーを確認してください');
