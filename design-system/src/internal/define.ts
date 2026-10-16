/**
 * Registers a custom element once. Safe to call repeatedly (HMR, SSR module re-evaluation).
 */
export function define(name: string, ctor: CustomElementConstructor): void {
  if (!customElements.get(name)) {
    customElements.define(name, ctor);
  }
}
