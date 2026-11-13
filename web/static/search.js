// Search: #/search?q=... loads every manual once and lists the matching sections, best first.
import { $, api, app, esc, list, route } from './core.js';
import { mark, search, terms } from './search_engine.js';

let docs = null;
async function loadDocs(progress) {
  if (docs) return docs;
  const { manuals } = await api('/manuals');
  let done = 0;
  docs = await Promise.all(manuals.map(async m => {
    const d = await api('/manual/' + m.id);
    progress(++done, manuals.length);
    return { id: m.id, title: m.name, src: d.markdown };
  }));
  return docs;
}

route('search', async (args, query) => {
  const root = app();
  root.innerHTML = `<h1>Search the manuals</h1>
  <label for="q">Words to find (every word must appear in the same section)</label>
  <input id="q" type="search" value="${esc(query.q || '')}" placeholder="e.g. MSD diffusion coefficient" autocomplete="off">
  <p class="small mute" id="status">Loading the manuals...</p><div id="hits"></div>`;
  const q = $('#q', root), status = $('#status', root), out = $('#hits', root);
  await loadDocs((n, total) => { status.textContent = `Loading the manuals... ${n}/${total}`; });
  const run = () => {
    const ts = terms(q.value);
    history.replaceState(null, '', '#/search' + (q.value.trim() ? '?q=' + encodeURIComponent(q.value.trim()) : ''));
    if (!ts.length) { status.textContent = `${docs.length} manuals loaded. Type at least one word of two letters or more.`; out.innerHTML = ''; return; }
    const hits = search(docs, q.value);
    status.textContent = hits.length ? `${hits.length === 60 ? 'Top 60' : hits.length} matching section${hits.length === 1 ? '' : 's'}` : 'No section contains all of those words.';
    out.innerHTML = list(hits, h => `<a class="hit" href="#/manual/${h.manual}${h.section ? '?h=' + encodeURIComponent(h.section) : ''}">
      <small>${esc(h.title)}</small><b>${mark(esc(h.heading), ts)}</b><span>${mark(esc(h.snippet), ts)}</span></a>`);
  };
  let timer = 0;
  q.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(run, 200); });
  run();
  q.focus();
});
