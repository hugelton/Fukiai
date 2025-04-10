
import json
from pathlib import Path
from collections import defaultdict

with open("glyphs_structured.json", "r") as f:
    glyphs = json.load(f)

# カテゴリごとに分ける
categories = defaultdict(list)
for i, entry in enumerate(glyphs):
    entry["codepoint"] = 0xEA00 + i
    categories[entry["category"]].append(entry)

# docs/ を作成
Path("docs").mkdir(exist_ok=True)

# HTML出力
with open("docs/index.html", "w", encoding="utf-8") as f:
    f.write("""<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <title>Fukiai Icon Preview</title>
  <style>
    @font-face {
      font-family: 'Fukiai';
      src: url('fukiai.woff') format('woff');
    }
    body { font-family: sans-serif; padding: 2rem; background: #f7f7f7; }
    h1 { font-size: 1.8rem; }
    h2 { margin-top: 2rem; font-size: 1.2rem; border-bottom: 1px solid #ccc; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem; }
    .icon {
      background: white; border: 1px solid #ddd; border-radius: 6px; padding: 1rem;
      text-align: center; font-size: 32px; cursor: pointer;
    }
    .icon:hover { background: #eaf6ff; }
    .icon-name { font-size: 0.75rem; margin-top: 0.5rem; word-break: break-word; }
    .unicode { font-size: 0.65rem; color: #888; }
    .glyph { font-family: 'Fukiai'; display: block; }
  </style>
</head>
<body>
  <h1>Fukiai Icon Preview</h1>
  <p>Click an icon to copy it to clipboard.</p>
""")

    for category in sorted(categories):
        f.write(f"  <h2>{category}</h2>\n")
        f.write("  <div class='grid'>\n")
        for entry in categories[category]:
            char = f"&#x{entry['codepoint']:04X};"
            label = entry['name']
            uni = f"U+{entry['codepoint']:04X}"
            f.write(f"    <div class='icon' onclick='copyToClipboard(this)'>\n")
            f.write(f"      <span class='glyph'>{char}</span>\n")
            f.write(f"      <div class='icon-name'>{label}<br><span class='unicode'>{uni}</span></div>\n")
            f.write("    </div>\n")
        f.write("  </div>\n")

    f.write("""
<script>
function copyToClipboard(el) {
  const glyph = el.querySelector('.glyph').textContent;
  navigator.clipboard.writeText(glyph).then(() => {
    el.style.background = '#cff';
    setTimeout(() => el.style.background = '', 500);
  });
}
</script>
</body>
</html>
""")

print("✅ docs/index.html generated with categories and copy-to-clipboard")
