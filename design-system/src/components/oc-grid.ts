import { LitElement, css, html, unsafeCSS } from 'lit';
import { define } from '../internal/define.ts';
import { bp, hostStyles } from '../internal/styles.ts';

/**
 * `<oc-grid>` — the 12-column page grid (4 columns below 48rem).
 * Children are placed with `<oc-cell>`; any other child spans the full row.
 *
 * @slot - grid items
 * @cssprop --oc-grid-row-gap - vertical gap between rows (default: gutter)
 */
export class OcGrid extends LitElement {
  static override properties = {
    gap: { reflect: true }
  };

  /** `gutter` (default) or `none` — removes the column gap. */
  declare gap: 'gutter' | 'none';

  constructor() {
    super();
    this.gap = 'gutter';
  }

  static override styles = [
    hostStyles,
    css`
      :host {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        column-gap: var(--oc-gutter);
        row-gap: var(--oc-grid-row-gap, var(--oc-gutter));
        align-items: start;
      }
      :host([gap='none']) {
        column-gap: 0;
        row-gap: var(--oc-grid-row-gap, 0);
      }
      ::slotted(:not(oc-cell)) {
        grid-column: 1 / -1;
      }
      @media (min-width: ${unsafeCSS(bp.md)}) {
        :host {
          grid-template-columns: repeat(12, minmax(0, 1fr));
        }
      }
    `
  ];

  override render() {
    return html`<slot></slot>`;
  }
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

const placement = (attr: string, prop: 'span' | 'start', max: number) =>
  range(max)
    .map(n =>
      prop === 'span'
        ? `:host([${attr}='${n}']) { grid-column-end: span ${n}; }`
        : `:host([${attr}='${n}']) { grid-column-start: ${n}; }`
    )
    .join('\n');

/**
 * `<oc-cell>` — a grid item. Full width by default; spans are per breakpoint.
 *
 * @attr span — columns of 4 below 48rem
 * @attr span-md / start-md — columns of 12 from 48rem
 * @attr span-lg / start-lg — columns of 12 from 64rem
 * @attr align — start | center | end | stretch
 * @slot - content
 */
export class OcCell extends LitElement {
  static override properties = {
    span: { type: Number, reflect: true },
    spanMd: { type: Number, reflect: true, attribute: 'span-md' },
    startMd: { type: Number, reflect: true, attribute: 'start-md' },
    spanLg: { type: Number, reflect: true, attribute: 'span-lg' },
    startLg: { type: Number, reflect: true, attribute: 'start-lg' },
    align: { reflect: true }
  };

  declare span?: number;
  declare spanMd?: number;
  declare startMd?: number;
  declare spanLg?: number;
  declare startLg?: number;
  declare align?: 'start' | 'center' | 'end' | 'stretch';

  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
        grid-column: 1 / -1;
      }
      :host([span]) {
        grid-column-start: auto;
      }
      ${unsafeCSS(placement('span', 'span', 4))}
      :host([align='start']) {
        align-self: start;
      }
      :host([align='center']) {
        align-self: center;
      }
      :host([align='end']) {
        align-self: end;
      }
      :host([align='stretch']) {
        align-self: stretch;
      }

      @media (min-width: ${unsafeCSS(bp.md)}) {
        :host([span-md]) {
          grid-column-start: auto;
        }
        ${unsafeCSS(placement('span-md', 'span', 12))}
        ${unsafeCSS(placement('start-md', 'start', 12))}
      }
      @media (min-width: ${unsafeCSS(bp.lg)}) {
        :host([span-lg]) {
          grid-column-start: auto;
        }
        ${unsafeCSS(placement('span-lg', 'span', 12))}
        ${unsafeCSS(placement('start-lg', 'start', 12))}
      }
    `
  ];

  override render() {
    return html`<slot></slot>`;
  }
}

define('oc-grid', OcGrid);
define('oc-cell', OcCell);

declare global {
  interface HTMLElementTagNameMap {
    'oc-grid': OcGrid;
    'oc-cell': OcCell;
  }
}
