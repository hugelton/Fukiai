const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// プロジェクトのルートディレクトリとディレクトリパス
const rootDir = path.join(__dirname, '..');
const svgDir = path.join(rootDir, 'svg');
const tempSvgDir = path.join(rootDir, 'temp_svg');

// temp_svgディレクトリが存在するか確認し、なければ作成
if (!fs.existsSync(tempSvgDir)) {
  fs.mkdirSync(tempSvgDir, { recursive: true });
}

console.log('🔍 Optimizing SVG files...');

// SVGOコマンド実行
const svgoCommand = `npx svgo -f ${svgDir} -o ${tempSvgDir} --config=${rootDir}/svgo.config.js`;

exec(svgoCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ SVGO execution error: ${error.message}`);
    return;
  }
  
  if (stderr) {
    console.error(`⚠️ SVGO stderr: ${stderr}`);
  }
  
  console.log('✅ SVG optimization completed!');
  console.log('📂 Optimized SVGs saved to temp_svg directory');
});
