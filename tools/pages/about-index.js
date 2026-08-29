/**
 * 지수 체계 소개 — 제작지시서 6.2절의 다섯 절 구성
 * ① 공실 시대와 판단 인프라의 공백  ② 다섯 번째 자리(포지셔닝)
 * ③ 여덟 지수의 지도와 연동 구조  ④ Standard·Pro와 3계층 리포트
 * ⑤ 평가→실행 순환과 통제 장치  → 진단·상세 분기
 */
const { INDEXES, BADGES, PICTOGRAMS } = require('../data/registry');
const { MARKET } = require('../data/site');
const { assembly, loop } = require('../partials/figures');

const miniCard = (ix) => {
  const preparing = ix.status === 'preparing';
  return `<a class="index-card${preparing ? ' index-card--preparing' : ''}" href="/index/${ix.slug}/">
      <div class="index-card__top">
        <span class="index-card__icon">${PICTOGRAMS[ix.pictogram]}</span>
        ${preparing ? '<span class="chip chip--muted">준비 중</span>' : '<span class="chip">이용 가능</span>'}
      </div>
      <div><h3 class="index-card__q">${ix.question}</h3>
      <p class="index-card__name">${ix.name}${ix.version ? ` <span class="code-tag">${ix.code} ${ix.version}</span>` : ''}</p></div>
      <div class="index-card__foot"><span class="badge badge--${ix.badge}">${BADGES[ix.badge].label}</span><span class="index-card__cta">상세 보기</span></div>
    </a>`;
};

