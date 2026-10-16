import { LitElement, css, html, unsafeCSS } from 'lit';
import { define } from '../internal/define.ts';
import { bp, hostStyles } from '../internal/styles.ts';

/**
 * `<oc-grid-overlay>` — shows the column grid over the page.
 * Press `g` (outside text fields) to toggle. The grid is the design; this makes it visible.
 *
 * @fires oc-grid-toggle - detail: { visible: boolean }
 */
export class OcGridOverlay extends LitElement {
  static override properties = {
    visible: { type: Boolean, reflect: true },
    hotkey: {}
  };

  declare visible: boolean;
  /** Key that toggles the overlay. Empty string disables the shortcut. */
  declare hotkey: string;

  constructor() {
    super();
    this.visible = false;
    this.hotkey = 'g';
  }

  static override styles = [
    hostStyles,
    css`
      :host {
        position: fixed;
        inset: 0;
        z-index: var(--oc-z-overlay);
        pointer-events: none;
        display: none;
      }
      :host([visible]) {
        display: block;
      }
      .columns {
        box-sizing: border-box;
        height: 100%;
        max-width: var(--oc-max-width);
        margin-inline: auto;
        padding-inline: var(--oc-margin);
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        column-gap: var(--oc-gutter);
      }
      .col {
        background: color-mix(in srgb, var(--oc-red) 9%, transparent);
        border-inline: var(--oc-hairline) solid
          color-mix(in srgb, var(--oc-red) 45%, transparent);
      }
      .col:nth-child(n + 5) {
        display: none;
      }
      @media (min-width: ${unsafeCSS(bp.md)}) {
        .columns {
          grid-template-columns: repeat(12, minmax(0, 1fr));
        }
        .col:nth-child(n + 5) {
          display: block;
        }
      }
    `
  ];

  private onKey = (e: KeyboardEvent) => {
    if (!this.hotkey || e.key !== this.hotkey) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const target = e.composedPath()[0] as HTMLElement | undefined;
    if (target?.closest?.('input, textarea, select, [contenteditable]')) return;
    this.toggle();
  };

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.onKey);
  }

  override disconnectedCallback() {
    window.removeEventListener('keydown', this.onKey);
    super.disconnectedCallback();
  }

  toggle(force?: boolean) {
    this.visible = force ?? !this.visible;
    this.dispatchEvent(
      new CustomEvent('oc-grid-toggle', {
        detail: { visible: this.visible },
        bubbles: true,
        composed: true
      })
    );
  }

  override render() {
    return html`<div class="columns" aria-hidden="true">
      ${Array.from({ length: 12 }, () => html`<div class="col"></div>`)}
    </div>`;
  }
}

define('oc-grid-overlay', OcGridOverlay);

declare global {
  interface HTMLElementTagNameMap {
    'oc-grid-overlay': OcGridOverlay;
  }
}
