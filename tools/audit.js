#!/usr/bin/env node
/**
 * 사이트 감사 — 커밋·배포 전 게이트
 * 사용: npm run audit  (빌드 후 public/ 산출물을 전수 검사)
 * 검사: 금지 표현 사전 · 성과 각주 동반 · 메타(title 중복/description 길이/canonical)
 *      · 구조(h1=1, id 중복, img alt) · 문서 내/간 앵커 · JSON-LD 파싱
 *      · 내부 링크 실존 · 필수 자산 · localhost 잔존
 * 결과: 이슈 0이면 종료코드 0, 아니면 1 (CI·훅에 그대로 연결 가능)
 */
const fs = require('fs');

const ROOT = 'public';
const FORBIDDEN = [/업계 최초/, /압도적/, /국내 유일/, /투자 추천/, /금융기관 제출 가능/, /공실확률/, /100%\s*(보장|확실)/, /수익(을|이)\s*보장(?!하지 않)/];
const MUST_ASSETS = [
  'assets/css/style.css', 'assets/js/main.js', 'assets/js/check.js',
  'assets/img/og-default.png', 'assets/img/favicon.svg', 'assets/img/apple-touch-icon.png',
  'sitemap.xml', 'robots.txt', '_headers',
];

const issues = [];
const pages = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = d + '/' + f;
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f === 'index.html' || f === '404.html') pages.push(p);
  }
})(ROOT);

const titles = {};
for (const p of pages) {
  const h = fs.readFileSync(p, 'utf8');
  const rel = p.replace(ROOT, '');

  for (const re of FORBIDDEN) if (re.test(h)) issues.push(['금지표현', rel, String(re)]);
  if (/3\.4\s*~\s*5\.8/.test(h) && !h.includes('공실 당시 기대 임대료 대비')) issues.push(['각주', rel, '성과 수치에 각주 없음']);

  const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  if (!t) issues.push(['메타', rel, 'title 없음']);
  if (titles[t]) issues.push(['메타', rel, 'title 중복: ' + t]);
  titles[t] = rel;
  const d = (h.match(/name="description" content="([^"]*)"/) || [])[1] || '';
  if (d.length < 40 || d.length > 170) issues.push(['메타', rel, 'description 길이 ' + d.length]);
  if (!h.includes('rel="canonical"')) issues.push(['메타', rel, 'canonical 없음']);

  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) issues.push(['구조', rel, 'h1 개수 ' + h1]);
  for (const m of h.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(m[0])) issues.push(['a11y', rel, 'img alt 누락']);
  const ids = {};
  for (const m of h.matchAll(/\bid="([^"]+)"/g)) {
    if (ids[m[1]]) issues.push(['구조', rel, 'id 중복: ' + m[1]]);
    ids[m[1]] = 1;
  }
  for (const m of h.matchAll(/href="#([^"]+)"/g)) if (!ids[m[1]]) issues.push(['앵커', rel, '#' + m[1] + ' (문서 내)']);
  for (const m of h.matchAll(/href="(\/[^"#]*)#([^"]+)"/g)) {
    const tf = ROOT + m[1] + (m[1].endsWith('/') ? 'index.html' : '');
    if (fs.existsSync(tf) && !new RegExp('id="' + m[2] + '"').test(fs.readFileSync(tf, 'utf8')))
      issues.push(['앵커', rel, m[1] + '#' + m[2]]);
  }
  for (const m of h.matchAll(/href="(\/[^"#]+?)\/?"/g)) {
    const x = m[1];
    if (x.startsWith('/assets') || x === '/favicon.ico') continue;
    const tf = ROOT + x + (/\.(xml|txt|png|svg|ico)$/.test(x) ? '' : '/index.html');
    if (!fs.existsSync(tf)) issues.push(['링크', rel, x]);
  }
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { issues.push(['LD', rel, 'JSON-LD 파싱 실패']); }
  }
  if (h.includes('localhost')) issues.push(['환경', rel, 'localhost 잔존']);
}
for (const a of MUST_ASSETS) if (!fs.existsSync(ROOT + '/' + a)) issues.push(['자산', '-', a + ' 없음']);

if (!issues.length) {
  console.log(`✅ 감사 통과 — ${pages.length}면, 이슈 0`);
  process.exit(0);
}
console.log(`❌ 이슈 ${issues.length}건 / ${pages.length}면`);
const g = {};
issues.forEach(([c, p, m]) => (g[c] = g[c] || []).push(p + ' — ' + m));
for (const c in g) {
  console.log('\n[' + c + ']');
  [...new Set(g[c])].slice(0, 15).forEach((x) => console.log('  ' + x));
  if (g[c].length > 15) console.log('  … 외 ' + (g[c].length - 15));
}
process.exit(1);
