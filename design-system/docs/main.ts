import '../src/styles/index.css';
import './docs.css';
import '../src/index.ts';

const COLORS = [
  ['--oc-paper', 'Paper', 'Page background'],
  ['--oc-paper-2', 'Paper 2', 'Recessed surfaces, code'],
  ['--oc-ink', 'Ink', 'Text, rules, shapes'],
  ['--oc-ink-2', 'Ink 2', 'Secondary text'],
  ['--oc-ink-3', 'Ink 3', 'Meta text'],
  ['--oc-red', 'Red', 'Blocks, dots, display'],
  ['--oc-red-text', 'Red text', 'Red at text sizes']
] as const;

const SCALE = [
  ['--oc-text-poster', 'Poster', 'black', '62%'],
  ['--oc-text-display', 'Display', 'black', '78%'],
  ['--oc-text-3xl', '3XL', 'black', '100%'],
  ['--oc-text-2xl', '2XL', '700', '78%'],
  ['--oc-text-xl', 'XL', '700', '100%'],
  ['--oc-text-md', 'MD', '700', '100%'],
  ['--oc-text-base', 'Base', '400', '100%'],
  ['--oc-text-sm', 'SM', '400', '100%'],
  ['--oc-text-xs', 'XS', '500', '112%']
] as const;

const SOURCES = [
  [
    'portraits-museum-fur-gestaltung.jpg',
    'Portraits, Museum für Gestaltung',
    'Vertical title, red block, info column'
  ],
  ['grid-16.webp', 'Grid // 16', 'The visible grid'],
  ['living-theatre.jpg', 'Living theatre', 'Type as image, diagonal energy'],
  ['minimal-plus.jpg', 'Minimal+', 'Type specimen, weight as hierarchy'],
  ['swiss-poster.jpg', 'SWISS', 'Red dots as markers, sparse meta'],
  [
    'swiss-style-infographic.webp',
    'Swiss Style',
    'Paper, ink, red; grid; objective photos'
  ],
  [
    'david-quay-type-workshop.jpg',
    'Type workshop with David Quay',
    'Fragmented letterforms, flush-left captions'
  ]
] as const;

function renderSwatches() {
  const host = document.getElementById('swatches')!;
  const style = getComputedStyle(document.documentElement);
  host.innerHTML = COLORS.map(([token, name, use]) => {
    const value = style.getPropertyValue(token).trim();
    return `<figure class="swatch">
      <div class="chip" style="background: var(${token})"></div>
      <figcaption><strong>${name}</strong><span>${use}</span><code>${token}</code><code>${value}</code></figcaption>
    </figure>`;
  }).join('');
}

function renderScale() {
  const host = document.getElementById('scale')!;
  host.innerHTML = SCALE.map(
    ([token, name, weight, width]) => `<div class="scale-row">
      <span class="scale-meta"><strong>${name}</strong><code>${token}</code></span>
      <span class="scale-sample" style="font-size: var(${token}); font-weight: ${weight === 'black' ? 900 : weight}; font-stretch: ${width}">Grotesk</span>
    </div>`
  ).join('');
}

function renderSources() {
  const host = document.getElementById('sources-grid')!;
  host.innerHTML = SOURCES.map(
    ([file, title, takeaway]) => `<figure>
      <oc-image src="inspiration/${file}" alt="${title}" ratio="4/5" treatment="none"></oc-image>
      <figcaption><strong>${title}</strong><span>${takeaway}</span></figcaption>
    </figure>`
  ).join('');
}

function renderGallery() {
  const photos = [
    ['travel-yosemite-2_00bCn8ymi.jpg', 'Yosemite Valley'],
    ['travel-joshue-tree_DA_GhkMIJC.jpg', 'Joshua Tree'],
    ['travel-hawaii_rg30oX6C1.jpg', 'Hawaii coastline'],
    ['travel-half-dome_E59hqHVTS.jpg', 'Half Dome'],
    ['travel-hawaii_H3KJ3yfxn.jpg', 'Hawaii'],
    ['travel-grand-tetons_P0rr5WvQpc.jpg', 'Grand Tetons']
  ];
  const host = document.getElementById('gallery-demo')!;
  host.innerHTML = photos
    .map(
      ([file, alt]) =>
        `<oc-image src="https://ik.imagekit.io/olegchursin/${file}?tr=w-600" full="https://ik.imagekit.io/olegchursin/${file}?tr=w-1800" alt="${alt}"></oc-image>`
    )
    .join('');
}

function wireSearch() {
  const status = document.getElementById('search-status')!;
  document.getElementById('search-demo')!.addEventListener('oc-search', e => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    status.textContent = value ? `Filtering by “${value}”` : '5 posts';
  });
}

renderSwatches();
renderScale();
renderSources();
renderGallery();
wireSearch();
document.addEventListener('oc-theme-change', () =>
  requestAnimationFrame(renderSwatches)
);
