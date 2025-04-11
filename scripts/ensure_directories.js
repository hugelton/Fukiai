/**
 * 必要なディレクトリを確保するスクリプト
 */
const fs = require('fs');
const path = require('path');

// プロジェクトのルートディレクトリを取得
const rootDir = path.join(__dirname, '..');

// 作成するディレクトリのリスト
const requiredDirs = [
  path.join(rootDir, 'build'),
  path.join(rootDir, 'temp_svg'),
  path.join(rootDir, 'temp_ordered'),
  path.join(rootDir, 'temp_unicode'),
  path.join(rootDir, 'docs'),
];

// ディレクトリを作成
requiredDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log(`📁 Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  } else {
    console.log(`✓ Directory exists: ${dir}`);
  }
});

console.log('🚀 All required directories are ready!');
