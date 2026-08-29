/**
 * 지수 상세 — 공통 템플릿 (제작지시서 6.3절, 열 개 절)
 * 이용 가능 4종: 히어로 → 이런 분께 → 무엇을 진단하나 → Standard와 Pro
 *              → 결과지 미리보기 → 신뢰와 한계 → 데이터 출처 → 가격과 절차
 *              → FAQ 발췌 → 다음 단계
 * 준비 중 4종: 히어로 → 답하게 될 질문 → 지금 단계 → 출시 알림 → 지금 이용 가능한 관련 지수
 */
const { INDEXES, BADGES, PICTOGRAMS } = require('../data/registry');
const { CONTENT, SOURCES } = require('../data/index-content');
const { SITE, NOTICES } = require('../data/site');
const { pipeline } = require('./figures');

const badgeBtn = (key) => {
  const b = BADGES[key];
  return `<button type="button" class="badge badge--${key}" data-badge="${key}" title="${b.ko} — 설명 보기">${b.label}</button>`;
};

const verdictChip = ([label, tone]) => `<span class="verdict verdict--${tone}">${label}</span>`;

/* ── 결과지 미리보기 스페시먼 ── */
const SPECIMENS = {
  /* SVDI — 원인 후보 2 + 확인 순서 */
  causes: () => `
    <div class="spec-card" role="img" aria-label="공실 원인 진단 결과 화면 예시">
      <div class="spec-card__bar"><span class="lbl">Result Preview</span><span class="code-tag">SVDI 1.1 · Standard</span></div>
      <div class="spec-card__body">
        <p class="spec-card__line">입력하신 조건이 맞다면, 원인은 아래 두 축에 있을 가능성이 큽니다.</p>
        <div class="spec-causes">
          <div class="spec-cause"><span class="lbl" style="color:var(--teal);">후보 1 · 가격 축</span><b>유효 조건이 시장 범위 상단을 벗어나 있습니다</b></div>
          <div class="spec-cause"><span class="lbl" style="color:var(--teal);">후보 2 · 노출 축</span><b>최근 60일 신규 문의 없음 — 매물이 닿지 않고 있습니다</b></div>
        </div>
        <div class="spec-order">
          <span class="lbl">확인 순서</span>
          <ol><li>등가 조합으로 조건 재구성</li><li>노출 채널 점검</li><li>현장 정면성 확인</li></ol>
        </div>
        <p class="spec-unresolved"><b>확인되지 않은 항목</b> — 설비 상태는 이번 진단에서 확인되지 않았습니다. 현장 확인이 필요한 항목으로 남겨 두었습니다.</p>
      </div>
      <div class="spec-card__foot"><span>예시 화면 · 실제 데이터가 아닙니다</span><span>결과지 4면</span></div>
    </div>`,

  /* SRVI — 밴드 위의 위치 + 등가 조합 + 신뢰도 */
  range: () => `
    <div class="spec-card" role="img" aria-label="적정임대료 진단 결과 화면 예시">
      <div class="spec-card__bar"><span class="lbl">Result Preview</span><span class="code-tag">SRVI 2.1 · Standard</span></div>
      <div class="spec-card__body">
        <div class="spec-range">
          <span class="lbl">시장 밴드 위의 내 위치 <em style="font-style:normal;color:var(--slate);">· 유효임대료 기준</em></span>
          <div class="spec-range__bar">
            <span class="spec-range__zone" style="left:18%;width:56%;"></span>
            <span class="spec-range__me" style="left:66%;"><i></i>현재 조건</span>
            <span class="spec-range__tick" style="left:18%;">하단</span>
            <span class="spec-range__tick" style="left:74%; transform:translateX(-100%);">상단</span>
          </div>
          <p class="spec-card__line" style="margin-top:14px;">현재 조건은 시장 범위 안, 상단에 가깝습니다. <span class="verdict verdict--warn" style="vertical-align:middle;">판정 · 상단 주의</span></p>
        </div>
        <div class="spec-equiv">
          <span class="lbl">동등한 조건 조합</span>
          <div class="spec-equiv__row"><em>명목 유지안</em><span>보증금 조정 + 렌트프리 1개월</span></div>
          <div class="spec-equiv__row"><em>렌트프리 포함안</em><span>명목 인하 없이 실질 부담 동일</span></div>
        </div>
        <div class="spec-conf"><span class="lbl">신뢰도 C</span><span class="spec-conf__track"><span style="width:71%"></span></span><b class="num">71</b><small>발행 기준 60 이상 충족</small></div>
      </div>
      <div class="spec-card__foot"><span>예시 화면 · 실제 데이터가 아닙니다</span><span>결과지 5면</span></div>
    </div>`,

  /* SCPI — 8관문 신호등 */
  gates: () => {
    const g = [
      ['용도지역', 'ok', 'CLEAR'],
      ['건물 용도', 'ok', 'CLEAR'],
      ['위반 표기', 'ok', 'CLEAR'],
      ['정화조', 'warn', 'CONDITIONAL'],
      ['주차', 'ok', 'CLEAR'],
      ['소방·피난', 'neutral', 'UNVERIFIED'],
      ['학교 주변', 'ok', 'CLEAR'],
      ['지역 규정', 'neutral', 'UNVERIFIED'],
    ];
    return `
    <div class="spec-card" role="img" aria-label="영업 가능성 확인 결과 화면 예시">
      <div class="spec-card__bar"><span class="lbl">Result Preview</span><span class="code-tag">SCPI 1.1 · Standard</span></div>
      <div class="spec-card__body">
        <p class="spec-card__line">목표 업종 <b>일반음식점</b> — 여덟 관문 중 다섯이 통과, 셋이 확인 대상입니다.</p>
        <div class="spec-gates">
          ${g.map(([n, tone, s]) => `<div class="spec-gate spec-gate--${tone}"><i></i><b>${n}</b><span>${s}</span></div>`).join('')}
        </div>
        <p class="spec-card__line"><span class="chip">CLEAR 라벨 · 대장 기준</span> <span class="chip chip--muted">관할 확인 전</span></p>
        <p class="spec-unresolved"><b>관할에 물을 질문</b> — "이 지번의 오수 처리 용량으로 일반음식점 ○○㎡ 허가가 가능한가요?" 문장을 그대로 드립니다.</p>
      </div>
      <div class="spec-card__foot"><span>예시 화면 · 실제 데이터가 아닙니다</span><span>결과지 5면</span></div>
    </div>`;
  },

  /* SMFI — 밝은 스코어카드 */
  smfi: () => `
    <div class="spec-card" role="img" aria-label="공간수익화 적합성 평가 결과 화면 예시">
      <div class="spec-card__bar"><span class="lbl">Result Preview</span><span class="code-tag">SMFI 2.1</span></div>
      <div class="spec-card__body">
        <div class="spec-score">
          <div><span class="lbl">종합 적합 점수</span><div class="spec-score__num num">82.4<small>/100</small></div></div>
          <span class="verdict verdict--ok">판정 · 적합</span>
        </div>
        <div class="spec-models">
          <span class="lbl">모델별 적합도 상위</span>
          ${[
            ['공유형 모임 공간', 86],
            ['예약제 스튜디오', 79],
            ['소형 F&B 전환', 64],
          ]
            .map(
              ([m, v]) => `<div class="spec-model"><em>${m}</em><span class="spec-model__track"><span style="width:${v}%"></span></span><b class="num">${v}</b></div>`
            )
            .join('')}
        </div>
        <p class="spec-card__line"><span class="lbl">경제성 검증</span> 상위 모델 기준 손익분기 가동률이 검증 범위 안에 있습니다. 민감도 표는 결과지에 수록됩니다.</p>
      </div>
      <div class="spec-card__foot"><span>예시 화면 · 실제 데이터가 아닙니다</span><span>심층 리포트</span></div>
    </div>`,
};

