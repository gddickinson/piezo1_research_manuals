// README sections and repository documents shown as pages: #/page/<id> (guide, versions, planned, citation, contributing).
import { api, app, esc, route } from './core.js';
import { render, wireAnchors } from './ui.js';

const LINKS = [['guide', 'Reading paths'], ['versions', 'Software versions'], ['planned', 'Future updates'],
  ['citation', 'Citation'], ['contributing', 'Contributing']];

route('page', async ([id = 'guide']) => {
  const p = await api('/page/' + id);
  app().innerHTML = `<p class="kicker">From the repository</p><h1 class="glow">${esc(p.title)}</h1>
  <p class="seg" role="navigation" aria-label="Repository pages">${LINKS.map(([k, t]) =>
    `<a class="btn ${k === id ? '' : 'alt'}" href="#/page/${k}">${esc(t)}</a>`).join('')}</p>
  <div class="md">${render(p.markdown, [], { skipTitle: true })}</div>`;
  wireAnchors(app());
});
