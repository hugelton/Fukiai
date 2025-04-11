import json
from pathlib import Path

with open("glyphs.json", "r") as f:
    glyphs = json.load(f)

structured = {}

for name, code in glyphs.items():
    if "_" in name:
        category = name.split("_")[0]
    else:
        category = "uncategorized"
    
    structured.setdefault(category, []).append({
        "name": name,
        "code": code.upper()
    })

with open("glyphs_structured.json", "w") as f:
    json.dump(structured, f, indent=2)

print("✅ Converted to glyphs_structured.json (grouped by category)")
