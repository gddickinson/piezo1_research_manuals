// Small dependency-free syntax highlighter for the languages in the code blocks (Python, R, MATLAB/Octave, shell,
// Java/C/Groovy/JS, VBA, TOML/CSV fall back to plain). Returns one HTML string per source line so callers can number
// lines. Tokens: s string, c comment, n number, k keyword, b built-in, f function/def name.
import { esc } from './core.js';

const words = s => new Set(s.split(/\s+/).filter(Boolean));
const C_KW = 'abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static super switch synchronized this throw throws try void volatile while true false null var let function def struct include define typedef unsigned sizeof';

export const LANGS = {
  python: { line: '#', tq: true, kw: 'False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield',
    bi: 'print len range enumerate zip list dict set tuple int float str bool open min max sum abs round sorted map filter isinstance super np pd plt self', def: 'def class' },
  r: { line: '#', kw: 'if else repeat while function for in next break return TRUE FALSE NULL Inf NaN NA NA_integer_ NA_real_ NA_character_',
    bi: 'c list library require data.frame matrix vector length sum mean median sd var print cat paste paste0 seq rep apply sapply lapply tapply mapply nrow ncol head tail summary str names factor levels subset with plot lines points hist boxplot read.csv read.table write.csv ggplot aes t.test lm anova log exp sqrt abs round unique which is.na table setwd getwd source rnorm runif set.seed' },
  matlab: { line: '%', block: ['%{', '%}'], mq: true, kw: 'function end if elseif else for while switch case otherwise return break continue try catch global persistent parfor classdef properties methods',
    bi: 'zeros ones size length numel disp fprintf sprintf plot figure hold xlabel ylabel title legend subplot mean std sum max min abs sqrt exp log find sort rand randn linspace floor ceil round mod isempty cell struct fieldnames num2str str2num imread imshow imagesc load save' },
  bash: { line: '#', kw: 'if then else elif fi for do done while until case esac function in select return export local',
    bi: 'echo cd ls cp mv rm mkdir pwd cat grep sed awk find chmod sudo conda pip python git source' },
  c: { line: '//', block: ['/*', '*/'], kw: C_KW, bi: 'System String Math println printf', def: 'class' },
  vba: { line: "'", kw: 'Sub End Function Dim As If Then Else ElseIf For To Next Each In Do Loop While Wend Set Call Exit Private Public Const With Select Case Integer Long Double String Boolean Variant Range Worksheet True False Nothing And Or Not ReDim Step',
    bi: 'Cells Range Worksheets Sheets MsgBox Application ActiveSheet Debug', def: 'Sub Function' },
};
const ALIAS = { py: 'python', python3: 'python', ipython: 'python', sh: 'bash', shell: 'bash', zsh: 'bash', console: 'bash',
  powershell: 'bash', bat: 'bash', toml: 'bash', octave: 'matlab', m: 'matlab', java: 'c', groovy: 'c', js: 'c',
  javascript: 'c', cpp: 'c', 'c++': 'c', beanshell: 'c', vb: 'vba', vbnet: 'vba', rscript: 'r', R: 'r' };

export const langOf = name => { const k = String(name || '').trim(); return LANGS[k.toLowerCase()] ? k.toLowerCase() : ALIAS[k] || ALIAS[k.toLowerCase()] || null; };

const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const compiled = {};
function compile(name) {
  if (compiled[name]) return compiled[name];
  const L = LANGS[name], parts = [];
  if (L.block) parts.push(`${reEsc(L.block[0])}[\\s\\S]*?(?:${reEsc(L.block[1])}|$)`);
  parts.push(`${reEsc(L.line)}[^\\n]*`);
  const comment = `(${parts.join('|')})`;
  const strs = [];
  if (L.tq) strs.push(`"""[\\s\\S]*?(?:"""|$)`, `'''[\\s\\S]*?(?:'''|$)`);
  strs.push(`"(?:\\\\.|[^"\\\\\\n])*"?`);
  // MATLAB: a quote after an identifier, bracket or another quote is the transpose operator, not a string.
  if (L.mq) strs.push(`(?<![\\w)\\]}'.])'[^'\\n]*'?`);
  else if (name !== 'vba') strs.push(`'(?:\\\\.|[^'\\\\\\n])*'?`);
  const string = `(${strs.join('|')})`;
  const rx = new RegExp(`${name === 'python' || name === 'r' ? string + '|' + comment : comment + '|' + string}|(\\b\\d[\\d_]*\\.?\\d*(?:[eE][+-]?\\d+)?[jiL]?\\b|\\.\\d+\\b)|([A-Za-z_][\\w.]*)`, 'g');
  const strFirst = name === 'python' || name === 'r';
  return (compiled[name] = { rx, strFirst, kw: words(L.kw), bi: words(L.bi || ''), def: words(L.def || '') });
}

export function highlight(src, lang) {
  const name = langOf(lang);
  if (!name) return src.split('\n').map(esc);
  const { rx, strFirst, kw, bi, def } = compile(name);
  const toks = [];
  let last = 0, m, prevDef = false;
  rx.lastIndex = 0;
  while ((m = rx.exec(src))) {
    if (!m[0]) { rx.lastIndex++; continue; }
    if (m.index > last) toks.push(['', src.slice(last, m.index)]);
    const isStr = strFirst ? m[1] : m[2], isCom = strFirst ? m[2] : m[1];
    let cls = '';
    if (isCom) cls = 'c'; else if (isStr) cls = 's'; else if (m[3]) cls = 'n';
    else if (m[4]) cls = prevDef ? 'f' : kw.has(m[4]) ? 'k' : bi.has(m[4]) ? 'b' : '';
    if (m[4]) prevDef = def.has(m[4]) && kw.has(m[4]);
    toks.push([cls, m[0]]);
    last = rx.lastIndex;
  }
  if (last < src.length) toks.push(['', src.slice(last)]);
  const lines = [''];
  for (const [cls, text] of toks) {
    text.split('\n').forEach((part, i) => {
      if (i) lines.push('');
      if (part) lines[lines.length - 1] += cls ? `<span class="tk-${cls}">${esc(part)}</span>` : esc(part);
    });
  }
  return lines;
}
