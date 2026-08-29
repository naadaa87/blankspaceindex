/**
 * 거버넌스 — 판정이 흔들리지 않게 하는 장치 (6.5절 · 검증설계서 5장)
 */
module.exports = (entry) => {
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">신뢰와 검증 · 거버넌스</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);max-width:820px;">판정이 흔들리지 않게 하는<br><em>네 개의 장치</em></h1>
      <p class="hero__sub" style="max-width:680px;">좋은 산식보다 중요한 것은 그 산식이 사람과 이해관계 앞에서 흔들리지 않게 하는 구조입니다. 저희가 운영하는 장치와, 아직 만들어지는 중인 것을 구분해 밝힙니다.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="tile-grid">
        <div class="tile reveal">
          <h3>모델위원회 <span class="chip chip--muted" style="vertical-align:middle;">구성 진행 중</span></h3>
          <p>지수의 가중과 경계값 조정을 내부 판단만으로 결정하지 않기 위한 외부 자문 체계입니다. 위원 구성이 진행 중이며, 확정되는 대로 운영 규정과 함께 이 자리에 공개합니다. 그때까지의 조정은 검증 현황의 운영 규칙(보정 회의·연 1회 재검토)을 따릅니다.</p>
        </div>
        <div class="tile reveal">
          <h3>판정의 이중 확인</h3>
          <p>전문가 진단(Pro)과 본 평가의 판정은 담당 평가자의 산출을 별도 검토자가 확인한 뒤 서명과 함께 발행됩니다. 산출하는 사람과 해석·확정하는 사람을 나누는 것 — 산출과 해석의 분리가 원칙입니다.</p>
        </div>
        <div class="tile reveal">
          <h3>이의와 정정</h3>
          <p>결과에 동의하기 어려우면 결과 화면의 창구로 이의를 접수할 수 있습니다. 어떤 근거로 그 결과가 나왔는지 열람하실 수 있고, 검토 결과와 정정 여부를 회신드립니다. 정정이 있었던 문서는 파일을 덮어쓰지 않고 버전을 올려 저장해, 그 이력을 감추지 않고 남깁니다.</p>
        </div>
        <div class="tile reveal">
          <h3>표현 통제</h3>
          <p>확정을 단정하거나 성과를 보장하는 류의 표현은 금지 표현 사전으로 관리되고, 리포트 발행 단계의 자동 검사가 이를 거릅니다. 검증 전의 수치는 확정형으로 쓰지 않고 범위와 신호로 씁니다. 이 문장 규칙이 사이트와 리포트 전체에 같은 힘으로 적용됩니다.</p>
        </div>
      </div>

      <div class="section-head reveal" style="margin-top:72px;"><p class="eyebrow">판정에 관한 약속</p><h2 class="h1">약관에 적히는 세 가지</h2></div>
      <ul class="limit-list reveal">
        <li><b>판정 불변</b> — 판정은 이후 공사·운영 수주 여부와 무관하게 바뀌지 않습니다. 부적합·보류 판정에도 재평가 유인이나 진단비 반환 조건이 붙지 않습니다.</li>
        <li><b>공제의 정의</b> — 프로젝트 계약 시의 진단비 공제는 판정 결과에 대한 보상이 아니라 요금 제도입니다. 이 정의가 약관에 그대로 명시됩니다.</li>
        <li><b>결과 유효기간</b> — 평가 결과의 유효기간은 발행일로부터 6개월이며, 시장·법규·공간 조건이 바뀌면 그 전이라도 재진단을 권합니다.</li>
      </ul>
      <div class="btn-row reveal"><a class="btn btn--ghost" href="/company/">이해상충 통제 전체 보기</a><a class="btn btn--ghost" href="/faq/">이의·정정 FAQ 보기</a></div>
    </div>
  </section>`;

  return { path: entry.path, title: entry.title, description: entry.desc, body, docMeta: { id: 'BSI-DOC-GV', date: '2026-08' },
    bodyClass: 'page-governance' };
};
