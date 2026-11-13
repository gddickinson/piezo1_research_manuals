// Shared helpers for the pages: Markdown link rules for this repository and in-page anchor handling.
import { findAnchor, markdown } from './md.js';

const REPO = 'https://github.com/gddickinson/piezo1_research_manuals';
export const manualId = file => file.replace(/\.md$/i, '').replace(/_Manual$/, '').toLowerCase();

// Where a relative link in a manual or README goes: another manual -> its page (and section),
// CONTRIBUTING.md -> the contributing page, other repository files -> GitHub.
export function linkFor(href) {
  const [file, hash] = href.split('#');
  if (/_Manual\.md$/i.test(file)) return `#/manual/${manualId(file.split('/').pop())}${hash ? `?h=${encodeURIComponent(hash)}` : ''}`;
  if (/^CONTRIBUTING\.md$/i.test(file)) return '#/page/contributing';
  if (/^[\w./-]+$/.test(file)) return `${REPO}/blob/main/${file}`;
  return null;
}

// Images are served at repo/<path> (local app and static site alike) when the repository holds the file.
export const imageFor = images => src => {
  const p = src.replace(/^\.\//, '');
  return images.includes(p) ? `repo/${p}` : null;
};

export const render = (src, images = [], opt = {}) => markdown(src, { linkFor, imageFor: imageFor(images), ...opt });

// Scroll to a heading id inside root; returns true if found.
export function scrollToId(root, id) {
  if (!id) return false;
  const ids = [...root.querySelectorAll('[id]')].map(e => e.id);
  const hit = findAnchor(ids, id) ?? findAnchor(ids, decodeURIComponent(id));
  const el = hit && root.querySelector(`[id="${CSS.escape(hit)}"]`);
  if (el) el.scrollIntoView({ block: 'start' });
  return !!el;
}

// [text](#anchor) links: scroll to the heading and keep the anchor in the address bar.
export function wireAnchors(root, base) {
  root.addEventListener('click', e => {
    const a = e.target.closest('a[data-anchor]');
    if (!a) return;
    e.preventDefault();
    if (scrollToId(root, a.dataset.anchor) && base) history.replaceState(null, '', `${base}?h=${encodeURIComponent(a.dataset.anchor)}`);
  });
}
