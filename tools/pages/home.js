/**
 * 메인 페이지 — 열두 개 블록
 * 콘텐츠 골격: 제작지시서 6.1절 / 비주얼 언어: 무드보드·섹션 시안(img01~10)
 * 카피 톤: 16장 — 확정형 과장 금지, 근거·한계 병기, 조건부 화법
 */
const { INDEXES, BADGES, PICTOGRAMS, JOURNEY } = require('../data/registry');
const { TRACK, MARKET, ONSITE_ONLY } = require('../data/site');
const { pipeline } = require('../partials/figures');

/* ---------- 인라인 아이콘 ---------- */
const I = {
  data: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><ellipse cx="12" cy="5.5" rx="7" ry="2.6"/><path d="M5 5.5v6c0 1.44 3.13 2.6 7 2.6s7-1.16 7-2.6v-6"/><path d="M5 11.5v6c0 1.44 3.13 2.6 7 2.6s7-1.16 7-2.6v-6"/></svg>`,
  gauge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4.5 17.5a8.5 8.5 0 1 1 15 0"/><path d="m12 14 4.2-4.6"/><circle cx="12" cy="14.5" r="1.6"/></svg>`,
  insight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5 9 13l3.5 3.5L20 8"/><path d="M15.5 8H20v4.5"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 5.8v5.4c0 4.3 2.9 7.6 7 9.3 4.1-1.7 7-5 7-9.3V5.8L12 3Z"/><path d="m9 11.6 2.2 2.2L15.4 9.6"/></svg>`,
  store: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5 5.4 4h13.2L20 9.5"/><path d="M4 9.5a2.6 2.6 0 0 0 5.3 0 2.6 2.6 0 0 0 5.4 0 2.6 2.6 0 0 0 5.3 0"/><path d="M5.5 12.5V20h13v-7.5"/><path d="M9.5 20v-4.5h5V20"/></svg>`,
  floor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="1.2"/><path d="M5 15.5h14"/><path d="M9.5 18h5" stroke-width="2"/><path d="M8 7h2M8 10.5h2M14 7h2M14 10.5h2"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h16"/><path d="M6 20V6.8L12 4l6 2.8V20"/><path d="m9.6 10.4 4.8 4.8M14.4 10.4l-4.8 4.8"/></svg>`,
  card: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="1.6"/><path d="M7 9h6M7 12.2h10M7 15.4h8"/></svg>`,
  method: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.2"/><path d="M12 3.8v4.4M12 15.8v4.4M3.8 12h4.4M15.8 12h4.4"/><circle cx="12" cy="12" r="2"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.6"/></svg>`,
  scale: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v16M7.5 20h9"/><path d="M12 6.5 5.5 8m6.5-1.5L18.5 8"/><path d="M3.4 13.2 5.5 8l2.1 5.2a3 3 0 0 1-4.2 0ZM16.4 13.2 18.5 8l2.1 5.2a3 3 0 0 1-4.2 0Z"/></svg>`,
  fr: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 9 5.6 4.5h12.8L19.5 9"/><path d="M4.5 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0"/><path d="M6 12v7.5h12V12"/><path d="M9.5 19.5V15h5v4.5"/></svg>`,
  broker: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><rect x="4" y="4" width="9" height="16.5" rx="1"/><path d="M13 9h6.5v11.5H13"/><path d="M7 8h3M7 11.5h3M7 15h3M16 12.5h1.5M16 16h1.5"/></svg>`,
  gov: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3.5 8.5 4.5H3.5L12 3.5Z"/><path d="M5 8v9M9.7 8v9M14.3 8v9M19 8v9"/><path d="M3.5 17h17M3 20.5h18"/></svg>`,
  s1: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.2"/><path d="m15.6 15.6 4 4"/><path d="M8.5 11h5M11 8.5v5"/></svg>`,
  s2: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="1.6"/><path d="M8.5 8h7M8.5 11.5h7"/><path d="m9 16.4 1.7 1.7 3.4-3.4"/></svg>`,
  s3: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3.4"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/><path d="m14.6 12.9 1.3 1.3 2.6-2.6" stroke="#16A34A"/></svg>`,
  s4: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6.5-5.4-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.6-6.5 10-6.5 10Z"/><circle cx="12" cy="10.8" r="2.2"/></svg>`,
  s5: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 20.5V9.8L12 4l7 5.8v10.7"/><path d="M9.5 20.5v-5h5v5"/><path d="M3.5 20.5h17"/></svg>`,
};