/* ── 3절 "무엇을 진단하나" 본문 ── */
const methodBlock = (m) => {
  if (m.kind === 'axes') {
    return `
      <p class="lead">${m.intro}</p>
      <div class="axes-grid">${m.axes.map((a, i) => `<span class="axis"><i class="num">${String(i + 1).padStart(2, '0')}</i>${a}</span>`).join('')}</div>
      <div class="notice" style="margin-top:26px;"><p>${m.cap}</p></div>`;
  }
  if (m.kind === 'tracks') {
    return `
      <p class="lead">${m.intro}</p>
      <div class="tracks">${m.tracks
        .map((t, i) => `<div class="track-card"><span class="lbl">Track ${i + 1}</span><b>${t.t}</b><p>${t.d}</p></div>`)
        .join('<span class="track-plus" aria-hidden="true">+</span>')}</div>
      <div class="notice" style="margin-top:26px;"><p>${m.cap}</p></div>`;
  }
  if (m.kind === 'gates') {
    return `
      <p class="lead">${m.intro}</p>
      <ol class="gate-line">${m.gates.map((g) => `<li>${g}</li>`).join('')}</ol>
      <div class="state-row">${m.states.map(verdictChip).join('')}</div>
      <div class="notice" style="margin-top:26px;"><p>${m.cap}</p></div>`;
  }
  /* pipeline (SMFI) */
  return `
    <p class="lead">${m.intro}</p>
    <figure class="layer-figure" style="margin-top:28px;">${pipeline()}</figure>
    <div class="state-row" style="margin-top:24px;">${m.bands.map(verdictChip).join('')}</div>
    <div class="notice" style="margin-top:26px;"><p>${m.cap}</p></div>`;
};

