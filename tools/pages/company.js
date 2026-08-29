/**
 * 운영사·신뢰 구조 — 6.7절
 * 평가하는 회사가 실행도 한다는 구조를 숨기지 않고 먼저 말한다.
 */
const { SITE } = require('../data/site');
const { loop } = require('../partials/figures');

module.exports = (entry) => {
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">운영사 · 신뢰 구조</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);max-width:840px;">평가하는 회사가<br>실행도 합니다. <em>그래서 먼저 말합니다</em></h1>
      <p class="hero__sub" style="max-width:700px;">BLANK SPACE INDEX는 주식회사 블랭크가 운영합니다. 2015년부터 '공백'이라는 이름으로 비어 있는 상업 공간을 직접 기획·시공·운영해 왔고, 그 현장의 판단 기준을 평가 체계로 정리한 것이 이 지수들입니다. 평가와 실행이 한 회사에 있다는 구조는 이 체계의 힘이면서 동시에 관리해야 할 위험입니다 — 그래서 통제 장치를 함께 공개합니다.</p>
      <div class="btn-row"><a class="btn btn--ghost" href="${SITE.companySite}" rel="noopener">공백 · vacancy.co.kr 보기</a><a class="btn btn--ghost" href="mailto:${SITE.email}">채용 · 일반 문의</a></div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="grid-2 reveal" style="display:grid;grid-template-columns:minmax(0,6fr) minmax(0,6fr);gap:56px;align-items:center;">
        <div>
          <p class="eyebrow">평가 → 실행 → 데이터</p>
          <h2 class="h1">순환이 이 체계의 뿌리입니다</h2>
          <p class="lead">진단에서 발견한 문제를 개선·시공·운영으로 직접 해결하고, 실행의 결과가 다시 지수의 보정 데이터가 됩니다. 340여 개 공간의 수행 이력이 판단 기준의 원천이며, 거래 데이터만으로는 만들 수 없는 지식이 여기서 나옵니다. 다만 이 실적은 수행 역량의 증거일 뿐, 산식의 예측 정확성을 보증하지는 않습니다 — 그 검증은 별도의 절차로, 공개적으로 진행합니다.</p>
        </div>
        <figure class="layer-figure">${loop()}</figure>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">이해상충 통제</p><h2 class="h1">구조의 위험을 관리하는 다섯 장치</h2>
      <p class="lead">"적합 판정이 공사를 만들어 내는 것 아니냐"는 질문은 정당합니다. 답은 장치로 합니다.</p></div>
      <div class="tile-grid reveal">
        ${[
          ['판정 불변', '판정은 이후 수주 여부와 무관하게 바뀌지 않습니다. 부적합·보류에도 재평가 유인이나 환불 조건이 붙지 않습니다.'],
          ['산출과 해석의 분리', '점수를 산출하는 쪽과 판정을 해석·확정하는 쪽을 나누고, Pro·본 평가는 검토자 서명으로 발행됩니다.'],
          ['판정 분포의 공시', '적합 일변도의 분포는 그 자체가 경고 신호입니다. 분기 내부 집계를 거쳐, 표본 규모가 갖춰지면 대외 공개합니다.'],
          ['근거 열람권', '고객은 자신의 평가가 어떤 근거로 나왔는지 열람할 수 있습니다. 이의 접수와 정정 이력 공개가 이어집니다.'],
        ].map(([t, d]) => `<div class="tile"><h3>${t}</h3><p>${d}</p></div>`).join('')}
        <div class="tile" style="grid-column:1/-1;"><h3>공제의 정의</h3><p>프로젝트 계약 시의 진단비 공제는 판정에 대한 보상이 아니라 요금 제도이며, 이 정의가 약관에 명시됩니다. 진단이 정직해야 실행 의뢰가 온다 — 이것이 저희 사업이 성립하는 순서입니다.</p></div>
      </div>
      <div class="btn-row reveal"><a class="btn btn--ghost" href="/trust/governance/">거버넌스 자세히 보기</a><a class="btn btn--ghost" href="/works/">실행의 기록 보기</a></div>
    </div>
  </section>`;

  return { path: entry.path, title: entry.title, description: entry.desc, body, bodyClass: 'page-company' };
};
