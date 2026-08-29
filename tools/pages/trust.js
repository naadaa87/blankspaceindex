/**
 * 신뢰와 검증 허브 — 6.5절
 */
const { BADGES } = require('../data/registry');

module.exports = (entry) => {
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">신뢰와 검증</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,46px);max-width:840px;">접근법의 뼈대는 공인된 기준에서,<br>판단의 살은 실행 데이터로,<br><em>성적표는 통계 지표로</em></h1>
      <p class="hero__sub" style="max-width:680px;">이 세 문장이 BLANK SPACE INDEX가 전문성을 다루는 방식입니다. 이 섹션은 상품 소개와 같은 비중으로 만들어졌습니다 — 무엇을 참조했고, 무엇을 스스로 검증하며, 어떻게 통제되는지를 문서로 공개합니다.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="next-cards" style="grid-template-columns:repeat(2,1fr);">
        ${[
          ['/trust/methodology/', '방법론', '네 층의 방법론 스택 — 무엇을 참조 틀로 삼고, 무엇을 자체 데이터로 보정하는지의 정직한 서술입니다.'],
          ['/trust/model-cards/', 'Model Card', '지수마다 목적·적용 범위·데이터·한계·검증 상태·버전 이력을 한 장 규격으로 공개합니다. 오픈 4종부터.'],
          ['/trust/validation/', '검증 현황', '설계 → 파일럿 → 보정 → 실증 → 모니터링의 로드맵 위에서 각 지수가 지금 어디에 있는지, 그리고 공시가 채워질 자리입니다.'],
          ['/trust/governance/', '거버넌스', '모델위원회, 판정의 이중 확인, 이의와 정정, 표현 통제 — 판정이 흔들리지 않게 하는 장치들입니다.'],
        ].map(([href, t, d]) => `<a class="next-card reveal" href="${href}"><b>${t}</b><p>${d}</p><span class="index-card__cta">보기</span></a>`).join('\n        ')}
      </div>
      <div class="quote-bar reveal" style="margin-top:26px;"><span class="quote-bar__mark">“</span><p>확인하지 못한 것은 확인하지 못했다고 씁니다. 검증 전의 수치는 확정형으로 말하지 않습니다.<small>표현 통제 — 금지 표현 사전 · 발행 자동 검사</small></p></div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">검증 단계 배지</p><h2 class="h1">모든 지수에는 지금의 단계가 붙습니다</h2></div>
      <div class="state-row reveal" style="gap:12px;">
        ${Object.keys(BADGES).map((k) => `<span class="badge badge--${k}">${BADGES[k].label}</span>`).join('')}
      </div>
      <p class="lead reveal" style="max-width:720px;">전문가 설계에서 출발해, 실제 사례로 보정하고, 홀드아웃 검증을 통과하는 순서입니다. 단계는 건너뛰지 않으며, 진행 상태는 <a href="/trust/validation/" style="color:var(--teal);font-weight:600;">검증 현황</a>에 그대로 반영됩니다.</p>
    </div>
  </section>`;

  return { path: entry.path, title: entry.title, description: entry.desc, body, bodyClass: 'page-trust' };
};
