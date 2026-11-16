/**
 * 보정과 교정 — 틀릴 수 있다는 전제로 운영하는 절차
 * 소급 채점 · 예측-실적 대장 · 연 1회 재검토 · 실패가 만든 항목
 */
const D = require('../../public/assets/js/smfi-data.js');

const FAILS = [
  { tag: 'G2', t: '용도 확인을 맨 앞으로', d: '용도변경이 가능하다는 전제로 설계와 견적까지 진행했다가 중단된 경험이 있습니다. 그래서 용도는 점수 항목이 아니라 통과 관문이 되었습니다.' },
  { tag: 'G7', t: '급배수는 같은 층에서 확인', d: '도면상 배수가 있다는 말만 믿고 F&B를 검토했다가, 실제로는 다른 층 배관이라 무산된 적이 있습니다. 지금은 현장에서 위치까지 확인합니다.' },
  { tag: 'A9', t: '위층 용도 구성 확인', d: '위층이 주거인 공간에서 야간 민원이 반복되며 운영 시간을 줄여야 했습니다. 인접 용도 구성이 운영 여건 영역의 지표가 된 배경입니다.' },
  { tag: 'A7', t: '원상복구 조건의 비용화', d: '계약서의 원상복구 범위가 넓어 회수 기간이 예상보다 길어진 사례가 있었습니다. 지금은 계약 조건의 유연성을 별도 지표로 채점합니다.' },
  { tag: 'E', t: '손익분기 가동률의 도입', d: '시나리오 세 개만으로는 “최소 얼마나 돌아가야 하나”에 답할 수 없었습니다. 임대인이 가장 먼저 묻는 질문이어서 필수 산출로 넣었습니다.' },
];

module.exports = (entry) => {
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">신뢰와 검증 · 보정과 교정</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);max-width:820px;">좋은 평가 체계는 완성되는 것이 아니라<br><em>교정되는 것입니다</em></h1>
      <p class="hero__sub" style="max-width:700px;">SMFI 2.1이 이전 버전과 다른 가장 큰 지점은 새 기능이 아니라, 스스로 틀릴 수 있는 자리를 문서로 인정하고 그것을 관리하는 절차를 넣었다는 데 있습니다. 이 페이지는 그 절차를 공개합니다.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">세 가지 절차</p><h2 class="h1">틀릴 수 있다는 전제로 운영합니다</h2></div>
      <div class="tier-grid reveal">
        <div class="tier"><span class="tier__code">01</span><b>소급 채점</b><p>성과를 이미 아는 과거 프로젝트를 착수 전 조건으로 다시 채점해 점수와 실제 성과의 상관을 확인합니다. 표본에는 검토 단계에서 접은 안건과 운영을 종료한 사례를 반드시 포함합니다 — 성공한 것만 넣으면 체계가 아니라 광고가 됩니다.</p></div>
        <div class="tier"><span class="tier__code">02</span><b>예측-실적 대장</b><p>본 평가를 거쳐 개발이 진행된 공간은 개장 후 6개월과 12개월 시점의 실제 성과를 평가 시점의 예측과 대조해 기록합니다. 맞힌 것과 빗나간 것을 같은 대장에 남깁니다.</p></div>
        <div class="tier"><span class="tier__code">03</span><b>연 1회 재검토</b><p>축적된 대조 결과를 근거로 가중치와 판정 경계값(${D.BANDS[0].min}·${D.BANDS[1].min}·${D.BANDS[2].min}), 핵심 영역 최저선(${D.CONST.coreFloor})을 연 1회 재검토하고 변경 이력을 버전으로 관리합니다. 근거 없는 수시 변경은 하지 않습니다.</p></div>
      </div>
      <div class="quote-bar reveal" style="margin-top:30px;"><span class="quote-bar__mark">“</span><p>경계값을 바꾸는 일은 쉽습니다. 어려운 것은 바꾼 이유를 남기는 일입니다.<small>보정 프로토콜 — 변경 이력은 개정 이력에 기록됩니다</small></p></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">지표의 출처</p><h2 class="h1">실패가 만든 항목들</h2>
      <p class="lead">평가 지표 가운데 상당수는 잘된 프로젝트가 아니라 막혔던 프로젝트에서 나왔습니다. 아래는 그중 공개할 수 있는 예입니다 — 각 항목 앞의 코드는 지금 그 경험이 들어가 있는 게이트·영역 번호입니다.</p></div>
      <div class="fail-list reveal">
        ${FAILS.map((f) => `<div class="fail"><span class="fail__tag num">${f.tag}</span><div><b>${f.t}</b><p>${f.d}</p></div></div>`).join('')}
      </div>
      <div class="notice reveal" style="margin-top:26px;"><p>이 목록이 길어질수록 체계는 좋아집니다. 새로 막힌 지점이 생기면 지표로 옮기고, 그 사실을 여기에 더합니다.</p></div>
      <div class="btn-row reveal">
        <a class="btn btn--ghost" href="/trust/validation/">검증 현황 보기</a>
        <a class="btn btn--ghost" href="/trust/revisions/">개정 이력 보기</a>
        <a class="btn btn--primary" href="/index/smfi/check/">예비 진단으로 확인해 보기</a>
      </div>
    </div>
  </section>`;

  return {
    path: entry.path, title: entry.title, description: entry.desc, body,
    bodyClass: 'page-calibration',
    docMeta: { id: 'BSI-DOC-CB', date: '2026-08' },
  };
};
