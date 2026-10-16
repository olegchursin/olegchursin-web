import { html, type TemplateResult } from 'lit';
import { nav, site } from './data/site.ts';
import { profiles } from './data/links.ts';

/** The page chrome shared by every route: header, main, footer, grid overlay. */
export function shell(
  section: string | undefined,
  content: TemplateResult
): TemplateResult {
  const year = new Date().getFullYear();
  return html`<nav aria-label="Skip link">
      <a class="oc-skip-link" href="#main">Skip to content</a>
    </nav>
    <oc-site-header home-href="/">
      <span slot="brand">Oleg<br />Chursin</span>
      ${nav.map(
        item =>
          html`<oc-nav-link href=${item.href} ?current=${section === item.href}
            >${item.label}</oc-nav-link
          >`
      )}
      <oc-theme-toggle slot="actions"></oc-theme-toggle>
    </oc-site-header>
    <main id="main" tabindex="-1">${content}</main>
    <oc-site-footer>
      <p>
        Set in Archivo on a twelve-column grid. Built with Lit web components
        and rendered to static HTML.
      </p>
      <ul slot="links" class="footer-links" role="list">
        ${profiles.map(
          p =>
            html`<li>
              <oc-link variant="plain" href=${p.href}>${p.label}</oc-link>
            </li>`
        )}
      </ul>
      <p slot="meta">© ${year} ${site.name}<br />${site.place}</p>
    </oc-site-footer>
    <oc-grid-overlay></oc-grid-overlay>`;
}
