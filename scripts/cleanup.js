/**
 * 一時ファイルをクリーンアップするスクリプト
 */
const fs = require('fs');
const path = require('path');

// プロジェクトのルートディレクトリを取得
const rootDir = path.join(__dirname, '..');

// クリーンアップするディレクトリのリスト
const cleanupDirs = [
  path.join(rootDir, 'temp_svg'),
  path.join(rootDir, 'temp_ordered'),
  path.join(rootDir, 'temp_unicode'),
];

// クリーンアップする個別のファイルリスト
const cleanupFiles = [
  path.join(rootDir, 'temp_unicode_map.json'),
];

// ディレクトリのクリーンアップ処理
cleanupDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`🧹 Cleaning up directory: ${dir}`);
    
    // ディレクトリ内のファイルのみを削除し、ディレクトリ自体は残す
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      
      // ファイルのみを削除（ディレクトリは無視）
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
        if (process.env.VERBOSE) {
          console.log(`  Deleted: ${file}`);
        }
      }
    });
    
    console.log(`✨ Cleanup completed for ${dir}`);
  } else {
    console.log(`⚠️ Directory does not exist: ${dir}`);
  }
});

// 個別ファイルのクリーンアップ処理
cleanupFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`🧹 Cleaning up file: ${file}`);
    fs.unlinkSync(file);
    console.log(`✨ Deleted file: ${path.basename(file)}`);
  } else {
    console.log(`⚠️ File does not exist: ${file}`);
  }
});

console.log('🎉 All temporary files have been cleaned up!');
