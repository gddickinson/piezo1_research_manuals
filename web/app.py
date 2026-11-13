"""FastAPI web app for the PIEZO1 research manuals: serves the manual browser in static/ and the JSON API under /api.

Run with `python run_web.py` (http://127.0.0.1:8253, local only). `scripts/build_static.py` exports every path in
STATIC_ENDPOINTS to JSON for the GitHub Pages site, so keep that list in step with the GET routes below.
"""
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from web import manuals as M

STATIC = Path(__file__).resolve().parent / "static"

app = FastAPI(title="PIEZO1 Research Manuals")
app.mount("/static", StaticFiles(directory=STATIC), name="static")

# README / repository texts offered as pages: id -> (title, source)
PAGES = {
    "guide": ("How to use these manuals", "readme:How to Use These Manuals"),
    "versions": ("Software versions", "readme:Software Versions"),
    "planned": ("Future updates", "readme:Future Updates"),
    "citation": ("Citation", "readme:Citation"),
    "contributing": ("Contributing", "file:CONTRIBUTING.md"),
}


@app.get("/", include_in_schema=False)
def index():
    return FileResponse(STATIC / "index.html")


@app.get("/api/info")
def info():
    """Summary for the home page: README overview, counts and the categories."""
    ms = M.manuals()
    return {
        "title": "Bioimaging and Analysis Software Manuals",
        "overview": M.readme_section("Overview"),
        "research": M.readme_section("The Research"),
        "counts": {
            "manuals": len(ms), "categories": len(M.categories()),
            "lines": sum(m["lines"] for m in ms), "words": sum(m["words"] for m in ms),
            "code_blocks": sum(m["code_blocks"] for m in ms), "images": len(M.image_files()),
        },
        "categories": M.categories(),
        "licence": "CC BY 4.0",
    }


@app.get("/api/manuals")
def manuals():
    """Every manual with its README category and description, and the category order."""
    return {"manuals": M.manuals(), "categories": M.categories(), "images": M.image_files()}


@app.get("/api/manual/{mid}")
def manual(mid: str):
    """One manual's Markdown source and metadata."""
    text = M.manual_text(mid)
    if text is None:
        raise HTTPException(404, f"no manual {mid!r}")
    meta = next(m for m in M.manuals() if m["id"] == mid)
    return {**meta, "markdown": text}


@app.get("/api/page/{pid}")
def page(pid: str):
    """A README section or repository document as Markdown."""
    if pid not in PAGES:
        raise HTTPException(404, f"no page {pid!r}")
    title, src = PAGES[pid]
    kind, ref = src.split(":", 1)
    text = M.readme_section(ref) if kind == "readme" else (M.ROOT / ref).read_text(encoding="utf-8")
    return {"id": pid, "title": title, "markdown": text}


@app.get("/repo/{path:path}", include_in_schema=False)
def repo_image(path: str):
    """Images committed in the repository, for Markdown image links (only files listed by image_files)."""
    if path not in M.image_files():
        raise HTTPException(404, "not an image in this repository")
    return FileResponse(M.ROOT / path)


# GET paths (without the /api prefix) written to the static site as api/<path>.json.
STATIC_ENDPOINTS = ["/info", "/manuals"] + [f"/manual/{m['id']}" for m in M.manuals()] + [f"/page/{p}" for p in PAGES]
