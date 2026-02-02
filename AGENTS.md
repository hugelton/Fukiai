# Repository Guidelines

## Project Structure & Module Organization
- `svg/`: Source icons. Filenames must exactly match `glyphs.json` keys (e.g., `svg/control_play_f.svg`).
- `scripts/`: Build utilities (`build_font_new.js`, `build_dist.js`, `generate_index_html.js`).
- `build/`: Generated fonts (`fukiai.svg/.ttf/.woff`). Do not edit by hand.
- `dist/`: Publishable JS/CSS and fonts (`fukiai.js`, `fukiai.min.js`, `fukiai.css`). Do not edit by hand.
- `src/`: Library source (`src/fukiai.js`).
- `docs/`: Preview site (`docs/index.html`) for GitHub Pages.
- `glyphs.json` / `glyphs_structured.json`: Icon → Unicode mapping and grouped metadata.

## Build, Test, and Development Commands
- `npm run build`: Generate fonts from `svg/` using `glyphs.json` → outputs to `build/`.
- `npm run generate-html`: Build `docs/index.html` preview from structured glyphs.
- `npm run build-dist`: Copy fonts and bundle JS/CSS into `dist/`.
- `npm run build-all`: Full pipeline (fonts + preview + dist). **Recommended for most changes.**
- `node scripts/generate_structured_glyphs.js`: **Must run after modifying glyphs.json** before generating HTML.
- Quick check: run `npm run build-all`, then open `docs/index.html` locally and verify icons render and names map correctly.

## Important Build Process Notes
- **CRITICAL**: After adding/removing icons in `glyphs.json`, ALWAYS run `node scripts/generate_structured_glyphs.js` before `npm run build-all`
- The HTML preview uses `glyphs_structured.json`, not `glyphs.json` directly
- Forgetting to regenerate structured data will cause new icons to not appear in the preview

## Coding Style & Naming Conventions
- JavaScript: 2‑space indentation, single quotes, semicolons, CommonJS modules.
- JSON: compact, no trailing commas; hex codepoints like `"EA09"`.
- Icon names: lowercase with underscores and domain prefixes (e.g., `control_play_f`, `waveform_sine`, `ui_knob`, `symbol_star`).
- SVG filenames must exactly match keys in `glyphs.json`.
- Do not manually edit `build/` or `dist/`; always regenerate via scripts.

## Testing Guidelines
- No automated tests. Validate by:
  - Running `npm run build-all` without errors.
  - Opening `docs/index.html` and spot‑checking new/changed icons and names.
  - Confirming build logs report no missing SVGs.

## Commit & Pull Request Guidelines
- Commits: imperative, concise subjects (e.g., "Add 12 icons for waveforms"). Use version bump commits like `0.5.1` when applicable.
- PRs: include a clear summary, linked issues, list of added/renamed icons, and a screenshot or note confirming `docs/index.html` renders as expected.
- Ensure mappings and filenames stay in sync (`svg/` ↔ `glyphs.json`).

## Security & Configuration Tips
- No secrets required; scripts run locally.
- Avoid committing experimental or temporary files.
- Commit generated artifacts only via the provided build scripts.

