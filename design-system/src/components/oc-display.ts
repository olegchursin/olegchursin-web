import { LitElement, css, html, unsafeCSS } from 'lit';
import { define } from '../internal/define.ts';
import { bp, hostStyles } from '../internal/styles.ts';

export type DisplaySize = 'xl' | '2xl' | '3xl' | 'display' | 'poster';
export type DisplayWidth =
  'condensed' | 'narrow' | 'normal' | 'wide' | 'extended';

export type DisplayTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

/**
 * `<oc-display>` — display typography. Big, tight, heavy; the system's loudest voice.
 * Use one per view. `vertical` sets the text bottom-to-top, poster style
 * (only from 64rem; it falls back to horizontal on small screens).
 *
 * @slot - the words
 * @csspart text - the heading element
 */
export class OcDisplay extends LitElement {
  static override properties = {
    as: { reflect: true },
    size: { reflect: true },
    width: { reflect: true },
    weight: { reflect: true },
    tone: { reflect: true },
    vertical: { type: Boolean, reflect: true },
    fit: { type: Number }
  };

  /** Element rendered: h1–h4, p or span. */
  declare as: DisplayTag;
  declare size: DisplaySize;
  declare width: DisplayWidth;
  declare weight: 'medium' | 'bold' | 'black';
  declare tone: 'ink' | 'red' | 'paper';
  declare vertical: boolean;
  /**
   * Vertical only: the text's length in em — about 0.42 × characters at the condensed
   * width, 0.6 × at normal width. The size is then capped so the word fits the
   * viewport height.
   */
  declare fit: number;

  constructor() {
    super();
    this.as = 'h2';
    this.size = 'display';
    this.width = 'normal';
    this.weight = 'black';
    this.tone = 'ink';
    this.vertical = false;
    this.fit = 0;
  }

  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
        color: var(--oc-ink);
      }
      .text {
        margin: 0;
        font-family: var(--oc-font);
        font-size: var(--_size);
        font-stretch: var(--_width);
        font-weight: var(--_weight);
        line-height: var(--oc-leading-solid);
        letter-spacing: var(--oc-tracking-display);
        overflow-wrap: anywhere;
        hyphens: manual;
        text-wrap: balance;
      }
      :host {
        --_size: var(--oc-text-display);
        --_width: var(--oc-wdth-normal);
        --_weight: var(--oc-weight-black);
      }
      :host([size='xl']) {
        --_size: var(--oc-text-xl);
      }
      :host([size='2xl']) {
        --_size: var(--oc-text-2xl);
      }
      :host([size='3xl']) {
        --_size: var(--oc-text-3xl);
      }
      :host([size='poster']) {
        --_size: var(--oc-text-poster);
      }
      :host([size='xl']) .text,
      :host([size='2xl']) .text {
        line-height: var(--oc-leading-tight);
        letter-spacing: var(--oc-tracking-tight);
      }
      :host([width='condensed']) {
        --_width: var(--oc-wdth-condensed);
      }
      :host([width='narrow']) {
        --_width: var(--oc-wdth-narrow);
      }
      :host([width='wide']) {
        --_width: var(--oc-wdth-wide);
      }
      :host([width='extended']) {
        --_width: var(--oc-wdth-extended);
      }
      :host([weight='medium']) {
        --_weight: var(--oc-weight-medium);
      }
      :host([weight='bold']) {
        --_weight: var(--oc-weight-bold);
      }
      :host([tone='red']) {
        color: var(--oc-red);
      }
      :host([tone='paper']) {
        color: var(--oc-paper);
      }

      @media (min-width: ${unsafeCSS(bp.lg)}) {
        :host([vertical]) .text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          white-space: nowrap;
          text-wrap: nowrap;
          /* optical alignment: pull the cap line onto the column edge */
          margin-inline-start: -0.08em;
        }
        :host([vertical]) .text.fit {
          font-size: min(
            var(--_size),
            calc(var(--oc-vertical-extent, 62svh) / var(--_fit))
          );
        }
      }
    `
  ];

  override render() {
    const slot = html`<slot></slot>`;
    const cls = this.vertical && this.fit > 0 ? 'text fit' : 'text';
    const style = this.vertical && this.fit > 0 ? `--_fit:${this.fit}` : '';
    switch (this.as) {
      case 'h1':
        return html`<h1 class=${cls} style=${style} part="text">${slot}</h1>`;
      case 'h3':
        return html`<h3 class=${cls} style=${style} part="text">${slot}</h3>`;
      case 'h4':
        return html`<h4 class=${cls} style=${style} part="text">${slot}</h4>`;
      case 'p':
        return html`<p class=${cls} style=${style} part="text">${slot}</p>`;
      case 'span':
        return html`<span class=${cls} style=${style} part="text"
          >${slot}</span
        >`;
      default:
        return html`<h2 class=${cls} style=${style} part="text">${slot}</h2>`;
    }
  }
}

define('oc-display', OcDisplay);

declare global {
  interface HTMLElementTagNameMap {
    'oc-display': OcDisplay;
  }
}
