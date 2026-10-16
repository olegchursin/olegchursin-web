import { LitElement, css, html } from 'lit';
import { define } from '../internal/define.ts';
import { focusRing, hostStyles, visuallyHidden } from '../internal/styles.ts';
import {
  applyTheme,
  effectiveTheme,
  storeTheme,
  systemTheme,
  type Theme
} from '../theme.ts';

/**
 * `<oc-theme-toggle>` — switches between the paper (light) and ink (dark) themes.
 * The choice is stored; choosing the system's own theme clears the override.
 * Pair with `themeInitScript` in <head> to avoid a flash on load.
 *
 * @fires oc-theme-change - detail: { theme: 'light' | 'dark' }
 */
export class OcThemeToggle extends LitElement {
  static override properties = {
    theme: { state: true }
  };

  declare theme: Theme | undefined;

  static override styles = [
    hostStyles,
    focusRing,
    visuallyHidden,
    css`
      :host {
        display: inline-block;
      }
      button {
        display: inline-grid;
        place-items: center;
        width: 2.75rem;
        height: 2.75rem;
        padding: 0;
        border: 0;
        background: transparent;
        color: var(--oc-ink);
        cursor: pointer;
      }
      .glyph {
        width: 1.25rem;
        height: 1.25rem;
        border: var(--oc-rule) solid currentColor;
        border-radius: 50%;
        background: linear-gradient(90deg, currentColor 50%, transparent 50%);
        transition: transform var(--oc-duration) var(--oc-ease);
      }
      button:hover .glyph {
        color: var(--oc-red);
      }
      :host([data-dark]) .glyph {
        transform: rotate(180deg);
      }
    `
  ];

  override connectedCallback() {
    super.connectedCallback();
    this.toggleAttribute('data-dark', effectiveTheme() === 'dark');
  }

  // Read the theme after the first (possibly hydrating) render so the client's
  // first pass matches the server markup, then update.
  override firstUpdated() {
    this.theme = effectiveTheme();
  }

  private toggle() {
    const next: Theme =
      (this.theme ?? effectiveTheme()) === 'dark' ? 'light' : 'dark';
    const followsSystem = next === systemTheme();
    applyTheme(followsSystem ? null : next);
    storeTheme(followsSystem ? null : next);
    this.theme = next;
    this.toggleAttribute('data-dark', next === 'dark');
    this.dispatchEvent(
      new CustomEvent('oc-theme-change', {
        detail: { theme: next },
        bubbles: true,
        composed: true
      })
    );
  }

  override render() {
    const dark = this.theme === 'dark';
    return html`<button
      type="button"
      part="button"
      aria-pressed=${dark ? 'true' : 'false'}
      @click=${this.toggle}
    >
      <span class="glyph" aria-hidden="true"></span>
      <span class="visually-hidden">Dark theme</span>
    </button>`;
  }
}

define('oc-theme-toggle', OcThemeToggle);

declare global {
  interface HTMLElementTagNameMap {
    'oc-theme-toggle': OcThemeToggle;
  }
}
