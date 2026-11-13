// Entry point: lazy page modules, the mode label, a faint drifting-puncta background, then the router.
import { $, app, isStatic, lazy, route, start } from './core.js';

const PAGES = { 'home.js': ['home'], 'manual.js': ['manuals', 'manual'], 'search.js': ['search'], 'page.js': ['page'], 'about.js': ['about'] };
lazy(Object.fromEntries(Object.entries(PAGES).flatMap(([file, names]) => names.map(n => [n, () => import('./' + file)]))));
route('notfound', () => { app().innerHTML = '<h1>Not found</h1><p><a href="#/">Back to the start</a></p>'; });

$('#mode').textContent = isStatic()
  ? 'static site: manuals exported from the repository at build time; search runs in your browser'
  : 'local app: manuals read from this checkout; search runs in your browser';

// Background: a few faint diffusing spots (single-molecule puncta). Off under prefers-reduced-motion.
function background(canvas) {
  if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const g = canvas.getContext('2d'), cols = ['#ff9f1c', '#38e8ff', '#ff4fa0'];
  const fit = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
  fit(); addEventListener('resize', fit);
  const dots = Array.from({ length: 40 }, (_, i) => ({ x: Math.random(), y: Math.random(), c: cols[i % 3], p: Math.random() * 6 }));
  let last = 0;
  const tick = t => {
    requestAnimationFrame(tick);
    if (document.hidden || t - last < 60) return;
    last = t;
    g.clearRect(0, 0, canvas.width, canvas.height);
    for (const d of dots) {
      d.x = (d.x + (Math.random() - 0.5) * 0.002 + 1) % 1; d.y = (d.y + (Math.random() - 0.5) * 0.002 + 1) % 1; d.p += 0.05;
      g.globalAlpha = 0.35 + 0.35 * Math.sin(d.p);
      g.fillStyle = d.c; g.beginPath(); g.arc(d.x * canvas.width, d.y * canvas.height, 2.2, 0, 7); g.fill();
    }
  };
  requestAnimationFrame(tick);
}
background($('#bg'));
start();
