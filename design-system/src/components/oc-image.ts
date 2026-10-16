import { LitElement, css, html, nothing } from 'lit';
import { define } from '../internal/define.ts';
import { focusRing, hostStyles } from '../internal/styles.ts';

/**
 * `<oc-image>` — photography, presented objectively: grayscale by default,
 * full color on hover/focus (`reveal`). `halftone` adds a printed dot screen.
 * Always give `width`/`height` (or `ratio`) so the frame reserves its space.
 *
 * @fires oc-image-activate - when `action` is set and the image is activated
 * @csspart frame - the figure frame
 * @csspart img - the image
 */
export class OcImage extends LitElement {
  static override properties = {
    src: { reflect: true },
    srcset: {},
    sizes: {},
    full: {},
    alt: {},
    width: { type: Number },
    height: { type: Number },
    ratio: { reflect: true },
    fit: { reflect: true },
    treatment: { reflect: true },
    reveal: { type: Boolean, reflect: true },
    loading: {},
    action: { type: Boolean, reflect: true },
    actionLabel: { attribute: 'action-label' }
  };

  declare src: string;
  declare srcset?: string;
  declare sizes?: string;
  /** Larger source used by galleries/lightboxes. */
  declare full?: string;
  declare alt: string;
  declare width?: number;
  declare height?: number;
  /** CSS aspect-ratio, e.g. `3/2`, `1`, `4/5`. Defaults to the intrinsic ratio. */
  declare ratio?: string;
  declare fit: 'cover' | 'contain';
  declare treatment: 'grayscale' | 'halftone' | 'none';
  declare reveal: boolean;
  declare loading: 'lazy' | 'eager';
  /** Render as a button (used by `<oc-gallery>` to open the lightbox). */
  declare action: boolean;
  declare actionLabel?: string;

  constructor() {
    super();
    this.src = '';
    this.alt = '';
    this.fit = 'cover';
    this.treatment = 'grayscale';
    this.reveal = true;
    this.loading = 'lazy';
    this.action = false;
  }

  static override styles = [
    hostStyles,
    focusRing,
    css`
      :host {
        display: block;
        min-width: 0;
      }
      .frame {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        margin: 0;
        overflow: hidden;
        background: var(--oc-paper-2);
      }
      button.frame {
        padding: 0;
        border: 0;
        cursor: zoom-in;
        font: inherit;
        color: inherit;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: var(--_fit, cover);
        transition:
          filter var(--oc-duration-slow) var(--oc-ease),
          transform var(--oc-duration-slow) var(--oc-ease);
      }
      :host([fit='contain']) {
        --_fit: contain;
      }
      :host([treatment='grayscale']) img,
      :host([treatment='halftone']) img {
        filter: grayscale(1) contrast(1.08);
      }
      :host([treatment='halftone']) img {
        filter: grayscale(1) contrast(1.35) brightness(1.05);
      }
      :host([treatment='halftone']) .frame::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image: radial-gradient(
          circle at center,
          transparent 0.7px,
          var(--oc-paper) 1.5px
        );
        background-size: 4px 4px;
        opacity: 0.55;
        transition: opacity var(--oc-duration-slow) var(--oc-ease);
      }
      :host([reveal]:hover) img,
      :host([reveal]:focus-within) img {
        filter: none;
      }
      :host([reveal]:hover) .frame::after,
      :host([reveal]:focus-within) .frame::after {
        opacity: 0;
      }
    `
  ];

  private activate() {
    this.dispatchEvent(
      new CustomEvent('oc-image-activate', { bubbles: true, composed: true })
    );
  }

  override render() {
    const ratio = this.ratio ? `aspect-ratio:${this.ratio}` : nothing;
    const img = html`<img
      part="img"
      src=${this.src}
      srcset=${this.srcset ?? nothing}
      sizes=${this.sizes ?? nothing}
      alt=${this.alt}
      width=${this.width ?? nothing}
      height=${this.height ?? nothing}
      loading=${this.loading}
      decoding="async"
    />`;
    if (this.action) {
      return html`<button
        class="frame"
        part="frame"
        type="button"
        style=${ratio}
        aria-label=${this.actionLabel ?? `Enlarge: ${this.alt}`}
        aria-haspopup="dialog"
        @click=${this.activate}
      >
        ${img}
      </button>`;
    }
    return html`<figure class="frame" part="frame" style=${ratio}>
      ${img}
    </figure>`;
  }
}

define('oc-image', OcImage);

declare global {
  interface HTMLElementTagNameMap {
    'oc-image': OcImage;
  }
}
