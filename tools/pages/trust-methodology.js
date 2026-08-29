/**
 * 방법론 — 심층분석 7장의 방법론 스택 4층을 대외용으로 서술
 */
const { NOTICES } = require('../data/site');

module.exports = (entry) => {
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">신뢰와 검증 · 방법론</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);max-width:800px;">새 이론을 발명하지 않습니다.<br><em>검증된 것 위에 서서, 스스로를 검증합니다</em></h1>
      <p class="hero__sub" style="max-width:680px;">전문성을 입증하는 가장 확실한 방법은 검증된 방법론들 위에 서 있음을 보여주고, 블랭크의 고유 데이터로 그것을 보정하는 것이라고 믿습니다. 무엇을 참조했고 무엇을 스스로 검증하는가 — 그 정직한 서술이 이 페이지의 목적입니다.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">방법론 스택</p><h2 class="h1">네 개의 층</h2></div>
      <div class="sp-wrap reveal">
        <table class="table sp-table">
          <thead><tr><th style="width:18%;">층위</th><th>채택 방법론</th><th style="width:30%;">적용 위치</th></tr></thead>
          <tbody>
            <tr><th scope="row">① 가치평가 정합</th><td>감정평가에 관한 규칙과 실무기준이 정의하는 비교·수익·원가 3방식의 용어와 논리 구조, IVS(국제평가기준)의 가치 전제·접근법·보고 원칙을 참조 틀로 채택합니다.</td><td>기준시점·가치 전제 메타데이터, 리포트의 전제 명시</td></tr>
            <tr><th scope="row">② 다기준 의사결정</th><td>전문가 합의(Delphi)와 쌍대비교(AHP, 일관성비율 0.10 이하 목표)로 평가축 가중치의 상대 중요도를 검토하되, 그 결과를 확정치로 쓰지 않고 실증 보정과 병행합니다.</td><td>전 지수의 평가축 가중치 검토, 모델위원회 운영</td></tr>
            <tr><th scope="row">③ 통계·계량 모형</th><td>특성 분해 회귀(임대료), 로지스틱·생존분석(공실 발생과 기간), 분위 기반 정규화와 극단값 처리(왜도 자료)를 사용합니다.</td><td>전문가 진단의 보정, 공통 정규화 함수</td></tr>
            <tr><th scope="row">④ 성능·공정성 지표</th><td>오차율(MAPE·중앙값 APE)과 범위 포함률, 판별력(AUC)·확률 보정(Brier·캘리브레이션), 산포 지표, 평가자 간 편차 분석으로 성적표를 만듭니다.</td><td>검증 로드맵 전 단계, 오차 요약 공시</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tier-grid reveal" style="margin-top:36px;">
        ${[
          ['뼈대', '공인된 기준에서', '접근법의 구조와 용어는 이미 검증된 기준에서 가져옵니다. 발명이 아니라 채택입니다.'],
          ['살', '실행 데이터로', '판단의 기준값은 2015년부터 쌓아 온 직접 실행 데이터로 채우고 보정합니다.'],
          ['성적표', '통계 지표로', '결과의 정확도는 주장 대신 오차·판별력·산포의 숫자로 공개합니다.'],
        ].map(([c, t, d]) => `<div class="tier"><span class="tier__code">${c}</span><b>${t}</b><p>${d}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">용어에 관한 원칙</p><h2 class="h1">참조하는 것과 수행하는 것은 다릅니다</h2></div>
      <div class="notice reveal" style="max-width:820px;"><p><strong>감정평가와의 구분</strong> — 감정평가 기준의 용어와 논리 구조를 "참조"하는 것과 감정평가를 "수행"하는 것은 다릅니다. 모든 문서와 화면에서 이 구분을 유지합니다. ${NOTICES.appraisal}</p></div>
      <p class="lead reveal" style="max-width:760px;">방법론 스택의 대외용 백서는 정리 작업이 끝나는 대로 이 페이지에서 내려받을 수 있게 게시합니다. 학술적 완결성보다, 무엇을 참조했고 무엇을 스스로 검증하는가의 정직한 서술이 목적입니다.</p>
      <div class="btn-row reveal"><a class="btn btn--ghost" href="/trust/model-cards/">지수별 Model Card 보기</a><a class="btn btn--ghost" href="/trust/validation/">검증 현황 보기</a></div>
    </div>
  </section>`;

  return { path: entry.path, title: entry.title, description: entry.desc, body, docMeta: { id: 'BSI-DOC-MT', date: '2026-08' },
    bodyClass: 'page-methodology' };
};
