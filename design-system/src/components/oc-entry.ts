import { LitElement, css, html, nothing } from 'lit';
import { define } from '../internal/define.ts';
import { isExternal } from '../internal/links.ts';
import { focusRing, hostStyles, visuallyHidden } from '../internal/styles.ts';

/**
 * `<oc-entry>` — one row of an index: career steps, posts, destinations.
 * Meta (dates) left · title and detail centre · aside right. With `href` the whole
 * row is clickable through the title link.
 *
 * @slot meta - dates or a short fact
 * @slot - the title (wrap in a heading where it belongs in the outline)
 * @slot detail - one or two lines of description
 * @slot aside - trailing info (company, tag, reading time)
 */
export class OcEntry extends LitElement {
  static override properties = {
    href: { reflect: true },
    size: { reflect: true }
  };

  declare href?: string;
  declare size: 'md' | 'lg';

  constructor() {
    super();
    this.size = 'md';
  }

  static override styles = [
    hostStyles,
    focusRing,
    visuallyHidden,
    css`
      :host {
        display: block;
        container-type: inline-size;
        position: relative;
        color: var(--oc-ink);
        font-family: var(--oc-font);
      }
      .row {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: var(--oc-space-1) var(--oc-gutter);
        padding-block: var(--oc-space-4) var(--oc-space-5);
        border-top: var(--oc-hairline) solid var(--oc-line);
      }
      :host(:first-of-type) .row {
        border-top-color: var(--oc-ink);
      }
      .meta {
        font-size: var(--oc-text-sm);
        color: var(--oc-ink-3);
        font-variant-numeric: tabular-nums;
      }
      .title {
        display: flex;
        align-items: baseline;
        font-size: var(--oc-text-md);
        font-weight: var(--oc-weight-bold);
        line-height: var(--oc-leading-snug);
        letter-spacing: var(--oc-tracking-tight);
        text-wrap: balance;
      }
      :host([size='lg']) .title {
        font-size: var(--oc-text-xl);
        font-stretch: var(--oc-wdth-narrow);
        line-height: var(--oc-leading-tight);
      }
      ::slotted(:not([slot])) {
        margin: 0;
        font: inherit;
        letter-spacing: inherit;
      }
      .title a {
        color: inherit;
        text-decoration: none;
      }
      .title a::after {
        content: '';
        position: absolute;
        inset: 0;
      }
      .title a:focus-visible {
        outline: none;
      }
      :host(:focus-within) {
        outline: var(--oc-focus-ring);
        outline-offset: var(--oc-focus-offset);
      }
      .marker {
        flex: none;
        width: 0;
        height: 0.5em;
        background: var(--oc-red);
        transition:
          width var(--oc-duration) var(--oc-ease),
          margin var(--oc-duration) var(--oc-ease);
      }
      :host([href]:hover) .marker {
        width: 0.5em;
        margin-inline-end: 0.35em;
      }
      :host([href]:hover) .title {
        color: var(--oc-ink);
      }
      .detail {
        max-width: var(--oc-measure);
        margin-top: var(--oc-space-1);
        font-size: var(--oc-text-base);
        line-height: var(--oc-leading-body);
        color: var(--oc-ink-2);
      }
      .aside {
        font-size: var(--oc-text-sm);
        color: var(--oc-ink-2);
      }
      .arrow {
        margin-inline-start: 0.2em;
      }
      @container (min-width: 36rem) {
        .row {
          grid-template-columns: minmax(7.5rem, 2fr) minmax(0, 7fr) minmax(
              0,
              3fr
            );
          align-items: baseline;
        }
        .aside {
          text-align: right;
        }
      }
    `
  ];

  override render() {
    const out = isExternal(this.href);
    const title = this.href
      ? html`<a
          href=${this.href}
          part="link"
          target=${out ? '_blank' : nothing}
          rel=${out ? 'noopener noreferrer' : nothing}
          ><slot></slot>${
            out
              ? html`<span class="visually-hidden"> (opens in new tab)</span>`
              : nothing
          }</a
        >`
      : html`<slot></slot>`;
    return html`<div class="row" part="row">
      <div class="meta"><slot name="meta"></slot></div>
      <div class="main">
        <div class="title" part="title">
          <span class="marker" aria-hidden="true"></span>${title}
        </div>
        <div class="detail"><slot name="detail"></slot></div>
      </div>
      <div class="aside">
        <slot name="aside"></slot>${
          out ? html`<span class="arrow" aria-hidden="true">↗</span>` : nothing
        }
      </div>
    </div>`;
  }
}

define('oc-entry', OcEntry);

declare global {
  interface HTMLElementTagNameMap {
    'oc-entry': OcEntry;
  }
}
