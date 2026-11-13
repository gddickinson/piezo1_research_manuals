// About: what the collection is, how this site is made, how to run it, licence and credits.
import { api, app, route } from './core.js';

route('about', async () => {
  const c = (await api('/info')).counts;
  app().innerHTML = `<h1>About</h1>
  <p class="lead">${c.manuals} researcher-oriented manuals for the software used to study mechanosensitive ion channels,
    particularly PIEZO1, in hiPSC-derived cells and organoids: imaging, segmentation, 3D visualisation, image
    restoration, particle tracking, channel-activity analysis, statistics and programming. Written by George
    Dickinson for the PIEZO1 research group (Department of Physiology and Biophysics, University of California, Irvine).</p>
  <h2>How this site is made</h2>
  <ul>
    <li>Each manual is the repository's own <code>*_Manual.md</code> file, rendered in the browser by a small built-in
      Markdown renderer (no external scripts). The manuals' own tables of contents link to their sections.</li>
    <li>Categories and one-line descriptions come from the README's tables; counts are computed from the files.</li>
    <li>Search splits every manual into sections at its headings and lists the sections that contain all the words
      you typed, code included.</li>
    <li>Nothing is added to the manuals: if a manual and the software disagree, the software's own documentation wins.</li>
  </ul>
  <h2>Run this site locally</h2>
  <pre>pip install -r requirements-web.txt
python run_web.py            # http://127.0.0.1:8253</pre>
  <p>The static copy on GitHub Pages is built by <code>scripts/build_static.py</code> and published by
    <code>.github/workflows/pages.yml</code> on every push to main.</p>
  <h2>Licence and citation</h2>
  <p>The manuals are licensed under Creative Commons Attribution 4.0 International (CC BY 4.0, see <code>LICENSE</code>);
    the software tools they describe are subject to their own licences. If the manuals are useful in your research,
    the README asks you to cite the primary research paper:</p>
  <p class="callout a">Bertaccini, G.A., Casanellas, I., Evans, E.L., Nourse, J.L., Dickinson, G.D., <i>et al.</i> (2025).
    Visualizing PIEZO1 localization and activity in hiPSC-derived single cells and organoids with HaloTag technology.
    <i>Nature Communications</i>, 16, 5556.
    <a href="https://doi.org/10.1038/s41467-025-59150-1" target="_blank" rel="noopener">doi:10.1038/s41467-025-59150-1</a></p>
  <p>Software references for each tool are on the <a href="#/page/citation">Citation</a> page; corrections and new
    manuals are welcome (<a href="#/page/contributing">Contributing</a>).</p>`;
});
