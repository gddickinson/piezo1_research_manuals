// Full-text search across the manuals (pure functions, tested in search_engine.test.mjs).
// A manual is split into sections at its headings; a section matches when every query term occurs in it
// (case-insensitive, inside code too). Results are ranked by the number of hits, heading hits counting double.
import { headings, headingText } from './md.js';

export const terms = q => String(q || '').toLowerCase().split(/\s+/).filter(t => t.length > 1);

// [{ id, text, body }] for one manual's Markdown; text before the first heading goes in a section with id ''.
export function sections(src) {
  const ids = headings(src);
  const out = [{ id: '', text: '', body: [] }];
  let fence = false, k = 0;
  for (const line of src.replace(/\r\n/g, '\n').split('\n')) {
    if (/^\s*```/.test(line)) fence = !fence;
    const h = !fence && line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
    if (h) { out.push({ id: ids[k].id, text: headingText(h[2]), body: [] }); k++; continue; }
    out[out.length - 1].body.push(line);
  }
  return out.map(s => ({ id: s.id, text: s.text, body: s.body.join('\n') })).filter(s => s.text || s.body.trim());
}

const count = (hay, t) => { let n = 0, i = 0; while ((i = hay.indexOf(t, i)) >= 0) { n++; i += t.length; } return n; };

// A one-line snippet around the first hit of the first term, Markdown markers removed.
export function snippet(body, ts, width = 160) {
  const flat = body.replace(/```\w*/g, ' ').replace(/[#*`|>]+/g, ' ').replace(/\s+/g, ' ').trim();
  const low = flat.toLowerCase();
  let at = -1;
  for (const t of ts) { at = low.indexOf(t); if (at >= 0) break; }
  if (at < 0) return flat.slice(0, width);
  let start = Math.max(0, at - Math.floor(width / 3));
  if (start) { const sp = flat.indexOf(' ', start); if (sp >= 0 && sp < at) start = sp + 1; }
  return (start ? '... ' : '') + flat.slice(start, start + width) + (start + width < flat.length ? ' ...' : '');
}

// docs: [{ id, title, src }] -> [{ manual, title, section, heading, score, snippet }] best first.
export function search(docs, q, limit = 60) {
  const ts = terms(q);
  if (!ts.length) return [];
  const hits = [];
  for (const d of docs) {
    for (const s of sections(d.src)) {
      const head = s.text.toLowerCase(), body = s.body.toLowerCase();
      if (!ts.every(t => head.includes(t) || body.includes(t))) continue;
      const score = ts.reduce((a, t) => a + 2 * count(head, t) + count(body, t), 0);
      hits.push({ manual: d.id, title: d.title, section: s.id, heading: s.text || d.title, score, snippet: snippet(s.body, ts) });
    }
  }
  return hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, limit);
}

// Mark the query terms in already-escaped HTML text.
export function mark(html, ts) {
  if (!ts.length) return html;
  const rx = new RegExp('(' + ts.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'gi');
  return html.replace(/(<[^>]*>)|([^<]+)/g, (m, tag, text) => tag || text.replace(rx, '<mark>$1</mark>'));
}
