import { define } from '../internal/define.ts';

/**
 * `<oc-prose>` — container for long-form HTML (rendered Markdown).
 * Deliberately light DOM: the article stays plain, indexable HTML and is styled by
 * the global `prose.css` + `code.css`. No shadow root, no JavaScript behaviour.
 */
// On the server (Lit SSR) there is no HTMLElement; the tag is emitted as-is.
const Base: typeof HTMLElement =
  globalThis.HTMLElement ?? (class {} as unknown as typeof HTMLElement);

export class OcProse extends Base {}

define('oc-prose', OcProse);

declare global {
  interface HTMLElementTagNameMap {
    'oc-prose': OcProse;
  }
}
