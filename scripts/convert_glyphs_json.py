import json
from pathlib import Path

# 旧形式 glyphs.json を読み込み（["waveform_sine", ...]）
with open("glyphs.json", "r") as f:
    names = json.load(f)

# ドメイン名（接頭辞）でカテゴリ分類
def extract_category(name):
    return name.split("_")[0] if "_" in name else "misc"

# 新形式に変換 [{"name": ..., "category": ...}, ...]
new_glyphs = [
    {"name": name, "category": extract_category(name)}
    for name in names
]

# 新形式を glyphs_structured.json に保存
with open("glyphs_structured.json", "w") as f:
    json.dump(new_glyphs, f, indent=2)

print("✅ Converted to glyphs_structured.json")
