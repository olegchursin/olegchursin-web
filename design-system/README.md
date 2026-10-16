# OC Design System

The design system behind olegchursin.com: tokens, global styles and Lit web components,
built on the **International Typographic Style** (Swiss style).

```bash
npm run dev:ds          # living style guide at http://localhost:5174
npm test                # component tests (web-test-runner, Chromium, axe)
npm run build:ds-docs   # static build of the style guide → dist-docs/
```

## Sources

Seven references in [`docs/public/inspiration`](docs/public/inspiration) set the direction:

| Reference                          | What the system takes from it                                                     |
| ---------------------------------- | --------------------------------------------------------------------------------- |
| _Portraits_, Museum für Gestaltung | Vertical page title anchored bottom-left; one red block; a narrow column of facts |
| _Grid // 16_                       | The grid is visible and is the design                                             |
| _Living theatre_                   | Type as image; big, heavy, tight                                                  |
| _Minimal+_                         | One family, hierarchy through size and weight; specimen-style scale               |
| _SWISS_ poster                     | Red dots as markers; sparse, small meta text                                      |
| _Swiss Style_ infographic          | Paper, ink, red; grid; objective photography                                      |
| David Quay type workshop           | Flush-left, ragged-right captions beside display type                             |

## Principles

1. **The grid is the design.** 12 columns from 48rem (4 below), one gutter, one margin.
   Everything starts on a column edge. Asymmetry comes from column spans, never from nudging.
2. **Type does the work.** One family — Archivo — across its width axis (62–125%).
   Condensed/black for display, normal for reading, wide for small labels.
3. **Red is rare.** Paper and ink carry the page. Red marks one thing per view: the current
   page, a block, a dot, the focus ring.
4. **Objective images.** Photos are grayscale, square-cut and unframed; colour returns on
   hover or focus.
5. **Flush left, ragged right.** No centred paragraphs, no justified text, ≤ 64ch measure.
6. **No ornament.** No rounded corners, shadows or gradients. Rules, bars, circles and squares
   are structure, not decoration.

## Tokens — `src/tokens/tokens.css`

All values are CSS custom properties prefixed `--oc-`. Components read only tokens.
CSS variables cross shadow boundaries, so loading the stylesheet once themes every component.

| Group  | Tokens                                                                                                                                                                           |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Colour | `paper`, `paper-2`, `ink`, `ink-2`, `ink-3`, `line`, `red`, `red-text`, `on-red`                                                                                                 |
| Type   | `font`, `font-mono`; `wdth-{condensed,narrow,normal,wide,extended}`; `weight-{regular,medium,bold,black}`; `text-{2xs…3xl,display,poster}`; `leading-*`; `tracking-*`; `measure` |
| Space  | `space-1` (4px) … `space-11` (192px)                                                                                                                                             |
| Grid   | `columns`, `gutter`, `margin`, `max-width`                                                                                                                                       |
| Lines  | `hairline` (1px), `rule` (2px), `bar` (12px), `radius` (0), `focus-ring`                                                                                                         |
| Motion | `duration-fast`, `duration`, `duration-slow`, `ease` (zeroed under reduced motion)                                                                                               |

**Colour rules.** `--oc-red` (≈3.6:1 on paper) is for blocks, shapes and display type only.
Red at text sizes uses `--oc-red-text` (AA on both themes).

**Themes.** Light (paper) by default; dark is the inverse (ink paper, paper ink, brighter red).
The system preference applies unless `<html data-theme="light|dark">` overrides it.
`<oc-theme-toggle>` writes that attribute and `localStorage['oc-theme']`; inline
`themeInitScript` (from `@oc/design-system/theme-init`) in `<head>` to avoid a flash.

## Global styles — `@oc/design-system/styles.css`

Imports fonts, tokens, a reset, base element styles, `prose.css` (long-form text inside
`<oc-prose>`) and `code.css` (inline code and Shiki dual-theme blocks). Also provides
`.oc-skip-link` and `.oc-visually-hidden`.

## Components

All are Lit 3 elements with shadow DOM (except `oc-prose`), prefixed `oc-`, SSR-safe
(`@lit-labs/ssr`) and hydratable. Import everything with `import '@oc/design-system'`, or a
single file from `@oc/design-system/components/oc-*.ts`.

