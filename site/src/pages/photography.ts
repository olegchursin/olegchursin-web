import { html } from 'lit';
import type { Page } from '../types.ts';
import { collections, sized } from '../data/photos.ts';

export function photographyPage(): Page {
  const count = collections.reduce((n, c) => n + c.photos.length, 0);
  return {
    path: '/photography',
    section: '/photography',
    title: 'Photography',
    description:
      'Travel, lifestyle, family and wedding photography by Oleg Chursin.',
    body: html`<oc-page-layout>
      <div slot="meta" class="rail-facts">
        <p>${collections.length} collections<br />${count} photographs</p>
        <ul class="rail-index" role="list">
          ${collections.map(c => html`<li><a href=${`#${c.id}`}>${c.title}</a></li>`)}
        </ul>
      </div>
      <oc-display slot="title" as="h1" vertical fit="4.9" width="condensed"
        >Photography</oc-display
      >

      <oc-section rule="none" wide>
        <p class="lede">
          People and places, in black and white until you look closer. Select a
          photo to see it larger and in color.
        </p>
      </oc-section>

      ${collections.map(
        (c, i) =>
          html`<oc-section id=${c.id} rule="bar">
            <div slot="label" class="collection-label">
              <h2>${c.title}</h2>
              <p>${c.description}</p>
              <ul role="list">
                ${c.links.map(
                  l =>
                    html`<li>
                      <oc-link variant="strong" href=${l.href}
                        >${l.label}</oc-link
                      >
                    </li>`
                )}
              </ul>
            </div>
            <oc-gallery label=${c.title} layout=${i % 2 ? 'mirror' : 'default'}>
              ${c.photos.map(
                (p, j) =>
                  html`<oc-image
                    src=${sized(p.src, j === 0 ? 1000 : 600)}
                    full=${sized(p.src, 2000)}
                    alt=${p.alt}
                    action
                  ></oc-image>`
              )}
            </oc-gallery>
          </oc-section>`
      )}
    </oc-page-layout>`
  };
}
