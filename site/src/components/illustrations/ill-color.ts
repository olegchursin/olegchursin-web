import { css, html } from 'lit';
import { Illustration, define } from './base.ts';

const ROWS: [string, string, string, number, string][] = [
  // label, foreground, background, ratio, note
  ['Ink on paper', 'var(--oc-ink)', 'var(--oc-paper)', 17.76, 'Text'],
  ['Ink 3 on paper', 'var(--oc-ink-3)', 'var(--oc-paper)', 5.41, 'Meta text'],
  [
    'Red text on paper',
    'var(--oc-red-text)',
    'var(--oc-paper)',
    4.96,
    'Labels, links'
  ],
  ['Black on red', '#000', 'var(--oc-red)', 4.91, 'Buttons'],
  ['Red on paper', 'var(--oc-red)', 'var(--oc-paper)', 3.62, 'Shapes only']
];

/**
 * Fig: the red budget. One red element moves between the jobs red is allowed to do,
 * while a contrast chart shows why red text uses a darker red than red shapes.
 */
export class IllColor extends Illustration {
  protected readonly label =
    'Left: a page wireframe in black on paper where a single red element moves between three jobs: marking the current page, filling one block, and showing a focus ring. Right: contrast bars against the 4.5 to 1 threshold. Ink on paper 17.8, ink 3 on paper 5.4, red text on paper 5.0, black on red 4.9, and red on paper 3.6, which is for shapes only.';

  static override styles = [
    Illustration.baseStyles,
    css`
      .stage {
        container-type: inline-size;
        display: grid;
        grid-template-columns: 1fr 1.15fr;
        gap: 4%;
        padding: 5% 5% 6%;
      }

      @media (max-width: 40rem) {
        .stage {
          aspect-ratio: auto;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          padding-top: 2.5rem;
        }
        .page {
          aspect-ratio: 4 / 3;
        }
        .chart {
          gap: 0.9rem;
          padding-top: 1rem;
        }
      }

      /* ── wireframe ─────────────────────── */
      .page {
        position: relative;
        border: 1px solid var(--oc-ink);
      }
      .bar {
        position: absolute;
        height: 3%;
        background: var(--oc-ink);
      }
      .nav i {
        position: absolute;
        top: 6%;
        width: 13%;
        height: 3%;
        background: var(--oc-ink-2);
      }
      .title {
        position: absolute;
        left: 8%;
        top: 22%;
        width: 55%;
        height: 9%;
        background: var(--oc-ink);
      }
      .lines i {
        position: absolute;
        left: 8%;
        height: 2.2%;
        background: var(--oc-ink-3);
      }
      .btn {
        position: absolute;
        left: 8%;
        bottom: 9%;
        width: 26%;
        height: 9%;
        border: 2px solid var(--oc-ink);
      }
      .red {
        position: absolute;
        background: var(--oc-red);
        /* base: the block */
        left: 70%;
        top: 22%;
        width: 22%;
        height: 40%;
        animation: jobs 9s var(--oc-ease) infinite;
      }
      @keyframes jobs {
        0%,
        26% {
          left: 46%;
          top: 6.3%;
          width: 2.6%;
          height: 2.6%;
          outline: 0 solid var(--oc-red);
          background: var(--oc-red);
        }
        33%,
        59% {
          left: 70%;
          top: 22%;
          width: 22%;
          height: 40%;
          outline: 0 solid var(--oc-red);
          background: var(--oc-red);
        }
        66%,
        93% {
          left: 6.4%;
          top: calc(91% - 9% - 1.6%);
          width: 29%;
          height: 12.4%;
          outline: 0 solid var(--oc-red);
          background: transparent;
        }
        100% {
          left: 46%;
          top: 6.3%;
          width: 2.6%;
          height: 2.6%;
          background: var(--oc-red);
        }
      }
      .red::after {
        content: '';
        position: absolute;
        inset: 0;
        border: 3px solid var(--oc-red);
      }
      .jobs {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1.5em;
        font-size: 0.68rem;
        font-weight: var(--oc-weight-bold);
        color: var(--oc-red-text);
      }
      .jobs span {
        position: absolute;
        left: 0;
        opacity: 0;
        animation: caption 9s linear infinite;
        animation-delay: calc(var(--i) * 3s);
      }
      .jobs span:nth-child(2) {
        opacity: 1;
      }
      @keyframes caption {
        0%,
        2% {
          opacity: 0;
        }
        5%,
        30% {
          opacity: 1;
        }
        33%,
        100% {
          opacity: 0;
        }
      }

      /* ── contrast chart ────────────────── */
      .chart {
        position: relative;
        display: grid;
        align-content: center;
        gap: 6%;
      }
      .row {
        display: grid;
        grid-template-columns: 2.2em 1fr;
        align-items: center;
        gap: 0.5em;
        font-size: 0.66rem;
        line-height: 1.15;
      }
      .sample {
        display: grid;
        place-items: center;
        aspect-ratio: 1;
        font-weight: var(--oc-weight-bold);
        font-size: 0.8rem;
        border: 1px solid var(--oc-line);
      }
      .swatch {
        width: 60%;
        height: 60%;
      }
      .meter {
        position: relative;
        height: 0.55rem;
        background: var(--oc-paper-2);
      }
      .fill {
        position: absolute;
        inset: 0 auto 0 0;
        width: calc(var(--r) / 21 * 100%);
        background: var(--oc-ink);
        transform-origin: left;
        animation: grow 9s var(--oc-ease) infinite;
      }
      .fail .fill {
        background: var(--oc-red);
      }
      @keyframes grow {
        0%,
        4% {
          transform: scaleX(0);
        }
        16%,
        94% {
          transform: scaleX(1);
        }
        100% {
          transform: scaleX(0);
        }
      }
      .meta {
        display: flex;
        justify-content: space-between;
        gap: 0.5em;
        margin-bottom: 0.2em;
      }
      .meta b {
        font-variant-numeric: tabular-nums;
      }
      .threshold {
        position: absolute;
        top: 8%;
        bottom: 8%;
        left: calc(2.2em + 0.5em + (100% - 2.7em) * 4.5 / 21);
        border-left: 1px dashed var(--oc-ink);
        font-size: 0.6rem;
      }
      .threshold span {
        position: absolute;
        top: -1.2em;
        left: 0.3em;
        white-space: nowrap;
        font-weight: var(--oc-weight-bold);
      }
    `
  ];

