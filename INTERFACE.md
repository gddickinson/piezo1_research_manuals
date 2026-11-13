# INTERFACE.md: navigation map for piezo1_research_manuals

The repository is documentation: 30 `*_Manual.md` files at the root, indexed by `README.md` (categories and one-line
descriptions). A small web interface (FastAPI locally, static on GitHub Pages) renders them.

## Content
| File | What it is |
|---|---|
| `*_Manual.md` | One manual per software tool (Micro-Manager, ImageJ/FIJI, FLIKA, ..., Command Line) |
| `README.md` | Overview, category tables (the site's categories/descriptions come from these), reading paths, versions, citations |
| `CONTRIBUTING.md`, `CITATION.cff`, `LICENSE` | Contribution guide, citation metadata, CC BY 4.0 |

## Web interface
| File | Contents |
|---|---|
| `run_web.py` | Starts uvicorn on 127.0.0.1:8253 |
| `web/app.py` | FastAPI routes: `/api/info`, `/api/manuals`, `/api/manual/{id}`, `/api/page/{id}`, `/repo/{image}`; `STATIC_ENDPOINTS` |
| `web/manuals.py` | `manuals()`, `manual_text(id)`, `categories()`, `readme_index()`, `readme_section(title)`, `image_files()`, `manual_id(path)` |
| `web/static/index.html`, `style.css` (shared kit theme), `style_app.css` | Page shell, theme, manual-browser styles |
| `web/static/core.js` | Shared kit: `api()`, hash router (`route`, `lazy`, `start`), helpers |
| `web/static/main.js` | Registers the pages, footer mode text, background canvas |
| `web/static/md.js` | Markdown renderer: `markdown()`, `headings()`, `ghSlug()` (GitHub anchors), `findAnchor()` |
| `web/static/highlight.js` | `highlight(src, lang)`: Python, R, MATLAB, shell, Java/C, VBA |
| `web/static/search_engine.js` | `sections()`, `search()`, `snippet()`, `mark()`, `terms()` |
| `web/static/ui.js` | Link rules for this repo (`linkFor`, `imageFor`, `render`), `scrollToId`, `wireAnchors` |
| `web/static/home.js`, `manual.js`, `search.js`, `page.js`, `about.js` | Pages: `#/`, `#/manuals`, `#/manual/<id>?h=<anchor>`, `#/search?q=`, `#/page/<id>`, `#/about` |
| `web/static/static_api.js` | Answers `api()` from exported JSON on the static site |
| `web/static/search_engine.test.mjs` | Node tests: slugs, renderer, search, every manual's in-page links resolve |
| `scripts/build_static.py` | Exports the static site (default `site/`) |
| `scripts/screenshots.py` | Playwright smoke test / README screenshots (`docs/img/`) |
| `tests/test_web.py` | pytest: endpoints, static build, README/manual consistency, node tests |
| `.github/workflows/pages.yml` | Builds and publishes the static site on push to main |

Data flow: `manuals.py` reads the files -> `app.py` serves JSON -> `md.js` renders in the browser. The static site
is the same front end reading `api/*.json` written by `build_static.py`.
