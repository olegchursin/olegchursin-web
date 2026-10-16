import { css, html } from 'lit';
import { Illustration, define } from './base.ts';

/**
 * Fig: the life of a page. Lit SSR at build time → HTML with declarative shadow DOM
 * → a complete first paint with zero JavaScript → the bundle arrives and only the
 * interactive components wake up (hydrate).
 */
export class IllSsr extends Illustration {
  protected readonly label =
    'A timeline with four stages: build with Lit SSR, HTML with declarative shadow DOM, first paint without JavaScript, and hydration. A browser window shows markup with template shadowrootmode open streaming in, then the fully styled page appearing at once, then a 17 kilobyte script arriving and the interactive parts, the theme toggle, the search field and the tags, pulsing red as they hydrate.';

  static override styles = [
    Illustration.baseStyles,
    css`
      .stage {
        --loop: 11s;
        container-type: inline-size;
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 5%;
        padding: 5% 5% 5%;
      }

      /* timeline */
      .timeline {
        position: relative;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        border-top: 2px solid var(--oc-ink);
        padding-top: 0.5em;
        font-size: clamp(0.5rem, 1.6cqi, 0.72rem);
        line-height: 1.2;
      }
      .timeline b {
        display: block;
        font-size: 1.2em;
      }
      .timeline span {
        padding-right: 0.5em;
        color: var(--oc-ink-2);
      }
      .head {
        position: absolute;
        top: -0.4rem;
        left: 100%;
        width: 0.7rem;
        height: 0.7rem;
        translate: -50% 0;
        background: var(--oc-red);
        animation: head var(--loop) linear infinite;
      }
      @keyframes head {
        0% {
          left: 0%;
        }
        22%,
        25% {
          left: 25%;
        }
        47%,
        50% {
          left: 50%;
        }
        72%,
        75% {
          left: 75%;
        }
        97%,
        100% {
          left: 100%;
        }
      }

      /* browser */
      .browser {
        position: relative;
        display: grid;
        grid-template-rows: auto 1fr;
        border: 2px solid var(--oc-ink);
        min-height: 0;
      }
      .chrome {
        display: flex;
        gap: 0.3rem;
        align-items: center;
        padding: 0.3rem 0.5rem;
        border-bottom: 1px solid var(--oc-ink);
        font-size: 0.55rem;
      }
      .chrome i {
        width: 0.45rem;
        height: 0.45rem;
        border-radius: 50%;
        border: 1px solid var(--oc-ink);
      }
      .chrome span {
        margin-left: 0.5rem;
        color: var(--oc-ink-3);
      }
      .viewport {
        position: relative;
        overflow: hidden;
      }
      .layer {
        position: absolute;
        inset: 0;
      }

      /* stage 2: markup streams in */
      .markup {
        padding: 0.6rem 0.8rem;
        font-size: clamp(0.45rem, 1.5cqi, 0.68rem);
        line-height: 1.5;
        white-space: pre;
        color: var(--oc-ink-2);
        opacity: 0;
        animation: markup var(--loop) linear infinite;
      }
      .markup .t {
        color: var(--oc-red-text);
      }
      .markup div {
        clip-path: inset(0 100% 0 0);
        animation: typeline var(--loop) steps(24) infinite;
        animation-delay: calc(var(--i) * 0.35s);
      }
      @keyframes markup {
        0%,
        20% {
          opacity: 0;
        }
        23%,
        47% {
          opacity: 1;
        }
        50%,
        100% {
          opacity: 0;
        }
      }
      @keyframes typeline {
        0%,
        22% {
          clip-path: inset(0 100% 0 0);
        }
        30%,
        100% {
          clip-path: inset(0 0 0 0);
        }
      }

      /* stage 3+: the painted page (base state) */
      .page {
        display: grid;
        grid-template-columns: 1fr 3fr;
        gap: 6%;
        padding: 6% 6%;
        animation: paint var(--loop) linear infinite;
      }
      @keyframes paint {
        0%,
        49% {
          opacity: 0;
        }
        50%,
        97% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      .vtitle {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        font-weight: 900;
        font-stretch: 62%;
        font-size: 7cqi;
        line-height: 0.8;
        letter-spacing: -0.04em;
        align-self: end;
      }
      .content {
        display: grid;
        align-content: start;
        gap: 0.55rem;
      }
      .lede {
        height: 0.8rem;
        width: 85%;
        background: var(--oc-ink);
      }
      .lede + .lede {
        width: 60%;
      }
      .row {
        display: flex;
        gap: 0.4rem;
        align-items: center;
      }
      .search {
        position: relative;
        flex: 1;
        height: 1.2rem;
        border-bottom: 2px solid var(--oc-ink);
      }
      .tag {
        width: 1.8rem;
        height: 0.9rem;
        border: 1px solid var(--oc-ink);
      }
      .entry {
        height: 0.35rem;
        background: var(--oc-ink-3);
      }
      .toggle-dot {
        position: absolute;
        right: 0.6rem;
        top: 0.25rem;
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        border: 1.5px solid var(--oc-ink);
        background: linear-gradient(90deg, var(--oc-ink) 50%, transparent 50%);
      }

      /* stage 4: hydration pulses on interactive parts only */
      .tag {
        position: relative;
      }
      .live::after {
        content: '';
        position: absolute;
        inset: -0.25rem;
        border: 2px solid var(--oc-red);
        opacity: 0;
        animation: wake var(--loop) var(--oc-ease) infinite;
        animation-delay: calc(var(--i) * 0.3s);
      }
      @keyframes wake {
        0%,
        76% {
          opacity: 0;
          scale: 1.4;
        }
        80% {
          opacity: 1;
          scale: 1;
        }
        92% {
          opacity: 1;
        }
        97%,
        100% {
          opacity: 0;
        }
      }
      .js {
        position: absolute;
        right: 0.6rem;
        bottom: 0.6rem;
        padding: 0.15rem 0.4rem;
        background: var(--oc-ink);
        color: var(--oc-paper);
        font-size: 0.55rem;
        font-weight: var(--oc-weight-bold);
        animation: js var(--loop) var(--oc-ease) infinite;
      }
      @keyframes js {
        0%,
        73% {
          opacity: 0;
          translate: 0 -150%;
        }
        77%,
        96% {
          opacity: 1;
          translate: 0 0;
        }
        100% {
          opacity: 0;
        }
      }

      /* stage 1: build */
      .build {
        display: grid;
        place-items: center;
        font-size: clamp(0.6rem, 2cqi, 0.9rem);
        font-weight: var(--oc-weight-bold);
        opacity: 0;
        animation: build var(--loop) linear infinite;
      }
      .build span {
        padding: 0.4em 0.8em;
        border: 2px solid var(--oc-ink);
      }
      @keyframes build {
        0%,
        20% {
          opacity: 1;
        }
        23%,
        100% {
          opacity: 0;
        }
      }
    `
  ];

