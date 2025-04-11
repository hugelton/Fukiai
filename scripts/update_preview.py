import json
from pathlib import Path

base = Path(__file__).parent

# 1. まず現在のHTML内の実体文字を削除し、CSSで表示するように変更
def update_html_preview():
    html_path = base.parent / "docs" / "index.html"
    
    print(f"🔄 Updating HTML preview at {html_path}")
    
    if not html_path.exists():
        print("❌ HTML preview file not found.")
        return False
        
    # HTMLを読み込み
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()
    
    # スタイルセクション（UTF-8エスケープを使用）
    style_content = """
    /* Unicode文字をCSS content属性で表示 */
    .glyph-char::before {
      font-family: "Fukiai";
      content: attr(data-unicode);
      font-size: 54px;
      display: block;
    }
    """
    
    # スタイルを挿入
    if "</style>" in html:
        html = html.replace("</style>", f"{style_content}</style>")
    else:
        print("❌ Could not find style closing tag in HTML.")
        return False
    
    # glyphs.jsonからコードポイントをロード
    with open(base.parent / "glyphs.json", "r") as f:
        glyphs = json.load(f)
    
    # 各グリフのHTML要素を更新
    for name, code in glyphs.items():
        # 実体が入る場所を特定
        glyph_start = f'<div class="glyph" data-name="{name}">'
        glyph_char_start = f'<div class="glyph-char">'
        glyph_char_end = '</div>'
        
        # 実体を空に置き換え、data-unicode属性を追加
        if glyph_start in html and glyph_char_start in html:
            # 該当部分を特定
            start_pos = html.find(glyph_start)
            if start_pos >= 0:
                char_start = html.find(glyph_char_start, start_pos)
                if char_start >= 0:
                    char_end = html.find(glyph_char_end, char_start)
                    if char_end >= 0:
                        # 古い部分を切り出し
                        old_part = html[char_start:char_end + len(glyph_char_end)]
                        # 新しい部分に置き換え（Unicode値をデータ属性に）
                        new_part = f'<div class="glyph-char" data-unicode="\\{code}"></div>'
                        html = html.replace(old_part, new_part)
    
    # 更新したHTMLを保存
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    
    print("✅ HTML preview updated with CSS-based Unicode display.")
    return True

if __name__ == "__main__":
    update_html_preview()
