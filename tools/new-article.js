#!/usr/bin/env node
/**
 * 새 글 발행 — 기계가 하는 부분 전부
 *
 *   node tools/new-article.js <글.json>
 *
 * 글 내용(제목·요약·본문)은 사람이 쓰고, 이 스크립트는 아래를 자동으로 한다.
 *   1) tools/data/articles.js 맨 앞에 글 객체 삽입 (최신 글이 자료실 위로)
 *   2) tools/build.js 의 SITEMAP 에 경로 한 줄 추가
 *   3) OG 이미지 생성 (sharp 있을 때)
 *   4) 빌드 + 정적 감사
 *
 * 같은 slug 가 이미 있으면 아무것도 하지 않고 종료한다 (중복 발행 방지).
 *
 * 입력 JSON 규격
 * {
 *   "slug": "vacancy-6months",            // 영문 소문자·하이픈
 *   "title": "...",                        // 제목
 *   "summary": "...",                      // 한 문장 요약 (목록·검색결과·리드에 쓰임)
 *   "section": "공실 진단",
 *   "keywords": ["상가 공실 기간", "..."],
 *   "read": "6분",
 *   "cta": { "href": "/index/vacancy/", "label": "공실 수익화 평가 진단 보기" },
 *   "sources": ["한국부동산원 · 2026년 1분기 ..."],   // 통계 인용 시 필수. 없으면 []
 *   "faqs": [{ "q": "...", "a": "..." }],              // 선택. 답변 엔진 노출용
 *   "body": "<p>...</p>"                                // 본문 HTML (p·b·ul·li만)
 * }
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const file = process.argv[2];
if (!file) { console.error('사용법: node tools/new-article.js <글.json>'); process.exit(1); }

const a = JSON.parse(fs.readFileSync(file, 'utf8'));
for (const k of ['slug', 'title', 'summary', 'section', 'keywords', 'body', 'cta']) {
  if (!a[k]) { console.error(`필수 항목 누락: ${k}`); process.exit(1); }
}
if (!/^[a-z0-9-]+$/.test(a.slug)) { console.error('slug 는 영문 소문자·숫자·하이픈만'); process.exit(1); }

const artPath = path.join(ROOT, 'tools/data/articles.js');
let art = fs.readFileSync(artPath, 'utf8');
if (art.includes(`slug: '${a.slug}'`)) {
  console.log(`이미 발행된 글입니다: ${a.slug} — 중단합니다.`);
  process.exit(0);
}

/* 본문 검사 — 금지 표현과 허용 태그 */
const BANNED = [/업계 최초/, /압도적/, /국내 유일/, /투자 추천/, /수익(을|이)\s*보장(?!하지 않)/, /100%\s*(보장|확실)/];
for (const re of BANNED) {
  if (re.test(a.body) || re.test(a.title) || re.test(a.summary)) {
    console.error(`금지 표현이 있습니다: ${re}`); process.exit(1);
  }
}
const tags = [...a.body.matchAll(/<\/?([a-z0-9]+)/gi)].map((m) => m[1].toLowerCase());
const allowed = new Set(['p', 'b', 'strong', 'em', 'ul', 'ol', 'li', 'br']);
const bad = [...new Set(tags)].filter((t) => !allowed.has(t));
if (bad.length) { console.error(`허용되지 않은 태그: ${bad.join(', ')}`); process.exit(1); }

const plain = a.body.replace(/<[^>]+>/g, '').replace(/\s+/g, '');
if (plain.length < 900) { console.error(`본문이 너무 짧습니다 (${plain.length}자). 1,200자 이상 권장.`); process.exit(1); }

const now = new Date();
const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
const ymd = `${ym}-${String(now.getDate()).padStart(2, '0')}`;

/* 1) articles.js 맨 앞에 삽입 */
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
const obj = `  {
    slug: '${a.slug}',
    keywords: ${JSON.stringify(a.keywords)},
    section: '${a.section}',
    title: ${JSON.stringify(a.title)},
    summary: ${JSON.stringify(a.summary)},
    date: '${ym}',
    published: '${ymd}',
    read: '${a.read || '6분'}',
    cta: { href: '${a.cta.href}', label: ${JSON.stringify(a.cta.label)} },
    sources: ${JSON.stringify(a.sources || [])},${a.faqs && a.faqs.length ? `
    faqs: ${JSON.stringify(a.faqs)},` : ''}
    body: \`
${esc(a.body)}\`,
  },
`;
art = art.replace('const ARTICLES = [\n', 'const ARTICLES = [\n' + obj);
fs.writeFileSync(artPath, art);

/* 2) build.js SITEMAP 에 경로 추가 */
const bPath = path.join(ROOT, 'tools/build.js');
let b = fs.readFileSync(bPath, 'utf8');
if (!b.includes(`/insights/${a.slug}/`)) {
  const anchor = "  { path: '/insights/";
  const i = b.indexOf(anchor);
  const line = `  { path: '/insights/${a.slug}/', title: ${JSON.stringify(a.title)}, desc: ${JSON.stringify(a.summary.slice(0, 165))} },\n`;
  b = b.slice(0, i) + line + b.slice(i);
  fs.writeFileSync(bPath, b);
}

/* 3) 페이지 모듈 */
const modPath = path.join(ROOT, `tools/pages/insights-${a.slug}.js`);
if (!fs.existsSync(modPath)) {
  fs.writeFileSync(modPath, `module.exports = (entry) => require('../partials/article')(entry, '${a.slug}');\n`);
}

/* 4) OG 이미지 */
try { execSync('node tools/og-articles.js', { cwd: ROOT, stdio: 'pipe' }); console.log('OG 이미지 생성'); }
catch (e) { console.log('OG 이미지 생성 건너뜀 (sharp 미설치) — 기본 이미지를 사용합니다.'); }

/* 5) 빌드 + 감사 */
console.log(execSync('node tools/build.js', { cwd: ROOT }).toString().trim());
console.log(execSync('node tools/audit.js', { cwd: ROOT }).toString().trim());
console.log(`\n발행 준비 완료 — /insights/${a.slug}/  (본문 ${plain.length}자)`);
