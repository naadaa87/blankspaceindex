/**
 * 데이터와 출처 — 공공 데이터 카탈로그 전체와 기준시점 정책
 * 지수별로 흩어져 있던 출처를 한 표로 모으고, 데이터가 결과에 닿기까지의
 * 취급 규칙(기준시점 병기 · 시차 고지 · 역할 한정)을 명문화한다.
 */
const { SOURCES } = require('../data/index-content');
const { INDEXES } = require('../data/registry');
const { CONTENT } = require('../data/index-content');

module.exports = (entry) => {
  const open4 = INDEXES.filter((i) => i.status === 'available');
  const usedBy = (key) => open4.filter((ix) => CONTENT[ix.slug].sources.includes(key)).map((ix) => ix.code).join(' · ') || '—';
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">신뢰와 검증 · 데이터와 출처</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);max-width:820px;">무엇을 근거로 계산하는지,<br>전부 여기에 있습니다</h1>
      <p class="hero__sub" style="max-width:680px;">여덟 개의 공공·공개 데이터가 이 체계의 원료입니다. 어떤 데이터를 어느 지수가 어떤 역할로 쓰는지, 그리고 데이터가 결과에 닿기까지 지키는 규칙을 밝힙니다.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="sp-wrap reveal">
        <table class="table sp-table">
          <thead><tr><th>데이터</th><th>역할</th><th style="width:16%;">쓰는 지수</th><th style="width:22%;">제공</th></tr></thead>
          <tbody>
            ${Object.keys(SOURCES).map((k) => `<tr><th scope="row">${SOURCES[k].name}</th><td>${SOURCES[k].use}</td><td>${usedBy(k)}</td><td>${SOURCES[k].org}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="tier-grid reveal" style="margin-top:36px;">
        ${[
          ['기준시점 병기', '모든 결과에는 데이터의 수집·집계 시점이 함께 인쇄됩니다. 분기 통계는 기준 분기가, 실거래는 수집일이 표기됩니다.'],
          ['시차의 고지', '실거래 신고와 통계 공표에는 시차가 있습니다. 시차가 판단에 영향을 줄 수 있는 지점은 결과지에 그대로 적습니다.'],
          ['역할의 한정', '상권 보조 신호처럼 역할을 한정해 쓰는 데이터는 그 한계를 넘겨 해석하지 않습니다. 데이터가 말하지 않는 것을 말하게 하지 않습니다.'],
        ].map(([t, d]) => `<div class="tier"><b>${t}</b><p>${d}</p></div>`).join('')}
      </div>
      <div class="notice reveal" style="margin-top:26px;"><p><strong>사용자 입력과의 결합</strong> — 공공 데이터가 채우지 못하는 자리는 이용자의 응답과 제출 자료가 채웁니다. 응답 기반 항목은 결과지에 "응답 기준"으로 구분 표기되며, 무료 진단의 응답은 서버에 저장되지 않습니다.</p></div>
      <div class="btn-row reveal"><a class="btn btn--ghost" href="/trust/methodology/">방법론 보기</a><a class="btn btn--ghost" href="/trust/model-cards/">지수별 Model Card 보기</a></div>
    </div>
  </section>`;

  return {
    path: entry.path, title: entry.title, description: entry.desc, body,
    bodyClass: 'page-trust-data',
    docMeta: { id: 'BSI-DOC-DT', date: '2026-08' },
  };
};
