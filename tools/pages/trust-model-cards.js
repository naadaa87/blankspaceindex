/**
 * Model Card — 지수별 한 장 규격 (6.5절)
 * 목적 · 적용 범위 · 사용 데이터 · 한계 · 검증 상태 · 버전 이력
 */
const { INDEXES, BADGES } = require('../data/registry');
const { CONTENT, SOURCES } = require('../data/index-content');

const SCOPE = {
  vacancy: '임대 목적의 상업용 공간(점포·사무 구획). 문의·방문 흐름 데이터가 없으면 응답 기반 한계가 명시됩니다.',
  rent: '상업용 임대 공간의 조건 진단. 감정평가액·확정가·보증가 용도로는 사용할 수 없습니다.',
  business: '공부(公簿) 기준의 사전 스크리닝. 인허가의 최종 판단 권한은 관할 기관에 있습니다.',
  smfi: '공간의 수익화 모델 검토. 투자 권유가 아니며 수익을 보장하지 않습니다.',
};
const { VERSIONS } = require('../data/versions');

const card = (ix) => {
  const c = CONTENT[ix.slug];
  const b = BADGES[ix.badge];
  return `
  <article class="mc reveal" id="${ix.slug}">
    <header class="mc__head">
      <div><h2 class="h2">${ix.name}</h2><span class="code-tag">${ix.code} ${ix.version}</span></div>
      <span class="badge badge--${ix.badge}">${b.label}</span>
    </header>
    <dl class="mc__grid">
      <div><dt>목적</dt><dd>${ix.question} — ${ix.oneLiner}</dd></div>
      <div><dt>적용 범위</dt><dd>${SCOPE[ix.slug]}</dd></div>
      <div><dt>사용 데이터</dt><dd>${c.sources.map((k) => SOURCES[k].name).join(' · ')} + 사용자 응답${ix.slug === 'smfi' ? ' · 제출 자료' : ''}. 수집 기준시점은 결과에 병기됩니다.</dd></div>
      <div><dt>한계</dt><dd><ul>${c.limits.map((l) => `<li>${l}</li>`).join('')}</ul></dd></div>
      <div><dt>검증 상태</dt><dd>${b.ko}(${b.label}) 단계 — ${b.desc || '전문가 설계와 공인 방법론 기반, 실측 보정 진행 예정'}. 진행 상황은 <a href="/trust/validation/">검증 현황</a>에 반영됩니다.</dd></div>
      <div><dt>버전 이력</dt><dd><ul class="mc__ver">${VERSIONS[ix.slug].map(([v, n]) => `<li><b class="num">${v}</b>${n}</li>`).join('')}</ul></dd></div>
    </dl>
  </article>`;
};

module.exports = (entry) => {
  const open4 = INDEXES.filter((i) => i.status === 'available');
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">신뢰와 검증 · Model Card</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);max-width:800px;">무엇을 계산하고,<br>무엇을 계산하지 않는가</h1>
      <p class="hero__sub" style="max-width:680px;">지수마다 목적, 적용 범위, 사용하는 데이터, 한계, 검증 상태, 버전 이력을 한 장 규격으로 밝힙니다. 지금은 오픈 4종을 게시하며, 지수가 더해질 때마다 이 목록이 늘어납니다. 구조는 공개하되 세부 가중치와 파라미터는 공개하지 않습니다.</p>
      <div class="hero__tags">${open4.map((i) => `<a href="#${i.slug}" style="color:var(--teal);font-weight:600;font-size:14px;"># ${i.name}</a>`).join('')}</div>
    </div>
  </section>
  <section class="section section--alt">
    <div class="container">
      <div class="mc-list">
        ${open4.map(card).join('\n        ')}
      </div>
      <div class="notice reveal" style="margin-top:26px;"><p><strong>버전 관리</strong> — 판정 경계값과 산식의 조정은 실측 근거가 쌓이는 시점부터 이뤄지며, 조정 이력은 버전으로 관리되어 이 카드에 남습니다.</p></div>
    </div>
  </section>`;

  return { path: entry.path, title: entry.title, description: entry.desc, body, docMeta: { id: 'BSI-DOC-MC', date: '2026-08' },
    bodyClass: 'page-model-cards' };
};
