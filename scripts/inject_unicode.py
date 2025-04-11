import json
import re
from pathlib import Path

# ディレクトリ設定
base = Path(__file__).parent.parent
glyphs_json = base / "glyphs.json"
svg_dir = base / "temp_svg"

# glyphs.json を読み込み
with open(glyphs_json, "r") as f:
    glyphs = json.load(f)

# 各 SVG に unicode 属性を挿入・修正
for name, code in glyphs.items():
    svg_path = svg_dir / f"{name}.svg"
    if not svg_path.exists():
        print(f"⚠️ Missing: {name}.svg")
        continue

    unicode_char = chr(int(code, 16))  # 実体文字に変換

    with open(svg_path, "r", encoding="utf-8") as f:
        content = f.read()

    # svg タグを探して挿入（既存の属性を保つ）
    match = re.search(r"<svg(.*?)>", content, re.DOTALL)
    if not match:
        print(f"❌ SVGタグが見つかりません: {name}.svg")
        continue

    attrs = match.group(1)
    # unicode属性がすでにあるなら置き換え
    if 'unicode="' in attrs:
        new_attrs = re.sub(r'unicode="[^"]+"', f'unicode="{unicode_char}"', attrs)
    else:
        new_attrs = attrs.strip() + f' unicode="{unicode_char}"'

    content = re.sub(
        r"<svg(.*?)>", f"<svg {new_attrs}>", content, count=1, flags=re.DOTALL
    )

    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(content)

print("✅ unicode 属性を埋め込みました。")
