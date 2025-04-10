
import os
import json
from xml.etree import ElementTree as ET
from pathlib import Path

# Load glyph map
with open("glyphs.json", "r") as f:
    glyphs = json.load(f)

# Output directory
output_dir = Path("temp_svg")
output_dir.mkdir(parents=True, exist_ok=True)

# Base unicode
base_codepoint = 0xEA00

for i, name in enumerate(glyphs):
    codepoint = base_codepoint + i
    src_file = Path("svg") / f"{name}.svg"
    dst_file = output_dir / f"{name}.svg"

    if not src_file.exists():
        print(f"⚠️ {name}.svg not found")
        continue

    tree = ET.parse(src_file)
    root = tree.getroot()

    # Apply unicode attribute (on root <svg>)
    root.set("unicode", f"&#x{codepoint:04X};")

    # Re-save with all children preserved
    ET.register_namespace("", "http://www.w3.org/2000/svg")
    tree.write(dst_file, encoding="utf-8", xml_declaration=True)
    print(f"✅ {dst_file.name} updated")
