import { LitElement, css, html, unsafeCSS } from 'lit';
import { define } from '../internal/define.ts';
import { bp, hostStyles } from '../internal/styles.ts';

/**
 * `<oc-page-layout>` — the system's signature page structure, taken from the
 * Museum für Gestaltung poster: a narrow left column holds the page title set
 * vertically (bottom-to-top) and anchored to the bottom; content runs in the
 * remaining nine columns. Below 64rem the title sits on top, horizontal.
 *
 * @slot title - usually `<oc-display vertical as="h1">`
 * @slot meta - small facts above the vertical title (dates, counts, place)
 * @slot - page content (use `<oc-section>` blocks)
 */
export class OcPageLayout extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        --oc-section-columns: 4;
      }
      .layout {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        column-gap: var(--oc-gutter);
        max-width: var(--oc-max-width);
        margin-inline: auto;
        padding-inline: var(--oc-margin);
      }
      .rail {
        grid-column: 1 / -1;
        display: flex;
        flex-direction: column;
        gap: var(--oc-space-5);
        padding-block: var(--oc-space-7) var(--oc-space-5);
      }
      .content {
        grid-column: 1 / -1;
        min-width: 0;
      }
      /* stacked: the title leads, facts follow */
      .title {
        order: -1;
      }
      @media (min-width: ${unsafeCSS(bp.md)}) {
        :host {
          --oc-section-columns: 12;
        }
        .layout {
          grid-template-columns: repeat(12, minmax(0, 1fr));
        }
        .rail {
          padding-block: var(--oc-space-8);
        }
      }
      @media (min-width: ${unsafeCSS(bp.lg)}) {
        :host {
          --oc-section-columns: 9;
          --oc-section-label-span: 2;
        }
        .title {
          order: 0;
        }
        .rail {
          grid-column: 1 / span 3;
          position: sticky;
          top: 0;
          /* fits below the (non-sticky) header at load; keeps that gap once stuck */
          height: calc(100svh - var(--oc-header-height, 5.5rem));
          justify-content: space-between;
          padding-block: var(--oc-space-7) var(--oc-space-6);
          align-self: start;
        }
        .content {
          grid-column: 4 / span 9;
          padding-top: var(--oc-space-7);
        }
      }
      .meta {
        font-size: var(--oc-text-sm);
        line-height: var(--oc-leading-snug);
      }
    `
  ];

  override render() {
    return html`<div class="layout" part="layout">
      <div class="rail" part="rail">
        <div class="meta"><slot name="meta"></slot></div>
        <div class="title"><slot name="title"></slot></div>
      </div>
      <div class="content" part="content"><slot></slot></div>
    </div>`;
  }
}

define('oc-page-layout', OcPageLayout);

declare global {
  interface HTMLElementTagNameMap {
    'oc-page-layout': OcPageLayout;
  }
}
