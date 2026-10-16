import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { Page } from '../types.ts';
import { formatDate, type Post } from '../content/posts.ts';

export function postPage(post: Post, prev?: Post, next?: Post): Page {
  return {
    path: `/writing/${post.slug}`,
    section: '/writing',
    title: post.title,
    description: post.excerpt,
    ogType: 'article',
    image: post.cover,
    published: post.date,
    body: html`<oc-page-layout>
      <dl slot="meta" class="rail-facts post-meta">
        <div>
          <dt>Published</dt>
          <dd><time datetime=${post.date}>${formatDate(post.date)}</time></dd>
        </div>
        <div>
          <dt>Reading time</dt>
          <dd>${post.minutes} min</dd>
        </div>
        <div>
          <dt>Filed under</dt>
          <dd>${post.tags.join(', ')}</dd>
        </div>
        <div>
          <dd>
            <oc-link variant="strong" href="/writing">All writing</oc-link>
          </dd>
        </div>
      </dl>
      <oc-display
        slot="title"
        as="p"
        vertical
        fit="3.2"
        width="condensed"
        aria-hidden="true"
        >Writing</oc-display
      >

      <article class="post">
        <header class="post__header">
          <oc-display as="h1" size="3xl" width="narrow"
            >${post.title}</oc-display
          >
          <p class="post__excerpt">${post.excerpt}</p>
        </header>
        <oc-prose>${unsafeHTML(post.html)}</oc-prose>
      </article>

      <nav class="post-nav" aria-label="More writing">
        ${
          prev
            ? html`<oc-entry href=${`/writing/${prev.slug}`}>
                <span slot="meta">Newer</span>
                <span>${prev.title}</span>
              </oc-entry>`
            : ''
        }
        ${
          next
            ? html`<oc-entry href=${`/writing/${next.slug}`}>
                <span slot="meta">Older</span>
                <span>${next.title}</span>
              </oc-entry>`
            : ''
        }
      </nav>
    </oc-page-layout>`
  };
}
