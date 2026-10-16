import { html } from 'lit';

/**
 * The outbound arrow, drawn rather than typed: U+2197 renders as a colour emoji on
 * iOS and varies by font elsewhere. Sized in em and stroked in currentColor, so it
 * follows the surrounding text. Sits on the baseline, top at roughly cap height.
 */
export const arrowOut = html`<svg
  class="arrow"
  aria-hidden="true"
  focusable="false"
  viewBox="0 0 12 12"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="square"
>
  <path d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8" />
</svg>`;
