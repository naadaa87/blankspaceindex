/**
 * 자료실 글별 OG 이미지 생성기 — sharp 필요(선택 도구).
 * 산출물(public/assets/img/og/*.png)은 저장소에 커밋되므로,
 * 새 글을 추가할 때만 로컬에서 실행하면 된다: node tools/og-articles.js
 */
const fs = require('fs');
const path = require('path');
const { ARTICLES } = require('./data/articles');
let sharp;
try { sharp = require('sharp'); } catch { sharp = require('/home/claude/.npm-global/lib/node_modules/sharp'); }

const esc = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const wrap = (t, n) => { // 단순 2줄 래핑
  if (t.length <= n) return [t];
  let cut = t.lastIndexOf(' ', n); if (cut < n * 0.5) cut = n;
  return [t.slice(0, cut), t.slice(cut).trim()];
};

(async () => {
  const out = path.join(__dirname, '..', 'public', 'assets', 'img', 'og');
  fs.mkdirSync(out, { recursive: true });
  for (const a of ARTICLES) {
    const lines = wrap(a.title, 15);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="#F7F8F6"/>
<rect width="1200" height="8" fill="#0F6B63"/>
<rect x="72" y="84" width="44" height="44" rx="11" fill="#0F6B63"/>
<path d="M83 96c0-1.3 1-2.3 2.3-2.3h17.4c1.3 0 2.3 1 2.3 2.3v24.5l-11-7.4-11 7.4V96Z" fill="#fff"/>
<text x="132" y="104" font-family="Archivo,Arial" font-size="20" font-weight="700" letter-spacing="3" fill="#1D2327">BLANK SPACE INDEX</text>
<text x="132" y="126" font-family="Pretendard,'Apple SD Gothic Neo',sans-serif" font-size="14" fill="#64707A">자료실 · 창간 ${a.no}</text>
${lines.map((L,i)=>`<text x="72" y="${300+i*84}" font-family="Pretendard,'Apple SD Gothic Neo',sans-serif" font-size="62" font-weight="700" letter-spacing="-1.5" fill="#1D2327">${esc(L)}</text>`).join('')}
<text x="72" y="${300+lines.length*84+8}" font-family="Pretendard,'Apple SD Gothic Neo',sans-serif" font-size="22" fill="#64707A">${esc(a.summary.slice(0,44))}…</text>
<rect x="72" y="522" width="1056" height="1.5" fill="#E4E8EA"/>
<text x="72" y="566" font-family="Archivo,Arial" font-size="16" font-weight="600" letter-spacing="2" fill="#A9B1B7">INDEX.VACANCY.CO.KR</text>
<text x="1128" y="566" font-family="Pretendard,sans-serif" font-size="16" fill="#64707A" text-anchor="end">읽는 시간 ${a.read}</text>
</svg>`;
    await sharp(Buffer.from(svg)).png().toFile(path.join(out, a.slug + '.png'));
    console.log('og:', a.slug);
  }
})();
