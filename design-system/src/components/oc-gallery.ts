import { LitElement, css, html, nothing } from 'lit';
import { define } from '../internal/define.ts';
import { focusRing, hostStyles } from '../internal/styles.ts';
import type { OcImage } from './oc-image.ts';

/**
 * `<oc-gallery>` — a photo set laid out as an asymmetric grid (one large lead image,
 * one tall, two wide), with a lightbox. Children must be `<oc-image>`; the gallery
 * turns them into buttons. `layout="mirror"` flips the arrangement so consecutive
 * galleries alternate.
 *
 * Keyboard: Enter/Space opens; ←/→ step through; Esc closes.
 *
 * @slot - `<oc-image>` elements (6 fill the pattern exactly; extras flow on)
 */
export class OcGallery extends LitElement {
  static override properties = {
    layout: { reflect: true },
    label: {},
    index: { state: true }
  };

  declare layout: 'default' | 'mirror';
  /** Name of the set, used in the lightbox's accessible label. */
  declare label: string;
  declare index: number;

  constructor() {
    super();
    this.layout = 'default';
    this.label = 'Photo';
    this.index = -1;
  }

  static override styles = [
    hostStyles,
    focusRing,
    css`
      :host {
        display: block;
        container-type: inline-size;
      }
      /* square cells sized from the container width */
      .grid {
        --_cols: 2;
        --_cell: calc(
          (100cqi - (var(--_cols) - 1) * var(--oc-gutter)) / var(--_cols)
        );
        display: grid;
        grid-template-columns: repeat(var(--_cols), minmax(0, 1fr));
        grid-auto-rows: var(--_cell);
        grid-auto-flow: dense;
        gap: var(--oc-gutter);
      }
      ::slotted(oc-image) {
        height: 100%;
      }
      ::slotted(oc-image:nth-child(1)) {
        grid-column: span 2;
        grid-row: span 2;
      }
      @container (min-width: 36rem) {
        .grid {
          --_cols: 4;
        }
        ::slotted(oc-image:nth-child(1)) {
          grid-area: 1 / 1 / span 2 / span 2;
        }
        ::slotted(oc-image:nth-child(2)) {
          grid-area: 1 / 3;
        }
        ::slotted(oc-image:nth-child(3)) {
          grid-area: 1 / 4 / span 2 / span 1;
        }
        ::slotted(oc-image:nth-child(4)) {
          grid-area: 2 / 3;
        }
        ::slotted(oc-image:nth-child(5)) {
          grid-area: 3 / 1 / span 1 / span 2;
        }
        ::slotted(oc-image:nth-child(6)) {
          grid-area: 3 / 3 / span 1 / span 2;
        }

        :host([layout='mirror']) ::slotted(oc-image:nth-child(1)) {
          grid-area: 1 / 3 / span 2 / span 2;
        }
        :host([layout='mirror']) ::slotted(oc-image:nth-child(2)) {
          grid-area: 1 / 2;
        }
        :host([layout='mirror']) ::slotted(oc-image:nth-child(3)) {
          grid-area: 1 / 1 / span 2 / span 1;
        }
        :host([layout='mirror']) ::slotted(oc-image:nth-child(4)) {
          grid-area: 2 / 2;
        }
      }

      dialog {
        width: 100vw;
        max-width: 100vw;
        height: 100dvh;
        max-height: 100dvh;
        margin: 0;
        padding: 0;
        border: 0;
        background: var(--oc-paper);
        color: var(--oc-ink);
        font-family: var(--oc-font);
      }
      dialog::backdrop {
        background: var(--oc-paper);
      }
      dialog[open] {
        display: grid;
        grid-template-rows: auto minmax(0, 1fr) auto;
      }
      .lb-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--oc-space-4);
        padding: var(--oc-space-4) var(--oc-margin);
        border-bottom: var(--oc-hairline) solid var(--oc-ink);
      }
      .lb-count {
        font-size: var(--oc-text-xl);
        font-weight: var(--oc-weight-black);
        font-stretch: var(--oc-wdth-narrow);
        font-variant-numeric: tabular-nums;
        letter-spacing: var(--oc-tracking-tight);
      }
      .lb-stage {
        display: grid;
        place-items: center;
        min-height: 0;
        padding: var(--oc-space-5) var(--oc-margin);
      }
      .lb-stage img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
      .lb-nav {
        display: flex;
        justify-content: space-between;
        padding: var(--oc-space-3) var(--oc-margin) var(--oc-space-5);
      }
      .lb-btn {
        min-height: 2.75rem;
        padding: var(--oc-space-2) 0;
        border: 0;
        background: none;
        color: inherit;
        font: inherit;
        font-size: var(--oc-text-base);
        font-weight: var(--oc-weight-bold);
        cursor: pointer;
      }
      .lb-btn:hover {
        color: var(--oc-red-text);
      }
    `
  ];

  private get images(): OcImage[] {
    const slot = this.renderRoot?.querySelector('slot');
    return (slot?.assignedElements({ flatten: true }) ?? []).filter(
      (el): el is OcImage => el.localName === 'oc-image'
    );
  }

  private onSlotChange() {
    for (const img of this.images) img.action = true;
  }

  private onActivate(e: Event) {
    const i = this.images.indexOf(e.target as OcImage);
    if (i >= 0) this.openAt(i);
  }

  openAt(i: number) {
    this.index = i;
    const dialog = this.renderRoot.querySelector('dialog');
    if (dialog && !dialog.open) dialog.showModal();
  }

  close() {
    this.renderRoot.querySelector('dialog')?.close();
  }

  private step(delta: number) {
    const n = this.images.length;
    if (!n) return;
    this.index = (this.index + delta + n) % n;
  }

  private onDialogKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.step(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.step(-1);
    }
  }

  private onDialogClose() {
    const returnTo = this.images[this.index];
    this.index = -1;
    returnTo?.shadowRoot?.querySelector<HTMLElement>('button')?.focus();
  }

  override firstUpdated() {
    this.onSlotChange();
  }

  override render() {
    const images = this.index >= 0 ? this.images : [];
    const current = images[this.index];
    return html`
      <div class="grid" part="grid" @oc-image-activate=${this.onActivate}>
        <slot @slotchange=${this.onSlotChange}></slot>
      </div>
      <dialog
        aria-label=${`${this.label}, image ${this.index + 1} of ${images.length}`}
        @keydown=${this.onDialogKey}
        @close=${this.onDialogClose}
      >
        <div class="lb-bar">
          <span class="lb-count" aria-hidden="true"
            >${current ? `${this.index + 1}/${images.length}` : ''}</span
          >
          <button class="lb-btn" type="button" @click=${this.close}>
            Close
          </button>
        </div>
        <div class="lb-stage">
          ${
            current
              ? html`<img
                  src=${current.full ?? current.src}
                  alt=${current.alt}
                />`
              : nothing
          }
        </div>
        <div class="lb-nav">
          <button class="lb-btn" type="button" @click=${() => this.step(-1)}>
            Previous
          </button>
          <button class="lb-btn" type="button" @click=${() => this.step(1)}>
            Next
          </button>
        </div>
      </dialog>
    `;
  }
}

define('oc-gallery', OcGallery);

declare global {
  interface HTMLElementTagNameMap {
    'oc-gallery': OcGallery;
  }
}
