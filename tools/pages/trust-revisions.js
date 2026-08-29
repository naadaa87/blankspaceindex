/**
 * 개정 이력 — 지수 버전의 총괄 기록
 * 신용평가사의 방법론 변경 로그 관행을 따른다. versions.js 한 곳을 고치면
 * Model Card와 이 페이지가 함께 갱신된다.
 */
const { VERSIONS } = require('../data/versions');
const { INDEXES } = require('../data/registry');

module.exports = (entry) => {
  const open4 = INDEXES.filter((i) => i.status === 'available');
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">신뢰와 검증 · 개정 이력</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);max-width:800px;">산식이 바뀌면,<br>그 사실이 여기 남습니다</h1>
      <p class="hero__sub" style="max-width:680px;">판정 경계값과 산출 규칙의 조정은 근거와 함께 버전으로 기록됩니다. 이미 발행된 결과지는 발행 당시의 버전을 따르며, 개정으로 소급 변경되지 않습니다.</p>
    </div>
  </section>
  <section class="section section--alt">
    <div class="container" style="max-width:900px;">
      ${open4.map((ix) => `
      <div class="rev-block reveal">
        <h2 class="h2">${ix.name} <span class="code-tag">${ix.code}</span></h2>
        <ol class="rev-list">
          ${VERSIONS[ix.slug].map(([v, note], i) => `<li class="${i === 0 ? 'is-current' : ''}"><span class="rev-list__v num">${v}</span><div><p>${note}</p>${i === 0 ? '<span class="chip chip--green">현행</span>' : ''}</div></li>`).join('')}
        </ol>
      </div>`).join('')}
      <div class="tier-grid reveal" style="margin-top:12px;">
        ${[
          ['사전 고지', '이용에 영향을 주는 개정은 시행 전에 이 페이지와 공지로 알립니다.'],
          ['근거의 기록', '무엇을, 왜 바꿨는지의 요지를 버전마다 남깁니다. 보정 근거는 검증 현황과 연결됩니다.'],
          ['불소급 원칙', '발행된 결과지는 발행 시점의 버전 규칙을 따릅니다. 개정이 기존 판정을 바꾸지 않습니다.'],
        ].map(([t, d]) => `<div class="tier"><b>${t}</b><p>${d}</p></div>`).join('')}
      </div>
      <div class="btn-row reveal"><a class="btn btn--ghost" href="/trust/model-cards/">Model Card에서 버전별 규격 보기</a><a class="btn btn--ghost" href="/trust/validation/">검증 현황 보기</a></div>
    </div>
  </section>`;

  return {
    path: entry.path, title: entry.title, description: entry.desc, body,
    bodyClass: 'page-revisions',
    docMeta: { id: 'BSI-DOC-RV', date: '2026-08' },
  };
};