module.exports = (entry) => {
  const body = `
  <!-- ① 시장 근거 -->
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">지수 체계 소개</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,46px);max-width:820px;">공실의 시대에 없던 것은<br>데이터가 아니라 <em>판단</em>이었습니다</h1>
      <p class="hero__sub" style="max-width:680px;">전국 일반상가 공실률 ${MARKET[0].num}%, 1층 ${MARKET[1].num}% — 숫자는 이미 충분히 공개되어 있습니다. 부족한 것은 그 숫자를 내 공간의 결정으로 바꿔 주는 판단의 인프라입니다. BLANK SPACE INDEX는 그 공백을 메우기 위해 만든 평가 체계입니다.</p>
      <p class="muted" style="margin-top:12px;">통계 출처: ${MARKET[0].src} · ${MARKET[2].src}</p>
    </div>
  </section>

  <!-- ② 다섯 번째 자리 -->
  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">포지셔닝</p><h2 class="h1">조회도, 시세도, 중개도 아닌<br><em>다섯 번째 자리</em></h2>
      <p class="lead">기존의 네 자리는 각자의 일을 잘하고 있습니다. 다만 "그래서 내 공간은 어떻게 해야 하는가"라는 질문에는 어느 자리도 답하지 않습니다.</p></div>
      <div class="pos-grid reveal">
        ${[
          ['조회 포털', '건물의 공부 정보를 보여 줍니다', '왜 그런지는 말하지 않습니다'],
          ['시세 서비스', '얼마쯤인지 값을 보여 줍니다', '그 값의 근거와 조건은 말하지 않습니다'],
          ['중개', '거래를 연결합니다', '거래 전 판단은 각자의 몫입니다'],
          ['감정평가', '법적 효력이 있는 가액을 판정합니다', '수익화 전략을 설계하지는 않습니다'],
        ]
          .map(([t, d, g]) => `<div class="pos"><b>${t}</b><p>${d}</p><p class="pos__gap">${g}</p></div>`)
          .join('')}
        <div class="pos pos--us"><span class="lbl" style="color:#9DB4AE;">다섯 번째 자리</span><b>진단</b><p>왜 그런지, 그래서 무엇을 해야 하는지를 근거와 한계와 함께 판정합니다</p></div>
      </div>
    </div>
  </section>

  <!-- ③ 지수 지도와 연동 -->
  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">여덟 개의 질문</p><h2 class="h1">지수의 지도</h2>
      <p class="lead">각 지수는 공간에 대한 하나의 질문에 답합니다. 지금 이용할 수 있는 네 가지로 시작해, 검증을 마치는 순서대로 네 가지가 더해집니다.</p></div>
      <div class="index-grid">
        ${INDEXES.map(miniCard).join('\n        ')}
      </div>
      <div class="section-head reveal" style="margin-top:72px;margin-bottom:24px;">
        <p class="eyebrow">상황에서 출발하기</p>
        <h3 class="h2">지금 상황이라면, 어느 지수부터</h3>
      </div>
      <div class="sp-wrap reveal">
        <table class="table sp-table">
          <thead><tr><th>지금 상황</th><th style="width:22%;">먼저 볼 지수</th><th>그 이유</th><th style="width:12%;"></th></tr></thead>
          <tbody>
            ${[
              ['공실이 6개월을 넘겼다', '공실 원인 진단', '조건을 만지기 전에 원인의 자리를 먼저 갈라야 손실을 막습니다.', '/index/vacancy/'],
              ['재계약 협상이 다가온다', '적정임대료 진단', '부를 숫자의 근거 — 유효임대료 기준의 내 위치가 협상의 출발점입니다.', '/index/rent/'],
              ['계약·창업을 앞두고 있다', '영업 가능성 확인', '도장을 찍기 전에 여덟 관문부터 — 계약 후에는 되돌릴 수 없습니다.', '/index/business/'],
              ['용도 전환·직접 운영을 고민한다', '공간수익화 적합성 평가', '열네 가지 모델의 적합도와 경제성까지, 본 평가로 판정합니다.', '/index/smfi/'],
              ['매입을 검토 중이다', '적합성 평가 + 적정임대료', '활용 계획의 성립과 임대료 가정 — 가격 판단의 두 기둥입니다.', '/index/smfi/'],
              ['원격 결과에 확인 불가가 남았다', '현장 점검', '실측과 사진 증빙으로 추정을 확정으로 바꿉니다.', '/products/onsite/'],
            ].map(([sit, ix, why, href]) => `<tr><th scope="row">${sit}</th><td><b>${ix}</b></td><td>${why}</td><td><a class="link-arrow" href="${href}" style="margin-top:0;">보기</a></td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="grid-2 reveal" style="display:grid;grid-template-columns:minmax(0,6fr) minmax(0,6fr);gap:56px;align-items:center;margin-top:72px;">
        <div>
          <p class="eyebrow">지수는 서로를 돕습니다</p>
          <h3 class="h2">따로 쓰면 진단, 함께 쓰면 체계</h3>
          <p class="lead" style="font-size:16.5px;">공실 원인 진단은 어셈블리 지수입니다. 적정임대료 진단이 확인한 가격의 간극, 영업 가능성 확인이 걸러낸 법규의 결격, 적합성 평가의 모델 판정이 원인 축의 증거로 흘러 들어와 진단의 신뢰도를 끌어올립니다. 같은 주소의 케이스는 자동으로 연결됩니다.</p>
        </div>
        <figure class="layer-figure">${assembly()}</figure>
      </div>
    </div>
  </section>

  <!-- ④ Standard·Pro와 3계층 -->
  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">이원 체계</p><h2 class="h1">같은 지수, 두 개의 약속 수준</h2>
      <p class="lead">모든 지수는 즉시 계산되는 Standard와 전문가가 검토·서명하는 Pro의 두 버전으로 제공됩니다. 그 아래에는 결과의 신뢰 수준을 정의하는 세 개의 계층이 있습니다.</p></div>
      <div class="tier-grid reveal">
        ${[
          ['L1', '원격 자동', '공공데이터와 응답만으로 계산합니다. 사람의 판단이 들어가지 않으며, 결과는 범위와 방향까지만 — 확정 표현을 쓰지 않습니다.', '무료 진단 · Standard'],
          ['L2', '심층 분석', '평가자가 원자료를 검토하고 사례를 직접 선정합니다. 시나리오와 민감도가 포함되고, 검토자 서명으로 제출 가능한 수준이 됩니다.', 'Pro · 본 평가'],
          ['L3', '현장 검증', '실제로 방문해 측정하고 촬영합니다. 원격으로 알 수 없던 값이 확정되고, 증빙 사진이 붙는 최고 신뢰 계층입니다.', '현장 점검 결합'],
        ]
          .map(
            ([code, t, d, u]) => `<div class="tier"><span class="tier__code num">${code}</span><b>${t}</b><p>${d}</p><span class="chip chip--muted">${u}</span></div>`
          )
          .join('')}
      </div>
      <p class="muted reveal" style="margin-top:20px;">계층이 올라갈수록 확인된 값이 늘고 신뢰도가 오릅니다. 어느 계층의 결과인지는 결과지에 항상 표기됩니다.</p>
    </div>
  </section>

  <!-- ⑤ 순환과 통제 -->
  <section class="section">
    <div class="container">
      <div class="grid-2 reveal" style="display:grid;grid-template-columns:minmax(0,6fr) minmax(0,6fr);gap:56px;align-items:center;">
        <div>
          <p class="eyebrow">평가에서 실행까지</p>
          <h2 class="h1">진단으로 끝나지 않는 이유</h2>
          <p class="lead">블랭크는 진단한 문제를 직접 해결해 온 회사입니다. 개선·시공·오픈·운영의 실행이 진단 뒤에 이어지고, 실행의 결과는 다시 지수의 보정 데이터가 됩니다. 이 순환이 이 체계가 책상 위 모형과 다른 이유입니다.</p>
          <p class="lead" style="font-size:16px;">그리고 이 구조에는 통제가 붙습니다 — 판정은 이후 수주 여부와 무관하게 바뀌지 않고, 판정 분포를 공시할 계획이며, 고객은 평가 근거를 열람할 수 있습니다.</p>
          <a class="link-arrow" href="/company/">이해상충 통제 장치 자세히 보기</a>
        </div>
        <figure class="layer-figure">${loop()}</figure>
      </div>
    </div>
  </section>

  <!-- 분기 -->
  <section class="section section--alt final-cta section--tight">
    <div class="container">
      <div class="section-head section-head--center reveal">
        <h2 class="h1">어디서부터 시작할까요</h2>
        <p class="lead">내 공간의 상태가 궁금하면 3분 진단부터, 특정 질문이 있다면 해당 지수로 바로 가시면 됩니다.</p>
        <div class="btn-row">
          <a class="btn btn--primary btn--lg" href="/check/">3분 무료 진단 시작하기</a>
          <a class="btn btn--ghost btn--lg" href="/index/vacancy/">공실 원인 진단 보기</a>
        </div>
      </div>
    </div>
  </section>`;

  return {
    path: entry.path,
    title: entry.title,
    description: entry.desc,
    body,
    bodyClass: 'page-about-index',
  };
};
