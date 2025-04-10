# Fukiai

Fukiai is a modular icon font project designed for use in synthesizer UIs, musical tools, and DSP interfaces.

[➡️ View preview page (GitHub Pages)](https://hugelton.github.io/Fukiai/)

---

## 📦 Repository Structure

```
Fukiai/
├── svg/            # Source icon SVGs (outlined)
├── build/          # Compiled fonts (woff, ttf, svg)
├── docs/           # GitHub Pages preview (HTML + font)
├── scripts/        # Font generation and conversion tools
├── glyphs.json     # Glyph name → Unicode mapping
└── .github/workflows/
```

---

## ⚙️ Build Process

To build the font locally:

```bash
npm install -g svgicons2svgfont svg2ttf ttf2woff
python3 scripts/inject_unicode.py
mkdir -p build
svgicons2svgfont temp_svg/*.svg -o build/fukiai.svg
svg2ttf build/fukiai.svg build/fukiai.ttf
ttf2woff build/fukiai.ttf build/fukiai.woff
```

---

## 🚀 GitHub Actions

You can trigger the full toolchain with one manual run.

| Workflow Name | Trigger Type | What it does |
|---------------|---------------|-----------------------------|
| `full-build-preview-release.yml` | Manual (`workflow_dispatch`) | ① Generate fonts → ② Preview via GitHub Pages → ③ Release zip archive |

This unified workflow uploads the font as an artifact, builds a preview page using the font, and creates a release with the packaged files.

---

## 🎨 Design Guidelines

- Canvas size: `1000 × 1000`
- Stroke width: `~40px` (visual balance)
- All strokes are outlined before export
- Glyph naming follows semantic domains:  
  e.g. `waveform_sine`, `control_play_f`, `symbol_clock_o`

---

## 🛠 Tools Used

- [Font generation]
  - [`svgicons2svgfont`](https://github.com/nfroidure/svgicons2svgfont)
  - [`svg2ttf`](https://github.com/fontello/svg2ttf)
  - [`ttf2woff`](https://github.com/fontello/ttf2woff)
- [SVG Optimization]
  - [`svgo`](https://github.com/svg/svgo)
- [Automation]
  - [`GitHub Actions`](https://docs.github.com/en/actions)

---

## 📄 License

All content is licensed under:  
**Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**

---

© hugelton 2025 — Designed with waveforms in mind.
