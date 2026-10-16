import { LitElement, css, html, unsafeCSS } from 'lit';
import { define } from '../internal/define.ts';
import { bp, hostStyles } from '../internal/styles.ts';

/**
 * `<oc-site-footer>` — closes the page with a thick bar and a colophon.
 *
 * @slot - colophon text (left)
 * @slot links - outbound links (middle)
 * @slot meta - copyright, year (right)
 */
export class OcSiteFooter extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        margin-top: var(--oc-space-10);
        color: var(--oc-ink);
        font-family: var(--oc-font);
        font-size: var(--oc-text-sm);
        line-height: var(--oc-leading-snug);
      }
      footer {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: var(--oc-space-6) var(--oc-gutter);
        max-width: var(--oc-max-width);
        margin-inline: auto;
        padding: var(--oc-space-5) var(--oc-margin) var(--oc-space-7);
        border-top: var(--oc-bar) solid var(--oc-ink);
      }
      .colophon,
      .links,
      .meta {
        grid-column: 1 / -1;
      }
      .meta {
        color: var(--oc-ink-3);
      }
      @media (min-width: ${unsafeCSS(bp.md)}) {
        footer {
          grid-template-columns: repeat(12, minmax(0, 1fr));
        }
        .colophon {
          grid-column: 1 / span 4;
        }
        .links {
          grid-column: 6 / span 5;
        }
        .meta {
          grid-column: 11 / span 2;
          text-align: right;
        }
      }
    `
  ];

  override render() {
    return html`<footer part="footer">
      <div class="colophon"><slot></slot></div>
      <div class="links"><slot name="links"></slot></div>
      <div class="meta"><slot name="meta"></slot></div>
    </footer>`;
  }
}

define('oc-site-footer', OcSiteFooter);

declare global {
  interface HTMLElementTagNameMap {
    'oc-site-footer': OcSiteFooter;
  }
}
