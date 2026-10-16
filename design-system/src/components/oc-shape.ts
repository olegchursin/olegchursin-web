import { LitElement, css } from 'lit';
import { define } from '../internal/define.ts';
import { hostStyles } from '../internal/styles.ts';

/**
 * `<oc-shape>` — the geometric vocabulary: circle, square, dot, bar, block.
 * Shapes mark and anchor (a current item, a section start, the one red block per view).
 * Always decorative. Size with `size` or `--oc-shape-size`.
 */
export class OcShape extends LitElement {
  static override properties = {
    shape: { reflect: true },
    tone: { reflect: true },
    size: { reflect: true }
  };

  declare shape: 'circle' | 'square' | 'dot' | 'bar' | 'block';
  declare tone: 'ink' | 'red' | 'paper';
  declare size: 'sm' | 'md' | 'lg' | 'xl';

  constructor() {
    super();
    this.shape = 'square';
    this.tone = 'ink';
    this.size = 'md';
  }

  static override styles = [
    hostStyles,
    css`
      :host {
        --_s: var(--oc-shape-size, var(--oc-space-6));
        display: inline-block;
        flex: none;
        width: var(--_s);
        height: var(--_s);
        background: var(--oc-ink);
        vertical-align: middle;
      }
      :host([size='sm']) {
        --_s: var(--oc-shape-size, var(--oc-space-3));
      }
      :host([size='lg']) {
        --_s: var(--oc-shape-size, var(--oc-space-8));
      }
      :host([size='xl']) {
        --_s: var(--oc-shape-size, var(--oc-space-10));
      }
      :host([tone='red']) {
        background: var(--oc-red);
      }
      :host([tone='paper']) {
        background: var(--oc-paper);
      }
      :host([shape='circle']),
      :host([shape='dot']) {
        border-radius: 50%;
      }
      :host([shape='dot']) {
        --_s: var(--oc-shape-size, 0.5rem);
      }
      :host([shape='bar']) {
        width: calc(var(--_s) * 3);
        height: calc(var(--_s) * 0.6);
      }
      :host([shape='block']) {
        display: block;
        width: 100%;
        height: 100%;
        min-height: var(--_s);
      }
    `
  ];

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('aria-hidden', 'true');
  }
}

define('oc-shape', OcShape);

declare global {
  interface HTMLElementTagNameMap {
    'oc-shape': OcShape;
  }
}
