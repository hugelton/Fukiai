# Fukiai

Fukiai is a modular icon font project designed for use in synthesizer UIs, musical tools, and DSP interfaces.

[➡️ View preview page (GitHub Pages)](https://hugelton.github.io/Fukiai/)

---

## 📦 Repository Structure

```
Fukiai/
├── svg/                  # Source icon SVGs
├── build/                # Compiled fonts (woff, ttf, svg)
├── docs/                 # GitHub Pages preview (HTML + font)
├── scripts/              # Font generation and utility scripts
├── glyphs.json           # Glyph name → Unicode mapping
├── glyphs_structured.json # Categorized glyph mapping for preview
└── .github/workflows/    # CI/CD automation
```

---

## ⚙️ Build Process

### Installation

```bash
# Install dependencies
npm install
```

### Building the font

```bash
# Complete build process with one command (recommended)
npm run build-all

# Build and clean temporary files afterward
npm run build-and-clean
```

### Individual Build Steps

You can also run each step individually:

```bash
# Prepare required directories
npm run prepare

# Optimize SVGs
npm run optimize-svg

# Build the font
npm run build-font

# Fix Unicode formatting in JSON files
npm run fix-json-unicode

# Generate preview HTML
npm run generate-preview

# Copy WOFF file to docs directory
npm run copy-woff

# Clean up temporary files
npm run cleanup
```

---

## 🎨 Design Guidelines

- Canvas size: `1000 × 1000`
- Stroke width: `~40px` (visual balance)
- All strokes are outlined before export
- Glyph naming follows semantic domains:  
  e.g. `waveform_sine`, `control_play_f`, `symbol_clock_o`

---

## 🔍 Unicode Mapping

Icons are mapped to the Private Use Area (PUA) in the Unicode standard:

- Range: `U+EA01` to `U+EA89`
- Organized by category in `glyphs_structured.json`

---

## 🛠 Tools Used

- [Font generation]
  - [`svgicons2svgfont`](https://github.com/nfroidure/svgicons2svgfont) - Convert SVGs to SVG font
  - [`svg2ttf`](https://github.com/fontello/svg2ttf) - Convert SVG font to TTF
  - [`ttf2woff`](https://github.com/fontello/ttf2woff) - Convert TTF to WOFF
- [SVG Optimization]
  - [`svgo`](https://github.com/svg/svgo) - Optimize SVG files

---

## 📄 License

All content is licensed under:  
**Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**

---

By Leo Kuroshita for
Hügelton Instruments. Kōbe, Japan.
