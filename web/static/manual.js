// Manual browser: #/manuals (shelf of all manuals) and #/manual/<id>?h=<heading> (one rendered manual).
import { $, api, app, esc, list, route } from './core.js';
import { headings } from './md.js';
import { render, scrollToId, wireAnchors } from './ui.js';

const REPO = 'https://github.com/gddickinson/piezo1_research_manuals';

function shelf(data, current) {
  const byId = Object.fromEntries(data.manuals.map(m => [m.id, m]));
  const open = !current || matchMedia('(min-width: 761px)').matches;
  return `<aside class="panel shelf"><details ${open ? 'open' : ''}><summary>All manuals (${data.manuals.length})</summary>
    <label for="shelf-q" class="small">Filter by name</label><input id="shelf-q" type="search" placeholder="e.g. tracking">
    ${list(data.categories, cat => `<div class="cat"><h3>${esc(cat.name)}</h3>${list(cat.manuals, id =>
      `<a href="#/manual/${id}" class="${id === current ? 'on' : ''}" data-name="${esc((byId[id].name + ' ' + cat.name).toLowerCase())}">${esc(byId[id].name.replace(/ Manual$/, ''))}</a>`)}</div>`)}
    </details></aside>`;
}

function wireShelf(root) {
  const q = $('#shelf-q', root);
  q.addEventListener('input', () => {
    const v = q.value.toLowerCase().trim();
    root.querySelectorAll('.shelf a').forEach(a => a.classList.toggle('hide', !!v && !a.dataset.name.includes(v)));
    root.querySelectorAll('.shelf .cat').forEach(c => c.classList.toggle('hide', !c.querySelector('a:not(.hide)')));
  });
}

route('manuals', async () => {
  const data = await api('/manuals');
  app().innerHTML = `<h1>Manuals</h1>
  <p class="lead">${data.manuals.length} manuals in ${data.categories.length} categories, grouped as in the README.</p>
  <div class="scroll"><table><thead><tr><th>Manual</th><th>Category</th><th>Lines</th><th>Sections</th><th>Code examples</th></tr></thead>
  <tbody>${list(data.manuals, m => `<tr class="click" data-id="${m.id}"><td><a href="#/manual/${m.id}">${esc(m.name)}</a></td>
    <td class="small">${esc(m.category)}</td><td>${m.lines.toLocaleString()}</td><td>${m.sections}</td><td>${m.code_blocks}</td></tr>`)}</tbody></table></div>`;
  app().querySelectorAll('tr.click').forEach(tr => tr.addEventListener('click', e => {
    if (!e.target.closest('a')) location.hash = `#/manual/${tr.dataset.id}`;
  }));
});

route('manual', async ([id], query) => {
  const [data, m] = await Promise.all([api('/manuals'), api('/manual/' + id)]);
  const toc = headings(m.markdown).filter(h => h.level === 2);
  const root = app();
  root.innerHTML = `<div class="side">${shelf(data, id)}
  <article>
    <p class="kicker">${esc(m.category)}</p>
    <h1 class="glow">${esc(m.title)}</h1>
    <p class="meta">${m.lines.toLocaleString()} lines · ${m.words.toLocaleString()} words · ${m.code_blocks} code examples ·
      <a href="${REPO}/blob/main/${encodeURIComponent(m.file)}" target="_blank" rel="noopener">${esc(m.file)} on GitHub</a></p>
    ${toc.length ? `<details class="panel toc"><summary>On this page (${toc.length} sections)</summary><ol>${list(toc, h =>
      `<li><a href="#" data-anchor="${esc(h.id)}">${esc(h.text.replace(/^\d+\.\s*/, ''))}</a></li>`)}</ol></details>` : ''}
    <div class="md" id="doc">${render(m.markdown, data.images || [], { skipTitle: true })}</div>
    <p><a href="#/manual/${id}" data-anchor="${esc(headings(m.markdown)[0]?.id || '')}">Back to top</a></p>
  </article></div>`;
  wireShelf(root);
  wireAnchors(root, `#/manual/${id}`);
  if (query.h) requestAnimationFrame(() => scrollToId($('#doc', root), query.h));
});
