/**
 * 실적·레퍼런스 — 6.6절
 * 위층: 수행 역량의 증거(실행 실적). 아래층: 평가 체계의 증거가 채워질 자리.
 * 두 층을 섞지 않는다. 실적이 산식의 정확성을 보증한다는 연결 문장은 쓰지 않는다.
 */
const { TRACK } = require('../data/site');

const CASES = [
  { img: 'case-retail', no: '01', title: '임대 문의가 끊긴 1층 근생, 모임 공간으로', desc: '원인을 진단해 용도를 바꾸고 파티룸으로 기획·시공한 뒤 직접 운영에 올렸습니다. 전국 약 120개 지점으로 이어진 방식의 출발점입니다.', brand: 'SSOFLE PARTYROOM' },
  { img: 'case-asset', no: '02', title: '쓰임이 애매했던 상층부, 예약 기반 공간으로', desc: '접근성이 약한 상층부를 수요가 확인된 모임·행사 용도로 재구성하고 예약 기반 운영으로 전환했습니다.', brand: 'MINGLE' },
  { img: 'case-office', no: '03', title: '진단에서 실행까지, 한 회사가', desc: '개선·시공·오픈·운영을 같은 회사가 이어서 수행합니다. 진단이 정직해야 실행 의뢰가 온다는 것이 이 구조의 전제입니다.', brand: '공백 空白' },
];

module.exports = (entry) => {
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">실적 · 레퍼런스</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);max-width:820px;">실행의 기록과,<br>검증이 채워질 자리</h1>
      <p class="hero__sub" style="max-width:700px;">이 페이지는 두 층입니다. 위층은 2015년부터 직접 수행해 온 실행의 기록이고, 아래층은 평가 체계의 검증 증거가 쌓이는 대로 채워질 자리입니다. 두 층을 섞어 말하지 않습니다.</p>
    </div>
  </section>

  <!-- 위층 · 실행 실적 -->
  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">위층 · 실행 실적</p><h2 class="h1">만들어 온 기록</h2></div>
      <ol class="timeline reveal">
        ${[
          ['2015', '첫 공간 — 비어 있는 상업 공간의 직접 기획·시공·운영을 시작'],
          ['2016~', '쏘플파티룸 — 1층 근생 전환 모델을 전국 약 120개 지점으로 직접 확장'],
          ['이후', 'MINGLE 등 — 상층부·유휴 공간의 예약 기반 운영 모델 확장, 누적 340여 개 공간 수행'],
          ['2026', 'BLANK SPACE INDEX — 현장의 판단 기준을 평가 체계로 정리해 공개'],
        ].map(([y, d]) => `<li><span class="timeline__year num">${y}</span><p>${d}</p></li>`).join('')}
      </ol>
      <div class="metric-grid reveal" style="margin-top:44px;">
        ${[TRACK.years, TRACK.spaces, TRACK.branches, TRACK.perf].map(
          (t, i) => `<div class="metric"><div class="metric__lbl"><span class="lbl">${['Experience', 'Spaces', 'Branches', 'Performance'][i]}</span></div><div class="metric__num num">${t.num}<small>${t.unit}</small></div><p class="metric__sub"><b style="color:var(--ink);font-weight:600;">${t.label}</b></p></div>`
        ).join('')}
      </div>
      <p class="metric-footnote reveal">${TRACK.perfFootnote}</p>
      <div class="case-grid reveal" style="margin-top:44px;">
        ${CASES.map((c) => `<article class="case-card"><div class="case-card__media"><img src="/assets/img/photos/${c.img}.webp" alt="" loading="lazy" width="820" height="434"><span class="case-card__no num">${c.no}</span></div><div class="case-card__body"><h3>${c.title}</h3><p class="case-card__desc">${c.desc}</p><div class="case-card__foot"><span class="muted" style="font-size:12.5px;">익명 원칙 · 상세는 상담에서</span><span class="case-card__brand">${c.brand}</span></div></div></article>`).join('')}
      </div>
    </div>
  </section>

  <!-- 구분 밴드 -->
  <section class="section section--tight">
    <div class="container">
      <div class="quote-bar reveal"><span class="quote-bar__mark">“</span><p>실적은 수행 역량의 검증으로, 산식은 보정이 진행 중인 예측 도구로 구분해 말합니다.<small>표현 규칙 — 실행 실적이 점수의 정확성을 보증한다는 문장은 쓰지 않습니다</small></p></div>
    </div>
  </section>

  <!-- 아래층 · 평가 체계의 증거 -->
  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">아래층 · 평가 체계의 증거</p><h2 class="h1">여기는 아직 비어 있습니다</h2>
      <p class="lead">진단 사례가 쌓이고 동의를 얻는 대로, 그리고 검증 조건이 충족되는 대로 아래 세 칸이 채워집니다. 빈칸을 미리 보여 드리는 것이 저희 방식입니다.</p></div>
      <div class="next-cards">
        ${[
          ['익명 진단 사례', '동의를 얻은 진단 케이스의 익명 해설 — 입력·판정·이후 경과', '동의 확보 건부터 게시'],
          ['예비-정밀 대조', '자가진단 예비 점수와 정밀 점수의 차이가 어느 지표에서 났는지의 대조표', '정밀 진단 축적 후 게시'],
          ['판정 분포', '적합·조건부·보류·부적합의 비율 — 검증 현황의 공시와 연동', '표본 규모 도달 시 게시'],
        ].map(([t, d, s]) => `<div class="placeholder reveal"><h3>${t}</h3><p>${d}</p><span class="chip chip--muted">${s}</span></div>`).join('')}
      </div>
      <div class="btn-row reveal"><a class="btn btn--ghost" href="/trust/validation/">검증 현황 보기</a><a class="btn btn--primary" href="/check/">3분 무료 진단 시작하기</a></div>
    </div>
  </section>`;

  return { path: entry.path, title: entry.title, description: entry.desc, body, bodyClass: 'page-works' };
};
