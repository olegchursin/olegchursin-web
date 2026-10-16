---
title: Rebuilding this site with Swiss design, Claude Design and Lit
excerpt: How this site went from a Next.js template to a Swiss-style design system of Lit web components, prerendered to plain HTML.
publishedAt: '2026-10-16 12:00 +0000'
tags: Design, Lit
---

The previous version of this site was a 2022 Next.js 12 app: a sidebar, gradient headings, Tailwind utility classes and a dozen React libraries doing jobs the browser now does on its own. It worked. It also looked like a thousand other developer sites, and every dependency upgrade was a small archaeology project.

So I started over, in three steps:

1. **Design system first.** Pick a visual language with real rules, write the rules down as tokens and components, and only then design pages.
2. **Claude Design** to turn that system into a browsable reference that people and agents can read, and that audits it.
3. **A rewrite from Next.js to Lit**, staying as close to the web platform as possible: web components, CSS custom properties, declarative shadow DOM, static HTML.

I built most of this in pair-programming sessions with Claude Code. Below is how each step works, with the actual code. The figures are live HTML and CSS built from the same design system. Each has a pause button, and they hold still if your system asks for reduced motion.

## Part 1: Swiss design

### Why Swiss

The International Typographic Style came out of Zurich and Basel in the 1950s: Josef Müller-Brockmann, Armin Hofmann, Emil Ruder, Max Bill. Its posters are recognizable at a glance: asymmetric layouts on a strict grid, a single grotesk typeface (Akzidenz-Grotesk, later Helvetica and Univers), flush-left ragged-right text, photography in place of illustration, and a palette that is mostly black and white with one loud color.

What makes it a good fit for a personal site is not the look. It is that the style is a **system**. Müller-Brockmann's _Grid Systems in Graphic Design_ reads like a spec: decide the module, then let the content fill it. That maps almost one-to-one onto CSS Grid and design tokens.

I collected seven references before writing any code: the _Portraits_ poster for the Museum für Gestaltung Zürich, a _Grid // 16_ study, the _living theatre_ type poster, a _Minimal+_ type specimen, a _SWISS_ poster with red dot markers, an infographic summarising the style, and a type workshop with David Quay. Each one contributed a single rule. _Portraits_ contributed the most: a vertical title anchored bottom-left, one red block, and a narrow column of facts. That became the signature layout of every page here.

### The grid is the design

Everything sits on 12 columns from 48rem up, and on 4 below that, with one gutter and one outer margin. Both are fluid and both are tokens:

```css:tokens.css
:root {
  --oc-columns: 12;
  --oc-gutter: clamp(1rem, 0.5rem + 1.5vw, 2rem);
  --oc-margin: clamp(1rem, 0.25rem + 3.5vw, 4rem);
  --oc-max-width: 120rem;
}
```

<ill-grid class="oc-wide" fig="1" caption="Twelve columns first, content second. The poster only ever snaps to column edges; asymmetry comes from how many columns each element takes.">
</ill-grid>

The rule I enforced is that **asymmetry comes from column spans, never from nudging**. Nothing gets `margin-left: 13px`. If something needs to move, it starts on a different column.

In components, placement is declarative. `<oc-cell span-md="8" start-lg="4">` is plain attributes, and the CSS behind it is generated once instead of written by hand:

```ts:oc-grid.ts
const placement = (attr: string, prop: 'span' | 'start', max: number) =>
  range(max)
    .map(n =>
      prop === 'span'
        ? `:host([${attr}='${n}']) { grid-column-end: span ${n}; }`
        : `:host([${attr}='${n}']) { grid-column-start: ${n}; }`
    )
    .join('\n');
```

A grid only holds up if nested blocks line up with the page columns too. The page layout, `<oc-page-layout>`, uses three columns for the rail with the vertical title and nine for content. Sections inside it need to align to those nine, not to an arbitrary split of their own. Custom properties cross shadow boundaries, so the layout publishes its column count and the sections consume it:

```css
/* oc-page-layout, from 64rem */
:host {
  --oc-section-columns: 9;
  --oc-section-label-span: 2;
}

/* oc-section */
.section {
  grid-template-columns: repeat(var(--oc-section-columns, 12), minmax(0, 1fr));
}
@container (min-width: 40rem) {
  .label { grid-column: 1 / span var(--oc-section-label-span, 3); }
  .body  { grid-column: calc(var(--oc-section-label-span, 3) + 1) / -1; }
}
```

Sections respond to their **container**, not the viewport (`container-type: inline-size`), so the same component works in a nine-column page and a four-column phone without knowing which one it is in. Press <kbd>g</kbd> anywhere on this site to overlay the columns and check my work.

