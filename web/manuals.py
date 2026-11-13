"""Read the manuals and the README: which manuals exist, their README category and one-line description, and counts.

Everything comes from the repository's own files: `*_Manual.md` at the root, and the README's "### <category>" headings
followed by tables whose rows link a manual (`**[Name](File.md)** | description`).
"""
import re
from functools import lru_cache
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IMAGE_EXT = {".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"}
ROW = re.compile(r"^\|\s*\*\*\[([^\]]+)\]\(([^)]+\.md)\)\*\*\s*\|\s*(.*?)\s*\|\s*$")


def manual_id(path: Path) -> str:
    """URL id of a manual: file stem without '_Manual', lower case (FLIKA_Manual.md -> flika)."""
    return path.stem.removesuffix("_Manual").lower()


def readme() -> str:
    return (ROOT / "README.md").read_text(encoding="utf-8")


def readme_index() -> dict:
    """{file name: (category, display name, description)} from the README tables, in README order."""
    out, category = {}, None
    for line in readme().splitlines():
        if line.startswith("### "):
            category = line[4:].strip()
        m = ROW.match(line)
        if m and category:
            out[m.group(2)] = (category, m.group(1), m.group(3))
    return out


def readme_section(title: str) -> str:
    """The README text under '## <title>' up to the next '## ' heading."""
    text = readme()
    m = re.search(rf"^## {re.escape(title)}\s*$(.*?)(?=^## |\Z)", text, re.M | re.S)
    return m.group(1).strip().rstrip("-").strip() if m else ""


def _title(text: str, fallback: str) -> str:
    m = re.search(r"^# (.+)$", text, re.M)
    return m.group(1).strip() if m else fallback


@lru_cache(maxsize=1)
def manuals() -> list:
    """All manuals, ordered by README category then README row order; unlisted manuals last under 'Other'."""
    index = readme_index()
    order = {name: i for i, name in enumerate(index)}
    rows = []
    for path in sorted(ROOT.glob("*_Manual.md")):
        text = path.read_text(encoding="utf-8")
        category, name, desc = index.get(path.name, ("Other", path.stem.replace("_", " "), ""))
        code_blocks = len(re.findall(r"^\s*```\w", text, re.M))
        rows.append({
            "id": manual_id(path), "file": path.name, "name": name, "title": _title(text, name),
            "category": category, "description": desc, "lines": text.count("\n") + 1,
            "words": len(re.findall(r"\S+", text)), "sections": len(re.findall(r"^## ", text, re.M)),
            "code_blocks": code_blocks,
        })
    rows.sort(key=lambda r: order.get(r["file"], len(order)))
    return rows


def manual_text(mid: str) -> str | None:
    for m in manuals():
        if m["id"] == mid:
            return (ROOT / m["file"]).read_text(encoding="utf-8")
    return None


def categories() -> list:
    """[{name, manuals: [ids]}] in README order."""
    out = {}
    for m in manuals():
        out.setdefault(m["category"], []).append(m["id"])
    return [{"name": k, "manuals": v} for k, v in out.items()]


def image_files() -> list:
    """Images committed in the repository (relative paths), served for Markdown image links."""
    return sorted(str(p.relative_to(ROOT)) for p in ROOT.rglob("*")
                  if p.suffix.lower() in IMAGE_EXT and ".git" not in p.parts and "site" not in p.parts
                  and "docs" not in p.parts and "web" not in p.parts)
