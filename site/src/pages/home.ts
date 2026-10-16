import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Page } from '../types.ts';
import { site } from '../data/site.ts';
import { career, softwareSince, yearRange } from '../data/career.ts';
import { profiles } from '../data/links.ts';
import { collections, sized } from '../data/photos.ts';
import { formatShortDate, type Post } from '../content/posts.ts';

export function homePage(posts: readonly Post[]): Page {
  const latest = posts.slice(0, 3);
  const strip = collections.map(c => ({ ...c.photos[0], collection: c.title }));

  return {
    path: '/',
    title: site.name,
    description: site.description,
    body: html`<oc-page-layout>
      <div slot="meta" class="rail-facts">
        <p>${site.place}<br />${site.coordinates}</p>
        <p>Building for the web<br />since ${softwareSince}</p>
      </div>
      <oc-display slot="title" as="h1" vertical fit="5.2" width="condensed"
        >Oleg Chursin</oc-display
      >

      <oc-section rule="none" wide>
        <p class="lede">
          Senior Software Engineering Manager at
          <oc-link href="https://www.aon.com/cyber-solutions/">Aon</oc-link>,
          building experiences that are as thoughtful as they are functional.
        </p>
      </oc-section>

      <oc-section>
        <h2 slot="label">About</h2>
        <div class="flow">
          <p>
            Currently embedded in enterprise AI, AI security, spec-driven
            development and AI-assisted engineering tooling, while staying
            hands-on across the frontend stack: web platform architecture, web
            components (StencilJS, Lit), TypeScript, Angular, React, Django and
            AWS.
          </p>
          <p>
            Technical owner of CyQu, Aon’s cyber risk assessment and eSubmission
            platform, deployed across the Americas, EMEA and APAC.
          </p>
          <p>
            A background in graphic design, digital marketing and cognitive
            linguistics quietly informs how I think about UX/UI and the people
            using the software our team ships.
          </p>
          <p>
            Outside of work: father, photographer, triathlete and former
            competitive swimmer.
          </p>
        </div>
      </oc-section>

      <oc-section>
        <h2 slot="label">Work</h2>
        <div>
          ${career.slice(0, 3).map(
            role =>
              html`<oc-entry href=${ifDefined(role.url)}>
                <span slot="meta">${yearRange(role)}</span>
                <h3>${role.title}</h3>
                <span slot="aside">${role.company}</span>
              </oc-entry>`
          )}
          <p class="more">
            <oc-link variant="strong" href="/work">Full career</oc-link>
          </p>
        </div>
      </oc-section>

      <oc-section>
        <h2 slot="label">Writing</h2>
        <div>
          ${latest.map(
            post =>
              html`<oc-entry href=${`/writing/${post.slug}`}>
                <span slot="meta">${formatShortDate(post.date)}</span>
                <h3>${post.title}</h3>
                <span slot="aside">${post.tags.join(', ')}</span>
              </oc-entry>`
          )}
          <p class="more">
            <oc-link variant="strong" href="/writing"
              >All ${posts.length} posts</oc-link
            >
          </p>
        </div>
      </oc-section>

      <oc-section>
        <h2 slot="label">Photography</h2>
        <div>
          <ul class="photo-strip" role="list">
            ${strip.map(
              p =>
                html`<li>
                  <a href=${`/photography#${p.collection.toLowerCase()}`}>
                    <oc-image
                      src=${sized(p.src, 600)}
                      alt=${p.alt}
                      ratio="1"
                    ></oc-image>
                    <span>${p.collection}</span>
                  </a>
                </li>`
            )}
          </ul>
          <p class="more">
            <oc-link variant="strong" href="/photography"
              >See the collections</oc-link
            >
          </p>
        </div>
      </oc-section>

      <oc-section>
        <h2 slot="label">Elsewhere</h2>
        <ul class="profiles" role="list">
          ${profiles.map(
            p =>
              html`<li>
                <oc-link variant="strong" href=${p.href}>${p.label}</oc-link>
                <span>${p.note}</span>
              </li>`
          )}
        </ul>
      </oc-section>
    </oc-page-layout>`
  };
}
