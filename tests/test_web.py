"""Web interface tests: every exported endpoint answers, the static build is complete, and the JS engine tests pass.

Run: python -m pytest -q tests/test_web.py
"""
import shutil
import subprocess
import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from web.app import STATIC, STATIC_ENDPOINTS, app  # noqa: E402

client = TestClient(app)


def test_index_served():
    r = client.get("/")
    assert r.status_code == 200 and "static/main.js" in r.text


@pytest.mark.parametrize("path", STATIC_ENDPOINTS)
def test_endpoint(path):
    r = client.get("/api" + path)
    assert r.status_code == 200, r.text
    assert r.json() is not None


def test_static_build(tmp_path):
    sys.path.insert(0, str(ROOT / "scripts"))
    import build_static
    build_static.build(tmp_path / "site")
    assert (tmp_path / "site" / "index.html").read_text().count("APP_STATIC") == 1
    for path in STATIC_ENDPOINTS:
        assert (tmp_path / "site" / "api" / (path.strip("/") + ".json")).exists()


def test_static_assets_referenced_exist():
    html = (STATIC / "index.html").read_text()
    for name in ("style.css", "main.js"):
        assert f"static/{name}" in html and (STATIC / name).exists()


@pytest.mark.skipif(not shutil.which("node"), reason="node not installed")
def test_js_engine():
    tests = sorted(STATIC.glob("*.test.mjs"))
    for t in tests:
        r = subprocess.run(["node", str(t)], capture_output=True, text=True)
        assert r.returncode == 0, r.stdout + r.stderr


# --- project-specific -----------------------------------------------------------------------------------------------
from web import manuals as M  # noqa: E402


def test_every_manual_listed_in_readme():
    """Each *_Manual.md is in a README category table (so none falls under 'Other'), and every README row exists."""
    files = {p.name for p in M.ROOT.glob("*_Manual.md")}
    index = M.readme_index()
    assert files == set(index), (files ^ set(index))
    assert all(m["category"] != "Other" for m in M.manuals())


def test_manual_endpoint_returns_source():
    r = client.get("/api/manual/flika").json()
    assert r["file"] == "FLIKA_Manual.md" and r["markdown"].startswith("# FLIKA Manual")
    assert client.get("/api/manual/nope").status_code == 404


def test_pages_have_text():
    for pid in ("guide", "versions", "planned", "citation", "contributing"):
        assert len(client.get(f"/api/page/{pid}").json()["markdown"]) > 200, pid


def test_repo_route_serves_only_images():
    assert client.get("/repo/README.md").status_code == 404
    assert client.get("/repo/../web/app.py").status_code == 404


def test_counts_match_files():
    c = client.get("/api/info").json()["counts"]
    assert c["manuals"] == len(list(M.ROOT.glob("*_Manual.md")))
    assert c["lines"] == sum(p.read_text(encoding="utf-8").count("\n") + 1 for p in M.ROOT.glob("*_Manual.md"))
