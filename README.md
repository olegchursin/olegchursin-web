# olegchursin.com

Personal site of Oleg Chursin, rebuilt in 2026 on a Swiss-style design system.
Everything is [Lit](https://lit.dev) web components, prerendered to static HTML.

```
design-system/   Tokens, global styles and 22 Lit components (oc-*), style guide, tests
site/            Pages, content and the build that prerenders them
```

## Commands

|                     |                                                                      |
| ------------------- | -------------------------------------------------------------------- |
| `npm run dev`       | Site dev server with SSR on every request (http://localhost:5173)    |
| `npm run build`     | Client bundle (Vite) + prerender every route (Lit SSR) → `site/dist` |
| `npm run preview`   | Serve `site/dist` with clean URLs (http://localhost:4173)            |
| `npm run dev:ds`    | Design-system style guide (http://localhost:5174)                    |
| `npm test`          | Component tests in Chromium (web-test-runner + axe)                  |
| `npm run typecheck` | TypeScript, both workspaces                                          |

## How it works

- **Design system** — see [design-system/README.md](design-system/README.md): principles,
  tokens, component API and usage rules. Inspiration references live in
  `design-system/docs/public/inspiration`.
- **Pages** are functions returning Lit templates (`site/src/pages/*.ts`) built from data
  in `site/src/data` and Markdown posts in `site/content/posts`.
- **Build**: Vite bundles `site/src/entry-client.ts` (hydration support, global CSS, the
  components). `site/scripts/prerender.ts` then renders each page with `@lit-labs/ssr`
  (declarative shadow DOM) into `site/dist/<route>/index.html`, plus `sitemap.xml`,
  `rss.xml` and `robots.txt`. In the browser the components hydrate; the writing filter is
  the only page-level script.
- **Posts**: Markdown with front matter (`title`, `excerpt`, `publishedAt`, `tags`,
  `coverImage`). Code fences are highlighted at build time with Shiki;
  ` ```ts:file.ts ` adds a file-name bar.
- **Deploy**: Vercel, configured in `vercel.json` (static output, clean URLs, redirects for
  the retired `/bookmarks` and `/uses` pages).

## Writing a post

Add `site/content/posts/<slug>.md`:

```md
---
title: Post title
excerpt: One sentence shown in lists and link previews.
publishedAt: '2026-10-16 09:00 +0000'
tags: Git
---

Body in Markdown.
```
