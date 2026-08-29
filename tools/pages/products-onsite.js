/**
 * 현장 점검 (P5) — 제작지시서 7.4절 · 상품화전략서 점검원 체계
 * 오픈 시점은 사전 신청 접수로 시작한다.
 */
const { NOTICES, ONSITE_ONLY } = require('../data/site');

module.exports = (entry) => {
  const body = `
  <section class="dhero">
    <div class="container">
      <div class="dhero__grid">
        <div>
          <p class="eyebrow">현장 점검 · P5 — 사전 신청 접수 중</p>
          <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);">원격이 못 본 것을,<br><em>가서 확정합니다</em></h1>
          <p class="hero__sub">리포트에 확인 불가로 남은 항목은 결국 현장에서 끝납니다. 일곱 개 영역, 약 100개 항목을 실측하고 사진으로 남겨 — 추정을 확정으로 바꿉니다.</p>
          <div class="btn-row">
            <a class="btn btn--primary btn--lg" href="/apply/#onsite">사전 신청하기</a>
            <a class="btn btn--ghost btn--lg" href="/check/">3분 무료 진단부터</a>
          </div>
          <div class="dhero__meta"><span>방문 후 영업일 5일 발행</span><span>사진 증빙 리포트</span><span>육안·비파괴 측정 범위</span></div>
        </div>
        <figure class="hero__photo" style="width:100%;aspect-ratio:16/11;max-height:460px;"><img src="/assets/img/photos/onsite.webp" alt="비어 있는 상가 내부에서 상태를 확인하는 두 점검원" width="1200" height="941"></figure>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">무엇을 보나</p><h2 class="h1">일곱 개 영역 · 약 100개 항목</h2></div>
      <div class="area-grid reveal">
        ${[
          ['구조 · 마감', '균열·누수·결로 흔적, 마감 상태'],
          ['설비', '전기 용량, 급배수, 배기 경로'],
          ['소방 · 피난', '출입구·피난 동선, 완비 여건'],
          ['법규 현장 대조', '대장과 현장의 불일치, 무단 증축'],
          ['면적 · 형상', '실측 면적, 천장고, 기둥·단차'],
          ['노출 · 진입', '가시성·정면성, 간판 여건, 진입 동선'],
          ['주차 · 주변', '주차 실태, 주변 공실과 유동'],
        ]
          .map(([t, d], i) => `<div class="area"><i class="num">${String(i + 1).padStart(2, '0')}</i><b>${t}</b><p>${d}</p></div>`)
          .join('')}
      </div>
      <div class="notice reveal" style="margin-top:24px;"><p><strong>업무 범위</strong> — ${NOTICES.onsite}</p></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">진행 순서</p><h2 class="h1">신청부터 발행까지 여섯 단계</h2></div>
      <ol class="proc-steps proc-steps--six reveal">
        ${[
          ['신청', '대상 공간, 점검 범위(점포/층/건물), 목표 업종, 희망일 2~3개, 출입 조건'],
          ['확정', '범위·규모 기준 견적 확인 → 결제(또는 입금) → 점검원 배정과 일정 확정'],
          ['동의·준비', '출입 동의서 전자 서명(점유 임차인 별도 동의), 사전 준비 목록 안내'],
          ['방문', '점검원이 현장에서 7개 영역 약 100항목을 기록·촬영'],
          ['발행', '방문 후 영업일 5일 내 — 등급표·사진 증빙·즉시 조치 항목·비용 구간(견적 아님)'],
          ['후속', '지적 사항 해결 상담 · 관련 지수 재계산(현장 값 반영으로 신뢰도 상승)'],
        ]
          .map(([t, d], i) => `<li><i class="num">${i + 1}</i><b style="display:block;margin-bottom:4px;">${t}</b>${d}</li>`)
          .join('')}
      </ol>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="grid-2" style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
        <div class="tile reveal">
          <h3>점검하는 사람의 기준</h3>
          <p>내부 교육과 동행 점검, 시험을 통과한 <b>인증 점검원</b>이 기본 점검을 수행하고, 30건 이상의 이력과 편차 관리 기준을 충족한 <b>선임 점검원</b>이 상태 등급 판정과 비용 구간 산정을 맡습니다. 점검원 간 판정 편차는 기준으로 관리됩니다.</p>
        </div>
        <div class="tile reveal">
          <h3>수행 권역과 출입 동의</h3>
          <p>오픈 초기에는 수도권부터 순차적으로 권역을 넓혀 갑니다. 임차인이 사용 중인 공간은 점유자의 출입 동의가 필요하며, 동의 절차는 신청 과정에서 안내드립니다. 동의가 어려우면 외부 확인 가능 범위로 조정할 수 있습니다.</p>
        </div>
      </div>
      <div class="faq-mini reveal" style="margin-top:40px;">
        <details><summary>현장 점검에서는 무엇을 보나요?</summary><p>일곱 개 영역, 약 100개 항목을 육안과 비파괴 측정 범위에서 확인하고 사진 증빙과 함께 리포트로 드립니다. 벽 속 배관 같은 은폐부나 구조 안전 진단은 별도의 전문 영역이라, 필요하면 해당 기관 검토를 안내해 드립니다.</p></details>
        <details><summary>임차인이 쓰고 있는 공간인데 가능한가요?</summary><p>점유하고 계신 분의 출입 동의가 필요합니다. 동의 절차는 신청 과정에서 저희가 안내드리고, 동의가 어려우면 외부에서 확인 가능한 범위로 조정할 수 있습니다.</p></details>
        <details><summary>수도권 밖인데 방문이 되나요?</summary><p>오픈 초기에는 수행 권역을 순차적으로 넓혀 갑니다. 사전 신청을 남겨 주시면 일정이 열리는 대로 협의드립니다.</p></details>
      </div>
    </div>
  </section>

  <section class="section final-cta section--tight">
    <div class="container">
      <div class="section-head section-head--center reveal">
        <h2 class="h1">확인 필요를 확정으로</h2>
        <p class="lead">사전 신청을 남겨 주시면 권역·일정이 열리는 대로 순서대로 연락드립니다.</p>
        <div class="btn-row"><a class="btn btn--primary btn--lg" href="/apply/#onsite">현장 점검 사전 신청</a></div>
      </div>
    </div>
  </section>`;

  return { path: entry.path, title: entry.title, description: entry.desc, body, bodyClass: 'page-onsite' };
};
