import { LitElement, css, html } from 'lit';
import { define } from '../internal/define.ts';
import { focusRing, hostStyles } from '../internal/styles.ts';

/**
 * `<oc-post-card>` — the lead item of a list of writing: a thick bar, the title set
 * large and narrow, a short excerpt. Use once, above an index of `<oc-entry>` rows.
 *
 * @slot meta - date, reading time
 * @slot - title (a heading)
 * @slot excerpt - one or two sentences
 * @slot aside - tags
 */
export class OcPostCard extends LitElement {
  static override properties = {
    href: { reflect: true }
  };

  declare href: string;

  constructor() {
    super();
    this.href = '';
  }

  static override styles = [
    hostStyles,
    focusRing,
    css`
      :host {
        display: block;
        position: relative;
        color: var(--oc-ink);
        font-family: var(--oc-font);
      }
      article {
        display: grid;
        gap: var(--oc-space-4);
        padding-top: var(--oc-space-4);
        border-top: var(--oc-bar) solid var(--oc-ink);
      }
      .meta {
        font-size: var(--oc-text-sm);
        color: var(--oc-ink-3);
      }
      .title {
        font-size: var(--oc-text-2xl);
        font-weight: var(--oc-weight-black);
        font-stretch: var(--oc-wdth-narrow);
        line-height: var(--oc-leading-tight);
        letter-spacing: var(--oc-tracking-tight);
        text-wrap: balance;
      }
      ::slotted(:not([slot])) {
        margin: 0;
        font: inherit;
        letter-spacing: inherit;
      }
      a {
        color: inherit;
        text-decoration: none;
        background-image: linear-gradient(var(--oc-red), var(--oc-red));
        background-size: 0 0.08em;
        background-position: 0 92%;
        background-repeat: no-repeat;
        transition: background-size var(--oc-duration-slow) var(--oc-ease);
      }
      :host(:hover) a {
        background-size: 100% 0.08em;
      }
      a::after {
        content: '';
        position: absolute;
        inset: 0;
      }
      a:focus-visible {
        outline: none;
      }
      :host(:focus-within) {
        outline: var(--oc-focus-ring);
        outline-offset: var(--oc-focus-offset);
      }
      .excerpt {
        max-width: var(--oc-measure);
        font-size: var(--oc-text-lg);
        line-height: var(--oc-leading-snug);
        color: var(--oc-ink-2);
      }
      .aside {
        position: relative;
        z-index: 1;
      }
    `
  ];

  override render() {
    return html`<article part="card">
      <div class="meta"><slot name="meta"></slot></div>
      <div class="title">
        <a href=${this.href} part="link"><slot></slot></a>
      </div>
      <div class="excerpt"><slot name="excerpt"></slot></div>
      <div class="aside"><slot name="aside"></slot></div>
    </article>`;
  }
}

define('oc-post-card', OcPostCard);

declare global {
  interface HTMLElementTagNameMap {
    'oc-post-card': OcPostCard;
  }
}
