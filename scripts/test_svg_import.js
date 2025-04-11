// svgicons2svgfontパッケージのインポート方法をテストするスクリプト
const svgicons2svgfont = require('svgicons2svgfont');

// パッケージの構造を確認
console.log('svgicons2svgfont imported as:', typeof svgicons2svgfont);
console.log('Properties:', Object.keys(svgicons2svgfont));

// パッケージが関数かクラスか確認
if (typeof svgicons2svgfont === 'function') {
  console.log('It\'s a function (constructor), you can use it directly with `new svgicons2svgfont()`');
} else if (typeof svgicons2svgfont === 'object') {
  if (svgicons2svgfont.default) {
    console.log('It has a default export:', typeof svgicons2svgfont.default);
  }
  
  // 他の可能なエクスポートを確認
  for (const key in svgicons2svgfont) {
    console.log(`Property "${key}" is typeof:`, typeof svgicons2svgfont[key]);
  }
}
