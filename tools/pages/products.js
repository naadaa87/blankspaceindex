/**
 * 상품·가격 — 제작지시서 6.4절
 * 시작: 내 상황에 맞는 상품 찾기(3버튼) → 즉시 시작(Standard 3) → 케이스형 → 준비 중 → 공제 절(#credit)
 * 가격 원칙: Standard 3종은 확정가 표기(현재 가격 확정 중 — 정직 표기), 케이스형은 견적 구조.
 */
const { NOTICES } = require('../data/site');

const P = (cls, inner) => `<div class="prod ${cls || ''}">${inner}</div>`;

module.exports = (entry) => {
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">상품 · 가격</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);">내 상황에 맞는 상품부터<br>찾아 드릴게요</h1>
      <p class="hero__sub" style="max-width:640px;">무료 진단에서 즉시 시작하는 셀프 진단, 전문가와 현장이 붙는 케이스형까지 — 어느 단계에서 시작하든 다음 단계로 비용이 이어지는 구조입니다.</p>
      <div class="sit-btns" role="group" aria-label="상황 선택">
        <a class="sit-btn" href="#std"><b>공실을 갖고 있어요</b><span>원인 진단 · 조건 점검부터</span></a>
        <a class="sit-btn" href="#std"><b>계약·창업을 앞두고 있어요</b><span>관문 확인 · 적합성 평가부터</span></a>
        <a class="sit-btn" href="#case"><b>매입·매도를 검토해요</b><span>본 평가 · 현장 검증부터</span></a>
      </div>
    </div>
  </section>

  <!-- 무료 P0 -->
  <section class="section section--alt section--tight">
    <div class="container">
      <div class="prod prod--free reveal">
        <div class="prod__head"><span class="chip chip--green">무료</span><h2 class="h2">3분 공간 진단</h2><span class="code-tag">P0</span></div>
        <p class="prod__desc">주소와 몇 개의 응답으로 방향과 위험 신호, 확인되지 않은 항목을 봅니다. 저장되지 않고, 점수·금액·기간은 제시하지 않습니다.</p>
        <div class="prod__foot"><span class="prod__terms">즉시 · 웹 결과 화면</span><a class="btn btn--primary" href="/check/">지금 시작하기</a></div>
      </div>
    </div>
  </section>

  <!-- 즉시 시작 Standard -->
  <section class="section" id="std">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">즉시 시작 · 셀프 진단</p><h2 class="h1">Standard — 응답하면 바로 계산됩니다</h2>
      <p class="lead">세 지수의 Standard는 결제 후 즉시 계산되어 결과지가 발행됩니다. 결제액은 같은 지수의 Pro 전환 시 전액 공제됩니다.</p></div>
      <div class="prod-grid">
        ${[
          ['공실 원인 진단', 'SVDI 1.1', '공실을 갖고 있어요', '원인 후보 최대 2개 + 확인 순서 + 이번 주 할 일. 결과지 4면.', '9문항 · 5분 · 즉시 발행', '/index/vacancy/'],
          ['적정임대료 진단', 'SRVI 2.1', '공실 · 재계약 국면', '시장 밴드 위의 내 위치 + 판정 + 등가 조합 + 3가격점. 결과지 5면(신뢰도 충족 시).', '7문항 · 5분 · 즉시 발행', '/index/rent/'],
          ['영업 가능성 확인', 'SCPI 1.1', '계약·창업을 앞두고 있어요', '8관문 신호등 + 업종 매트릭스 + 확인 필요 항목과 관할 질문. 결과지 5면.', '2+α문항 · 3분 · 즉시 발행', '/index/business/'],
        ]
          .map(
            ([name, code, sit, desc, terms, href]) => P(
              'reveal',
              `<div class="prod__head"><span class="chip">Standard</span><h3 class="h2">${name}</h3><span class="code-tag">${code}</span></div>
               <span class="prod__sit">${sit}</span>
               <p class="prod__desc">${desc}</p>
               <div class="prod__price"><b>확정가 결제</b><small>가격 확정 중 — 정식 오픈과 함께 게시됩니다</small></div>
               <div class="prod__foot"><span class="prod__terms">${terms}</span>
                 <span class="prod__btns"><a class="btn btn--ghost btn--sm" href="${href}">자세히</a><a class="btn btn--primary btn--sm" href="/apply/#pro">시작하기</a></span></div>`
            )
          )
          .join('\n        ')}
      </div>
      <div class="notice reveal" style="margin-top:22px;"><p><strong>발행 규칙</strong> — 적정임대료 진단은 신뢰도 C 60 이상에서 결과지가 발행됩니다. 미충족 시 화면 결과와 보완 안내가 제공되며, 근거가 얇은 채로 숫자를 만들어 내지 않습니다.</p></div>
    </div>
  </section>

  <!-- 케이스형 -->
  <section class="section section--alt" id="case">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">전문가와 현장 · 케이스형</p><h2 class="h1">검토와 서명, 그리고 실측이 붙습니다</h2>
      <p class="lead">규모와 범위에 따른 견적 구조입니다. 표준 범위는 신청 즉시, 건물 단위·복수 호실은 영업일 1일 안에 견적을 안내드립니다.</p></div>
      <div class="prod-grid">
        ${[
          ['전문가 진단 Pro', '지수별', '자료를 제출받아 검증하고, 담당 평가자가 검토·서명해 발행합니다. 협상·설득 자리에 쓸 수 있는 문서입니다.', '영업일 3~5일 · 검토자 서명', '/apply/#pro', '문의하기'],
          ['공간수익화 본 평가', 'SMFI 2.1', '5단계 파이프라인 전체를 수행하는 본 평가입니다. 모델별 적합도와 4등급 판정, 경제성 검증까지.', '범위 협의 · 심층 리포트', '/index/smfi/', '상담하기'],
          ['현장 점검', 'P5', '일곱 개 영역 약 100개 항목을 실측·촬영합니다. 원격의 확인 불가 항목이 여기서 확정됩니다.', '방문 후 영업일 5일 · 사진 증빙', '/products/onsite/', '사전 신청'],
          ['종합 심층 리포트', 'P6', '전 지수와 시나리오, 실행 계획까지 — 제본 리포트와 대면 보고가 포함된 최상위 구성입니다.', '영업일 10일 · 제본 + 대면 보고', '/products/deep/', '자세히'],
        ]
          .map(
            ([name, code, desc, terms, href, cta]) => P(
              'prod--case reveal',
              `<div class="prod__head"><span class="chip chip--green">케이스형</span><h3 class="h2">${name}</h3><span class="code-tag">${code}</span></div>
               <p class="prod__desc">${desc}</p>
               <div class="prod__price"><b>규모·범위 기준 견적</b><small>표준 범위 즉시 · 그 외 영업일 1일 내 안내</small></div>
               <div class="prod__foot"><span class="prod__terms">${terms}</span>
                 <span class="prod__btns"><a class="btn btn--primary btn--sm" href="${href}">${cta}</a></span></div>`
            )
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <!-- 준비 중 -->
  <section class="section section--tight">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">준비 중</p><h2 class="h1">검증을 마치는 대로 열립니다</h2></div>
      <div class="prod-grid">
        ${[
          ['매입 검토 리포트', 'P4', '가치 범위 분석과 법규·시설·현금흐름을 묶은 매입 전용 구성. 법률 검토 후 공개합니다.', '/index/value/'],
          ['적정임대료 · 수익 결합', 'P2 확장', '임대료 진단에 현금흐름 진단을 결합한 구성. 지수 검증 일정에 맞춰 공개합니다.', '/index/cashflow/'],
          ['분기 갱신 구독', '—', '기준시점 경과에 맞춘 정기 갱신. 수요가 확인된 뒤의 후속 과제입니다.', '/contact/'],
        ]
          .map(
            ([name, code, desc, href]) => P(
              'prod--prep reveal',
              `<div class="prod__head"><span class="chip chip--muted">준비 중</span><h3 class="h2">${name}</h3><span class="code-tag">${code}</span></div>
               <p class="prod__desc">${desc}</p>
               <div class="prod__foot"><span class="prod__terms">출시 알림 접수 중</span>
                 <span class="prod__btns"><a class="btn btn--ghost btn--sm" href="${href}">알림 신청</a></span></div>`
            )
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <!-- 공제 -->
  <section class="section section--alt" id="credit">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">공제 안내</p><h2 class="h1">진단 비용은 사라지지 않습니다</h2>
      <p class="lead">위로 올라갈수록 아래에서 낸 비용이 공제되는 구조입니다. 결제 화면에 공제 예정액이 자동으로 표시됩니다.</p></div>
      <div class="sp-wrap reveal">
        <table class="table sp-table">
          <thead><tr><th style="width:26%;">구간</th><th>공제 내용</th><th style="width:30%;">적용</th></tr></thead>
          <tbody>
            <tr><th scope="row">Standard → Pro</th><td>같은 지수의 전문가 진단으로 전환하면 Standard 결제액이 <b>전액</b> 공제됩니다.</td><td>결제 화면 자동 반영</td></tr>
            <tr><th scope="row">진단 → 프로젝트</th><td>블랭크와 개선·시공·운영 프로젝트를 계약하면 그동안의 유료 진단 비용이 계약 금액에서 공제됩니다.</td><td>상담 시 조건 안내</td></tr>
          </tbody>
        </table>
      </div>
      <div class="notice reveal" style="margin-top:22px;"><p><strong>환불 기준</strong> — 셀프 진단은 결과 계산 전 전액 환불되며, 계산·표시 이후에는 즉시 제공이 완료된 디지털 상품으로 환불이 어렵습니다. 이 내용은 결제 전에 안내되고 동의를 받습니다. 데이터 오류로 인한 오산출은 무상 정정 대상입니다.</p></div>
    </div>
  </section>

  <!-- 마무리 -->
  <section class="section final-cta section--tight">
    <div class="container">
      <div class="section-head section-head--center reveal">
        <h2 class="h1">어디서 시작할지 모르겠다면</h2>
        <p class="lead">3분 무료 진단이 상황에 맞는 상품을 골라 드립니다.</p>
        <div class="btn-row"><a class="btn btn--primary btn--lg" href="/check/">3분 무료 진단 시작하기</a><a class="btn btn--ghost btn--lg" href="/apply/">바로 신청하기</a></div>
      </div>
    </div>
  </section>`;

  return { path: entry.path, title: entry.title, description: entry.desc, body, bodyClass: 'page-products' };
};
