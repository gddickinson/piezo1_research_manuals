"""Web manual browser for piezo1_research_manuals (FastAPI app + static front end; see INTERFACE.md).

app.py      routes under /api (info, manuals, manual/<id>, page/<id>) and STATIC_ENDPOINTS for the static export
manuals.py  reads the *_Manual.md files and the README (categories, descriptions, sections, counts)
static/     the front end: ES modules, no build step (md.js renderer, highlight.js, search_engine.js, pages)
"""
