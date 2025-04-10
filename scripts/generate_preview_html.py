
import json
from pathlib import Path

with open("glyphs.json", "r") as f:
    glyphs = json.load(f)

Path("docs").mkdir(exist_ok=True)

html_head = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Fukiai Icon Preview</title>
  <style>
    @font-face {
      font-family: 'Fukiai';
      src: url('fukiai.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }
    body {
      font-family: sans-serif;
      padding: 2rem;
      background: #f7f7f7;
    }
    h1 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 1rem;
    }
    .icon {
      background: white;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 1rem;
      text-align: center;
      font-size: 32px;
    }
    .icon-name {
      font-size: 0.75rem;
      margin-top: 0.5rem;
      word-break: break-word;
    }
    .glyph {
      font-family: 'Fukiai';
      display: block;
    }
  </style>
</head>
<body>
  <h1>Fukiai Icon Preview</h1>
  <div class="grid">
"""

html_foot = """
  </div>
</body>
</html>
"""

with open("docs/index.html", "w", encoding="utf-8") as f:
    f.write(html_head)
    for i, name in enumerate(glyphs):
        codepoint = 0xEA00 + i
        char = f"&#x{codepoint:04X};"
        f.write(f'''
    <div class="icon">
      <span class="glyph">{char}</span>
      <div class="icon-name">{name}</div>
    </div>''')
    f.write(html_foot)

print("✅ docs/index.html generated")
