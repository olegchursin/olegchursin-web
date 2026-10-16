import { css, html } from 'lit';
import { Illustration, define } from './base.ts';

/** Fig: twelve columns draw in, then a poster snaps onto them. */
export class IllGrid extends Illustration {
  protected readonly label =
    'Twelve vertical column guides draw from top to bottom. A vertical word, a red block, a circle and lines of text then snap into place on the columns, forming a Swiss poster.';

  static override styles = [
    Illustration.baseStyles,
    css`
      .page {
        position: absolute;
        inset: 6% 5%;
      }
      .cols,
      .poster {
        position: absolute;
        inset: 0;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        column-gap: 2%;
      }
      .poster {
        grid-template-rows: repeat(8, 1fr);
        row-gap: 3%;
      }
      .col {
        position: relative;
        background: color-mix(in srgb, var(--oc-red) 6%, transparent);
        border-inline: 1px solid
          color-mix(in srgb, var(--oc-ink) 22%, transparent);
        transform-origin: top;
        animation: draw var(--loop) var(--oc-ease) infinite;
        animation-delay: calc(var(--i) * 60ms);
      }
      .col span {
        position: absolute;
        top: -1.1em;
        left: 0;
        font-size: 0.55rem;
        color: var(--oc-ink-3);
      }
      @keyframes draw {
        0% {
          transform: scaleY(0);
          opacity: 1;
        }
        14% {
          transform: scaleY(1);
        }
        88% {
          transform: scaleY(1);
          opacity: 1;
        }
        96%,
        100% {
          transform: scaleY(1);
          opacity: 0;
        }
      }

      .word {
        grid-area: 1 / 1 / 9 / 3;
        align-self: end;
        justify-self: start;
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        font-size: clamp(2.5rem, 13cqi, 7rem);
        font-weight: var(--oc-weight-black);
        font-stretch: var(--oc-wdth-condensed);
        line-height: 0.8;
        letter-spacing: -0.04em;
        animation: rise var(--loop) var(--oc-ease) infinite;
      }
      @keyframes rise {
        0%,
        18% {
          opacity: 0;
          translate: 0 30%;
        }
        27% {
          opacity: 1;
          translate: 0 0;
        }
        88% {
          opacity: 1;
        }
        96%,
        100% {
          opacity: 0;
        }
      }

      .block {
        grid-area: 1 / 4 / 5 / 7;
        background: var(--oc-red);
        transform-origin: left;
        animation: wipe var(--loop) var(--oc-ease) infinite;
      }
      @keyframes wipe {
        0%,
        26% {
          transform: scaleX(0);
        }
        34% {
          transform: scaleX(1);
        }
        88% {
          opacity: 1;
        }
        96%,
        100% {
          opacity: 0;
          transform: scaleX(1);
        }
      }

      .circle {
        grid-area: 1 / 11 / 3 / 13;
        align-self: start;
        justify-self: end;
        width: 70%;
        aspect-ratio: 1;
        border-radius: 50%;
        background: var(--oc-ink);
        animation: pop var(--loop) var(--oc-ease) infinite;
      }
      @keyframes pop {
        0%,
        34% {
          transform: scale(0);
        }
        39% {
          transform: scale(1.15);
        }
        42% {
          transform: scale(1);
        }
        88% {
          opacity: 1;
        }
        96%,
        100% {
          opacity: 0;
          transform: scale(1);
        }
      }

      .text {
        grid-area: 5 / 8 / 8 / 13;
        display: grid;
        align-content: start;
        gap: 9%;
        padding-top: 4%;
      }
      .text i {
        display: block;
        height: 0.35rem;
        background: var(--oc-ink-2);
        transform-origin: left;
        animation: type var(--loop) var(--oc-ease) infinite;
        animation-delay: calc(var(--i) * 120ms);
      }
      .text i:first-child {
        height: 0.6rem;
        background: var(--oc-ink);
      }
      @keyframes type {
        0%,
        42% {
          transform: scaleX(0);
        }
        50% {
          transform: scaleX(1);
        }
        88% {
          opacity: 1;
        }
        96%,
        100% {
          opacity: 0;
          transform: scaleX(1);
        }
      }

      .num {
        grid-area: 8 / 7 / 9 / 9;
        align-self: end;
        font-size: clamp(0.9rem, 3.4cqi, 1.6rem);
        font-weight: var(--oc-weight-bold);
        font-stretch: var(--oc-wdth-narrow);
        animation: fade var(--loop) linear infinite;
      }
      .rule {
        grid-area: 8 / 9 / 9 / 13;
        align-self: end;
        height: 0.4rem;
        background: var(--oc-ink);
        animation: fade var(--loop) linear infinite;
      }
      @keyframes fade {
        0%,
        52% {
          opacity: 0;
        }
        58%,
        88% {
          opacity: 1;
        }
        96%,
        100% {
          opacity: 0;
        }
      }
      .stage {
        container-type: inline-size;
      }
    `
  ];

  protected renderArt() {
    const cols = Array.from({ length: 12 }, (_, i) => i);
    const lines = [100, 92, 96, 70, 84];
    return html`<div class="page">
      <div class="cols">
        ${cols.map(
          i =>
            html`<div class="col" style="--i:${i}"><span>${i + 1}</span></div>`
        )}
      </div>
      <div class="poster">
        <div class="word">Grid</div>
        <div class="block"></div>
        <div class="circle"></div>
        <div class="text">
          ${lines.map((w, i) => html`<i style="--i:${i};width:${w}%"></i>`)}
        </div>
        <div class="num">16</div>
        <div class="rule"></div>
      </div>
    </div>`;
  }
}

define('ill-grid', IllGrid);
