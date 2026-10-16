import { html } from 'lit';
import type { Page } from '../types.ts';
import { formatShortDate, type Post } from '../content/posts.ts';

export function writingPage(posts: readonly Post[]): Page {
  const tags = [...new Set(posts.flatMap(p => p.tags))].sort();
  const years = posts.map(p => p.date.slice(0, 4));
  const span = `${years[years.length - 1]}–${years[0]}`;

  return {
    path: '/writing',
    section: '/writing',
    title: 'Writing',
    description:
      'Notes by Oleg Chursin on Git, AWS, agile practice and JavaScript.',
    body: html`<oc-page-layout>
      <div slot="meta" class="rail-facts">
        <oc-numeral size="xl">${posts.length}</oc-numeral>
        <p>posts, ${span}</p>
      </div>
      <oc-display slot="title" as="h1" vertical fit="3.2" width="condensed"
        >Writing</oc-display
      >

      <oc-section rule="none" wide>
        <p class="lede">
          Notes from work: Git habits, AWS exam prep, user stories and small
          JavaScript utilities.
        </p>
      </oc-section>

      <site-post-filter>
        <oc-section rule="bar">
          <h2 slot="label">Posts</h2>
          <div class="filter">
            <oc-search placeholder="Title or tag">
              <span slot="label">Filter posts</span>
              <span slot="status" data-filter-status
                >${posts.length} posts</span
              >
            </oc-search>
            <div class="filter__tags" role="group" aria-label="Filter by tag">
              ${tags.map(t => html`<oc-tag toggle value=${t}>${t}</oc-tag>`)}
            </div>
          </div>
          <ol class="post-list" role="list">
            ${posts.map(
              post =>
                html`<li
                  data-title=${post.title.toLowerCase()}
                  data-tags=${post.tags.join(',').toLowerCase()}
                >
                  <oc-entry href=${`/writing/${post.slug}`} size="lg">
                    <time slot="meta" datetime=${post.date}
                      >${formatShortDate(post.date)}</time
                    >
                    <h3>${post.title}</h3>
                    <span slot="detail">${post.excerpt}</span>
                    <span slot="aside"
                      >${post.tags.join(', ')}<br />${post.minutes} min</span
                    >
                  </oc-entry>
                </li>`
            )}
          </ol>
          <p class="post-list__empty" data-filter-empty hidden>
            No posts match. Clear the search or pick another tag.
          </p>
        </oc-section>
      </site-post-filter>
    </oc-page-layout>`
  };
}
