/**
 * 3분 무료 진단 (P0) — 페이지 셸
 * 실제 플로우는 /assets/js/check.js가 브라우저 안에서 렌더·계산한다 (7.1절).
 */
module.exports = (entry) => {
  const body = `
  <section class="check-page">
    <div class="container check-page__grid">
      <aside class="check-side">
        <p class="eyebrow">3분 무료 진단</p>
        <h1 class="h1">3분이면<br>방향이 보입니다</h1>
        <p class="lead" style="font-size:16.5px;">주소 하나와 몇 개의 답으로, 지금 상황의 방향과 위험 신호 — 그리고 아직 확인되지 않은 항목을 보여 드립니다.</p>
        <ul class="check-rules">
          <li><b>저장되지 않습니다</b><span>응답은 서버로 전송되지 않고, 계산은 이 브라우저 안에서 끝납니다.</span></li>
          <li><b>몰라도 됩니다</b><span>모든 문항에서 "모르겠습니다"를 고를 수 있습니다. 모르는 것도 진단의 일부입니다.</span></li>
          <li><b>선을 지킵니다</b><span>무료 결과에는 점수·금액·기간이 없습니다. 그 답은 유료 진단의 영역으로 남겨 둡니다.</span></li>
        </ul>
        <p class="muted" style="font-size:13px;">회원가입 없이 시작합니다 · 숫자 키(1~9)로도 고를 수 있습니다</p>
      </aside>
      <div class="wiz" id="check-app" aria-live="polite">
        <noscript><div class="notice"><p>이 진단은 브라우저에서 계산됩니다. 자바스크립트를 켠 뒤 이용해 주세요. 급하시면 <a href="/contact/">문의 페이지</a>로 상황을 남겨 주셔도 됩니다.</p></div></noscript>
      </div>
    </div>
  </section>`;

  return {
    path: entry.path,
    title: entry.title,
    description: entry.desc,
    body,
    bodyClass: 'page-check',
    extraBody: '<script src="/assets/js/check.js" defer></script>',
  };
};
