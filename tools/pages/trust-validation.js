/**
 * 검증 현황 — 로드맵과 공시의 자리 (6.5절 · 검증설계서 8~9장)
 */
const { INDEXES, BADGES } = require('../data/registry');

module.exports = (entry) => {
  const open4 = INDEXES.filter((i) => i.status === 'available');
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">신뢰와 검증 · 검증 현황</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);max-width:820px;">검증이 쌓이는 과정을<br><em>그대로 보여 드립니다</em></h1>
      <p class="hero__sub" style="max-width:680px;">지수는 다섯 단계의 로드맵을 순서대로 지나갑니다. 단계는 건너뛰지 않고, 지금 어디에 있는지가 이 페이지와 각 지수의 배지에 반영됩니다.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">로드맵</p><h2 class="h1">설계에서 모니터링까지</h2></div>
      <ol class="flow-bar flow-bar--road reveal" style="grid-template-columns:repeat(5,1fr);">
        ${[
          ['설계', '전문가 설계와 공인 방법론', 'done'],
          ['파일럿', '실제 사례 소급 채점 20~30건', 'on'],
          ['보정', '경계값·가중의 1차 조정', ''],
          ['실증', '홀드아웃 검증과 성능 요약', ''],
          ['모니터링', '분기 집계와 연 1회 재검토', ''],
        ].map(([t, d, s], i) => `<li class="${s === 'done' ? 'is-done' : s === 'on' ? 'is-on' : ''}"><i class="num">${i + 1}</i><span>${t}</span><small>${d}</small></li>`).join('')}
      </ol>
      <div class="sp-wrap reveal" style="margin-top:44px;">
        <table class="table sp-table">
          <thead><tr><th>지수</th><th style="width:18%;">현재 단계</th><th style="width:22%;">배지</th><th>다음 마일스톤</th></tr></thead>
          <tbody>
            ${open4.map((ix) => `<tr><th scope="row">${ix.name} <span class="code-tag">${ix.code} ${ix.version}</span></th><td>설계 완료 · 파일럿 진입</td><td><span class="badge badge--${ix.badge}">${BADGES[ix.badge].label}</span></td><td>${
              ix.slug === 'smfi'
                ? '소급 채점 표본 확보 → 첫 보정 회의(경계값·최저선 재검토)'
                : ix.slug === 'rent'
                ? '지역 벤치마크 팩 1차 구축 · 계약 사례 표본 수집'
                : ix.slug === 'business'
                ? '우선 지역 조례팩 구축 · 판정-실제 인허가 대조 축적'
                : '파일럿 30건 수행 · 원인 축 가중 1차 보정'
            }</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="notice reveal" style="margin-top:22px;"><p><strong>운영 규칙</strong> — 소급 채점 표본이 확보되는 시점에 첫 보정 회의를 열어 판정 경계값과 최저선 기준의 조정 여부를 결정하고, 이후 연 1회 재검토 주기로 전환합니다. 예비 점수와 정밀 점수의 편차는 보정 프로토콜의 관리 지표로 축적됩니다.</p></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">공시의 자리</p><h2 class="h1">숫자가 채워질 두 개의 칸</h2>
      <p class="lead">지금은 비워 둡니다. 표본이 의미 있는 규모에 도달하면, 집계 기준과 표본 규모를 병기해 이 자리에 게시합니다. 빈칸을 미리 만들어 두는 것 자체가 약속입니다.</p></div>
      <div class="grid-2 reveal" style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
        <div class="placeholder">
          <span class="lbl">Disclosure 01</span>
          <h3>판정 분포</h3>
          <p>전체 평가 건의 적합 · 조건부 · 보류 · 부적합 비율. 분기마다 내부 집계하며, "적합" 일변도의 분포는 그 자체가 경고 신호로 관리됩니다.</p>
          <span class="chip chip--muted">표본 규모 도달 시 게시</span>
        </div>
        <div class="placeholder">
          <span class="lbl">Disclosure 02</span>
          <h3>오차 요약</h3>
          <p>범위 포함률과 오차율 등 성능 지표의 요약. 실증 단계 진입 후, 지표 정의와 함께 게시합니다.</p>
          <span class="chip chip--muted">실증 단계 진입 후 게시</span>
        </div>
      </div>
      <div class="quote-bar reveal" style="margin-top:26px;"><span class="quote-bar__mark">“</span><p>'부적합'을 자신 있게 말할 수 있는 회사만이 '적합'으로 신뢰받는다. 판정 분포는 그 자신감의 회계 장부다.<small>검증 설계 원칙</small></p></div>
    </div>
  </section>`;

  return { path: entry.path, title: entry.title, description: entry.desc, body, docMeta: { id: 'BSI-DOC-VL', date: '2026-08' },
    bodyClass: 'page-validation' };
};
