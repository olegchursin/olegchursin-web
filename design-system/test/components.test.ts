import { expect, fixture, html, oneEvent, aTimeout } from '@open-wc/testing';
import '../src/index.ts';
import type {
  OcButton,
  OcDisplay,
  OcEntry,
  OcGallery,
  OcGridOverlay,
  OcImage,
  OcLink,
  OcRule,
  OcSearch,
  OcSiteHeader,
  OcTag,
  OcThemeToggle
} from '../src/index.ts';
import { THEME_STORAGE_KEY } from '../src/theme.ts';

const shadow = (el: Element) => el.shadowRoot!;

describe('oc-display', () => {
  it('renders the requested heading level around the slot', async () => {
    const el = await fixture<OcDisplay>(
      html`<oc-display as="h1">Work</oc-display>`
    );
    expect(shadow(el).querySelector('h1 slot')).to.exist;
    el.as = 'p';
    await el.updateComplete;
    expect(shadow(el).querySelector('p.text')).to.exist;
    expect(shadow(el).querySelector('h1')).to.be.null;
  });

  it('sets the fit variable only for vertical text', async () => {
    const el = await fixture<OcDisplay>(
      html`<oc-display vertical fit="3">Writing</oc-display>`
    );
    const text = shadow(el).querySelector<HTMLElement>('.text')!;
    expect(text.classList.contains('fit')).to.be.true;
    expect(text.getAttribute('style')).to.contain('--_fit:3');
  });
});

describe('oc-link', () => {
  it('treats absolute URLs as external', async () => {
    const el = await fixture<OcLink>(
      html`<oc-link href="https://github.com/olegchursin">GitHub</oc-link>`
    );
    const a = shadow(el).querySelector('a')!;
    expect(a.target).to.equal('_blank');
    expect(a.rel).to.equal('noopener noreferrer');
    expect(a.textContent).to.contain('opens in new tab');
  });

  it('keeps internal links in the same tab', async () => {
    const el = await fixture<OcLink>(
      html`<oc-link href="/writing">Writing</oc-link>`
    );
    const a = shadow(el).querySelector('a')!;
    expect(a.hasAttribute('target')).to.be.false;
    expect(shadow(el).querySelector('.arrow')).to.be.null;
  });
});

describe('oc-button', () => {
  it('renders a button by default and an anchor with href', async () => {
    const el = await fixture<OcButton>(html`<oc-button>Save</oc-button>`);
    expect(shadow(el).querySelector('button')).to.exist;
    el.href = '/photography';
    await el.updateComplete;
    expect(shadow(el).querySelector('a')!.getAttribute('href')).to.equal(
      '/photography'
    );
  });

  it('disables the native button', async () => {
    const el = await fixture<OcButton>(
      html`<oc-button disabled>Save</oc-button>`
    );
    expect(shadow(el).querySelector('button')!.disabled).to.be.true;
  });
});

describe('oc-tag', () => {
  it('toggles and reports its value', async () => {
    const el = await fixture<OcTag>(
      html`<oc-tag toggle value="git">Git</oc-tag>`
    );
    const button = shadow(el).querySelector('button')!;
    expect(button.getAttribute('aria-pressed')).to.equal('false');
    setTimeout(() => button.click());
    const ev = await oneEvent(el, 'oc-tag-toggle');
    expect(ev.detail).to.deep.equal({ value: 'git', pressed: true });
    await el.updateComplete;
    expect(button.getAttribute('aria-pressed')).to.equal('true');
  });
});

describe('oc-rule', () => {
  it('is decorative unless semantic', async () => {
    const el = await fixture<OcRule>(html`<oc-rule></oc-rule>`);
    expect(el.getAttribute('aria-hidden')).to.equal('true');
    el.semantic = true;
    await el.updateComplete;
    expect(el.getAttribute('role')).to.equal('separator');
    expect(el.hasAttribute('aria-hidden')).to.be.false;
  });
});

