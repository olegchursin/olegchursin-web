import { LitElement, css } from 'lit';
import { define } from '../internal/define.ts';
import { hostStyles } from '../internal/styles.ts';

/**
 * `<oc-rule>` — lines that carry structure: hairlines separate, rules divide, bars anchor.
 * Decorative by default (hidden from assistive tech); set `semantic` to expose a separator.
 */
export class OcRule extends LitElement {
  static override properties = {
    weight: { reflect: true },
    tone: { reflect: true },
    orientation: { reflect: true },
    length: { reflect: true },
    semantic: { type: Boolean, reflect: true }
  };

  declare weight: 'hairline' | 'rule' | 'bar';
  declare tone: 'ink' | 'red' | 'line';
  declare orientation: 'horizontal' | 'vertical';
  /** `full` (default) or `short` — a short bar is the poster's lone black dash. */
  declare length: 'full' | 'short';
  declare semantic: boolean;

  constructor() {
    super();
    this.weight = 'hairline';
    this.tone = 'ink';
    this.orientation = 'horizontal';
    this.length = 'full';
    this.semantic = false;
  }

  static override styles = [
    hostStyles,
    css`
      :host {
        --_thickness: var(--oc-hairline);
        --_color: var(--oc-ink);
        display: block;
        flex: none;
        width: 100%;
        height: var(--_thickness);
        background: var(--_color);
      }
      :host([weight='rule']) {
        --_thickness: var(--oc-rule);
      }
      :host([weight='bar']) {
        --_thickness: var(--oc-bar);
      }
      :host([tone='red']) {
        --_color: var(--oc-red);
      }
      :host([tone='line']) {
        --_color: var(--oc-line);
      }
      :host([length='short']) {
        width: var(--oc-space-8);
      }
      :host([orientation='vertical']) {
        width: var(--_thickness);
        height: auto;
        align-self: stretch;
        min-height: 1em;
      }
      :host([orientation='vertical'][length='short']) {
        height: var(--oc-space-8);
        align-self: auto;
      }
    `
  ];

  override connectedCallback() {
    super.connectedCallback();
    this.syncRole();
  }

  override updated() {
    this.syncRole();
  }

  private syncRole() {
    if (this.semantic) {
      this.setAttribute('role', 'separator');
      this.setAttribute('aria-orientation', this.orientation);
      this.removeAttribute('aria-hidden');
    } else {
      this.removeAttribute('role');
      this.removeAttribute('aria-orientation');
      this.setAttribute('aria-hidden', 'true');
    }
  }
}

define('oc-rule', OcRule);

declare global {
  interface HTMLElementTagNameMap {
    'oc-rule': OcRule;
  }
}
