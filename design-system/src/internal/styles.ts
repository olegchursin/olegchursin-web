import { css } from 'lit';

/** Baseline for every component's shadow root. */
export const hostStyles = css`
  :host {
    box-sizing: border-box;
  }
  :host([hidden]) {
    display: none !important;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

/** The single focus treatment of the system: a red 3px outline, offset. */
export const focusRing = css`
  :focus-visible {
    outline: var(--oc-focus-ring);
    outline-offset: var(--oc-focus-offset);
  }
`;

export const visuallyHidden = css`
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
`;

/** Breakpoints used inside shadow roots (rem, so they follow user font size). */
export const bp = {
  md: '48rem',
  lg: '64rem',
  xl: '90rem'
} as const;
