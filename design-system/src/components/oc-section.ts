import { LitElement, css, html } from 'lit';
import { define } from '../internal/define.ts';
import { hostStyles } from '../internal/styles.ts';

/**
 * `<oc-section>` — a labelled block: label on the left, content on the right,
 * separated from the previous block by a rule. Aligns to the page grid through
 * `--oc-section-columns` / `--oc-section-label-span` (set by `<oc-page-layout>`).
 *
 * @slot label - a heading naming the block (e.g. `<h2>Work</h2>`); omit with `wide`
 * @slot - content
 */
export class OcSection extends LitElement {
  static override properties = {
    rule: { reflect: true },
    wide: { type: Boolean, reflect: true }
  };

  declare rule: 'hairline' | 'bar' | 'none';
  /** No label column: content spans every column (intros, heroes). */
  declare wide: boolean;

  constructor() {
    super();
    this.rule = 'hairline';
    this.wide = false;
  }

  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        container-type: inline-size;
        margin-top: var(--oc-space-9);
      }
      :host(:first-of-type) {
        margin-top: 0;
      }
      .section {
        display: grid;
        grid-template-columns: repeat(
          var(--oc-section-columns, 12),
          minmax(0, 1fr)
        );
        column-gap: var(--oc-gutter);
        row-gap: var(--oc-space-5);
        padding-top: var(--oc-space-4);
        border-top: var(--oc-hairline) solid var(--oc-ink);
      }
      :host([rule='bar']) .section {
        border-top: var(--oc-bar) solid var(--oc-ink);
      }
      :host([rule='none']) .section {
        border-top: 0;
        padding-top: 0;
      }
      .label {
        grid-column: 1 / -1;
      }
      .body {
        grid-column: 1 / -1;
        min-width: 0;
      }
      ::slotted([slot='label']) {
        margin: 0;
        font-family: var(--oc-font);
        font-size: var(--oc-text-base);
        font-weight: var(--oc-weight-bold);
        line-height: var(--oc-leading-snug);
        letter-spacing: 0;
      }
      :host([wide]) .label {
        display: none;
      }
      @container (min-width: 40rem) {
        .label {
          grid-column: 1 / span var(--oc-section-label-span, 3);
        }
        .body {
          grid-column: calc(var(--oc-section-label-span, 3) + 1) / -1;
        }
        :host([wide]) .body {
          grid-column: 1 / -1;
        }
      }
    `
  ];

  override render() {
    return html`<section class="section" part="section">
      <div class="label"><slot name="label"></slot></div>
      <div class="body"><slot></slot></div>
    </section>`;
  }
}

define('oc-section', OcSection);

declare global {
  interface HTMLElementTagNameMap {
    'oc-section': OcSection;
  }
}
