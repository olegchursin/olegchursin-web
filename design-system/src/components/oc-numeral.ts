import { LitElement, css, html } from 'lit';
import { define } from '../internal/define.ts';
import { hostStyles } from '../internal/styles.ts';

/**
 * `<oc-numeral>` — numbers set as graphic elements: years, counts, dates (12.5.–30.8.).
 * Use only for real quantities or sequences, never as decorative "01 / 02" markers.
 *
 * @slot - the figure
 */
export class OcNumeral extends LitElement {
  static override properties = {
    size: { reflect: true },
    tone: { reflect: true }
  };

  declare size: 'md' | 'lg' | 'xl';
  declare tone: 'ink' | 'red' | 'muted';

  constructor() {
    super();
    this.size = 'lg';
    this.tone = 'ink';
  }

  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-block;
        font-family: var(--oc-font);
        font-size: var(--oc-text-2xl);
        font-weight: var(--oc-weight-bold);
        font-stretch: var(--oc-wdth-narrow);
        font-variant-numeric: tabular-nums lining-nums;
        line-height: var(--oc-leading-solid);
        letter-spacing: var(--oc-tracking-tight);
        color: var(--oc-ink);
      }
      :host([size='md']) {
        font-size: var(--oc-text-xl);
      }
      :host([size='xl']) {
        font-size: var(--oc-text-3xl);
        font-weight: var(--oc-weight-black);
        letter-spacing: var(--oc-tracking-display);
      }
      :host([tone='red']) {
        color: var(--oc-red);
      }
      :host([tone='muted']) {
        color: var(--oc-ink-3);
      }
    `
  ];

  override render() {
    return html`<slot></slot>`;
  }
}

define('oc-numeral', OcNumeral);

declare global {
  interface HTMLElementTagNameMap {
    'oc-numeral': OcNumeral;
  }
}
