# Fukiai CDN / 配信ガイド

## CDN (jsDelivr) で使う
- CSSのみ（推奨・最小構成）
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fukiai@latest/dist/fukiai.css">
  例: <span class="fukiai">&#xEA09;</span>（Unicodeは `docs/index.html` で確認）
- JSヘルパー（DOMの `<i class="fukiai" name="…">` を自動描画）
  <script src="https://cdn.jsdelivr.net/npm/fukiai@latest/dist/fukiai.js"></script>
  例: <i class="fukiai" name="control_rec_f"></i>
  注意: JSだけ読み込んでも、対象要素が無ければ表示されません。CSPが厳しい環境では CSS を明示的に読み込んでください。

## npm で使う
- インストール: `npm i fukiai`
- CSSを読み込む（推奨）:
  import 'fukiai/dist/fukiai.css';
  例: `<span class="fukiai">&#xEA09;</span>` / `<i class="fukiai" name="control_rec_f"></i>`
- JSヘルパー（必要に応じて）:
  import 'fukiai/dist/fukiai.js';

## ビルド運用（コミットで配信開始）
- すべて更新したい/安全に一括: `npm run build-all`
  - フォント生成 → プレビュー生成 → `dist/` 反映
- アイコンや `glyphs.json` を変更: `npm run build` の後に `npm run build-dist`
  - 併せてプレビュー更新: `npm run generate-html`
- プレビュー (`docs/index.html`) だけ更新: `npm run generate-html`
- npm配信用の成果物だけ更新: `npm run build-dist`（ただしフォントが変わった場合は先に `npm run build`）

## よくある注意
- `JSだけ` ではアイコンは出ません（要素が無い/スタイル不可/CSP等）。`fukiai.css` の読み込みを基本とし、必要に応じて JS を併用してください。
- `dist/` と `build/` は手編集禁止。変更時はスクリプトで再生成してください。
