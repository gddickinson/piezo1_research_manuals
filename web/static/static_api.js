// Static-site data layer: answers api() calls from the JSON files scripts/build_static.py exported
// (api/info.json, api/manuals.json, api/manual/<id>.json, api/page/<id>.json). Search runs in the browser either way.
const files = new Map();
export async function staticApi(path) {
  const rel = path.split('?')[0].replace(/^\/+/, '');
  if (!files.has(rel)) files.set(rel, fetch('api/' + rel + '.json').then(r => { if (!r.ok) throw new Error(`${r.status} ${rel}`); return r.json(); }));
  return files.get(rel);
}