const badgeBtn = (key) => {
  const b = BADGES[key];
  return `<button type="button" class="badge badge--${key}" data-badge="${key}" title="${b.ko} — 설명 보기">${b.label}</button>`;
};

/* ---------- 지수 카드 ---------- */
const indexCard = (ix) => {
  const preparing = ix.status === 'preparing';
  const cta = preparing ? '소개·출시 알림' : ix.slug === 'smfi' ? '본 평가 보기' : '진단 보기';
  return `<a class="index-card${preparing ? ' index-card--preparing' : ''} reveal" href="/index/${ix.slug}/">
        <div class="index-card__top">
          <span class="index-card__icon">${PICTOGRAMS[ix.pictogram]}</span>
          ${preparing ? '<span class="chip chip--muted">준비 중</span>' : '<span class="chip">이용 가능</span>'}
        </div>
        <div>
          <h3 class="index-card__q">${ix.question}</h3>
          <p class="index-card__name">${ix.name}${ix.version ? ` <span class="code-tag">${ix.code} ${ix.version}</span>` : ''}</p>
        </div>
        <p class="index-card__desc">${ix.oneLiner}</p>
        <div class="index-card__foot">
          <span class="badge badge--${ix.badge}">${BADGES[ix.badge].label}</span>
          <span class="index-card__cta">${cta}</span>
        </div>
      </a>`;
};

/* ---------- SMFI 파이프라인 레이어 다이어그램 ---------- */
const layerDiagram = `
<svg viewBox="0 0 560 348" role="img" aria-label="공간수익화 적합성 평가의 다섯 단계 파이프라인 구조도" style="width:100%;height:auto;display:block;">
  <defs>
    <linearGradient id="lg5" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0F6B63"/><stop offset="1" stop-color="#128074"/>
    </linearGradient>
  </defs>
  ${[
    { y: 26, fill: '#EAF1EF', stroke: '#D5E2DE', t: '#3E4B47', no: '01', name: '데이터 적정성 확인', sub: '입력·증빙의 품질 게이트' },
    { y: 88, fill: '#D9E9E4', stroke: '#C2DAD3', t: '#33443F', no: '02', name: '하드게이트 12개', sub: '결격 사유 선별 — 위음성 최소화' },
    { y: 150, fill: '#B9D8CE', stroke: '#A0C9BC', t: '#274038', no: '03', name: '10개 영역 · 57개 지표', sub: '입지·수요·물리·법규·운영 평가' },
    { y: 212, fill: '#7FB8A6', stroke: '#69A997', t: '#12312A', no: '04', name: '14개 모델 적합도', sub: '용도별 사업 모델 매칭' },
    { y: 274, fill: 'url(#lg5)', stroke: '#0B554E', t: '#FFFFFF', no: '05', name: '경제성 검증', sub: '수익 구조의 성립 확인' },
  ]
    .map(
      (L) => `
  <g>
    <path d="M 40 ${L.y + 22} L 150 ${L.y} L 260 ${L.y + 22} L 150 ${L.y + 44} Z" fill="${L.fill}" stroke="${L.stroke}" stroke-width="1.2"/>
    <path d="M 40 ${L.y + 22} L 40 ${L.y + 34} L 150 ${L.y + 56} L 150 ${L.y + 44} Z" fill="${L.fill}" stroke="${L.stroke}" stroke-width="1.2" opacity="0.75"/>
    <path d="M 260 ${L.y + 22} L 260 ${L.y + 34} L 150 ${L.y + 56} L 150 ${L.y + 44} Z" fill="${L.fill}" stroke="${L.stroke}" stroke-width="1.2" opacity="0.55"/>
    <line x1="268" y1="${L.y + 26}" x2="300" y2="${L.y + 26}" stroke="#C9D4D1" stroke-width="1.2" stroke-dasharray="3 3"/>
    <text x="310" y="${L.y + 20}" font-family="Archivo, sans-serif" font-size="10.5" font-weight="700" letter-spacing="1.5" fill="#0F6B63">${L.no}</text>
    <text x="336" y="${L.y + 21}" font-family="Pretendard Variable, sans-serif" font-size="14.5" font-weight="700" fill="#1D2327">${L.name}</text>
    <text x="310" y="${L.y + 40}" font-family="Pretendard Variable, sans-serif" font-size="12" fill="#64707A">${L.sub}</text>
  </g>`
    )
    .join('')}
</svg>`;

