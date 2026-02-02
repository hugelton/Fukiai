# Fukiai

Musical icon font for electronic music production

## Preview

View the font icons at: https://hugelton.github.io/Fukiai/

## Description

Fukiai is a comprehensive icon font designed specifically for electronic music production interfaces. It includes icons for:

- Audio controls (play, pause, stop, record, etc.)
- Waveforms (sine, square, sawtooth, etc.)
- Audio functions and signal processing
- Port connections (USB, MIDI, audio jacks, etc.)
- UI elements (knobs, sliders, buttons, etc.)
- Symbols and utilities

## Installation

### Via CDN (Recommended)

Add this script to your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/fukiai@latest/dist/fukiai.js"></script>
```

### Via npm

```bash
npm install fukiai
```

## Usage

### Simple Usage

```html
<i class="fukiai" name="control_rec_f"></i>
<i class="fukiai" name="waveform_sine"></i>
<i class="fukiai" name="ui_knob"></i>
```

### CSS Only (without JavaScript)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fukiai@latest/dist/fukiai.css">
```

Then use Unicode characters directly or create CSS classes.

## Development

### Prerequisites

```bash
npm install
```

### Build Commands

```bash
# Complete build (recommended)
npm run build-all

# Individual steps
npm run build           # Generate font files from SVG icons
npm run generate-html   # Create preview HTML page
npm run sync-docs       # Sync font files to docs directory
npm run build-dist      # Create distribution files for npm/CDN
```

### Build Process Details

The `build-all` command performs these steps:

1. **Generate Font Files** (`npm run build`)
   - Reads icon mappings from `glyphs.json`
   - Processes SVG files from `svg/` directory
   - Generates font files in `build/` directory:
     - `fukiai.svg` - SVG font
     - `fukiai.ttf` - TrueType font
     - `fukiai.woff` - Web Open Font Format

2. **Generate Preview HTML** (`npm run generate-html`)
   - Creates interactive preview page in `docs/index.html`
   - Requires `glyphs_structured.json` to be up-to-date

3. **Sync Documentation Assets** (`npm run sync-docs`)
   - Copies font files to `docs/assets/{version}/`
   - Updates preview page assets

4. **Build Distribution** (`npm run build-dist`)
   - Updates JavaScript library with latest icon mappings
   - Copies font files to `dist/` directory
   - Creates minified JavaScript and CSS files

### Adding New Icons

1. Create SVG file in `svg/` directory (e.g., `my_icon.svg`)
2. Add mapping to `glyphs.json`:
   ```json
   "my_icon": "EB19"
   ```
3. Regenerate structured data:
   ```bash
   node scripts/generate_structured_glyphs.js
   ```
4. Run full build:
   ```bash
   npm run build-all
   ```

### File Structure

```
Fukiai/
├── svg/                      # Source SVG icons
├── src/                      # JavaScript library source
├── build/                    # Generated font files
├── dist/                     # Distribution files for npm/CDN
├── docs/                     # Preview website files
│   └── assets/{version}/     # Versioned font files
├── scripts/                  # Build and generation scripts
├── glyphs.json               # Icon to Unicode mapping
├── glyphs_structured.json    # Categorized icon data (auto-generated)
└── package.json              # Project configuration
```

## License

MIT License - see package.json for details

## Author

Leo Kuroshita