import { LitElement, css, html } from 'lit';
import { define } from '../internal/define.ts';
import { focusRing, hostStyles } from '../internal/styles.ts';

/**
 * `<oc-tag>` — a category label. Three modes:
 * static (`<span>`), link (`href`), or filter toggle (`toggle`, with `pressed`).
 *
 * @slot - tag text
 * @fires oc-tag-toggle - toggle mode; detail: { value: string, pressed: boolean }
 */
export class OcTag extends LitElement {
  static override properties = {
    href: { reflect: true },
    value: { reflect: true },
    toggle: { type: Boolean, reflect: true },
    pressed: { type: Boolean, reflect: true }
  };

  declare href?: string;
  /** Value reported by toggle events; defaults to the text content. */
  declare value?: string;
  declare toggle: boolean;
  declare pressed: boolean;

  constructor() {
    super();
    this.toggle = false;
    this.pressed = false;
  }

  static override styles = [
    hostStyles,
    focusRing,
    css`
      :host {
        display: inline-block;
      }
      .tag {
        display: inline-flex;
        align-items: center;
        gap: var(--oc-space-2);
        min-height: 1.75rem;
        padding: 0.2rem var(--oc-space-2);
        border: var(--oc-hairline) solid var(--oc-ink);
        background: transparent;
        color: var(--oc-ink);
        font-family: var(--oc-font);
        font-size: var(--oc-text-xs);
        font-weight: var(--oc-weight-medium);
        font-stretch: var(--oc-wdth-wide);
        line-height: 1.2;
        text-decoration: none;
        white-space: nowrap;
      }
      a.tag,
      button.tag {
        cursor: pointer;
        transition:
          background-color var(--oc-duration-fast) var(--oc-ease),
          color var(--oc-duration-fast) var(--oc-ease);
      }
      button.tag {
        min-height: 2.25rem;
        padding-inline: var(--oc-space-3);
      }
      a.tag:hover,
      button.tag:hover {
        border-color: var(--oc-red);
        color: var(--oc-red-text);
      }
      button.tag[aria-pressed='true'] {
        background: var(--oc-ink);
        border-color: var(--oc-ink);
        color: var(--oc-paper);
      }
      button.tag[aria-pressed='true']::before {
        content: '';
        width: 0.45em;
        height: 0.45em;
        background: var(--oc-red);
      }
    `
  ];

  private onClick() {
    this.pressed = !this.pressed;
    this.dispatchEvent(
      new CustomEvent('oc-tag-toggle', {
        detail: {
          value: this.value ?? this.textContent?.trim() ?? '',
          pressed: this.pressed
        },
        bubbles: true,
        composed: true
      })
    );
  }

  override render() {
    if (this.href) {
      return html`<a class="tag" part="tag" href=${this.href}
        ><slot></slot
      ></a>`;
    }
    if (this.toggle) {
      return html`<button
        class="tag"
        part="tag"
        type="button"
        aria-pressed=${this.pressed ? 'true' : 'false'}
        @click=${this.onClick}
      >
        <slot></slot>
      </button>`;
    }
    return html`<span class="tag" part="tag"><slot></slot></span>`;
  }
}

define('oc-tag', OcTag);

declare global {
  interface HTMLElementTagNameMap {
    'oc-tag': OcTag;
  }
}