### Type does the work

Swiss posters use one family. I wanted one family too, but with range, so I chose **Archivo**. It is a grotesk with a variable _width_ axis from 62% to 125% as well as a weight axis. Width becomes the main expressive lever. Display type is condensed and black. Running text is normal width. Small labels go wide.

<ill-type-axis class="oc-wide" fig="2" caption="One word sweeping Archivo's width axis. A single registered custom property drives the type, the marker and the number, so they can't drift apart.">
</ill-type-axis>

The figure above is a nice example of the platform doing the work. A registered custom property (`CSS.registerProperty`, typed as `<integer>`) can be animated, and everything else is derived from it with `calc()`:

```css
@keyframes sweep {
  from { --wdth: 62; }
  to   { --wdth: 125; }
}
.word   { font-stretch: calc(var(--wdth) * 1%); }
.marker { left: calc((var(--wdth) - 62) / 63 * 100%); }
.readout::after { counter-reset: w var(--wdth); content: counter(w) '%'; }
```

The type scale follows the classic typographer's steps (11, 12, 14, 17, 21, 24, 36, 60, 88pt and up), with the large sizes made fluid with `clamp()` so they scale with the viewport.

The vertical page titles were the fiddliest part. `writing-mode: vertical-rl` plus a 180° rotation gives bottom-to-top reading, like the _Portraits_ poster. But a long word like "Photography" would overflow the viewport height. So `<oc-display>` takes a `fit` attribute: the word's length in ems. It then caps the font size so the word fits the space:

```css
:host([vertical]) .text.fit {
  font-size: min(
    var(--_size),
    calc(var(--oc-vertical-extent, 62svh) / var(--_fit))
  );
}
```

At the condensed width, `fit` comes out to roughly 0.42 × the number of characters. It is the only magic number in the system, and it is documented as one.

### Paper, ink, one red

The palette has three colors: paper `#edece8` (a cool, slightly grey white, deliberately not cream), ink `#000000`, and Swiss red `#e8321e`. There are two greys, both derived from ink, for secondary and meta text. The rule is that **red marks one thing per view**: the current page, a single block, a dot, or the focus ring.

<ill-color class="oc-wide" fig="3" caption="The red budget, and why red text uses a darker red than red shapes. Ratios are WCAG contrast ratios against the 4.5:1 threshold for normal text.">
</ill-color>

Swiss red has a real accessibility problem. On paper it measures 3.6:1. That passes for large text and UI shapes but fails for body-size text. Rather than dilute the red, the system has two tokens: `--oc-red` for blocks, shapes and display type, and `--oc-red-text` (`#c22612`, 5.0:1) for anything small. Button labels on red are **black**, not white. White on that red is 4.3:1; black is 4.9:1. Swiss posters often print black on red anyway, so here the accessible choice and the historical one are the same.

Dark mode is an inversion, not a second design. Paper becomes `#000`, ink becomes paper, and the red brightens to `#ff4530` to hold contrast. It follows `prefers-color-scheme` unless you choose otherwise, and a tiny inline script in `<head>` applies a stored choice before the first paint, so the page never flashes the wrong theme:

```js
(function () {
  try {
    var t = localStorage.getItem('oc-theme');
    if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
  } catch (e) {}
})();
```

The toggle stores a choice only when it differs from the system preference. Switching back to the system theme clears the override, so the site keeps following the OS afterwards.

## Part 2: Claude Design

I wrote the system in code first: 22 Lit components, the tokens, a living style guide and tests. Code is the source of truth because code is what ships. A design system that lives only in a repo has two weaknesses, though. It is hard for anyone to _browse_. And nobody audits it unless you remember to.

So the next step was **Claude Design's Design System artifact type**. It is a structured, browsable reference: a README written as a brand book, tokens across themes, and every component with a live preview and guidelines. Other agents read it before they build anything in the brand.

<ill-claude-design class="oc-wide" fig="4" caption="Tokens flow from code into the artifact's tokens.json, components become live preview cards, and the contrast audit flows back into code.">
</ill-claude-design>

The interesting part is the translation, because the artifact has its own format.

- **Tokens become lists, not maps.** The artifact reads `{"tokens": [{"name", "value", "usage"}]}`, with a `value` per theme and a required `usage` note on every token. Writing "Meta text. AA on paper and paper-2" for `ink-3` forces you to say what each token is _for_, and that is half the value of a design system.
- **Values the format can't hold are kept, not dropped.** Text styles take a fixed size, so the fluid `clamp()` steps live in their own token family. The focus ring (`3px solid var(--oc-red)`) refers to another variable, so it stays in the stylesheet as a literal.
- **Components ship as a real bundle.** Previews run in the artifact's own page, so the actual Lit components were bundled with esbuild into one classic script that sets a global:

