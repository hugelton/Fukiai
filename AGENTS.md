# Repository Guidelines

## Project Structure & Module Organization
- `svg/`: Source icons (filenames must match `glyphs.json` keys).
- `scripts/`: Build and utility scripts (`build_font_new.js`, `build_dist.js`, `generate_index_html.js`, etc.).
- `build/`: Generated fonts (`fukiai.svg`, `.ttf`, `.woff`). Do not edit by hand.
- `dist/`: Publishable artifacts (`fukiai.js`, `fukiai.min.js`, `fukiai.css`, fonts). Do not edit by hand.
- `src/`: Library source (`fukiai.js`).
- `docs/`: Preview site (`index.html`) for GitHub Pages.
- `glyphs.json` / `glyphs_structured.json`: Icon → Unicode mapping and grouped metadata.

## Build, Test, and Development Commands
- `npm run build`: Generate fonts from `svg/` using `glyphs.json`.
- `npm run generate-html`: Build `docs/index.html` preview from structured glyphs.
- `npm run build-dist`: Copy fonts and bundle JS/CSS into `dist/`.
- `npm run build-all`: Full pipeline (build fonts + preview + dist).

Quick check: run `npm run build-all` then open `docs/index.html` locally to verify icons render and names map correctly.

## Coding Style & Naming Conventions
- JavaScript: 2‑space indentation, single quotes, semicolons, Node CommonJS modules.
- JSON: compact, trailing‑comma free; hex codepoints like `"EA09"`.
- Icon names: lowercase with underscores and domain prefixes (e.g., `control_play_f`, `waveform_sine`, `ui_knob`, `symbol_star`). SVG filenames must exactly match keys in `glyphs.json`.
- Do not manually edit files in `build/` or `dist/`; regenerate via scripts.

## Testing Guidelines
- No automated tests in this repo. Validate by:
  - Running `npm run build-all` without errors.
  - Opening `docs/index.html` and spot‑checking new/changed icons.
  - Confirming missing SVGs are not reported in the build logs.

## Commit & Pull Request Guidelines
- Commits: imperative, concise subjects (e.g., "Add 12 icons for waveforms"), use version bump commits like `0.5.1` when applicable.
- PRs: include a clear summary, linked issues, list of added/renamed icons, and a screenshot or note confirming `docs/index.html` renders as expected.
- Ensure mappings and filenames stay in sync (SVG ↔ `glyphs.json`).

## Security & Configuration Tips
- No secrets required; scripts run locally. Avoid committing experimental temp files. Generated artifacts are committed only via build scripts.
