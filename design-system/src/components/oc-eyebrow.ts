import { LitElement, css, html } from 'lit';
import { define } from '../internal/define.ts';
import { hostStyles } from '../internal/styles.ts';

/**
 * `<oc-eyebrow>` — a short label that names what follows (a section, a category).
 * Sentence case by default; `caps` only where the inspiration's poster labels are
 * genuinely wanted. Never stack one above every heading.
 *
 * @slot - label text
 */
export class OcEyebrow extends LitElement {
  static override properties = {
    tone: { reflect: true },
    caps: { type: Boolean, reflect: true }
  };

  declare tone: 'red' | 'ink' | 'muted';
  declare caps: boolean;

  constructor() {
    super();
    this.tone = 'red';
    this.caps = false;
  }

  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        font-family: var(--oc-font);
        font-size: var(--oc-text-sm);
        font-weight: var(--oc-weight-bold);
        font-stretch: var(--oc-wdth-normal);
        line-height: var(--oc-leading-snug);
        color: var(--oc-red-text);
      }
      :host([tone='ink']) {
        color: var(--oc-ink);
      }
      :host([tone='muted']) {
        color: var(--oc-ink-3);
      }
      :host([caps]) {
        font-size: var(--oc-text-xs);
        font-stretch: var(--oc-wdth-wide);
        letter-spacing: var(--oc-tracking-label);
        text-transform: uppercase;
      }
    `
  ];

  override render() {
    return html`<slot></slot>`;
  }
}

define('oc-eyebrow', OcEyebrow);

declare global {
  interface HTMLElementTagNameMap {
    'oc-eyebrow': OcEyebrow;
  }
}
