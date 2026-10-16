import { LitElement, css, html, nothing } from 'lit';
import { define } from '../internal/define.ts';
import { isExternal } from '../internal/links.ts';
import { focusRing, hostStyles, visuallyHidden } from '../internal/styles.ts';

/**
 * `<oc-link>` — a link. External URLs open in a new tab and carry a ↗ (the arrow is
 * information: you are leaving the site), plus a hidden "(opens in new tab)" note.
 *
 * Variants: `inline` (underlined, in running text), `plain` (no underline until hover),
 * `strong` (bold, red underline on hover — for lists of destinations).
 *
 * @slot - link text
 * @csspart link - the anchor
 */
export class OcLink extends LitElement {
  static override properties = {
    href: { reflect: true },
    variant: { reflect: true },
    external: { type: Boolean, reflect: true },
    download: {}
  };

  declare href: string;
  declare variant: 'inline' | 'plain' | 'strong';
  /** Force external treatment; auto-detected for absolute URLs. */
  declare external: boolean;
  declare download?: string;

  constructor() {
    super();
    this.href = '';
    this.variant = 'inline';
    this.external = false;
  }

  static override styles = [
    hostStyles,
    focusRing,
    visuallyHidden,
    css`
      :host {
        display: inline;
      }
      a {
        color: inherit;
        text-decoration-line: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 0.2em;
        text-decoration-color: currentColor;
        transition: text-decoration-color var(--oc-duration-fast) var(--oc-ease);
      }
      a:hover {
        text-decoration-color: var(--oc-red);
        text-decoration-thickness: 2px;
      }
      :host([variant='plain']) a {
        text-decoration-color: transparent;
      }
      :host([variant='plain']) a:hover {
        text-decoration-color: var(--oc-red);
      }
      :host([variant='strong']) a {
        font-weight: var(--oc-weight-bold);
        text-decoration-color: transparent;
        text-decoration-thickness: 2px;
      }
      :host([variant='strong']) a:hover {
        text-decoration-color: var(--oc-red);
      }
      .arrow {
        display: inline-block;
        margin-inline-start: 0.15em;
        /* information, not display: stays text-sized inside large type */
        font-size: min(1em, 1.125rem);
        font-weight: var(--oc-weight-regular);
        transition: transform var(--oc-duration-fast) var(--oc-ease);
      }
      a:hover .arrow {
        transform: translate(0.1em, -0.1em);
        color: var(--oc-red-text);
      }
    `
  ];

  private get isOutbound() {
    return this.external || isExternal(this.href);
  }

  override render() {
    const out = this.isOutbound;
    return html`<a
      part="link"
      href=${this.href}
      target=${out ? '_blank' : nothing}
      rel=${out ? 'noopener noreferrer' : nothing}
      download=${this.download ?? nothing}
      ><slot></slot>${
        out
          ? html`<span class="arrow" aria-hidden="true">↗</span
              ><span class="visually-hidden"> (opens in new tab)</span>`
          : nothing
      }</a
    >`;
  }
}

define('oc-link', OcLink);

declare global {
  interface HTMLElementTagNameMap {
    'oc-link': OcLink;
  }
}
