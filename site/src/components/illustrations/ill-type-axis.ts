import { css, html } from 'lit';
import { Illustration, define } from './base.ts';

/**
 * Fig: one word sweeps Archivo's width axis from 62% to 125%. A single registered
 * custom property (--wdth) drives the type, the marker on the ruler and the readout,
 * so the three can never drift apart.
 */
export class IllTypeAxis extends Illustration {
  protected readonly label =
    'The word Swiss stretches from condensed to extended and back. A red marker slides along a ruler marked 62, 78, 100, 112 and 125 percent, and a readout shows the current width.';

  static override styles = [
    Illustration.baseStyles,
    css`
      .stage {
        container-type: inline-size;
        --wdth: 100;
        animation: sweep 7s cubic-bezier(0.65, 0, 0.35, 1) infinite alternate;
      }
      @keyframes sweep {
        0%,
        8% {
          --wdth: 62;
        }
        92%,
        100% {
          --wdth: 125;
        }
      }
      .word {
        position: absolute;
        left: 5%;
        top: 8%;
        font-size: 18cqi;
        font-weight: var(--oc-weight-black);
        font-stretch: calc(var(--wdth) * 1%);
        line-height: 0.9;
        letter-spacing: -0.045em;
        white-space: nowrap;
      }
      .readout {
        position: absolute;
        right: 5%;
        bottom: 30%;
        display: grid;
        justify-items: end;
        font-size: var(--oc-text-xs);
        color: var(--oc-ink-3);
      }
      .readout b {
        counter-reset: w var(--wdth);
        font-size: 6cqi;
        font-weight: var(--oc-weight-bold);
        font-stretch: var(--oc-wdth-narrow);
        color: var(--oc-ink);
        font-variant-numeric: tabular-nums;
      }
      .readout b::after {
        content: counter(w) '%';
      }
      .ruler {
        position: absolute;
        left: 5%;
        right: 5%;
        bottom: 16%;
        height: 2px;
        background: var(--oc-ink);
      }
      .tick {
        position: absolute;
        left: calc((var(--at) - 62) / 63 * 100%);
        top: 0;
        width: 1px;
        height: 0.7rem;
        background: var(--oc-ink);
      }
      .tick span {
        position: absolute;
        top: 0.9rem;
        left: 0;
        translate: -50% 0;
        display: grid;
        justify-items: center;
        font-size: 0.6rem;
        line-height: 1.2;
        white-space: nowrap;
        color: var(--oc-ink-2);
      }
      .tick:first-child span {
        translate: 0 0;
        justify-items: start;
      }
      .tick:last-child span {
        translate: -100% 0;
        justify-items: end;
      }
      .tick b {
        font-weight: var(--oc-weight-bold);
        color: var(--oc-ink);
      }
      .marker {
        position: absolute;
        left: calc((var(--wdth) - 62) / 63 * 100%);
        top: -0.55rem;
        width: 0.9rem;
        height: 0.9rem;
        translate: -50% 0;
        background: var(--oc-red);
      }
    `
  ];

  override connectedCallback() {
    super.connectedCallback();
    // Registered so the browser can interpolate it and inherit it to children.
    // <integer>, not <number>: counter-reset (the readout) only accepts integers.
    try {
      CSS.registerProperty({
        name: '--wdth',
        syntax: '<integer>',
        inherits: true,
        initialValue: '100'
      });
    } catch {
      /* already registered */
    }
  }

  protected renderArt() {
    const stops: [number, string][] = [
      [62, 'Condensed'],
      [78, 'Narrow'],
      [100, 'Normal'],
      [112, 'Wide'],
      [125, 'Extended']
    ];
    return html`<div class="word">Swiss</div>
      <div class="readout"><span>font-stretch</span><b></b></div>
      <div class="ruler">
        ${stops.map(
          ([at, name]) =>
            html`<div class="tick" style="--at:${at}">
              <span><b>${at}</b>${name}</span>
            </div>`
        )}
        <div class="marker"></div>
      </div>`;
  }
}

define('ill-type-axis', IllTypeAxis);