/* ── 준비 중 변형 ── */
const preparingPage = (ix, c) => `
  <section class="dhero dhero--prep">
    <div class="container">
      <p class="eyebrow">준비 중인 지수</p>
      <div class="dhero__grid">
        <div>
          <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);">${ix.question}</h1>
          <p class="dhero__name">${ix.name} <span class="code-tag">${ix.code}${ix.version ? ' ' + ix.version : ''}</span> ${badgeBtn(ix.badge)} <span class="chip chip--muted">준비 중</span></p>
          <p class="hero__sub" style="max-width:640px;">${c.lede}</p>
        </div>
      </div>
    </div>
  </section>
  <section class="section section--alt">
    <div class="container">
      <div class="grid-2" style="display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:56px;align-items:start;">
        <div>
          <p class="eyebrow">이 지수가 답하게 될 질문</p>
          <ul class="will-list">${c.willAnswer.map((w) => `<li>${w}</li>`).join('')}</ul>
          <p class="eyebrow" style="margin-top:44px;">지금은 어느 단계인가</p>
          <p class="lead" style="margin-top:0;">${c.stage}</p>
          <div class="notice" style="margin-top:24px;"><p><strong>검증되지 않은 지수는 출시하지 않습니다.</strong> 설계 → 파일럿 → 보정의 단계를 거친 뒤 공개하며, 진행 상태는 검증 현황 페이지에서 그대로 보실 수 있습니다.</p></div>
        </div>
        <aside class="prep-card">
          <span class="lbl">출시 알림</span>
          <h3>열리면 알려 드릴까요?</h3>
          <p>준비가 끝나는 대로 이메일로 안내드립니다. 알림 신청은 문의 페이지에서 지수 이름과 함께 남겨 주세요.</p>
          <a class="btn btn--primary" href="/contact/">출시 알림 신청하기</a>
          <a class="btn btn--ghost" href="/trust/validation/">검증 현황 보기</a>
        </aside>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <p class="eyebrow">지금 이용할 수 있는 관련 진단</p>
      <div class="next-cards">
        ${c.related.map((n) => `<a class="next-card" href="${n.href}"><b>${n.t}</b><p>${n.d}</p><span class="index-card__cta">바로 가기</span></a>`).join('')}
      </div>
    </div>
  </section>`;

