/**
 * 법적 문서 공통 렌더러 — 상단 버전·시행일, 초안 배지 (6.11절)
 */
module.exports = function legal(entry, { title, sections, note }) {
  const body = `
  <section class="dhero" style="padding-bottom:44px;">
    <div class="container" style="max-width:860px;">
      <p class="eyebrow">약관과 고지</p>
      <h1 class="h1" style="font-size:clamp(26px,3vw,36px);">${title}</h1>
      <p class="legal__meta"><span class="chip chip--muted">초안 v0.9</span><span>시행일 — 법률 검토 완료 후 정식 오픈일에 확정 게시</span></p>
    </div>
  </section>
  <section class="section section--alt" style="padding-top:56px;">
    <div class="container legal" style="max-width:860px;">
      ${sections.map(([h, ...ps], i) => `<section class="legal__sec"><h2>제${i + 1}조 ${h}</h2>${ps.map((p) => `<p>${p}</p>`).join('')}</section>`).join('')}
      ${note ? `<div class="notice" style="margin-top:36px;"><p>${note}</p></div>` : ''}
    </div>
  </section>`;
  const ids = { '이용약관':'BSI-LEG-TM', '개인정보처리방침':'BSI-LEG-PV', '취소·환불 규정':'BSI-LEG-RF', '면책·용도 제한 고지':'BSI-LEG-NT' };
  return { path: entry.path, title: `${title}`, description: entry.desc, body, bodyClass: 'page-legal', docMeta: { id: ids[title] || 'BSI-LEG', date: '2026-08' } };
};
