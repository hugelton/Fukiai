# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fukiai is a musical icon font for electronic music production. It generates font files (SVG, TTF, WOFF) from a collection of SVG icons, with each icon mapped to specific Unicode codepoints defined in `glyphs.json`.

## Development Commands

### Primary Build Commands
- `npm run build-all` - **Complete build process** (font + HTML + dist) - **Use this for most changes**
- `npm run build` - Generate font files from SVG icons only
- `npm run generate-html` - Create preview HTML page
- `npm run sync-docs` - Sync font files to docs directory
- `npm run build-dist` - Create distribution files for npm/CDN

### Utility Commands
- `node scripts/generate_structured_glyphs.js` - **Must run after adding icons to glyphs.json**
- `npm publish` - Publish to npm registry (auto-runs prepublishOnly)

### Standard Workflow for Adding Icons
```bash
# 1. Create SVG file in svg/ directory
# 2. Add mapping to glyphs.json
# 3. Regenerate structured data
node scripts/generate_structured_glyphs.js
# 4. Build everything
npm run build-all
# 5. Commit and push
```

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

The complete build (`npm run build-all`) performs:

1. **Font Generation** (`npm run build`)
   - Reads glyph mappings from `glyphs.json`
   - Processes SVG files from `svg/` directory
   - Generates fonts in `build/` directory (SVG, TTF, WOFF)

2. **HTML Generation** (`npm run generate-html`)
   - Creates preview page at `docs/index.html`
   - **IMPORTANT**: Requires `glyphs_structured.json` to be up-to-date
   - Run `node scripts/generate_structured_glyphs.js` after modifying `glyphs.json`

3. **Asset Sync** (`npm run sync-docs`)
   - Copies font files to versioned directory: `docs/assets/{version}/`

4. **Distribution Build** (`npm run build-dist`)
   - Updates JavaScript library with latest icon mappings
   - Creates distribution files in `dist/`

### File Structure

```
svg/                      - Source SVG icons (must match glyphs.json keys)
src/                      - JavaScript library source (fukiai.js)
build/                    - Generated font files (SVG, TTF, WOFF) - not tracked in git
dist/                     - Distribution files for npm/CDN - not tracked in git
docs/                     - Preview website files
  └─ assets/{version}/    - Versioned font files for GitHub Pages
scripts/                  - Build and generation scripts
glyphs.json               - Icon to Unicode mapping (master file)
glyphs_structured.json    - Categorized icon data (auto-generated, used for HTML preview)
package.json              - Project configuration
```

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

- **Always run `node scripts/generate_structured_glyphs.js` after modifying `glyphs.json`** before building
- Icon names in `glyphs.json` must exactly match SVG filenames (without .svg extension)
- Unicode codepoints use hexadecimal format (e.g., EA01, EB18)
- The build process does NOT auto-version - update `package.json` version manually when needed
- Missing SVG files are logged as warnings but don't fail the build
- JavaScript library auto-detects and converts `name` attributes to Unicode characters
- Font is published to npm with automatic CDN distribution via jsdelivr
- `build/` and `dist/` directories are in `.gitignore` (generated files)
- Only commit: `svg/`, `src/`, `docs/`, `glyphs.json`, `glyphs_structured.json`, `scripts/`