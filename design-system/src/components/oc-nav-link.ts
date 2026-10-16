import { LitElement, css, html, nothing } from 'lit';
import { define } from '../internal/define.ts';
import { focusRing, hostStyles } from '../internal/styles.ts';

/**
 * `<oc-nav-link>` — primary navigation item. `current` marks the page you're on
 * with a red square and `aria-current="page"`.
 *
 * @slot - label
 * @cssprop --oc-nav-link-size - font size (the header enlarges it in the mobile menu)
 */
export class OcNavLink extends LitElement {
  static override properties = {
    href: { reflect: true },
    current: { type: Boolean, reflect: true }
  };

  declare href: string;
  declare current: boolean;

  constructor() {
    super();
    this.href = '';
    this.current = false;
  }

  static override styles = [
    hostStyles,
    focusRing,
    css`
      :host {
        display: inline-block;
      }
      a {
        display: inline-flex;
        align-items: center;
        gap: var(--oc-space-2);
        min-height: 2.75rem;
        color: var(--oc-ink);
        font-family: var(--oc-font);
        font-size: var(--oc-nav-link-size, var(--oc-text-base));
        font-weight: var(--oc-nav-link-weight, var(--oc-weight-medium));
        font-stretch: var(--oc-nav-link-width, var(--oc-wdth-normal));
        letter-spacing: var(--oc-nav-link-tracking, 0);
        line-height: 1;
        text-decoration: none;
      }
      .marker {
        width: 0.5rem;
        height: 0.5rem;
        background: transparent;
        transition: background-color var(--oc-duration-fast) var(--oc-ease);
      }
      a:hover .marker {
        background: var(--oc-ink);
      }
      :host([current]) .marker {
        background: var(--oc-red);
      }
    `
  ];

  override render() {
    return html`<a
      part="link"
      href=${this.href}
      aria-current=${this.current ? 'page' : nothing}
      ><span class="marker" aria-hidden="true"></span><slot></slot
    ></a>`;
  }
}

define('oc-nav-link', OcNavLink);

declare global {
  interface HTMLElementTagNameMap {
    'oc-nav-link': OcNavLink;
  }
}
