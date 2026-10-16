/**
 * Build-time content pipeline (Node only): Markdown posts → HTML.
 * Code fences are highlighted with Shiki using CSS-variable colors (theme-aware);
 * a fence written ```ts:file.ts gets a title bar.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import {
  createCssVariablesTheme,
  createHighlighter,
  type Highlighter
} from 'shiki';
import type { Root as MdRoot, Code } from 'mdast';
import type { Root as HastRoot, Element } from 'hast';

export interface Post {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  /** ISO 8601 */
  readonly date: string;
  readonly tags: readonly string[];
  readonly minutes: number;
  readonly cover?: string;
  readonly html: string;
}

const POSTS_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../content/posts'
);

const LANG_ALIASES: Record<string, string> = { shell: 'bash', sh: 'bash' };

/** Colors come from CSS variables defined by the design system's code.css. */
const ocTheme = createCssVariablesTheme({
  name: 'oc',
  variablePrefix: '--shiki-',
  variableDefaults: {},
  fontStyle: true
});

let highlighter: Promise<Highlighter> | undefined;
function getHighlighter() {
  highlighter ??= createHighlighter({
    themes: [ocTheme],
    langs: ['js', 'ts', 'json', 'bash', 'html', 'css', 'yaml', 'md']
  });
  return highlighter;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** remark: highlight fenced code with Shiki and replace it by raw HTML. */
function remarkShiki(hl: Highlighter) {
  return (tree: MdRoot) => {
    visit(tree, 'code', (node: Code, index, parent) => {
      if (!parent || index === undefined) return;
      const [rawLang = '', title] = (node.lang ?? '').split(':');
      const lang = LANG_ALIASES[rawLang] ?? rawLang;
      const known = hl.getLoadedLanguages().includes(lang);
      const code = hl.codeToHtml(node.value, {
        lang: known ? lang : 'text',
        theme: 'oc'
      });
      const titleBar = title
        ? `<div class="oc-code__title">${escapeHtml(title)}</div>`
        : '';
      parent.children[index] = {
        type: 'html',
        value: `<figure class="oc-code">${titleBar}${code}</figure>`
      };
    });
  };
}

/** rehype: external links open in a new tab; images lazy-load. */
function rehypeLinksAndImages() {
  return (tree: HastRoot) => {
    visit(tree, 'element', (el: Element) => {
      if (el.tagName === 'a') {
        const href = String(el.properties?.href ?? '');
        if (/^https?:\/\//.test(href)) {
          el.properties = {
            ...el.properties,
            target: '_blank',
            rel: ['noopener', 'noreferrer']
          };
        }
      }
      if (el.tagName === 'img') {
        el.properties = {
          ...el.properties,
          loading: 'lazy',
          decoding: 'async'
        };
      }
    });
  };
}

async function toHtml(markdown: string): Promise<string> {
  const hl = await getHighlighter();
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkShiki, hl)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'prepend',
      properties: { className: ['anchor'], ariaHidden: 'true', tabIndex: -1 },
      content: []
    })
    .use(rehypeLinksAndImages)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return String(file);
}

/** '2021-12-14 18:44 +0000' → ISO */
function parseDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  const s = String(value)
    .trim()
    .replace(' ', 'T')
    .replace(/ ?([+-]\d{2})(\d{2})$/, '$1:$2');
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) throw new Error(`Invalid post date: ${value}`);
  return d.toISOString();
}

let cache: Promise<Post[]> | undefined;

export function getPosts(): Promise<Post[]> {
  cache ??= loadPosts();
  return cache;
}

/** Drop the cache (dev server, after a post changes). */
export function invalidatePosts() {
  cache = undefined;
}

async function loadPosts(): Promise<Post[]> {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  const posts = await Promise.all(
    files.map(async file => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const tags = String(data.tags ?? '')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);
      return {
        slug: file.replace(/\.md$/, ''),
        title: String(data.title),
        excerpt: String(data.excerpt ?? ''),
        date: parseDate(data.publishedAt),
        tags,
        minutes: Math.max(1, Math.round(readingTime(content).minutes)),
        cover: data.coverImage ? String(data.coverImage) : undefined,
        html: await toHtml(content)
      } satisfies Post;
    })
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

const DATE_FMT = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
});
const SHORT_FMT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC'
});

/** "19 October 2022" — day-month-year, as on the posters. */
export function formatDate(iso: string): string {
  const parts = Object.fromEntries(
    DATE_FMT.formatToParts(new Date(iso)).map(p => [p.type, p.value])
  );
  return `${parts.day} ${parts.month} ${parts.year}`;
}

/** "Oct 2022" */
export function formatShortDate(iso: string): string {
  return SHORT_FMT.format(new Date(iso));
}
