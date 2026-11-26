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


  <!-- SMFI 본 평가 리포트 규격 -->
  <section class="section section--alt" id="smfi-report">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">본 평가 리포트 규격</p><h2 class="h1">공간수익화 적합성 평가 — 14개 항목</h2>
      <p class="lead">본 평가(SMFI)의 리포트는 아래 열네 항목으로 고정됩니다. 첫 장만 읽어도 결론이 서도록 쓰고, 마지막 장까지 읽으면 그 결론이 어떻게 나왔는지 전부 재현할 수 있게 씁니다.</p></div>
      <div class="sp-wrap reveal">
        <table class="table sp-table">
          <thead><tr><th style="width:8%;">No</th><th style="width:26%;">항목</th><th>담기는 내용</th></tr></thead>
          <tbody>
            ${[
              ['판정 요약', '종합점수와 신뢰도 병기, 판정 밴드, 핵심 영역 최저선 저촉 여부, 다음 행동'],
              ['평가 개요', '대상 개요, 조사 기준일, 유효기간, 평가 범위와 방법'],
              ['자료 목록과 증거등급', '사용한 자료 전체와 A·B·C·D 등급 부여 내역'],
              ['하드게이트 결과', '12개 게이트 판정, 조건게이트별 해소 조건·개략 비용·기간'],
              ['공통 기반 평가', '10개 영역 점수와 근거, 핵심 영역 최저선 표시'],
              ['모델 적합도 순위', '14개 모델 종합점수 순위와 산출 내역'],
              ['상위 모델 상세', '상위 3개 모델의 강점·약점·요구 조건'],
              ['하이브리드 검토', '시간대·구역을 나눈 결합 운영의 성립 여부'],
              ['경제성 — 시나리오', '보수·기준·낙관 3개 시나리오 수지표와 가정의 출처'],
              ['경제성 — 손익분기·민감도', '손익분기 가동률, 회수 기간, 핵심 변수 민감도'],
              ['리스크와 대응', '잔여 리스크 목록과 완화 방안, 감점항 내역'],
              ['판정과 다음 행동', '근거·숫자·다음 행동을 갖춘 판정문과 단계별 실행 권고'],
              ['채점표 전문', '57개 지표 채점표와 가중치, 신뢰도 산출 내역 전부'],
              ['출처·고지', '데이터 출처와 기준 시점, 표준 고지 문구'],
            ].map(([t, d], i) => `<tr><th scope="row" class="num">${String(i + 1).padStart(2, '0')}</th><td><b>${t}</b></td><td>${d}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- 판정문 규칙 -->
  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">판정문 규칙</p><h2 class="h1">진단명이 아니라 처방전을 씁니다</h2>
      <p class="lead">리포트의 모든 판정 문장은 세 가지를 갖춰야 합니다 — <b>무엇을 근거로, 얼마나, 그래서 무엇을 할 것인지.</b> 셋 중 하나라도 빠진 문장은 내부 검수에서 반려됩니다.</p></div>
      <div class="duo-grid reveal">
        <div class="duo duo--no"><span class="lbl">반려되는 문장</span>
          <p class="duo__q">“주차 여건이 미흡하여 접근성 개선이 필요함”</p>
          <p>근거도 숫자도 다음 행동도 없습니다. 읽고 나서 할 수 있는 일이 없습니다.</p></div>
        <div class="duo duo--yes"><span class="lbl">통과하는 문장</span>
          <p class="duo__q">“주차 지표 2/5점(현장 실측, 반경 200m 내 공영주차장 34면). 주말 피크 만차율이 높아 예약형 모델의 취소 리스크 요인. 다음 행동 — 인근 민영주차장 2곳과 월 계약 견적을 확인하고, 주차 안내를 예약 확정 문자에 포함.”</p>
          <p>근거(실측)와 숫자(2/5점·34면)와 다음 행동(견적 확인·문자 포함)이 모두 있습니다.</p></div>
      </div>
      <div class="btn-row reveal"><a class="btn btn--primary" href="/index/smfi/check/">예비 진단으로 먼저 계산해 보기</a><a class="btn btn--ghost" href="/apply/">본 평가 상담하기</a></div>
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
          <b>공실 수익화 · 업종 영업 허가신청</b>
          <p>세 지수는 각 상세 페이지의 결과 화면 미리보기로 핵심 지면을 확인하실 수 있고, 풀 샘플은 순차적으로 이 자리에 더해집니다.</p>
          <span class="art-card__meta" style="border:0;padding:0;">
            <a href="/index/vacancy/" style="color:var(--teal);font-weight:600;">공실 수익화 평가 진단</a>
            <a href="/index/business/" style="color:var(--teal);font-weight:600;">업종 영업 허가신청 진단</a>
            <a href="/index/smfi/" style="color:var(--teal);font-weight:600;">적합성 평가</a>
          </span>
        </div>
      </div>
      <div class="notice reveal" style="margin-top:26px;"><p><strong>샘플 표기</strong> — 샘플의 모든 수치·주소·번호는 이해를 돕기 위한 가상의 예시이며, 지면마다 SAMPLE 표시가 함께 인쇄됩니다. 실제 결과지는 입력과 데이터에 따라 구성이 일부 달라질 수 있습니다.</p></div>
    </div>
  </section>`;

  return { path: entry.path, title: entry.title, description: entry.desc, body, bodyClass: 'page-samples' };
};