/* ── 메인 렌더 ── */
module.exports = function renderIndexDetail(entry, slug) {
  const ix = INDEXES.find((i) => i.slug === slug);
  const c = CONTENT[slug];

  const body = c.preparing
    ? preparingPage(ix, c)
    : `
  <!-- 1. 히어로 -->
  <section class="dhero">
    <div class="container">
      <div class="dhero__grid">
        <div>
          <p class="eyebrow">${slug === 'smfi' ? '본 평가' : '셀프 진단 · Standard'} — 지금 이용 가능</p>
          <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);">${ix.question}</h1>
          <p class="dhero__name">${ix.name} <span class="code-tag">${ix.code} ${ix.version}</span> ${badgeBtn(ix.badge)}</p>
          <p class="hero__sub">${c.lede}</p>
          <div class="btn-row">
            ${
              slug === 'smfi'
                ? `<a class="btn btn--primary btn--lg" href="/apply/#smfi">본 평가 상담하기</a>
                   <a class="btn btn--ghost btn--lg" href="/check/">3분 무료 진단부터</a>`
                : `<a class="btn btn--primary btn--lg" href="/apply/#pro">Standard 시작하기</a>
                   <a class="btn btn--ghost btn--lg" href="/apply/#pro">전문가 진단(Pro) 문의</a>`
            }
          </div>
          <div class="dhero__meta">
            ${
              ix.standard
                ? `<span>${ix.standard.time}</span><span>${ix.standard.report}</span>`
                : `<span>케이스형 · 범위 확정 후 견적</span><span>${ix.pro.remote}</span>`
            }
          </div>
        </div>
        <div class="dhero__spec">${SPECIMENS[c.specimen]()}</div>
      </div>
    </div>
  </section>

  <!-- 2. 이런 분께 -->
  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">이런 분께</p><h2 class="h1">이 진단이 필요한 순간</h2></div>
      <div class="aud-grid">
        ${c.audiences.map((a) => `<div class="aud reveal"><b>${a.t}</b><p>${a.d}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <!-- 3. 무엇을 진단하나 -->
  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">무엇을 진단하나</p><h2 class="h1">평가의 구조를 공개합니다</h2></div>
      <div class="reveal">${methodBlock(c.method)}</div>
      <p class="muted" style="margin-top:18px;">구조는 공개하되 세부 가중치와 파라미터는 공개하지 않습니다. 무엇을 계산하고 무엇을 계산하지 않는지는 <a href="/trust/model-cards/" style="color:var(--teal);font-weight:600;">Model Card</a>에 정리되어 있습니다.</p>
    </div>
  </section>

  <!-- 4. Standard와 Pro -->
  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">Standard와 Pro</p><h2 class="h1">두 버전의 약속 수준</h2>
        <p class="lead">Standard는 응답 기반으로 즉시 계산되는 셀프 진단이고, Pro는 자료를 검증하고 평가자가 검토·서명하는 전문가 진단입니다.</p></div>
      <div class="sp-wrap reveal">
        <table class="table sp-table">
          <thead><tr><th style="width:16%;"></th><th><span class="chip">Standard · 셀프</span></th><th><span class="chip chip--green">Pro · 전문가</span></th></tr></thead>
          <tbody>
            ${c.compare.map(([k, s, p]) => `<tr><th scope="row">${k}</th><td>${s}</td><td>${p}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- 5. 결과지 미리보기 -->
  <section class="section">
    <div class="container">
      <div class="grid-2" style="display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:56px;align-items:start;">
        <div class="reveal">
          <p class="eyebrow">결과지 미리보기</p>
          <h2 class="h1">무엇을 받게 되나</h2>
          <ol class="report-toc">${c.report.pages.map((p) => `<li>${p}</li>`).join('')}</ol>
          <div class="notice" style="margin-top:24px;"><p>${c.report.note}</p></div>
        </div>
        <div class="reveal">${SPECIMENS[c.specimen]()}</div>
      </div>
    </div>
  </section>

  <!-- 6. 신뢰와 한계 -->
  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">신뢰와 한계</p><h2 class="h1">이 지수가 스스로 지키는 절제</h2>
      <p class="lead">현재 검증 단계는 ${badgeBtn(ix.badge)} 입니다. 배지를 누르면 단계의 뜻을 볼 수 있고, 상태는 검증이 진행되는 대로 갱신됩니다.</p></div>
      <ul class="limit-list reveal">${c.limits.map((l) => `<li>${l}</li>`).join('')}</ul>
      <div class="quote-bar reveal" style="margin-top:26px;"><span class="quote-bar__mark">“</span><p>확인되지 않은 항목이 남아 있다면, 그 사실이 결과지에 그대로 적힙니다.<small>리포트 공통 규격</small></p></div>
    </div>
  </section>

  <!-- 7. 데이터 출처 -->
  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">데이터 출처</p><h2 class="h1">무엇을 근거로 계산하나</h2>
      <p class="lead">공공 데이터는 수집 기준시점을 결과에 함께 표기합니다. 분기 통계는 기준 분기가, 실거래는 수집 시점이 명시됩니다.</p></div>
      <div class="src-grid reveal">
        ${c.sources.map((k) => `<div class="src"><b>${SOURCES[k].name}</b><p>${SOURCES[k].use}</p><span class="code-tag">${SOURCES[k].org}</span></div>`).join('')}
      </div>
    </div>
  </section>

  <!-- 8. 가격과 절차 -->
  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">가격과 절차</p><h2 class="h1">진행은 이렇게 됩니다</h2></div>
      <div class="price-duo reveal">
        <div class="price-box">
          <span class="chip">Standard</span>
          <b>${slug === 'smfi' ? '케이스형 · 견적' : '확정가 · 즉시 결제'}</b>
          <p>${
            slug === 'smfi'
              ? '본 평가는 공간의 규모와 범위를 확인한 뒤 견적으로 진행합니다. 상담에서 범위·납기·비용을 먼저 확정해 드립니다.'
              : '확정 가격은 상품·가격 페이지에 표시됩니다. 결제 전 입력 요약을 확인하며, 결과 계산 전에는 전액 환불됩니다.'
          }</p>
          <a class="link-arrow" href="/products/">상품·가격 보기</a>
        </div>
        <div class="price-box">
          <span class="chip chip--green">공제</span>
          <b>진단 비용은 사라지지 않습니다</b>
          <p>Standard 결제액은 같은 지수의 Pro 전환 시 전액 공제되고, 유료 진단 비용은 이후 블랭크와의 개선·시공·운영 프로젝트 계약 시 공제됩니다.</p>
          <a class="link-arrow" href="/products/#credit">공제 안내 보기</a>
        </div>
      </div>
      <ol class="proc-steps reveal">
        ${(slug === 'smfi'
          ? ['상담 신청 — 공간·상황 공유', '범위·견적 확정', '자료 제출과 평가 수행', '리포트 발행과 보고', '다음 단계 — 현장·실행 연계']
          : ['주소 입력 — 대장 자동 채움', `문항 응답 — ${ix.standard.time}`, '결제 — 입력 요약 확인 후', '즉시 계산과 결과 화면', '결과지 발행 — 리포트함 저장']
        )
          .map((s, i) => `<li><i class="num">${i + 1}</i>${s}</li>`)
          .join('')}
      </ol>
    </div>
  </section>

  <!-- 9. FAQ 발췌 -->
  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">자주 묻는 질문</p><h2 class="h1">이 진단에 대해 가장 많이 묻는 것</h2></div>
      <div class="faq-mini reveal">
        ${c.faqs.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}
      </div>
      <a class="link-arrow" href="/faq/">전체 FAQ 보기</a>
    </div>
  </section>

  <!-- 10. 다음 단계 -->
  <section class="section section--alt section--tight">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">다음 단계</p><h2 class="h1">여기서 이어지는 길</h2></div>
      <div class="next-cards reveal">
        ${c.next.map((n) => `<a class="next-card" href="${n.href}"><b>${n.t}</b><p>${n.d}</p><span class="index-card__cta">바로 가기</span></a>`).join('')}
      </div>
      <div class="btn-row reveal">
        ${
          slug === 'smfi'
            ? `<a class="btn btn--primary btn--lg" href="/apply/#smfi">본 평가 상담하기</a>`
            : `<a class="btn btn--primary btn--lg" href="/apply/#pro">Standard 시작하기</a>`
        }
        <a class="btn btn--ghost btn--lg" href="/check/">3분 무료 진단부터 해 보기</a>
      </div>
    </div>
  </section>`;

  const ldService = c.preparing ? null : {
    '@context': 'https://schema.org', '@type': 'Service',
    name: ix.name, serviceType: '상업용 공간 진단',
    description: ix.oneLiner,
    provider: { '@type': 'Organization', name: '주식회사 블랭크 · BLANK SPACE INDEX' },
    areaServed: 'KR', url: SITE.origin + entry.path,
  };
  const ldBc = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '지수 체계', item: SITE.origin + '/about-index/' },
      { '@type': 'ListItem', position: 2, name: ix.name, item: SITE.origin + entry.path },
    ],
  };
  return {
    path: entry.path,
    title: `${ix.name} — ${ix.question}`,
    description: ix.oneLiner,
    ogTitle: `${ix.name} · ${SITE.name}`,
    body,
    bodyClass: `page-index page-index-${slug}`,
    extraHead: `${ldService ? `<script type="application/ld+json">${JSON.stringify(ldService)}</script>` : ''}<script type="application/ld+json">${JSON.stringify(ldBc)}</script>`,
  };
};
