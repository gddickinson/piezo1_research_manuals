// Home: what the collection is (README), real counts, and the manuals by README category.
import { api, app, esc, list, route } from './core.js';
import { render } from './ui.js';

route('home', async () => {
  const [info, { manuals }] = await Promise.all([api('/info'), api('/manuals')]);
  const c = info.counts, byId = Object.fromEntries(manuals.map(m => [m.id, m]));
  app().innerHTML = `
  <section class="hero">
    <p class="kicker">gddickinson / piezo1_research_manuals</p>
    <h1 class="glow">${esc(info.title)}</h1>
    <p class="lead">A collection of manuals for the software tools used in mechanosensitive ion channel research,
      single-molecule imaging, and cell biology, written for graduate students and scientists joining the PIEZO1
      research group.</p>
    <a class="btn" href="#/manuals">Browse the manuals</a><a class="btn alt" href="#/search">Search all manuals</a>
    <a class="btn alt" href="#/page/guide">Reading paths</a>
  </section>
  <div class="tiles">
    <div class="tile"><b>${c.manuals}</b><span>manuals</span></div>
    <div class="tile"><b>${c.categories}</b><span>categories</span></div>
    <div class="tile"><b>${c.lines.toLocaleString()}</b><span>lines of Markdown</span></div>
    <div class="tile"><b>${Math.round(c.words / 1000)}k</b><span>words</span></div>
    <div class="tile"><b>${c.code_blocks.toLocaleString()}</b><span>code examples</span></div>
  </div>
  <div class="md">${render(info.overview)}</div>
  ${list(info.categories, cat => `<h2>${esc(cat.name)}</h2><div class="grid wide">${list(cat.manuals, id => {
    const m = byId[id];
    return `<a class="card" href="#/manual/${m.id}"><b>${esc(m.name)}</b><small>${m.lines.toLocaleString()} lines · ${m.sections} sections</small>
      <span>${esc(m.description.replace(/\*\*/g, '').slice(0, 220))}${m.description.length > 220 ? '...' : ''}</span></a>`;
  })}</div>`)}
  <h2>The research pipeline</h2>
  <div class="md">${render(info.research)}</div>`;
});