```bash
esbuild design-system/src/index.ts --bundle --format=iife \
  --global-name=OC --minify --target=es2022
```

- **An alias layer bridges naming.** The artifact generates its own CSS variable names from `tokens.json` (`--paper`, `--font-sans`), while the components read `--oc-paper` and `--oc-font`. A small block at the top of `bundle.css` maps one onto the other, so the same components render unchanged in both places.

The audit paid off on its first run. Checking every token pair against WCAG in both themes turned up three light-theme failures I had missed: `ink-3` on `paper-2` (4.4:1), white on red (4.3:1) and white selection text on red (4.3:1). All three were fixed in `tokens.css` and published back to the artifact. That is where black-on-red buttons came from. The loop runs both ways: code feeds the artifact, and the artifact's checks feed back into code.

## Part 3: From Next.js to Lit

### Why leave Next.js

Nothing was wrong with Next.js. It solves problems this site doesn't have. A personal site with ten pages needs HTML, CSS and a little JavaScript for three interactive widgets. The old setup shipped a React runtime, a router, a data-fetching cache and a state library to render mostly static text.

I wanted the opposite default: **standard web platform first, libraries only where they earn their place.** Web components are part of the platform. A `<oc-entry>` works in any page, any framework or none, today and in ten years. [Lit](https://lit.dev) is the thinnest useful layer on top: reactive properties, efficient templates and scoped styles, at about 5 kB.

<ill-deps class="oc-wide" fig="5" caption="The old package.json falls away. What reaches the browser from npm now: Lit, its SSR hydration client and two font packages.">
</ill-deps>

### The architecture

The repo is now two npm workspaces:

```
design-system/   tokens, global CSS, 22 Lit components, style guide, tests
site/            pages, content, and the build that prerenders them
```

Pages are plain functions that return Lit templates. No router, no framework component tree. Here is the Work page, abridged:

```ts:pages/work.ts
export function workPage(): Page {
  return {
    path: '/work',
    title: 'Work',
    body: html`<oc-page-layout>
      <oc-display slot="title" as="h1" vertical fit="1.9" width="condensed">
        Work
      </oc-display>
      <oc-section rule="bar">
        <h2 slot="label">Software</h2>
        <ol role="list">${career.map(roleEntry)}</ol>
      </oc-section>
    </oc-page-layout>`
  };
}
```

### Prerendering with Lit SSR and declarative shadow DOM

The thing that made this possible without a meta-framework is **declarative shadow DOM**. `@lit-labs/ssr` renders each component's shadow root into the HTML as a `<template shadowrootmode="open">`. The browser parser attaches it as a real shadow root before any script runs. Components are fully styled at first paint, with no JavaScript and no flash of unstyled custom elements.

<ill-ssr class="oc-wide" fig="6" caption="The life of a page: rendered at build time, painted without JavaScript, then hydrated. Only the parts that need behavior wake up.">
</ill-ssr>

The build has two steps:

```json:site/package.json
"build": "vite build && tsx scripts/prerender.ts"
```

Vite bundles the client entry (hydration support, global CSS, the components) and writes a manifest. The prerender script then renders every route with Lit SSR and wires in the hashed assets from that manifest:

```ts:scripts/prerender.ts
const entry = manifest['src/entry-client.ts'];
const head = [
  `<link rel="preload" href="/${mainFont}" as="font" type="font/woff2" crossorigin>`,
  ...entry.css.map(href => `<link rel="stylesheet" href="/${href}">`),
  `<script type="module" src="/${entry.file}"></script>`
].join('\n');

for (const page of await getPages()) {
  const html = await renderPage(page, { head }); // collectResult(render(template))
  fs.writeFileSync(outFile(page.path), html);
}
```

On the client, one line matters more than the others. Hydration support has to load **before** any LitElement is defined. Otherwise the components re-render their shadow roots from scratch instead of adopting the server's:

```ts:entry-client.ts
// Must load before any LitElement is defined so server-rendered shadow roots hydrate.
import '@lit-labs/ssr-client/lit-element-hydrate-support.js';
import '@oc/design-system/styles.css';
import '@oc/design-system';
```

The dev server uses the same render path. A small Vite middleware calls `ssrLoadModule('/src/entry-server.ts')` for each request, so `npm run dev` shows exactly what the build ships, with hot reload for client code.

The numbers: ten pages, prerendered in under a second. The whole client bundle is 71 kB, or 17 kB gzipped, and that includes every component and the writing filter. Raw HTML looks heavy at around 120 kB a page, because every shadow root carries its own `<style>` block. But repeated styles are exactly what gzip is good at, and the home page goes over the wire at about 9 kB.

### Posts, and figures inside posts

Posts are Markdown files. At build time they go through unified (`remark-gfm`, `rehype-slug`, autolinked headings). Code is highlighted with **Shiki** using its CSS-variables theme. Shiki emits `color: var(--shiki-token-keyword)` rather than hex values, and the design system maps those variables to ink, red and grey. So code blocks follow the theme with no second stylesheet. A fence written as <code>```ts:file.ts</code> gets a file-name bar.

The figures in this post are Lit components inside Markdown, and they needed one trick. Post HTML is normally inserted with `unsafeHTML`, but Lit SSR doesn't render custom elements that arrive inside a _value_. The fix is to make the post body part of the _template_ itself, with `lit/static-html.js`:

```ts:pages/post.ts
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';

// Not ${unsafeHTML(post.html)}: as a static part of the template,
// Lit SSR walks the post's markup and renders the custom elements in it.
${staticHtml`<oc-prose>${unsafeStatic(post.html)}</oc-prose>`}
```

The figures are prerendered like everything else, so the static frame you see before JavaScript loads is the finished composition. Each keyframe set is written so that the element's _base_ style is the end state. Under `prefers-reduced-motion`, animations are removed and the figure still makes sense.

### Things that bit me

Rewrites teach you things. These were the moments worth writing down.

**1. A universal reset beats `:host`.** My reset had the classic `* { margin: 0 }`. Every `<oc-section>` declared `:host { margin-top: 6rem }`, and every section rendered with zero margin. Outer document styles that match the host element win over `:host` rules from inside its shadow root, regardless of specificity. The fix scopes the reset to native elements only:

```css
:where(body, h1, h2, h3, h4, h5, h6, p, ul, ol, dl, dd, figure, blockquote, pre, hr) {
  margin: 0;
}
```

**2. An empty string hydrated into the wrong node.** The lightbox counter read `` ${current ? `${i}/${n}` : ''} ``. On the server that's an empty text binding, so the HTML had a start marker and an end marker with nothing between them. On the client, the first update wrote `3/6` into the closing marker comment, not into a text node. I found it in DevTools as a literal `<!--3/6-->`. Returning a nested template (`` html`${i}/${n}` ``) or `nothing` avoids the empty text part, and a regression test now checks the counter's text.

**3. The server has no `HTMLElement`.** `<oc-prose>` deliberately has no shadow root, so long-form posts stay plain, indexable light-DOM HTML. It extended `HTMLElement`, which doesn't exist in Node. Lit's DOM shim provides `customElements` but not every global, so the class now extends a guarded base:

```ts
const Base: typeof HTMLElement =
  globalThis.HTMLElement ?? (class {} as unknown as typeof HTMLElement);
export class OcProse extends Base {}
```

**4. Browser-only state belongs in `firstUpdated`.** The theme toggle's `aria-pressed` depends on `localStorage`, which the server can't see. Reading it in `connectedCallback` made the first client render disagree with the server markup. Reading it in `firstUpdated` lets hydration finish against the server's markup first. Then a normal update applies the real value.

**5. Register elements idempotently.** Vite's dev server re-evaluates modules on change, and the server and client entries both import the components. Every `customElements.define` goes through a guard:

```ts
export function define(name: string, ctor: CustomElementConstructor) {
  if (!customElements.get(name)) customElements.define(name, ctor);
}
```

### Testing

Components are tested in a real Chromium with `@web/test-runner` and `@open-wc/testing`. The tests cover rendering per attribute, events (`oc-search`, `oc-tag-toggle`), keyboard behavior (Escape closes the menu, arrow keys step the lightbox, <kbd>g</kbd> toggles the grid) and a composed page that must pass axe. Separately, every built page is audited with axe in both themes. That audit caught a skip link sitting outside any landmark.

## What it adds up to

- A design system with rules a newcomer can follow: tokens with stated purposes, 22 components, do and don't tables, and a browsable Claude Design reference that audits itself.
- A site that is mostly HTML and CSS, with Lit where behavior is needed and nowhere else.
- No framework between me and the platform. Upgrading is now mostly a matter of waiting for browsers to get better.

The best part of working this way is that the constraints compound. Twelve columns, one family, one red and the platform's own primitives leave very few decisions to make each time, so most of the work is getting the content right.