/* ---------- 사례 카드 ---------- */
const CASES = [
  {
    img: 'case-retail', no: '01', cat: 'RETAIL → PARTYROOM', icon: I.store,
    title: '임대 문의가 끊긴 1층 근생, 모임 공간으로',
    desc: '오래 비어 있던 1층 구획의 원인을 진단해 용도를 바꾸고, 파티룸으로 기획·시공한 뒤 직접 운영 체계에 올렸습니다.',
    mNum: '약 120개 지점', mLbl: '쏘플파티룸 · 전국 직접 운영', brand: 'SSOFLE PARTYROOM',
  },
  {
    img: 'case-asset', no: '02', cat: 'UPPER FLOOR → BOOKING', icon: I.floor,
    title: '쓰임이 애매했던 상층부, 예약 기반 공간으로',
    desc: '접근성이 약해 임대가 어려웠던 상층부를 수요가 확인된 모임·행사 용도로 재구성하고, 예약 기반 운영으로 전환했습니다.',
    mNum: '공실 → 예약제', mLbl: '임대 부담을 수익 구조로', brand: 'MINGLE',
  },
  {
    img: 'case-office', no: '03', cat: 'DIAGNOSIS → EXECUTION', icon: I.insight,
    title: '진단에서 멈추지 않고, 실행까지',
    desc: '원인을 짚는 데서 끝나지 않습니다. 개선·시공·오픈·운영까지 한 회사가 이어서 수행하는 것이 이 체계의 마지막 구간입니다.',
    mNum: '진단 → 실행', mLbl: '기획·시공·운영 일원화', brand: '공백 空白',
  },
];

