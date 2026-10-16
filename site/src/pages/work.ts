import { html } from 'lit';
import type { Page } from '../types.ts';
import { career, formatMonth, stack } from '../data/career.ts';

export function workPage(): Page {
  const first = career[career.length - 1];
  const years = new Date().getFullYear() - Number(first.start.slice(0, 4));

  return {
    path: '/work',
    section: '/work',
    title: 'Work',
    description:
      'Career of Oleg Chursin: senior software developer at Aon Cyber Solutions, previously Philosophie and Human Interaction.',
    body: html`<oc-page-layout>
      <div slot="meta" class="rail-facts">
        <oc-numeral size="xl">${years}</oc-numeral>
        <p>years of building<br />for the web</p>
      </div>
      <oc-display slot="title" as="h1" vertical fit="1.9" width="condensed"
        >Work</oc-display
      >

      <oc-section rule="none" wide>
        <p class="lede">
          From founding a web practice to building cyber insurance products at
          Aon, always somewhere between design and engineering.
        </p>
      </oc-section>

      <oc-section rule="bar">
        <h2 slot="label">Career</h2>
        <ol class="timeline" role="list">
          ${career.map(
            role =>
              html`<li>
                <oc-entry href=${role.url} size="lg">
                  <span slot="meta"
                    >${formatMonth(role.start)}–<br />${
                      role.end ? formatMonth(role.end) : 'now'
                    }</span
                  >
                  <h3>${role.title}</h3>
                  ${role.summary ? html`<span slot="detail">${role.summary}</span>` : ''}
                  <span slot="aside">${role.company}</span>
                </oc-entry>
              </li>`
          )}
        </ol>
      </oc-section>

      <oc-section>
        <h2 slot="label">Tools</h2>
        <ul class="tags" role="list">
          ${stack.map(t => html`<li><oc-tag>${t}</oc-tag></li>`)}
        </ul>
      </oc-section>

      <oc-section>
        <h2 slot="label">Background</h2>
        <div class="flow">
          <p>
            Graphic design, digital marketing and cognitive linguistics came
            before software. They show up as a habit: start from the content,
            set it on a grid, and let the type carry the hierarchy.
          </p>
          <p>
            Résumé and recommendations are on
            <oc-link href="https://www.linkedin.com/in/olegchursin/"
              >LinkedIn</oc-link
            >; code is on
            <oc-link href="https://github.com/olegchursin">GitHub</oc-link>.
          </p>
        </div>
      </oc-section>
    </oc-page-layout>`
  };
}
