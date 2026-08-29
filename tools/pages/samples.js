/**
 * 샘플 결과지 허브 — 무엇을 받게 되는지, 사기 전에 그대로 보여 준다.
 * 감정평가·신용평가 보고서의 '표준 목차 공개' 관행을 따른 리포트 공통 규격 6요소와,
 * 지수별 샘플로 안내한다. 첫 풀 샘플은 적정임대료 진단(SRVI).
 */
module.exports = (entry) => {
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">샘플 결과지</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);max-width:820px;">사기 전에,<br>받게 될 문서를 그대로 보세요</h1>
      <p class="hero__sub" style="max-width:680px;">모든 결과지는 같은 뼈대 위에서 만들어집니다. 아래 여섯 요소가 그 공통 규격이고, 지수별 샘플에서 실제 지면을 확인하실 수 있습니다. 샘플의 수치는 전부 가상의 예시입니다.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">리포트 공통 규격</p><h2 class="h1">모든 결과지의 여섯 요소</h2></div>
      <div class="tier-grid reveal" style="grid-template-columns:repeat(3,1fr);">
        ${[
          ['01 표지와 발행 정보', '발행 번호, 지수와 버전, 발행일, 기준시점, 문서의 용도(본인 참고 / 제시 가능)가 첫 장에 고정됩니다.'],
          ['02 전제의 명시', '이 결과가 어떤 입력과 가정 위에서 계산되었는지를 결론보다 먼저 적습니다.'],
          ['03 결론과 판정', '범위 또는 판정으로 말하고, 확정형 표현을 쓰지 않습니다. 결론 한 면만 읽어도 방향이 서게 씁니다.'],
          ['04 근거의 전개', '결론이 나온 계산과 사례, 신호를 순서대로 보여 줍니다. 구조는 공개하되 세부 파라미터는 공개하지 않습니다.'],
          ['05 신뢰도와 한계', '신뢰도 C를 점수와 분리해 표기하고, 확인 불가 항목을 숨기지 않고 목록으로 남깁니다.'],
          ['06 다음 단계', '이 문서가 안내하는 다음 행동 — 보강할 자료, 현장에서 확정할 항목, 이어지는 진단.'],
        ].map(([t, d]) => `<div class="tier"><b>${t}</b><p>${d}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">지수별 샘플</p><h2 class="h1">실제 지면 보기</h2></div>
      <div class="next-cards reveal" style="grid-template-columns:repeat(2,1fr);">
        <a class="next-card next-card--em" href="/samples/rent/">
          <span class="chip chip--green">풀 샘플 열람 가능</span>
          <b>적정임대료 진단 · Standard 결과지</b>
          <p>표지부터 다섯 면 전체를 실제 지면 그대로 — 시장 밴드, 유효임대료 환산, 등가 조합, 3가격점 시나리오, 신뢰도와 한계까지. 인쇄(PDF 저장)도 됩니다.</p>
          <span class="index-card__cta">샘플 전체 보기</span>
        </a>
        <div class="next-card" style="cursor:default;">
          <span class="chip chip--muted">지수 상세의 미리보기로 안내</span>
          <b>공실 원인 · 영업 가능성 · 적합성 평가</b>
          <p>세 지수는 각 상세 페이지의 결과 화면 미리보기로 핵심 지면을 확인하실 수 있고, 풀 샘플은 순차적으로 이 자리에 더해집니다.</p>
          <span class="art-card__meta" style="border:0;padding:0;">
            <a href="/index/vacancy/" style="color:var(--teal);font-weight:600;">공실 원인</a>
            <a href="/index/business/" style="color:var(--teal);font-weight:600;">영업 가능성</a>
            <a href="/index/smfi/" style="color:var(--teal);font-weight:600;">적합성 평가</a>
          </span>
        </div>
      </div>
      <div class="notice reveal" style="margin-top:26px;"><p><strong>샘플 표기</strong> — 샘플의 모든 수치·주소·번호는 이해를 돕기 위한 가상의 예시이며, 지면마다 SAMPLE 표시가 함께 인쇄됩니다. 실제 결과지는 입력과 데이터에 따라 구성이 일부 달라질 수 있습니다.</p></div>
    </div>
  </section>`;

  return { path: entry.path, title: entry.title, description: entry.desc, body, bodyClass: 'page-samples' };
};
