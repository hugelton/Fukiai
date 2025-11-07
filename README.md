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

### Build

```bash
npm run build-all
```

This will:
1. Generate the font files from SVG icons
2. Create the preview HTML page
3. Build distribution files for npm

## Files

- `svg/` - Source SVG icons
- `build/` - Generated font files
- `docs/` - Preview website files

## License

MIT License - see package.json for details

## Author

Leo Kuroshita