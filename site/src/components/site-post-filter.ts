import { LitElement, css, html } from 'lit';

/**
 * Filters the post list by search text and tags. Progressive enhancement: the full
 * list is in the server HTML; this only hides rows. Rows are `li[data-title][data-tags]`.
 */
export class SitePostFilter extends LitElement {
  static override styles = css`
    :host {
      display: contents;
    }
  `;

  private query = '';
  private tags = new Set<string>();

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('oc-search', this.onSearch as EventListener);
    this.addEventListener('oc-tag-toggle', this.onTag as EventListener);
  }

  private onSearch = (e: CustomEvent<{ value: string }>) => {
    this.query = e.detail.value.trim().toLowerCase();
    this.apply();
  };

  private onTag = (e: CustomEvent<{ value: string; pressed: boolean }>) => {
    const tag = e.detail.value.toLowerCase();
    if (e.detail.pressed) this.tags.add(tag);
    else this.tags.delete(tag);
    this.apply();
  };

  private apply() {
    const rows = [...this.querySelectorAll<HTMLElement>('li[data-title]')];
    let shown = 0;
    for (const row of rows) {
      const title = row.dataset.title ?? '';
      const rowTags = (row.dataset.tags ?? '').split(',');
      const matchesQuery =
        !this.query ||
        title.includes(this.query) ||
        rowTags.some(t => t.includes(this.query));
      const matchesTags =
        !this.tags.size || rowTags.some(t => this.tags.has(t));
      const visible = matchesQuery && matchesTags;
      row.hidden = !visible;
      if (visible) shown++;
    }
    const status = this.querySelector('[data-filter-status]');
    if (status) {
      const filtered = this.query || this.tags.size;
      status.textContent = filtered
        ? `${shown} of ${rows.length} posts`
        : `${rows.length} posts`;
    }
    const empty = this.querySelector<HTMLElement>('[data-filter-empty]');
    if (empty) empty.hidden = shown > 0;
  }

  override render() {
    return html`<slot></slot>`;
  }
}

if (!customElements.get('site-post-filter')) {
  customElements.define('site-post-filter', SitePostFilter);
}

declare global {
  interface HTMLElementTagNameMap {
    'site-post-filter': SitePostFilter;
  }
}
