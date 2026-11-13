// Small Markdown renderer for the manuals (no dependencies): headings with GitHub-style ids (so the manuals' own
// tables of contents work), paragraphs, nested lists, fenced code with syntax colours, tables, block quotes, rules,
// images and inline code / bold / italic / strike / links. All text is escaped first; raw HTML is shown as text.
// linkFor(href) decides where relative links go (another manual, a repo file); images use imageFor(src).
import { esc } from './core.js';
import { highlight } from './highlight.js';

// GitHub's heading anchor: lower case, drop punctuation except '-' and '_', every space becomes '-'.
export function ghSlug(text) {
  return text.toLowerCase().replace(/<[^>]+>/g, '').replace(/[`*~]/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .trim().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/ /g, '-');
}

// The heading id an in-page link points to: exact match, else one that differs only in non-ASCII characters
// (a hand-written table of contents may drop a character such as the subscript in CO2).
export function findAnchor(ids, want) {
  if (ids.includes(want)) return want;
  const loose = s => s.replace(/[^a-z0-9-]/g, '');
  return ids.find(id => loose(id) === loose(want)) ?? null;
}

// Plain text of a heading line as GitHub slugs it (inline markup removed).
export const headingText = s => s.replace(/`([^`]*)`/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').trim();

// Headings outside code fences: [{ level, text, id }] with GitHub's -1, -2 suffixes for repeats.
export function headings(src) {
  const out = [], seen = new Map();
  let fence = false;
  for (const line of src.replace(/\r\n/g, '\n').split('\n')) {
    if (/^\s*```/.test(line)) { fence = !fence; continue; }
    if (fence) continue;
    const h = line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
    if (!h) continue;
    const text = headingText(h[2]), base = ghSlug(text), n = seen.get(base) || 0;
    seen.set(base, n + 1);
    out.push({ level: h[1].length, text, id: n ? `${base}-${n}` : base });
  }
  return out;
}

function inline(s, opt) {
  const codes = [];
  let t = esc(s).replace(/`([^`]+)`/g, (m, c) => `\u0000${codes.push(c) - 1}\u0000`);
  t = t.replace(/ --- /g, ' \u2014 ').replace(/(\d)--(\d)/g, '$1\u2013$2');
  t = t.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, alt, src) => {
    const url = opt.imageFor(src.replace(/&amp;/g, '&'));
    return url ? `<img class="md-img" alt="${alt}" src="${esc(url)}" loading="lazy">` : `<span class="mute">[image: ${alt || 'untitled'}]</span>`;
  })
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, txt, href) => link(txt, href.replace(/&amp;/g, '&'), opt))
    .replace(/(^|[\s(])(https?:\/\/[^\s<]+[^\s<.,;:)])/g, (m, pre, url) => `${pre}<a href="${url}" target="_blank" rel="noopener">${url}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/__([^_]+)__/g, '<b>$1</b>')
    .replace(/~~([^~]+)~~/g, '<s>$1</s>')
    .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\w)/g, '$1<i>$2</i>')
    .replace(/(^|[^\w/])_([^_\s][^_]*?)_(?![\w/])/g, '$1<i>$2</i>');
  return t.replace(/\u0000(\d+)\u0000/g, (m, i) => `<code>${codes[+i]}</code>`);
}

function link(txt, href, opt) {
  if (href.startsWith('#')) return `<a href="#" data-anchor="${esc(href.slice(1))}">${txt}</a>`;
  if (/^https?:\/\//.test(href)) return `<a href="${esc(href)}" target="_blank" rel="noopener">${txt}</a>`;
  if (/^mailto:/.test(href)) return `<a href="${esc(href)}">${txt}</a>`;
  const target = opt.linkFor(href);
  return target ? `<a href="${esc(target)}">${txt}</a>` : txt;
}

const cells = line => line.trim().replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map(c => c.trim().replace(/\\\|/g, '|'));
const LIST = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;

function list(lines, i, opt) {
  // Collect items with their indent, then build nested <ul>/<ol>.
  const items = [];
  while (i < lines.length) {
    const m = lines[i].match(LIST);
    if (m) { items.push({ indent: m[1].length, ordered: /\d/.test(m[2]), start: parseInt(m[2], 10), text: m[3] }); i++; continue; }
    if (/^\s{2,}\S/.test(lines[i]) && items.length && !/^\s*```/.test(lines[i])) { items[items.length - 1].text += ' ' + lines[i].trim(); i++; continue; }
    break;
  }
  let k = 0;
  const build = indent => {
    const first = items[k], tag = first.ordered ? 'ol' : 'ul';
    let html = `<${tag}${first.ordered && first.start > 1 ? ` start="${first.start}"` : ''}>`;
    while (k < items.length && items[k].indent >= indent) {
      const it = items[k++];
      html += `<li>${inline(it.text, opt)}`;
      if (k < items.length && items[k].indent > it.indent) html += build(items[k].indent);
      html += '</li>';
    }
    return html + `</${tag}>`;
  };
  let html = '';
  while (k < items.length) html += build(items[k].indent);
  return [html, i];
}

// opt: { linkFor(href) -> url|null, imageFor(src) -> url|null, skipTitle: drop the first '# ' heading }
export function markdown(src, opt = {}) {
  opt = { linkFor: () => null, imageFor: () => null, ...opt };
  const lines = src.replace(/\r\n/g, '\n').split('\n');
  const ids = headings(src).map(h => h.id);
  const out = [];
  let i = 0, para = [], hn = 0, titleSkipped = !opt.skipTitle;
  const inl = s => inline(s, opt);
  const flush = () => { if (para.length) { out.push(`<p>${inl(para.join(' '))}</p>`); para = []; } };
  while (i < lines.length) {
    const line = lines[i];
    const fence = line.match(/^\s*```\s*([\w+#-]*)/);
    if (fence) {
      flush();
      const body = [];
      for (i++; i < lines.length && !/^\s*```\s*$/.test(lines[i]); i++) body.push(lines[i]);
      const lang = fence[1] || '';
      out.push(`<pre class="code"${lang ? ` data-lang="${esc(lang)}"` : ''}><code>${highlight(body.join('\n'), lang).join('\n')}</code></pre>`);
      i++; continue;
    }
    const h = line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
    if (h) {
      flush();
      const id = ids[hn++];
      if (!titleSkipped && h[1].length === 1) { titleSkipped = true; i++; continue; }
      const n = Math.min(h[1].length, 5) + (opt.skipTitle ? 0 : 1);
      out.push(`<h${Math.min(n, 6)} id="${esc(id)}">${inl(h[2])}</h${Math.min(n, 6)}>`); i++; continue;
    }
    if (/^\s*(---+|\*\*\*+|___+)\s*$/.test(line)) { flush(); out.push('<hr>'); i++; continue; }
    if (/^\s*>/.test(line)) {
      flush();
      const body = [];
      for (; i < lines.length && /^\s*>/.test(lines[i]); i++) body.push(lines[i].replace(/^\s*>\s?/, ''));
      out.push(`<blockquote>${markdown(body.join('\n'), { ...opt, skipTitle: false })}</blockquote>`); continue;
    }
    if (/^\s*\|/.test(line) && i + 1 < lines.length && /^\s*\|?\s*:?-+/.test(lines[i + 1])) {
      flush();
      const head = cells(line), rows = [];
      for (i += 2; i < lines.length && /^\s*\|/.test(lines[i]); i++) rows.push(cells(lines[i]));
      out.push(`<div class="scroll"><table class="md-table"><thead><tr>${head.map(c => `<th>${inl(c)}</th>`).join('')}</tr></thead><tbody>${
        rows.map(r => `<tr>${r.map(c => `<td>${inl(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    if (LIST.test(line)) { flush(); const [html, j] = list(lines, i, opt); out.push(html); i = j; continue; }
    if (!line.trim()) { flush(); i++; continue; }
    para.push(line.trim()); i++;
  }
  flush();
  return out.join('\n');
}