  protected renderArt() {
    const markup = [
      ['<oc-entry href="/work">', ''],
      ['  <template ', 'shadowrootmode="open">'],
      ['    <style>:host{…}</style>', ''],
      ['    <a part="link"><slot></slot></a>', ''],
      ['  </template>', ''],
      ['  <h3>Lead Software Engineer</h3>', ''],
      ['</oc-entry>', '']
    ];
    return html`<div class="timeline">
        <div class="head"></div>
        <span><b>Build</b>Lit SSR renders every route</span>
        <span><b>HTML</b>Declarative shadow DOM</span>
        <span><b>First paint</b>Styled, zero JavaScript</span>
        <span><b>Hydrate</b>Components wake up</span>
      </div>
      <div class="browser">
        <div class="chrome">
          <i></i><i></i><i></i><span>olegchursin.com/writing</span>
        </div>
        <div class="viewport">
          <div class="layer build">
            <span class="mono">tsx scripts/prerender.ts</span>
          </div>
          <div class="layer markup mono">
            ${markup.map(
              ([a, b], i) =>
                html`<div style="--i:${i}">
                  ${a}<span class="t">${b}</span>
                </div>`
            )}
          </div>
          <div class="layer page">
            <div class="vtitle">Writing</div>
            <div class="content">
              <div class="lede"></div>
              <div class="lede"></div>
              <div class="row">
                <div class="search live" style="--i:1"></div>
                <div class="tag live" style="--i:2"></div>
                <div class="tag live" style="--i:3"></div>
              </div>
              <div class="entry" style="width:90%"></div>
              <div class="entry" style="width:75%"></div>
              <div class="entry" style="width:82%"></div>
            </div>
            <div class="toggle-dot live" style="--i:0"></div>
            <div class="js">JS 17 kB gzip</div>
          </div>
        </div>
      </div>`;
  }
}

define('ill-ssr', IllSsr);
