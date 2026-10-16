import { css, html } from 'lit';
import { Illustration, define } from './base.ts';

/**
 * Fig: code → tokens.json → a browsable Design System artifact, and the contrast
 * audit flowing back into code (white-on-red 4.3:1 becomes black-on-red 4.9:1).
 */
export class IllClaudeDesign extends Illustration {
  protected readonly label =
    'Three panels. CSS custom properties in tokens.css light up one by one and travel as dots into tokens.json, where they become list entries with a usage note. Component cards then appear in a Design System grid. The Button card shows a failing contrast badge of 4.3 to 1; an arrow returns to tokens.css, the on-red value changes from white to black, and the badge turns to 4.9 to 1, passing AA.';

  static override styles = [
    Illustration.baseStyles,
    css`
      .stage {
        --loop: 12s;
        container-type: inline-size;
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.25fr);
        gap: 5%;
        padding: 6% 4% 7%;
      }
      .pane {
        position: relative;
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 0.5em;
        min-width: 0;
      }
      .head {
        display: flex;
        justify-content: space-between;
        font-size: 0.62rem;
        font-weight: var(--oc-weight-bold);
        border-bottom: 2px solid var(--oc-ink);
        padding-bottom: 0.25em;
      }
      .code {
        display: grid;
        align-content: start;
        gap: 0.35em;
        font-size: clamp(0.45rem, 1.45cqi, 0.7rem);
        line-height: 1.3;
        white-space: nowrap;
        overflow: hidden;
      }
      .code > div {
        position: relative;
        isolation: isolate;
        padding: 0.1em 0.3em;
      }
      /* each line is highlighted in turn */
      .code > div::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        background: color-mix(in srgb, var(--oc-red) 22%, transparent);
        opacity: 0;
        animation: hl var(--loop) linear infinite;
        animation-delay: calc(var(--i) * 0.45s);
      }
      @keyframes hl {
        0%,
        1% {
          opacity: 0;
        }
        3%,
        7% {
          opacity: 1;
        }
        10%,
        100% {
          opacity: 0;
        }
      }
      .k {
        color: var(--oc-ink-3);
      }
      .s {
        color: var(--oc-red-text);
      }

      /* on-red value swap in tokens.css */
      .swap {
        display: inline-grid;
      }
      .swap > span {
        grid-area: 1 / 1;
      }
      .swap .old {
        opacity: 0;
        animation: old var(--loop) linear infinite;
      }
      .swap .new {
        animation: neu var(--loop) linear infinite;
      }
      @keyframes old {
        0%,
        76% {
          opacity: 1;
        }
        79%,
        100% {
          opacity: 0;
        }
      }
      @keyframes neu {
        0%,
        76% {
          opacity: 0;
        }
        79%,
        100% {
          opacity: 1;
        }
      }

      .json > div {
        animation: appear var(--loop) var(--oc-ease) infinite;
        animation-delay: calc(0.5s + var(--i) * 0.45s);
      }
      @keyframes appear {
        0%,
        2% {
          opacity: 0;
          translate: -0.6em 0;
        }
        6%,
        92% {
          opacity: 1;
          translate: 0 0;
        }
        97%,
        100% {
          opacity: 0;
        }
      }

      /* travelling dots between panes */
      .wire {
        position: absolute;
        top: 45%;
        left: 100%;
        width: 25%;
        height: 0;
        border-top: 1px dashed var(--oc-ink-3);
      }
      .wire i {
        position: absolute;
        top: -0.2rem;
        left: 0;
        width: 0.4rem;
        height: 0.4rem;
        background: var(--oc-red);
        animation: travel 1.2s linear infinite;
      }
      @keyframes travel {
        from {
          left: 0;
        }
        to {
          left: calc(100% - 0.4rem);
        }
      }

      /* the artifact: component cards */
      .cards {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: repeat(2, minmax(0, 1fr));
        gap: 0.4rem;
        padding-bottom: 1.6rem;
      }
      .card {
        position: relative;
        display: grid;
        grid-template-rows: 1fr auto;
        border: 1px solid var(--oc-ink);
        background: var(--oc-paper);
        animation: card var(--loop) var(--oc-ease) infinite;
        animation-delay: calc(3.4s + var(--i) * 0.25s);
      }
      @keyframes card {
        0%,
        1% {
          opacity: 0;
          scale: 0.6;
        }
        4%,
        72% {
          opacity: 1;
          scale: 1;
        }
        76%,
        100% {
          opacity: 1;
          scale: 1;
        }
      }
      .card .name {
        padding: 0.2em 0.3em;
        border-top: 1px solid var(--oc-line);
        font-size: 0.5rem;
        font-weight: var(--oc-weight-bold);
      }
      .preview {
        position: relative;
        display: grid;
        place-items: center;
        min-height: 2.6rem;
      }
      .p-display {
        font-weight: 900;
        font-stretch: 62%;
        font-size: 1rem;
        letter-spacing: -0.04em;
      }
      .p-entry {
        width: 70%;
        display: grid;
        gap: 3px;
      }
      .p-entry i {
        height: 3px;
        background: var(--oc-ink);
      }
      .p-entry i + i {
        background: var(--oc-ink-3);
        width: 70%;
      }
      .p-gallery {
        width: 70%;
        height: 60%;
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2px;
      }
      .p-gallery i {
        background: var(--oc-ink-2);
      }
      .p-btn {
        padding: 0.25em 0.6em;
        background: var(--oc-red);
        font-size: 0.55rem;
        font-weight: var(--oc-weight-bold);
        /* finished state: black on red */
        color: #000;
        animation: btntext var(--loop) linear infinite;
      }
      @keyframes btntext {
        0%,
        76% {
          color: #fff;
        }
        79%,
        100% {
          color: #000;
        }
      }
      .p-tag {
        padding: 0.1em 0.4em;
        border: 1px solid var(--oc-ink);
        font-size: 0.5rem;
      }
      .p-dot {
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
        background: var(--oc-ink);
        box-shadow: 1.2rem 0 0 var(--oc-red);
        translate: -0.6rem 0;
      }
      .badge {
        position: absolute;
        right: -0.3rem;
        top: -0.5rem;
        display: grid;
        font-size: 0.5rem;
        font-weight: var(--oc-weight-bold);
        white-space: nowrap;
      }
      .badge span {
        grid-area: 1 / 1;
        padding: 0.1em 0.3em;
      }
      .badge .fail {
        background: var(--oc-red);
        color: #000;
        opacity: 0;
        animation: bfail var(--loop) linear infinite;
      }
      .badge .pass {
        background: var(--oc-ink);
        color: var(--oc-paper);
        animation: bpass var(--loop) linear infinite;
      }
      @keyframes bfail {
        0%,
        52% {
          opacity: 0;
        }
        55%,
        78% {
          opacity: 1;
        }
        80%,
        100% {
          opacity: 0;
        }
      }
      @keyframes bpass {
        0%,
        79% {
          opacity: 0;
        }
        81%,
        95% {
          opacity: 1;
        }
        98%,
        100% {
          opacity: 0;
        }
      }

      /* feedback arrow from the artifact back to code */
      .loopback {
        position: absolute;
        left: 4%;
        right: 18%;
        bottom: 3.5%;
        height: 0.9rem;
        border: 2px solid var(--oc-red);
        border-top: 0;
        opacity: 0;
        animation: loopback var(--loop) linear infinite;
      }
      .loopback::before {
        content: '';
        position: absolute;
        left: -0.4rem;
        top: -0.55rem;
        border: 0.35rem solid transparent;
        border-bottom-color: var(--oc-red);
      }
      .loopback span {
        position: absolute;
        left: 50%;
        bottom: -0.35rem;
        translate: -50% 0;
        padding: 0 0.4em;
        background: var(--oc-paper);
        font-size: 0.55rem;
        font-weight: var(--oc-weight-bold);
        color: var(--oc-red-text);
        white-space: nowrap;
      }
      @keyframes loopback {
        0%,
        60% {
          opacity: 0;
        }
        64%,
        80% {
          opacity: 1;
        }
        84%,
        100% {
          opacity: 0;
        }
      }
    `
  ];