  protected renderArt() {
    const lines = [
      [40, 74],
      [47, 66],
      [54, 70],
      [61, 48]
    ];
    return html`<div class="page">
        <div class="bar" style="left:8%;top:6%;width:16%"></div>
        <div class="nav">
          ${[30, 50, 70].map(l => html`<i style="left:${l}%"></i>`)}
        </div>
        <div class="title"></div>
        <div class="lines">
          ${lines.map(([t, w]) => html`<i style="top:${t}%;width:${w * 0.55}%"></i>`)}
        </div>
        <div class="btn"></div>
        <div class="red"></div>
        <div class="jobs">
          <span style="--i:0">Marks the current page</span>
          <span style="--i:1">One block per view</span>
          <span style="--i:2">The focus ring</span>
        </div>
      </div>
      <div class="chart">
        <div class="threshold"><span>AA 4.5</span></div>
        ${ROWS.map(
          ([name, fg, bg, r, note]) =>
            html`<div class="row ${r < 4.5 ? 'fail' : ''}">
              ${
                r < 4.5
                  ? html`<span class="sample" style="background:${bg}"
                      ><i class="swatch" style="background:${fg}"></i
                    ></span>`
                  : html`<span
                      class="sample"
                      style="color:${fg};background:${bg}"
                      >Aa</span
                    >`
              }
              <div>
                <div class="meta">
                  <span>${name}</span><b>${r.toFixed(1)}</b>
                </div>
                <div class="meter">
                  <div class="fill" style="--r:${r}"></div>
                </div>
                <div
                  class="meta"
                  style="margin:0.15em 0 0;color:var(--oc-ink-3)"
                >
                  ${note}
                </div>
              </div>
            </div>`
        )}
      </div>`;
  }
}

define('ill-color', IllColor);
