import { LitElement, css, html, nothing } from 'lit';
import { define } from '../internal/define.ts';
import { isExternal } from '../internal/links.ts';
import { focusRing, hostStyles } from '../internal/styles.ts';

/**
 * `<oc-button>` — square, flat, type-led. Renders an anchor when `href` is set.
 * Label says exactly what happens ("Open on Unsplash", not "Click here").
 *
 * @slot - label
 * @slot icon - optional leading glyph/shape
 * @csspart control - the button or anchor
 */
export class OcButton extends LitElement {
  static override properties = {
    href: { reflect: true },
    variant: { reflect: true },
    tone: { reflect: true },
    size: { reflect: true },
    type: {},
    disabled: { type: Boolean, reflect: true },
    label: {}
  };

  declare href?: string;
  declare variant: 'solid' | 'outline' | 'ghost';
  declare tone: 'ink' | 'red';
  declare size: 'sm' | 'md' | 'lg';
  declare type: 'button' | 'submit' | 'reset';
  declare disabled: boolean;
  /** Accessible name when the visible label is not enough (icon-only). */
  declare label?: string;

  constructor() {
    super();
    this.variant = 'solid';
    this.tone = 'ink';
    this.size = 'md';
    this.type = 'button';
    this.disabled = false;
  }

  static override styles = [
    hostStyles,
    focusRing,
    css`
      :host {
        --_fg: var(--oc-paper);
        --_bg: var(--oc-ink);
        --_bd: var(--oc-ink);
        display: inline-block;
      }
      :host([tone='red']) {
        --_fg: var(--oc-on-red);
        --_bg: var(--oc-red);
        --_bd: var(--oc-red);
      }
      :host([variant='outline']) {
        --_fg: var(--oc-ink);
        --_bg: transparent;
      }
      :host([variant='outline'][tone='red']) {
        --_fg: var(--oc-red-text);
      }
      :host([variant='ghost']) {
        --_fg: var(--oc-ink);
        --_bg: transparent;
        --_bd: transparent;
      }
      .control {
        display: inline-flex;
        align-items: center;
        gap: var(--oc-space-3);
        min-height: 2.75rem;
        padding: var(--oc-space-2) var(--oc-space-5);
        border: var(--oc-rule) solid var(--_bd);
        border-radius: var(--oc-radius);
        background: var(--_bg);
        color: var(--_fg);
        font-family: var(--oc-font);
        font-size: var(--oc-text-base);
        font-weight: var(--oc-weight-bold);
        font-stretch: var(--oc-wdth-normal);
        line-height: 1;
        text-decoration: none;
        cursor: pointer;
        transition:
          background-color var(--oc-duration-fast) var(--oc-ease),
          color var(--oc-duration-fast) var(--oc-ease),
          border-color var(--oc-duration-fast) var(--oc-ease);
      }
      :host([size='sm']) .control {
        min-height: 2.25rem;
        padding: var(--oc-space-1) var(--oc-space-3);
        font-size: var(--oc-text-sm);
      }
      :host([size='lg']) .control {
        min-height: 3.5rem;
        padding: var(--oc-space-3) var(--oc-space-6);
        font-size: var(--oc-text-md);
        font-stretch: var(--oc-wdth-wide);
      }
      .control:hover {
        --_bg: var(--oc-red);
        --_bd: var(--oc-red);
        --_fg: var(--oc-on-red);
      }
      :host([tone='red']) .control:hover {
        --_bg: var(--oc-ink);
        --_bd: var(--oc-ink);
        --_fg: var(--oc-paper);
      }
      :host([variant='ghost']) .control:hover {
        --_bg: transparent;
        --_bd: transparent;
        --_fg: var(--oc-red-text);
      }
      :host([disabled]) .control {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }
      ::slotted([slot='icon']) {
        flex: none;
      }
    `
  ];

  override render() {
    const content = html`<slot name="icon"></slot><slot></slot>`;
    if (this.href) {
      const out = isExternal(this.href);
      return html`<a
        class="control"
        part="control"
        href=${this.href}
        aria-label=${this.label ?? nothing}
        aria-disabled=${this.disabled ? 'true' : nothing}
        target=${out ? '_blank' : nothing}
        rel=${out ? 'noopener noreferrer' : nothing}
        >${content}</a
      >`;
    }
    return html`<button
      class="control"
      part="control"
      type=${this.type}
      aria-label=${this.label ?? nothing}
      ?disabled=${this.disabled}
    >
      ${content}
    </button>`;
  }
}

define('oc-button', OcButton);

declare global {
  interface HTMLElementTagNameMap {
    'oc-button': OcButton;
  }
}
