/**
 * 종합 심층 리포트 (P6) — 전 지수 + 시나리오 + 실행 계획, 제본과 대면 보고
 */
module.exports = (entry) => {
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">종합 심층 리포트 · P6</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);max-width:760px;">한 공간에 대해<br>물을 수 있는 <em>전부</em></h1>
      <p class="hero__sub" style="max-width:640px;">원인과 임대료, 법규와 적합성, 경제성과 실행까지 — 전 지수를 하나의 판정 체계 위에 올리고, 시나리오와 실행 계획으로 마무리하는 최상위 구성입니다. 제본 리포트와 대면 보고가 포함됩니다.</p>
      <div class="btn-row"><a class="btn btn--primary btn--lg" href="/apply/#consult">상담 신청하기</a><a class="btn btn--ghost btn--lg" href="/products/">전체 상품 보기</a></div>
      <div class="dhero__meta"><span>영업일 10일</span><span>제본 리포트 + 대면 보고</span><span>규모·범위 기준 견적</span></div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">이런 결정에</p><h2 class="h1">되돌리기 어려운 결정 앞에서</h2></div>
      <div class="aud-grid">
        ${[
          ['고액 자산의 방향 결정', '매각·보유·전환의 갈림에서 근거 전체가 필요할 때'],
          ['개발·전환 검토', '용도 변경과 공사 투자를 저울에 올릴 때'],
          ['기관·법인의 의사결정', '내부 보고와 심의에 올릴 문서가 필요할 때'],
          ['복수 시나리오 비교', '가능한 길을 전부 펼쳐 놓고 골라야 할 때'],
        ].map(([t, d]) => `<div class="aud reveal"><b>${t}</b><p>${d}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">구성</p><h2 class="h1">무엇이 들어가나</h2></div>
      <ol class="report-toc reveal" style="max-width:720px;">
        ${[
          '판정 요약 — 결론과 근거, 다음 행동',
          '전 지수 통합 결과 — 원인·임대료·법규·적합성',
          '경제성 검증 — 손익분기와 민감도',
          '시나리오 비교 — 조건별 경로와 판정 변화',
          '실행 계획 — 순서·범위·리스크와 통제',
          '부록 — 데이터 출처·신뢰도·한계',
        ].map((p) => `<li>${p}</li>`).join('')}
      </ol>
      <div class="notice reveal" style="margin-top:24px;"><p><strong>현장 결합</strong> — 현장 점검을 결합하면 원격의 확인 불가 항목이 실측으로 확정되어 판정의 신뢰도가 올라갑니다. 결합 여부는 상담에서 함께 정합니다.</p></div>
    </div>
  </section>

  <section class="section section--alt section--tight">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">진행</p><h2 class="h1">상담에서 보고까지</h2></div>
      <ol class="proc-steps reveal">
        ${['상담 — 대상과 목적 확인', '범위·견적 확정', '자료 제출과 평가 수행', '검토와 리포트 제작', '대면 보고와 질의'].map((s, i) => `<li><i class="num">${i + 1}</i>${s}</li>`).join('')}
      </ol>
      <div class="btn-row reveal"><a class="btn btn--primary btn--lg" href="/apply/#consult">상담 신청하기</a></div>
    </div>
  </section>`;

  return { path: entry.path, title: entry.title, description: entry.desc, body, bodyClass: 'page-deep' };
};
