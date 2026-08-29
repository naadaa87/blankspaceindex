/**
 * 자료실 허브 — 6.8절. 창간 5편으로 시작.
 */
const { ARTICLES } = require('../data/articles');

module.exports = (entry) => {
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">자료실</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);max-width:800px;">공실과 임대와 계약에 대해<br><em>차분하게 쓴 글들</em></h1>
      <p class="hero__sub" style="max-width:680px;">시장 통계의 해설, 진단 현장에서 반복되는 유형, 그리고 저희가 신뢰를 다루는 방식에 대한 기록입니다. 통계 인용에는 발표 기관과 기준시점을 붙이고, 글 중간에 광고를 끼우지 않습니다.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="art-grid">
        ${ARTICLES.map(
          (a) => `<a class="art-card reveal" href="/insights/${a.slug}/">
          <span class="lbl" style="color:var(--teal);">창간 ${a.no}</span>
          <h2 class="h2">${a.title}</h2>
          <p>${a.summary}</p>
          <span class="art-card__meta"><span class="num">${a.date}</span><span>${a.read}</span><span class="index-card__cta">읽기</span></span>
        </a>`
        ).join('\n        ')}
      </div>
      <div class="notice reveal" style="margin-top:26px;"><p><strong>앞으로의 발간</strong> — 반기 공실 리포트(시장 통계와 판정 분포, 익명 사례 해설)와 데이터 갱신 노트가 이 자리에 더해집니다. 발간은 시장 통계의 갱신 주기와 함께 갑니다.</p></div>
    </div>
  </section>`;

  return { path: entry.path, title: entry.title, description: entry.desc, body, bodyClass: 'page-insights' };
};
