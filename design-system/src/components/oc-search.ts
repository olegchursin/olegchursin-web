import { LitElement, css, html } from 'lit';
import { define } from '../internal/define.ts';
import { hostStyles } from '../internal/styles.ts';

/**
 * `<oc-search>` — a large, rule-underlined filter field.
 *
 * @slot label - visible label (defaults to "Search")
 * @slot status - live result status, e.g. "3 posts"
 * @fires oc-search - on every input; detail: { value: string }
 */
export class OcSearch extends LitElement {
  static override properties = {
    value: {},
    placeholder: {}
  };

  declare value: string;
  declare placeholder: string;

  constructor() {
    super();
    this.value = '';
    this.placeholder = '';
  }

  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        font-family: var(--oc-font);
        color: var(--oc-ink);
      }
      label {
        display: block;
        margin-bottom: var(--oc-space-2);
        font-size: var(--oc-text-sm);
        font-weight: var(--oc-weight-bold);
      }
      .field {
        display: flex;
        align-items: baseline;
        gap: var(--oc-space-4);
        border-bottom: var(--oc-rule) solid var(--oc-ink);
        transition: border-color var(--oc-duration-fast) var(--oc-ease);
      }
      .field:focus-within {
        border-bottom-color: var(--oc-red);
        box-shadow: 0 var(--oc-rule) 0 var(--oc-red);
      }
      input {
        flex: 1;
        min-width: 0;
        padding: var(--oc-space-2) 0;
        border: 0;
        background: transparent;
        color: inherit;
        font-size: var(--oc-text-xl);
        font-weight: var(--oc-weight-medium);
        font-stretch: var(--oc-wdth-narrow);
        letter-spacing: var(--oc-tracking-tight);
        outline: none;
      }
      input::placeholder {
        color: var(--oc-ink-3);
        opacity: 1;
      }
      input::-webkit-search-cancel-button {
        -webkit-appearance: none;
      }
      .status {
        flex: none;
        font-size: var(--oc-text-sm);
        color: var(--oc-ink-3);
      }
    `
  ];

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent('oc-search', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    );
  }

  override render() {
    return html`<label for="q" part="label"
        ><slot name="label">Search</slot></label
      >
      <div class="field">
        <input
          id="q"
          part="input"
          type="search"
          autocomplete="off"
          spellcheck="false"
          .value=${this.value}
          placeholder=${this.placeholder}
          @input=${this.onInput}
        />
        <span class="status" role="status"><slot name="status"></slot></span>
      </div>`;
  }
}

define('oc-search', OcSearch);

declare global {
  interface HTMLElementTagNameMap {
    'oc-search': OcSearch;
  }
}
