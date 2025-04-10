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

---

## 📄 License

All content is licensed under:  
**Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**

---

By Leo Kuroshita for
Hügelton Instruments. Kōbe,Japan.