  protected renderArt() {
    const css = [
      ['--oc-paper', '#edece8'],
      ['--oc-ink', '#000000'],
      ['--oc-red', '#e8321e'],
      ['--oc-ink-3', '#605f5b'],
      ['--oc-gutter', 'clamp(…)']
    ];
    const json = ['paper', 'ink', 'red', 'ink-3', 'gutter'];
    const cards: [string, unknown][] = [
      ['Display', html`<span class="p-display">Grid</span>`],
      ['Entry', html`<span class="p-entry"><i></i><i></i></span>`],
      ['Gallery', html`<span class="p-gallery"><i></i><i></i></span>`],
      [
        'Button',
        html`<span class="p-btn">Publish</span>
          <span class="badge"
            ><span class="fail">4.3:1</span
            ><span class="pass">4.9:1 AA</span></span
          >`
      ],
      ['Tag', html`<span class="p-tag">Git</span>`],
      ['Shape', html`<span class="p-dot"></span>`]
    ];
    return html`<div class="pane">
        <div class="head mono"><span>tokens.css</span><span>code</span></div>
        <div class="code mono">
          ${css.map(
            ([k, v], i) =>
              html`<div style="--i:${i}">
                <span class="k">${k}:</span> ${v};
              </div>`
          )}
          <div style="--i:5">
            <span class="k">--oc-on-red:</span>
            <span class="swap"
              ><span class="old">#ffffff</span
              ><span class="new">#000000</span></span
            >;
          </div>
        </div>
        <div class="wire"><i></i></div>
      </div>
      <div class="pane">
        <div class="head mono"><span>tokens.json</span><span>list</span></div>
        <div class="code json mono">
          ${json.map(
            (n, i) =>
              html`<div style="--i:${i}">
                {"name": <span class="s">"${n}"</span>, "usage": …}
              </div>`
          )}
        </div>
        <div class="wire"><i></i></div>
      </div>
      <div class="pane">
        <div class="head"><span>Design System</span><span>22 cards</span></div>
        <div class="cards">
          ${cards.map(
            ([name, art], i) =>
              html`<div class="card" style="--i:${i}">
                <div class="preview">${art}</div>
                <div class="name">${name}</div>
              </div>`
          )}
        </div>
      </div>
      <div class="loopback"><span>Contrast audit fixes the token</span></div>`;
  }
}

define('ill-claude-design', IllClaudeDesign);
