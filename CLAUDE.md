# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fukiai is a musical icon font for electronic music production. It generates font files (SVG, TTF, WOFF) from a collection of SVG icons, with each icon mapped to specific Unicode codepoints defined in `glyphs.json`.

## Development Commands

- `npm run build` - Generate font files from SVG icons
- `npm run generate-html` - Create preview HTML page
- `npm run build-dist` - Create distribution files for npm/CDN
- `npm run build-all` - Complete build process (font + HTML + dist)
- `npm publish` - Publish to npm registry (auto-runs prepublishOnly)

## Architecture

### Core Components

- **SVG Icons**: Source icons stored in `svg/` directory, named to match keys in `glyphs.json`
- **Font Generation**: `scripts/build_font.js` converts SVG icons to font files using:
  - `svgicons2svgfont` for SVG font generation
  - `svg2ttf` for TTF conversion  
  - `ttf2woff` for WOFF conversion
- **Unicode Mapping**: `glyphs.json` maps icon names to Unicode codepoints (e.g., "control_play_f": "EA07")
- **Preview Generation**: `scripts/generate_index_html.js` creates interactive preview page

### Build Process

1. Reads glyph mappings from `glyphs.json`
2. Auto-increments version in `package.json` 
3. Processes SVG files from `svg/` directory
4. Generates fonts in `build/` directory
5. Creates preview files in `docs/` directory

### File Structure

- `svg/` - Source SVG icons (must match glyphs.json keys)
- `src/` - JavaScript library source (`fukiai.js`)
- `build/` - Generated font files (SVG, TTF, WOFF)
- `dist/` - Distribution files for npm/CDN
- `docs/` - Preview website files  
- `scripts/` - Build and generation scripts
- `glyphs.json` - Icon to Unicode mapping
- `temp_*/` - Temporary build directories

## Usage Patterns

### CDN Usage (Recommended)
```html
<script src="https://cdn.jsdelivr.net/npm/fukiai@latest/dist/fukiai.js"></script>
<i class="fukiai" name="control_rec_f"></i>
```

### CSS Only
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fukiai@latest/dist/fukiai.css">
<span class="fukiai">&#xEA09;</span> <!-- Direct Unicode -->
```

### npm Installation
```bash
npm install fukiai
```

## Important Notes

- Icon names in `glyphs.json` must exactly match SVG filenames (without .svg extension)
- Unicode codepoints use hexadecimal format starting from EA01
- Build process automatically versions the font
- Missing SVG files are logged as warnings but don't fail the build
- JavaScript library auto-detects and converts `name` attributes to Unicode characters
- Font is published to npm with automatic CDN distribution via jsdelivr