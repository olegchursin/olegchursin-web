import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Page } from '../types.ts';
import {
  career,
  earlier,
  education,
  formatMonth,
  softwareSince,
  stack,
  yearRange,
  type Role
} from '../data/career.ts';

const roleEntry = (role: Role) =>
  html`<li>
    <oc-entry href=${ifDefined(role.url)} size="lg">
      <span slot="meta"
        >${formatMonth(role.start)}–<br />${role.end ? formatMonth(role.end) : 'now'}</span
      >
      <h3>${role.title}</h3>
      ${role.summary ? html`<span slot="detail">${role.summary}</span>` : ''}
      <span slot="aside">${role.company}</span>
    </oc-entry>
  </li>`;

export function workPage(): Page {
  const years = new Date().getFullYear() - softwareSince;

  return {
    path: '/work',
    section: '/work',
    title: 'Work',
    description:
      'Career of Oleg Chursin: Senior Software Engineering Manager at Aon, technical owner of CyQu, previously Philosophie and Human Interaction.',
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
          Engineering manager at Aon and technical owner of CyQu. Before
          software: newspapers, marketing and a PhD in cognitive linguistics.
        </p>
      </oc-section>

      <oc-section rule="bar">
        <h2 slot="label">Software</h2>
        <ol class="timeline" role="list">
          ${career.map(roleEntry)}
        </ol>
      </oc-section>

      <oc-section>
        <h2 slot="label">Tools</h2>
        <ul class="tags" role="list">
          ${stack.map(t => html`<li><oc-tag>${t}</oc-tag></li>`)}
        </ul>
      </oc-section>

      <oc-section>
        <h2 slot="label">Before software</h2>
        <ol class="timeline" role="list">
          ${earlier.map(
            role =>
              html`<li>
                <oc-entry>
                  <span slot="meta">${yearRange(role)}</span>
                  <h3>${role.title}</h3>
                  ${role.summary ? html`<span slot="detail">${role.summary}</span>` : ''}
                  <span slot="aside">${role.company}</span>
                </oc-entry>
              </li>`
          )}
        </ol>
      </oc-section>

      <oc-section>
        <h2 slot="label">Education</h2>
        <ol class="timeline" role="list">
          ${education.map(
            s =>
              html`<li>
                <oc-entry>
                  <span slot="meta">${s.years}</span>
                  <h3>${s.degree}</h3>
                  <span slot="aside">${s.school}</span>
                </oc-entry>
              </li>`
          )}
        </ol>
      </oc-section>

      <oc-section>
        <h2 slot="label">Elsewhere</h2>
        <div class="flow">
          <p>
            Recommendations are on
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
