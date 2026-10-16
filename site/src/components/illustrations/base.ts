import { LitElement, css, html, nothing, type TemplateResult } from 'lit';

/**
 * Base for the article's motion illustrations.
 *
 * - The animation loops, so every illustration has a Pause/Play button (WCAG 2.2.2).
 * - Under `prefers-reduced-motion` all animation is removed. Every keyframe set is
 *   written so the element's *base* style is the finished composition, so the
 *   static frame is complete rather than blank.
 * - The art is decorative to assistive tech; `label` describes it in words.
 */
export abstract class Illustration extends LitElement {
  static override properties = {
    caption: {},
    fig: {},
    paused: { type: Boolean, reflect: true }
  };

  declare caption: string;
  declare fig?: string;
  declare paused: boolean;

  /** What the illustration shows, for screen readers. */
  protected abstract readonly label: string;
  protected abstract renderArt(): TemplateResult;

  constructor() {
    super();
    this.caption = '';
    this.paused = false;
  }

  static baseStyles = css`
    :host {
      display: block;
      --loop: 10s;
      color: var(--oc-ink);
      font-family: var(--oc-font);
    }
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
    figure {
      margin: 0;
    }
    .frame {
      position: relative;
      border-top: var(--oc-bar) solid var(--oc-ink);
      background: var(--oc-paper);
    }
    .stage {
      position: relative;
      aspect-ratio: 16 / 10;
      overflow: hidden;
      border-bottom: var(--oc-hairline) solid var(--oc-ink);
    }
    /* phones: a taller canvas gives the small type room */
    @media (max-width: 40rem) {
      .stage {
        aspect-ratio: 4 / 3;
      }
    }
    .toggle {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 5;
      min-height: 2rem;
      padding: 0.25rem 0.6rem;
      border: 0;
      background: var(--oc-ink);
      color: var(--oc-paper);
      font: inherit;
      font-size: var(--oc-text-xs);
      font-weight: var(--oc-weight-bold);
      cursor: pointer;
    }
    .toggle:hover {
      background: var(--oc-red);
      color: var(--oc-on-red);
    }
    .toggle:focus-visible {
      outline: var(--oc-focus-ring);
      outline-offset: var(--oc-focus-offset);
    }
    figcaption {
      display: flex;
      gap: var(--oc-space-3);
      padding-top: var(--oc-space-2);
      font-size: var(--oc-text-sm);
      line-height: var(--oc-leading-snug);
      color: var(--oc-ink-2);
    }
    .fig {
      flex: none;
      font-weight: var(--oc-weight-bold);
      color: var(--oc-ink);
    }
    .mono {
      font-family: var(--oc-font-mono);
    }
    /* delayed loops show their first frame while waiting, not the base style */
    .stage *,
    .stage *::before,
    .stage *::after {
      animation-fill-mode: backwards !important;
    }
    :host([paused]) .stage *,
    :host([paused]) .stage *::before,
    :host([paused]) .stage *::after,
    :host([paused]) .stage {
      animation-play-state: paused !important;
    }
    @media (prefers-reduced-motion: reduce) {
      .stage *,
      .stage *::before,
      .stage *::after,
      .stage {
        animation: none !important;
      }
      .toggle {
        display: none;
      }
    }
  `;

  private toggle() {
    this.paused = !this.paused;
  }

  override render() {
    return html`<figure>
      <div class="frame">
        <div class="stage" role="img" aria-label=${this.label}>
          ${this.renderArt()}
        </div>
        <button
          class="toggle"
          type="button"
          aria-pressed=${this.paused ? 'true' : 'false'}
          @click=${this.toggle}
        >
          ${this.paused ? 'Play' : 'Pause'}
        </button>
      </div>
      <figcaption>
        ${this.fig ? html`<span class="fig">Fig. ${this.fig}</span>` : nothing}
        <span>${this.caption}</span>
      </figcaption>
    </figure>`;
  }
}

export function define(name: string, ctor: CustomElementConstructor) {
  if (!customElements.get(name)) customElements.define(name, ctor);
}
