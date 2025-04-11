import json
from pathlib import Path

base = Path(__file__).parent

# Load structured glyphs
with open(base.parent / "glyphs_structured.json", "r") as f:
    structured = json.load(f)

# Load template
with open(base / "preview_template.html", "r") as f:
    template = f.read()

# Create category index and glyph blocks
category_links = []
glyph_blocks = []

for category, items in structured.items():
    anchor = f'<a href="#{category}" class="cat-link">{category}</a>'
    category_links.append(anchor)

    block = f'<h2 id="{category}">{category}</h2>\n<div class="category">'
    for item in items:
        char = chr(int(item["code"], 16))
        glyph_html = f"""
<div class=\"glyph\" data-name=\"{item['name']}\">
  <div class=\"glyph-char\">{char}</div>
  <div class=\"glyph-name\">{item['name']}</div>
  <div class=\"codepoint\">U+{item['code']}</div>
</div>
"""
        block += glyph_html
    block += "</div>"
    glyph_blocks.append(block)

# Final HTML
final_html = template.replace("{{category_links}}", "\n".join(category_links))
final_html = final_html.replace("{{glyph_blocks}}", "\n".join(glyph_blocks))

# Output
output_path = base.parent / "docs" / "index.html"
output_path.parent.mkdir(exist_ok=True)
with open(output_path, "w") as f:
    f.write(final_html)

print("✅ Preview page generated:", output_path)
