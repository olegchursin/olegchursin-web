/**
 * Server entry: builds every page and renders it to a complete HTML document with
 * Lit SSR (declarative shadow DOM). Used by the dev middleware and the prerenderer.
 */
import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import { themeInitScript } from '@oc/design-system/theme-init';
import '@oc/design-system';
import './components/site-post-filter.ts';
import { shell } from './layout.ts';
import { site } from './data/site.ts';
import { getPosts } from './content/posts.ts';
import { homePage } from './pages/home.ts';
import { workPage } from './pages/work.ts';
import { writingPage } from './pages/writing.ts';
import { postPage } from './pages/post.ts';
import { photographyPage } from './pages/photography.ts';
import { notFoundPage } from './pages/not-found.ts';
import type { Page } from './types.ts';

export { getPosts, invalidatePosts } from './content/posts.ts';
export type { Page } from './types.ts';

export async function getPages(): Promise<Page[]> {
  const posts = await getPosts();
  return [
    homePage(posts),
    workPage(),
    writingPage(posts),
    ...posts.map((post, i) => postPage(post, posts[i - 1], posts[i + 1])),
    photographyPage(),
    notFoundPage()
  ];
}

export interface Assets {
  /** <script>/<link> tags for the client bundle */
  readonly head: string;
}

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function renderPage(page: Page, assets: Assets): Promise<string> {
  const body = await collectResult(render(shell(page.section, page.body)));
  const url = new URL(page.path, site.url).href;
  const title = page.path === '/' ? site.name : `${page.title} — ${site.name}`;
  const image = page.image ? new URL(page.image, site.url).href : undefined;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${url}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#edece8" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="${page.ogType ?? 'website'}">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
${image ? `<meta property="og:image" content="${image}">\n<meta name="twitter:card" content="summary_large_image">` : '<meta name="twitter:card" content="summary">'}
${page.published ? `<meta property="article:published_time" content="${page.published}">` : ''}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="alternate" type="application/rss+xml" title="${site.name} — Writing" href="/rss.xml">
<script>${themeInitScript}</script>
${assets.head}
</head>
<body>
${body}
</body>
</html>
`;
}
