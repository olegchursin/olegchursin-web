/**
 * Build step 2: render every page to static HTML with Lit SSR, using the client
 * bundle Vite built in step 1. Also writes sitemap.xml, rss.xml and robots.txt.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPages, getPosts, renderPage } from '../src/entry-server.ts';
import { site } from '../src/data/site.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

interface ManifestChunk {
  file: string;
  css?: string[];
  assets?: string[];
  isEntry?: boolean;
}

const manifest: Record<string, ManifestChunk> = JSON.parse(
  fs.readFileSync(path.join(dist, '.vite/manifest.json'), 'utf8')
);
const entry = manifest['src/entry-client.ts'];
if (!entry) throw new Error('Client entry missing from the Vite manifest');

// Preload the one face every page uses (Latin, upright) so display type paints early.
const mainFont = (entry.assets ?? []).find(a =>
  /archivo-latin-wdth-normal/.test(a)
);
if (!entry.css?.length)
  throw new Error('Client entry has no CSS in the Vite manifest');

const head = [
  ...(mainFont
    ? [
        `<link rel="preload" href="/${mainFont}" as="font" type="font/woff2" crossorigin>`
      ]
    : []),
  ...entry.css.map(href => `<link rel="stylesheet" href="/${href}">`),
  `<script type="module" src="/${entry.file}"></script>`
].join('\n');

const xml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const pages = await getPages();
for (const page of pages) {
  const html = await renderPage(page, { head });
  const file =
    page.path === '/'
      ? 'index.html'
      : page.path === '/404'
        ? '404.html'
        : `${page.path.slice(1)}/index.html`;
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log(
    `  ${page.path.padEnd(48)} → ${file} (${(html.length / 1024).toFixed(0)} kB)`
  );
}

const listed = pages.filter(p => p.path !== '/404');
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${listed.map(p => `  <url><loc>${new URL(p.path, site.url).href}</loc></url>`).join('\n')}
</urlset>
`
);

const posts = await getPosts();
fs.writeFileSync(
  path.join(dist, 'rss.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${site.name} — Writing</title>
  <link>${site.url}/writing</link>
  <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
  <description>${xml(site.description)}</description>
  <language>en-us</language>
${posts
  .map(
    p => `  <item>
    <title>${xml(p.title)}</title>
    <link>${site.url}/writing/${p.slug}</link>
    <guid>${site.url}/writing/${p.slug}</guid>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    <description>${xml(p.excerpt)}</description>
  </item>`
  )
  .join('\n')}
</channel>
</rss>
`
);

fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`
);

console.log(
  `Prerendered ${pages.length} pages, sitemap.xml, rss.xml, robots.txt`
);