describe('oc-site-header', () => {
  it('opens the menu, and closes it on Escape', async () => {
    const el = await fixture<OcSiteHeader>(
      html`<oc-site-header>
        <span slot="brand">Oleg Chursin</span>
        <oc-nav-link href="/" current>Home</oc-nav-link>
      </oc-site-header>`
    );
    const menu = shadow(el).querySelector<HTMLButtonElement>('.menu')!;
    expect(menu.getAttribute('aria-expanded')).to.equal('false');
    menu.click();
    await el.updateComplete;
    expect(el.open).to.be.true;
    expect(menu.getAttribute('aria-expanded')).to.equal('true');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('marks the current nav link', async () => {
    const el = await fixture(
      html`<oc-nav-link href="/" current>Home</oc-nav-link>`
    );
    expect(
      shadow(el).querySelector('a')!.getAttribute('aria-current')
    ).to.equal('page');
  });
});

describe('oc-theme-toggle', () => {
  afterEach(() => {
    delete document.documentElement.dataset.theme;
    localStorage.removeItem(THEME_STORAGE_KEY);
  });

  it('flips the theme and stores an override', async () => {
    const el = await fixture<OcThemeToggle>(
      html`<oc-theme-toggle></oc-theme-toggle>`
    );
    await el.updateComplete;
    const before = el.theme;
    shadow(el).querySelector('button')!.click();
    await el.updateComplete;
    expect(el.theme).to.not.equal(before);
    expect(document.documentElement.dataset.theme).to.equal(el.theme);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).to.equal(el.theme);
    // flipping back to the system theme clears the override
    shadow(el).querySelector('button')!.click();
    await el.updateComplete;
    expect(document.documentElement.dataset.theme).to.be.undefined;
    expect(localStorage.getItem(THEME_STORAGE_KEY)).to.be.null;
  });
});

describe('oc-entry', () => {
  it('links the title and flags external destinations', async () => {
    const el = await fixture<OcEntry>(
      html`<oc-entry href="https://www.aon.com/">
        <span slot="meta">2022–now</span>
        <h3>Senior Software Developer</h3>
      </oc-entry>`
    );
    const a = shadow(el).querySelector('a')!;
    expect(a.href).to.equal('https://www.aon.com/');
    expect(a.target).to.equal('_blank');
    expect(shadow(el).querySelector('.arrow')).to.exist;
  });

  it('renders plain text without href', async () => {
    const el = await fixture<OcEntry>(
      html`<oc-entry><h3>Founder</h3></oc-entry>`
    );
    expect(shadow(el).querySelector('a')).to.be.null;
  });
});

describe('oc-search', () => {
  it('emits the typed value', async () => {
    const el = await fixture<OcSearch>(html`<oc-search></oc-search>`);
    const input = shadow(el).querySelector('input')!;
    input.value = 'git';
    setTimeout(() => input.dispatchEvent(new Event('input')));
    const ev = await oneEvent(el, 'oc-search');
    expect(ev.detail.value).to.equal('git');
  });

  it('labels its input', async () => {
    const el = await fixture<OcSearch>(html`<oc-search></oc-search>`);
    const input = shadow(el).querySelector('input')!;
    expect(shadow(el).querySelector(`label[for="${input.id}"]`)).to.exist;
  });
});

describe('oc-image', () => {
  it('renders an img with alt and lazy loading', async () => {
    const el = await fixture<OcImage>(
      html`<oc-image
        src="data:image/gif;base64,R0lGODlhAQABAAAAACw="
        alt="Half Dome"
      ></oc-image>`
    );
    const img = shadow(el).querySelector('img')!;
    expect(img.alt).to.equal('Half Dome');
    expect(img.loading).to.equal('lazy');
  });

  it('becomes a button in action mode', async () => {
    const el = await fixture<OcImage>(
      html`<oc-image
        action
        src="data:image/gif;base64,R0lGODlhAQABAAAAACw="
        alt="Half Dome"
      ></oc-image>`
    );
    const button = shadow(el).querySelector('button')!;
    expect(button.getAttribute('aria-label')).to.equal('Enlarge: Half Dome');
    setTimeout(() => button.click());
    await oneEvent(el, 'oc-image-activate');
  });
});

describe('oc-gallery', () => {
  const src = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';

  it('opens a lightbox and steps with arrow keys', async () => {
    const el = await fixture<OcGallery>(
      html`<oc-gallery label="Travel">
        <oc-image src=${src} alt="One"></oc-image>
        <oc-image src=${src} alt="Two"></oc-image>
        <oc-image src=${src} alt="Three"></oc-image>
      </oc-gallery>`
    );
    await el.updateComplete;
    const images = el.querySelectorAll('oc-image');
    await images[0].updateComplete;
    expect(images[0].action).to.be.true;

    shadow(images[1]).querySelector('button')!.click();
    await el.updateComplete;
    const dialog = shadow(el).querySelector('dialog')!;
    expect(dialog.open).to.be.true;
    expect(
      shadow(el).querySelector('.lb-stage img')!.getAttribute('alt')
    ).to.equal('Two');

    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await el.updateComplete;
    expect(
      shadow(el).querySelector('.lb-stage img')!.getAttribute('alt')
    ).to.equal('Three');

    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await el.updateComplete;
    expect(
      shadow(el).querySelector('.lb-stage img')!.getAttribute('alt')
    ).to.equal('One');

    el.close();
    await aTimeout(0);
    expect(dialog.open).to.be.false;
  });
});

describe('oc-grid-overlay', () => {
  it('toggles with the g key but not while typing', async () => {
    const el = await fixture<OcGridOverlay>(
      html`<oc-grid-overlay></oc-grid-overlay>`
    );
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'g' }));
    expect(el.visible).to.be.true;

    const input = await fixture<HTMLInputElement>(html`<input />`);
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'g', bubbles: true, composed: true })
    );
    expect(el.visible).to.be.true;
  });
});

describe('accessibility', () => {
  it('a composed page passes axe', async () => {
    const el = await fixture(
      html`<div>
        <oc-site-header>
          <span slot="brand">Oleg Chursin</span>
          <oc-nav-link href="/" current>Home</oc-nav-link>
          <oc-nav-link href="/work">Work</oc-nav-link>
          <oc-theme-toggle slot="actions"></oc-theme-toggle>
        </oc-site-header>
        <main>
          <oc-page-layout>
            <oc-display slot="title" as="h1">Work</oc-display>
            <oc-section>
              <h2 slot="label">Career</h2>
              <oc-entry href="/x"
                ><span slot="meta">2022</span>
                <h3>Role</h3></oc-entry
              >
            </oc-section>
            <oc-search placeholder="Title or tag"></oc-search>
            <oc-button>Save</oc-button>
            <oc-tag toggle>Git</oc-tag>
          </oc-page-layout>
        </main>
      </div>`
    );
    await expect(el).to.be.accessible();
  });
});