| Element               | Use it for                                         | Key API                                                                           |
| --------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------- |
| `oc-page-layout`      | Every page: vertical title rail + 9-column content | slots `title`, `meta`, default                                                    |
| `oc-section`          | A labelled block (label left, content right)       | slot `label`; `rule="hairline\|bar\|none"`                                        |
| `oc-grid` / `oc-cell` | Ad-hoc grid layouts                                | `span`, `span-md`, `start-md`, `span-lg`, `start-lg`, `align`                     |
| `oc-grid-overlay`     | Show columns (press <kbd>g</kbd>)                  | `visible`, `hotkey`; `oc-grid-toggle`                                             |
| `oc-display`          | The loudest type on the page — one per view        | `as`, `size`, `width`, `weight`, `tone`, `vertical`, `fit`                        |
| `oc-eyebrow`          | A short label naming what follows                  | `tone`, `caps`                                                                    |
| `oc-numeral`          | Real numbers as graphics (years, dates, counts)    | `size`, `tone`                                                                    |
| `oc-rule`             | Hairline / rule / bar                              | `weight`, `tone`, `orientation`, `length`, `semantic`                             |
| `oc-shape`            | Circle, square, dot, bar, block                    | `shape`, `tone`, `size`, `--oc-shape-size`                                        |
| `oc-link`             | Links; external ones get ↗ and a new tab           | `href`, `variant="inline\|plain\|strong"`, `external`                             |
| `oc-button`           | Actions (or links styled as actions)               | `variant`, `tone`, `size`, `href`, `disabled`, `label`                            |
| `oc-tag`              | Category label, link or filter toggle              | `href`, `toggle`, `pressed`, `value`; `oc-tag-toggle`                             |
| `oc-site-header`      | Wordmark + nav; menu panel below 48rem             | slots `brand`, default, `actions`; `open`                                         |
| `oc-nav-link`         | Primary nav item                                   | `href`, `current`                                                                 |
| `oc-theme-toggle`     | Light/dark switch                                  | `oc-theme-change`                                                                 |
| `oc-site-footer`      | Thick bar + colophon                               | slots default, `links`, `meta`                                                    |
| `oc-entry`            | A row in an index (career, posts, links)           | `href`, `size`; slots `meta`, default, `detail`, `aside`                          |
| `oc-post-card`        | The lead item of a list of writing                 | `href`; slots `meta`, default, `excerpt`, `aside`                                 |
| `oc-search`           | Large filter field                                 | `value`, `placeholder`; slots `label`, `status`; `oc-search`                      |
| `oc-image`            | Photographs                                        | `src`, `alt`, `width`, `height`, `ratio`, `treatment`, `reveal`, `full`, `action` |
| `oc-gallery`          | Photo set + lightbox                               | `label`, `layout="default\|mirror"`                                               |
| `oc-prose`            | Long-form HTML (light DOM)                         | —                                                                                 |

### Usage rules

- **One `oc-display` per view.** Everything else is quiet.
- **Vertical titles** need `fit` ≈ 0.42 × characters at condensed width, so the word fits the
  viewport height.
- **Numbers only for real sequences** (dates, counts, steps). No decorative “01 / 02”.
- **Headings go in the light DOM** (`<h2 slot="label">`, `<h3>` inside `oc-entry`) so the
  document outline is real.
- **Link text names the destination** (“Unsplash”), button text names the action
  (“Save changes”).
- **Every image has `alt`** and either `width`/`height` or `ratio`.
- Focus is always visible: a 3px red outline, offset 3px.

### Do / don't

| Do                                         | Don't                                         |
| ------------------------------------------ | --------------------------------------------- |
| Align to columns; leave columns empty      | Centre things to fill space                   |
| Change size, weight or width for hierarchy | Add colour for hierarchy                      |
| Use one red element per view               | Use red for body links or large text blocks   |
| Let rules separate content                 | Box content in cards with borders and shadows |

## SSR notes

- Components never touch the DOM in constructors or `render()`; listeners attach in
  `connectedCallback`.
- State that depends on the browser (theme) is read in `firstUpdated` so the first client
  render matches the server markup.
- `define()` guards against double registration (HMR, SSR re-evaluation).
