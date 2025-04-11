import json
from pathlib import Path
import re

base = Path(__file__).parent

def fix_preview():
    html_path = base.parent / "docs" / "index.html"
    css_path = base.parent / "docs" / "style.css"
    
    print(f"🔄 Fixing preview at {html_path}")
    
    if not html_path.exists():
        print("❌ HTML preview file not found.")
        return False
    
    # 1. CSSファイルに新しいスタイルを追加
    with open(css_path, "r", encoding="utf-8") as f:
        css = f.read()
    
    # Fukiaiフォント用のCSSルールを探す
    font_face_rule = """@font-face {
    font-family: "Fukiai";
    src: url("fukiai.woff") format("woff");
    font-weight: normal;
    font-style: normal;
}"""
    
    # アイコン表示用の新しいCSSルール
    glyph_css = """
/* Fukiaiアイコン表示用のスタイル */
.glyph-char {
    font-family: "Fukiai";
    font-size: 54px;
    height: 54px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-md);
    cursor: pointer;
    transition: transform var(--transition-fast);
}

/* アイコンのホバー効果 */
.glyph:hover .glyph-char {
    transform: scale(1.1);
}
"""
    
    # CSSに新しいルールを追加（既存のものは上書き）
    if ".glyph-char {" in css:
        # 既存のglyph-charルールを置き換え
        css = re.sub(r"\.glyph-char\s*\{[^}]+\}", glyph_css, css)
    else:
        # 新しいルールを追加
        css += glyph_css
    
    # 更新したCSSを保存
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(css)
    print("✅ CSS updated")
    
    # 2. HTMLを更新してエスケープシーケンスを実際の文字に変換
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()
    
    # glyphs.jsonからコードポイントを取得
    with open(base.parent / "glyphs.json", "r") as f:
        glyphs = json.load(f)
    
    # 各グリフ要素を探して更新
    for name, code in glyphs.items():
        # グリフ要素のパターン（名前で特定）
        pattern = rf'<div class="glyph" data-name="{name}">(.*?)<div class="glyph-char">(.*?)</div>'
        
        # Unicode文字に変換（16進数から10進数に、そして文字に）
        unicode_char = chr(int(code, 16))
        
        # 文字を含む新しいglyph-char要素
        replacement = f'<div class="glyph" data-name="{name}">\\1<div class="glyph-char">{unicode_char}</div>'
        
        # 置換を実行
        html = re.sub(pattern, replacement, html, flags=re.DOTALL)
    
    # 更新したHTMLを保存
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    
    print("✅ HTML updated with actual Unicode characters")
    return True

if __name__ == "__main__":
    fix_preview()
