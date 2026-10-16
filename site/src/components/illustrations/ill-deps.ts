import { css, html } from 'lit';
import { Illustration, define } from './base.ts';

// The old site's package.json (dependencies + devDependencies), verbatim.
const OLD = [
  'next',
  'react',
  'react-dom',
  'next-mdx-remote',
  'next-themes',
  'react-query',
  'jotai',
  'react-icons',
  'clsx',
  'gray-matter',
  'reading-time',
  'remark-gfm',
  'rehype-slug',
  'rehype-autolink-headings',
  'rehype-code-titles',
  'rehype-prism-plus',
  'tailwindcss',
  '@tailwindcss/typography',
  'postcss',
  'autoprefixer',
  'prettier-plugin-tailwindcss',
  'eslint-config-next',
  'eslint',
  'typescript',
  '@types/react',
  '@types/react-dom',
  '@types/node',
  'prettier'
];

// What the browser gets from npm now.
const NEW = [
  'lit',
  '@lit-labs/ssr-client',
  '@fontsource-variable/archivo',
  '@fontsource-variable/jetbrains-mono'
];

/** Fig: the old dependency list falls away; four runtime packages remain. */
export class IllDeps extends Illustration {
  protected readonly label =
    'Twenty-eight package names from the old site, including next, react, tailwindcss and react-query, fall off the frame one by one. Four remain as the runtime dependencies of the new site: lit, the Lit SSR client and two font packages. A counter changes from 16 runtime dependencies to 4.';

  static override styles = [
    Illustration.baseStyles,
    css`
      .stage {
        --loop: 12s;
        container-type: inline-size;
        display: grid;
        grid-template-columns: 1fr 3fr;
        gap: 4%;
        padding: 5%;
      }
      .count {
        display: grid;
        align-content: end;
        gap: 0.3em;
        font-size: clamp(0.55rem, 1.6cqi, 0.75rem);
        line-height: 1.2;
      }
      .num {
        display: grid;
        font-size: 15cqi;
        font-weight: 900;
        font-stretch: 62%;
        line-height: 0.8;
        letter-spacing: -0.04em;
      }
      .num span {
        grid-area: 1 / 1;
      }
      .num .before {
        opacity: 0;
        animation: before var(--loop) linear infinite;
      }
      .num .after {
        color: var(--oc-red);
        animation: after var(--loop) linear infinite;
      }
      @keyframes before {
        0%,
        52% {
          opacity: 1;
        }
        55%,
        100% {
          opacity: 0;
        }
      }
      @keyframes after {
        0%,
        55% {
          opacity: 0;
        }
        58%,
        96% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      .pile {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        gap: 0.35rem;
      }
      .chip {
        padding: 0.15em 0.45em;
        border: 1px solid var(--oc-ink);
        font-size: clamp(0.45rem, 1.45cqi, 0.68rem);
        white-space: nowrap;
        /* base state: gone (the finished frame shows only the new set) */
        opacity: 0;
        animation: fall var(--loop) cubic-bezier(0.5, 0, 0.9, 0.4) infinite;
        animation-delay: calc(var(--i) * 0.16s);
      }
      @keyframes fall {
        0%,
        8% {
          opacity: 1;
          translate: 0 0;
          rotate: 0deg;
        }
        20% {
          opacity: 0;
          translate: var(--dx) 18cqi;
          rotate: var(--rot);
        }
        100% {
          opacity: 0;
          translate: var(--dx) 18cqi;
          rotate: var(--rot);
        }
      }
      .keep {
        position: absolute;
        inset: 38% 0 auto 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
      .keep span {
        padding: 0.3em 0.6em;
        background: var(--oc-ink);
        color: var(--oc-paper);
        font-size: clamp(0.55rem, 1.8cqi, 0.85rem);
        font-weight: var(--oc-weight-bold);
        animation: keep var(--loop) var(--oc-ease) infinite;
        animation-delay: calc(var(--i) * 0.15s);
      }
      .keep span:first-child {
        background: var(--oc-red);
        color: var(--oc-on-red);
      }
      @keyframes keep {
        0%,
        52% {
          opacity: 0;
          translate: 0 50%;
        }
        58%,
        95% {
          opacity: 1;
          translate: 0 0;
        }
        100% {
          opacity: 0;
        }
      }
    `
  ];

  protected renderArt() {
    return html`<div class="count">
        <div class="num">
          <span class="before">16</span><span class="after">4</span>
        </div>
        <span>runtime dependencies from npm</span>
      </div>
      <div class="pile mono">
        ${OLD.map(
          (name, i) =>
            html`<span
              class="chip"
              style="--i:${i};--dx:${((i * 37) % 9) - 4}cqi;--rot:${((i * 53) % 50) - 25}deg"
              >${name}</span
            >`
        )}
        <div class="keep mono">
          ${NEW.map((name, i) => html`<span style="--i:${i}">${name}</span>`)}
        </div>
      </div>`;
  }
}

define('ill-deps', IllDeps);
