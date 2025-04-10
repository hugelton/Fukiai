import os, json
from pathlib import Path
from xml.etree import ElementTree as ET

with open("glyphs.json", "r", encoding="utf-8") as f:
    mapping = json.load(f)

src_dir = Path("svg")
dst_dir = Path("temp_svg")
dst_dir.mkdir(exist_ok=True)

for name, hexcode in mapping.items():
    src_file = src_dir / f"{name}.svg"
    if not src_file.exists():
        continue

    tree = ET.parse(str(src_file))
    root = tree.getroot()
    root.set("unicode", f"&#x{hexcode};")  # Unicode注入

    dst_file = dst_dir / f"{name}.svg"
    tree.write(str(dst_file), encoding="utf-8", xml_declaration=True)