module.exports = (entry) => {
  const available = INDEXES.filter((i) => i.status === 'available');
  const preparing = INDEXES.filter((i) => i.status === 'preparing');

  const stripItems = INDEXES.map(
    (ix) => `<span class="index-strip__item"><b>${ix.name}</b>${ix.question} <span class="code-tag">${ix.code}</span></span>`
  ).join('\n        ');

  const body = `
  <!-- 1. 히어로 -->
  <section class="hero" aria-labelledby="hero-title">
    <div class="container hero__inner">
      <div class="hero__grid">
        <div>
          <p class="eyebrow">Blank Space Index · 공간·상업용 부동산 평가 체계</p>
          <h1 class="h-display" id="hero-title">얼마인지는 많은 서비스가 말합니다.<br>우리는 <em>왜 그런지</em>, 그래서<br><em>무엇을 해야 하는지</em>를 말합니다.</h1>
          <p class="hero__sub">10년, 340여 개 공간을 직접 만들고 운영해 온 블랭크의 진단 체계입니다. 이 공간, 계속 이대로 둬도 될까요 — 주소 하나로 3분이면 방향이 보입니다.</p>
          <div class="hero__tags">
            <span># 데이터 기반 진단</span><span># 근거와 한계 병기</span><span># 검증 상태 공개</span><span># 무저장 무료 진단</span>
          </div>
          <div class="btn-row">
            <a class="btn btn--primary btn--lg" href="/check/">3분 무료 진단 시작하기</a>
            <a class="btn btn--ghost btn--lg" href="/about-index/">지수 체계 보기</a>
          </div>
          <div class="feature-row">
            <div class="feature">${I.data}<b>데이터 기반</b><small>공공·시장 데이터 결합</small></div>
            <div class="feature">${I.gauge}<b>정밀한 지수</b><small>지표 기반 평가 체계</small></div>
            <div class="feature">${I.insight}<b>인사이트 제공</b><small>실행 가능한 다음 단계</small></div>
            <div class="feature">${I.shield}<b>검증 공개</b><small>단계 배지로 상태 표시</small></div>
          </div>
        </div>
        <div class="hero__visual">
          <div class="hero__map" aria-hidden="true"></div>
          <figure class="hero__photo"><img src="/assets/img/photos/hero-tower.webp" alt="유리 커튼월의 오피스 타워와 저층 상업 시설이 있는 거리" width="464" height="729" fetchpriority="high"></figure>
          <aside class="scorecard" role="img" aria-label="공간수익화 적합성 평가 결과 화면 예시. 종합 적합 점수와 영역별 점수, 판정이 표시됩니다.">
            <div class="scorecard__label"><span>공간수익화 적합 점수</span><span class="code-tag">SMFI 2.1</span></div>
            <div class="scorecard__value">
              <span class="scorecard__num num">82.4<small>/100</small></span>
              <span class="verdict">판정 · 적합</span>
            </div>
            <div class="scorecard__bars">
              ${[
                ['시장·수요', 86],
                ['입지·접근', 78],
                ['공간·물리', 83],
                ['법규·인허가', 90],
                ['리스크', 72],
              ]
                .map(
                  ([k, v]) => `<div class="scorecard__bar"><em>${k}</em><span class="scorecard__track"><span class="scorecard__fill" style="width:${v}%"></span></span><span class="num">${v}</span></div>`
                )
                .join('')}
            </div>
            <div class="scorecard__foot"><span>예시 화면 · 실제 데이터가 아닙니다</span><span>Standard 결과지</span></div>
          </aside>
        </div>
      </div>
    </div>
    <div class="index-strip" aria-hidden="true">
      <div class="index-strip__track">
        ${stripItems}
        ${stripItems}
      </div>
    </div>
  </section>

  <!-- 2. 문제 제기 -->
  <section class="section section--alt" aria-labelledby="market-title">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">공실의 시대</p>
        <h2 class="h1" id="market-title">공실은 더 이상<br>개별 건물의 불운이 아닙니다</h2>
      </div>
      <div class="stats">
        ${MARKET.map(
          (m) => `<div class="stat reveal">
          <span class="stat__icon">${I[m.icon]}</span>
          <div class="stat__num num">${m.num}<small>${m.unit}</small></div>
          <p class="stat__label">${m.label}</p>
          <p class="stat__src">${m.src}<br>${m.note}</p>
        </div>`
        ).join('\n        ')}
      </div>
      <p class="lead reveal" style="max-width:760px;margin-top:44px;">평균은 방향을 보여 주지만, 결정은 언제나 자산 하나에서 일어납니다. 같은 13.1%라는 숫자 아래에서 어떤 거리는 다시 채워지고, 어떤 건물은 몇 년째 그대로 비어 있습니다. 지금 필요한 것은 시장의 평균이 아니라 <em style="font-style:normal;color:var(--teal);font-weight:600;">내 공간이 왜 그런지에 대한 진단</em>입니다.</p>
    </div>
  </section>

  <!-- 3. 정체 선언 + 파이프라인 구조 -->
  <section class="section" aria-labelledby="identity-title">
    <div class="container">
      <div class="grid-2" style="display:grid;grid-template-columns:minmax(0,6fr) minmax(0,6fr);gap:56px;align-items:center;">
        <div class="reveal">
          <p class="eyebrow">조회가 아니라 진단</p>
          <h2 class="h1" id="identity-title">시세를 보여 주는 서비스는<br>이미 많습니다</h2>
          <p class="lead">저희가 만드는 것은 그 다음입니다. 왜 비어 있는지, 지금 조건이 시장과 맞는지, 이 자리에서 그 영업이 되는지 — 결정에 필요한 판단을 지수로 만들고, 모든 결과에 근거와 한계를 함께 적습니다.</p>
          <p class="muted" style="margin-top:14px;">판정을 흐리면서 판매를 올리는 장치는 이 사이트에 없습니다. 확인하지 못한 것은 확인하지 못했다고 쓰는 것이 이 체계의 방식입니다.</p>
          <a class="link-arrow" href="/about-index/">체계가 만들어진 방식 보기</a>
        </div>
        <figure class="layer-figure reveal">
          ${pipeline()}
          <figcaption>공간수익화 적합성 평가(SMFI 2.1)의 5단계 파이프라인 — 모든 본 평가가 이 구조를 통과합니다</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <!-- 4. 지수 카드 그리드 -->
  <section class="section section--alt" aria-labelledby="index-title">
    <div class="container">
      <div class="section-head section-head--row reveal">
        <div>
          <p class="eyebrow">여덟 개의 질문</p>
          <h2 class="h1" id="index-title">지수의 이름은 코드가 아니라 질문입니다</h2>
          <p class="lead">지금 이용할 수 있는 네 가지와 준비 중인 네 가지를 그대로 보여 드립니다. 검증되지 않은 지수에 이름을 붙여 내보내지 않는 것도 이 체계의 원칙입니다.</p>
        </div>
        <a class="btn btn--ghost" href="/about-index/">지수 체계 소개 →</a>
      </div>
      <div class="index-grid">
        ${available.map(indexCard).join('\n        ')}
        ${preparing.map(indexCard).join('\n        ')}
      </div>
    </div>
  </section>

  <!-- 5. 작동 방식 -->
  <section class="section" aria-labelledby="how-title">
    <div class="container">
      <div class="section-head section-head--center reveal">
        <p class="eyebrow" style="justify-content:center;">작동 방식</p>
        <h2 class="h1" id="how-title">무료가 문제를 드러내고, <em>실행이 해결합니다</em></h2>
        <p class="lead">어느 단계에 있든 자기 자리와 다음 단계가 보이도록 만들었습니다.</p>
      </div>
      <div class="steps">
        ${JOURNEY.map(
          (s, i) => `<div class="step${i === 4 ? ' step--em' : ''} reveal">
          <span class="step__circle">${I['s' + (i + 1)]}</span>
          <span class="step__no">STEP ${i + 1}</span>
          <h3 class="step__name">${s.name}</h3>
          <p class="step__out">${s.out}</p>
          <span class="step__time num">${s.time}</span>
        </div>`
        ).join('\n        ')}
      </div>
      <div class="notice steps__note reveal">
        <p><strong>진단 비용은 사라지지 않습니다.</strong> 셀프 진단(Standard) 결제액은 같은 지수의 전문가 진단(Pro)으로 전환할 때 전액 공제되고, 유료 진단 비용은 이후 블랭크와 개선·시공·운영 프로젝트를 계약할 때 공제됩니다.</p>
      </div>
    </div>
  </section>

  <!-- 6. 신뢰 장치 -->
  <section class="section section--alt" aria-labelledby="trust-title">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">신뢰의 구조</p>
        <h2 class="h1" id="trust-title">신뢰는 주장 대신 <em>구조로</em></h2>
        <p class="lead">설계부터 검증까지의 과정 자체를 공개합니다. 모든 지수에는 지금 어느 검증 단계에 있는지가 붙고, 배지를 누르면 각 단계의 뜻을 볼 수 있습니다.</p>
      </div>
      <div class="badge-cards">
        <div class="badge-card reveal">
          <span class="badge-card__ring">${I.method}</span>
          <span class="badge-card__stage">Stage 1 · Expert-designed</span>
          <h3>전문가 설계</h3>
          <p>10년의 실행 경험과 공인 방법론으로 설계된 단계입니다. 오픈 시점의 모든 지수가 여기서 출발하며, 결과는 범위와 신호로 말합니다.</p>
          ${badgeBtn('expert')}
        </div>
        <div class="badge-card badge-card--pilot reveal">
          <span class="badge-card__ring">${I.gauge}</span>
          <span class="badge-card__stage">Stage 2 · Pilot-calibrated</span>
          <h3>파일럿 보정</h3>
          <p>실제 사례 표본으로 1차 보정을 마친 단계입니다. 보정에 사용된 표본의 성격과 규모를 검증 현황 페이지에 공개합니다.</p>
          ${badgeBtn('pilot')}
        </div>
        <div class="badge-card badge-card--backtested reveal">
          <span class="badge-card__ring">${I.shield}</span>
          <span class="badge-card__stage">Stage 3 · Backtested</span>
          <h3>실증 검증</h3>
          <p>홀드아웃 검증을 통과해 성능 요약을 공개하는 단계입니다. 검증이 쌓이는 과정이 사이트에 그대로 반영됩니다.</p>
          ${badgeBtn('backtested')}
        </div>
      </div>
      <div class="tile-grid">
        <div class="tile reveal">
          <span class="tile__icon">${I.card}</span>
          <h3>지수마다 Model Card를 공개합니다</h3>
          <p>목적과 적용 범위, 사용하는 데이터, 한계, 검증 상태, 버전 이력을 지수마다 한 장으로 정리합니다. 무엇을 계산하고 무엇을 계산하지 않는지를 먼저 밝히는 문서입니다.</p>
          <a class="link-arrow" href="/trust/model-cards/">Model Card 보기</a>
        </div>
        <div class="tile reveal">
          <span class="tile__icon">${I.eye}</span>
          <h3>확인하지 못한 것은 확인하지 못했다고 씁니다</h3>
          <p>원격 진단이 닿지 못한 항목은 숨기지 않고 확인 불가, 현장 확인 필요로 결과에 그대로 적습니다. 이 정직한 표기가 다음 단계의 안내이기도 합니다.</p>
          <a class="link-arrow" href="/trust/methodology/">방법론 보기</a>
        </div>
        <div class="tile reveal">
          <span class="tile__icon">${I.method}</span>
          <h3>검증 현황을 수치로 공개합니다</h3>
          <p>지수별 검증 단계, 보정 표본, 성능 요약을 대시보드로 공개할 예정입니다. 검증 전의 수치는 확정형으로 말하지 않습니다.</p>
          <a class="link-arrow" href="/trust/validation/">검증 현황 보기</a>
        </div>
        <div class="tile reveal">
          <span class="tile__icon">${I.scale}</span>
          <h3>이해상충을 먼저 공시합니다</h3>
          <p>평가하는 회사가 실행도 한다는 구조를 숨기지 않습니다. 판정은 이후 수주 여부와 무관하게 바뀌지 않고, 고객은 평가 근거를 열람할 수 있습니다.</p>
          <a class="link-arrow" href="/company/">운영사·신뢰 구조 보기</a>
        </div>
      </div>
      <div class="quote-bar reveal">
        <span class="quote-bar__mark">“</span>
        <p>확인되지 않은 항목이 남아 있다면, 그 사실이 결과지에 그대로 적힙니다.<small>BLANK SPACE INDEX 운영 원칙 · 리포트 공통 규격</small></p>
      </div>
    </div>
  </section>

  <!-- 7. 실적 -->
  <section class="section" aria-labelledby="track-title">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">실행의 기록</p>
        <h2 class="h1" id="track-title">평가만 하는 회사가 아니라,<br>만들어 온 회사입니다</h2>
        <p class="lead">2015년부터 비어 있는 공간을 직접 기획하고 짓고 운영해 왔습니다. 이 지수들은 그 현장에서 나온 질문으로 설계되었습니다.</p>
      </div>
      <div class="metric-grid">
        ${[TRACK.years, TRACK.spaces, TRACK.branches, TRACK.perf]
          .map(
            (t, i) => `<div class="metric reveal">
          <div class="metric__lbl"><span class="lbl">${['Experience', 'Spaces', 'Branches', 'Performance'][i]}</span></div>
          <div class="metric__num num">${t.num}<small>${t.unit}</small></div>
          <p class="metric__sub"><b style="color:var(--ink);font-weight:600;">${t.label}</b>${t.sub ? '<br>' + t.sub : ''}</p>
        </div>`
          )
          .join('\n        ')}
      </div>
      <p class="metric-footnote reveal">${TRACK.perfFootnote}</p>
    </div>
  </section>

  <!-- 8. 사례 미리보기 -->
  <section class="section section--alt" aria-labelledby="case-title">
    <div class="container">
      <div class="section-head section-head--row reveal">
        <div>
          <p class="eyebrow">Case Studies</p>
          <h2 class="h1" id="case-title">데이터로 진단하고, <em>실행으로 증명합니다</em></h2>
          <p class="lead">사례는 익명 원칙으로 소개합니다. 진단 체계를 거친 사례는 동의를 얻는 대로 이 자리에 더해 갑니다.</p>
        </div>
        <a class="btn btn--ghost" href="/works/">전체 사례 보기 →</a>
      </div>
      <div class="case-grid">
        ${CASES.map(
          (c) => `<article class="case-card reveal">
          <div class="case-card__media">
            <img src="/assets/img/photos/${c.img}.webp" alt="" loading="lazy" width="820" height="434">
            <span class="case-card__no num">${c.no}</span>
          </div>
          <div class="case-card__body">
            <span class="case-card__cat">${c.icon}<span class="lbl" style="color:var(--teal);">${c.cat}</span></span>
            <h3>${c.title}</h3>
            <p class="case-card__desc">${c.desc}</p>
            <div class="case-card__foot">
              <div class="case-card__metric"><b>${c.mNum}</b><span>${c.mLbl}</span></div>
              <span class="case-card__brand">${c.brand}</span>
            </div>
          </div>
        </article>`
        ).join('\n        ')}
      </div>
    </div>
  </section>

  <!-- 9. 현장 점검 -->
  <section class="section" aria-labelledby="onsite-title">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">현장 점검</p>
        <h2 class="h1" id="onsite-title">원격이 확인하지 못하는 것은<br><em>현장이 확인합니다</em></h2>
        <p class="lead">리포트에 확인 불가로 남은 항목들은 결국 가서 봐야 확정됩니다. 일곱 개 영역 약 100개 항목을 실측하고 사진으로 남기는 현장 점검을 사전 신청으로 받고 있습니다.</p>
      </div>
      <div class="onsite-grid reveal">
        <div class="onsite-panel">
          <span class="lbl">On-site Checklist</span>
          <h3>원격이 못 보는 여덟 가지</h3>
          <ul class="onsite-list">
            ${ONSITE_ONLY.slice(0, 6).map((t) => `<li>${t}</li>`).join('\n            ')}
          </ul>
          <p class="onsite-panel__foot">위 항목 외 <b>가시성·주차·주변 공실</b>까지 — 육안 관찰과 비파괴 측정 범위에서 확인하고, 은폐부·구조 안전은 전문 기관 검토를 안내해 드립니다.</p>
        </div>
        <figure class="onsite-photo"><img src="/assets/img/photos/onsite.webp" alt="비어 있는 1층 상가 내부에서 태블릿을 들고 공간 상태를 확인하는 두 사람" loading="lazy" width="1200" height="941"></figure>
      </div>
      <div class="btn-row reveal">
        <a class="btn btn--primary" href="/products/onsite/">현장 점검 알아보기</a>
        <a class="btn btn--ghost" href="/apply/#onsite">사전 신청하기</a>
      </div>
    </div>
  </section>

  <!-- 10. B2B -->
  <section class="section section--alt section--tight" aria-labelledby="b2b-title">
    <div class="container">
      <div class="partner-band reveal">
        <div class="section-head" style="margin-bottom:0;">
          <p class="eyebrow">B2B · Partnership</p>
          <h2 class="h1" id="b2b-title">데이터로 연결하고,<br><em>인사이트로 성장하는 파트너십</em></h2>
          <p class="lead">같은 진단 체계를 조직의 언어로 제공합니다. 후보지 검토부터 상권 단위 공실 진단까지 — 공간에 대한 다각도 분석과 의사결정 지원으로 더 나은 선택을 함께 만듭니다.</p>
        </div>
        <div class="partner-cols">
          <div class="partner"><span class="partner__icon">${I.fr}</span><div><b>프랜차이즈</b><p>출점 전략 · 후보지 일괄 검토 · 상권 분석과 영업 가능성 확인</p></div></div>
          <div class="partner"><span class="partner__icon">${I.broker}</span><div><b>중개 · 자산관리</b><p>매물 진단 리포트 · 고객 설득 자료 · 임대 조건의 근거 제시</p></div></div>
          <div class="partner"><span class="partner__icon">${I.gov}</span><div><b>지자체 · 공공</b><p>지역 상권 공실 진단 · 정책 수립 참고 분석 · 유휴 공간 활용 검토</p></div></div>
        </div>
        <div class="btn-row">
          <a class="btn btn--dark" href="/b2b/">B2B·제휴 안내 보기</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 11. 최종 CTA -->
  <section class="section final-cta" aria-labelledby="cta-title">
    <div class="container">
      <div class="section-head section-head--center reveal">
        <p class="eyebrow" style="justify-content:center;">지금 시작하기</p>
        <h2 class="h1" id="cta-title">주소 하나로 시작해 보세요</h2>
        <p class="lead">3분이면 방향과 위험 신호, 그리고 아직 확인되지 않은 항목이 보입니다.</p>
        <div class="btn-row">
          <a class="btn btn--primary btn--lg" href="/check/">3분 무료 진단 시작하기</a>
          <a class="btn btn--ghost btn--lg" href="/contact/">궁금한 점 문의하기</a>
        </div>
        <div class="final-cta__meta">
          <span>회원가입 없이 시작</span><span>응답은 저장되지 않습니다</span><span>결과에는 근거와 한계가 함께 적힙니다</span>
        </div>
      </div>
    </div>
  </section>
  `;

  return {
    path: entry.path,
    title: entry.title,
    description: entry.desc,
    ogTitle: 'BLANK SPACE INDEX — 왜 그런지, 그래서 무엇을 해야 하는지',
    body,
    bodyClass: 'page-home',
  };
};
