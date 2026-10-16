import { html } from 'lit';
import type { Page } from '../types.ts';

export function notFoundPage(): Page {
  return {
    path: '/404',
    title: 'Page not found',
    description: 'This page does not exist.',
    body: html`<oc-page-layout>
      <oc-display
        slot="title"
        as="p"
        vertical
        fit="1.5"
        width="condensed"
        tone="red"
        aria-hidden="true"
        >404</oc-display
      >
      <oc-section rule="none" wide>
        <h1 class="lede">This page doesn’t exist.</h1>
        <div class="flow not-found">
          <p>
            It may have moved when the site was rebuilt. Bookmarks and Uses are
            gone; everything else lives under these:
          </p>
          <ul class="profiles" role="list">
            <li><oc-link variant="strong" href="/">Home</oc-link></li>
            <li><oc-link variant="strong" href="/work">Work</oc-link></li>
            <li><oc-link variant="strong" href="/writing">Writing</oc-link></li>
            <li>
              <oc-link variant="strong" href="/photography"
                >Photography</oc-link
              >
            </li>
          </ul>
        </div>
      </oc-section>
    </oc-page-layout>`
  };
}
