import { html } from 'lit';
import type { Page } from '../types.ts';
import { site } from '../data/site.ts';
import { career, yearRange } from '../data/career.ts';
import { profiles } from '../data/links.ts';
import { collections, parkSlope, sized } from '../data/photos.ts';
import { formatShortDate, type Post } from '../content/posts.ts';

export function homePage(posts: readonly Post[]): Page {
  const latest = posts.slice(0, 3);
  const firstYear = career[career.length - 1].start.slice(0, 4);
  const strip = collections.map(c => ({ ...c.photos[0], collection: c.title }));

  return {
    path: '/',
    title: site.name,
    description: site.description,
    body: html`<oc-page-layout>
      <div slot="meta" class="rail-facts">
        <p>${site.place}<br />${site.coordinates}</p>
        <p>Building for the web<br />since ${firstYear}</p>
      </div>
      <oc-display slot="title" as="h1" vertical fit="5.2" width="condensed"
        >Oleg Chursin</oc-display
      >

      <oc-section rule="none" wide>
        <div class="home-hero">
          <p class="lede">
            Senior software developer with a background in graphic design. I
            build cyber insurance tools at
            <oc-link href="https://www.aon.com/cyber-solutions/">Aon</oc-link>,
            mostly in TypeScript.
          </p>
          <div class="home-poster">
            <div class="home-poster__block" aria-hidden="true"></div>
            <oc-image
              class="home-poster__photo"
              src=${sized(parkSlope.src, 1200)}
              alt=${parkSlope.alt}
              width="1200"
              height="750"
              ratio="4/5"
              treatment="grayscale"
              loading="eager"
            ></oc-image>
            <p class="home-poster__caption">Park Slope, Brooklyn.</p>
          </div>
        </div>
      </oc-section>

      <oc-section>
        <h2 slot="label">About</h2>
        <div class="flow">
          <p>
            Before software I worked in graphic design and digital marketing,
            with a background in cognitive linguistics. I care most about where
            those meet: interfaces that are clear because their type, grid and
            words are.
          </p>
          <p>
            Outside work I photograph people and places, and race triathlons. I
            swam competitively for years.
          </p>
        </div>
      </oc-section>

      <oc-section>
        <h2 slot="label">Work</h2>
        <div>
          ${career.slice(0, 3).map(
            role =>
              html`<oc-entry href=${role.url}>
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
