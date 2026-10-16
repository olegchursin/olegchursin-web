import { LitElement, css, html, unsafeCSS } from 'lit';
import { define } from '../internal/define.ts';
import { bp, focusRing, hostStyles } from '../internal/styles.ts';

/**
 * `<oc-site-header>` — wordmark top-left, navigation top-right, one hairline below.
 * Below 48rem the navigation collapses behind a "Menu" button into a full-width
 * panel of large condensed links.
 *
 * @slot brand - the wordmark (stack it on two lines, poster style)
 * @slot - `<oc-nav-link>` items
 * @slot actions - e.g. `<oc-theme-toggle>`
 */
export class OcSiteHeader extends LitElement {
  static override properties = {
    homeHref: { attribute: 'home-href' },
    navLabel: { attribute: 'nav-label' },
    open: { type: Boolean, reflect: true }
  };

  declare homeHref: string;
  declare navLabel: string;
  declare open: boolean;

  constructor() {
    super();
    this.homeHref = '/';
    this.navLabel = 'Main';
    this.open = false;
  }

  static override styles = [
    hostStyles,
    focusRing,
    css`
      :host {
        display: block;
        position: relative;
        z-index: var(--oc-z-header);
        background: var(--oc-paper);
        color: var(--oc-ink);
        font-family: var(--oc-font);
      }
      .bar {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--oc-space-5);
        max-width: var(--oc-max-width);
        margin-inline: auto;
        padding: var(--oc-space-5) var(--oc-margin) var(--oc-space-4);
        border-bottom: var(--oc-hairline) solid var(--oc-ink);
      }
      .brand {
        color: inherit;
        font-size: var(--oc-text-md);
        font-weight: var(--oc-weight-bold);
        line-height: var(--oc-leading-tight);
        letter-spacing: var(--oc-tracking-tight);
        text-decoration: none;
      }
      .brand:hover {
        color: var(--oc-red-text);
      }
      .menu {
        display: inline-flex;
        align-items: center;
        gap: var(--oc-space-2);
        min-height: 2.75rem;
        padding: 0;
        border: 0;
        background: none;
        color: inherit;
        font-size: var(--oc-text-base);
        font-weight: var(--oc-weight-bold);
        cursor: pointer;
      }
      .menu .bars {
        display: grid;
        gap: 4px;
        width: 1.25rem;
      }
      .menu .bars span {
        height: 2px;
        background: currentColor;
        transition: transform var(--oc-duration) var(--oc-ease);
      }
      :host([open]) .menu .bars span:first-child {
        transform: translateY(3px) rotate(45deg);
      }
      :host([open]) .menu .bars span:last-child {
        transform: translateY(-3px) rotate(-45deg);
      }
      nav {
        display: none;
      }
      :host([open]) nav {
        --oc-nav-link-size: var(--oc-text-3xl);
        --oc-nav-link-weight: var(--oc-weight-black);
        --oc-nav-link-width: var(--oc-wdth-condensed);
        --oc-nav-link-tracking: var(--oc-tracking-display);
        position: absolute;
        inset: 100% 0 auto 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--oc-space-3);
        padding: var(--oc-space-6) var(--oc-margin) var(--oc-space-8);
        background: var(--oc-paper);
        border-bottom: var(--oc-bar) solid var(--oc-ink);
      }
      .actions {
        display: flex;
        align-items: center;
        gap: var(--oc-space-2);
      }
      :host([open]) .actions {
        margin-top: var(--oc-space-5);
      }
      @media (min-width: ${unsafeCSS(bp.md)}) {
        .menu {
          display: none;
        }
        nav,
        :host([open]) nav {
          all: unset;
          display: flex;
          align-items: center;
          gap: var(--oc-space-6);
        }
        :host([open]) .actions {
          margin-top: 0;
        }
        .actions {
          margin-inline-start: var(--oc-space-2);
        }
      }
    `
  ];

  private toggle() {
    this.open = !this.open;
  }

  private onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.open) {
      this.open = false;
      this.renderRoot.querySelector<HTMLButtonElement>('.menu')?.focus();
    }
  };

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.onKey);
  }

  override disconnectedCallback() {
    window.removeEventListener('keydown', this.onKey);
    super.disconnectedCallback();
  }

  override render() {
    return html`<header class="bar" part="bar">
      <a class="brand" part="brand" href=${this.homeHref}
        ><slot name="brand">Home</slot></a
      >
      <button
        class="menu"
        type="button"
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-controls="site-nav"
        @click=${this.toggle}
      >
        <span class="bars" aria-hidden="true"><span></span><span></span></span>
        ${this.open ? 'Close' : 'Menu'}
      </button>
      <nav id="site-nav" aria-label=${this.navLabel}>
        <slot></slot>
        <div class="actions"><slot name="actions"></slot></div>
      </nav>
    </header>`;
  }
}

define('oc-site-header', OcSiteHeader);

declare global {
  interface HTMLElementTagNameMap {
    'oc-site-header': OcSiteHeader;
  }
}
