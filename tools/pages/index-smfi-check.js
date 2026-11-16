/**
 * SMFI 예비 진단 — 실제 산식으로 계산되는 자가진단
 * 계산은 public/assets/js/smfi-engine.js, 데이터는 smfi-data.js가 맡는다.
 * 이 페이지는 셸만 제공하고, 화면 구성은 smfi-check.js가 그린다.
 */
const D = require('../../public/assets/js/smfi-data.js');

module.exports = (entry) => {
  const body = `
  <section class="check-page">
    <div class="container check-page__grid">
      <aside class="check-side">
        <p class="eyebrow">SMFI 2.1 · 예비 진단</p>
        <h1 class="h1">같은 산식으로<br>내 공간을 계산해 보세요</h1>
        <p class="lead" style="font-size:16.5px;">본 평가에 쓰는 것과 동일한 엔진이 이 브라우저 안에서 돌아갑니다. 점수와 모델 순위, 간이 수지까지 그대로 나옵니다 — 다만 자료의 등급이 달라 신뢰도가 낮게 표시됩니다.</p>
        <ul class="check-rules">
          <li><b>약 5분 · ${D.GATES.length + D.QUESTIONS.length}문항</b><span>기본 정보 → 결격 확인 ${D.GATES.length}개 → 영역별 ${D.QUESTIONS.length}문항.</span></li>
          <li><b>저장되지 않습니다</b><span>응답은 서버로 전송되지 않고 계산은 브라우저 안에서 끝납니다.</span></li>
          <li><b>상한 추정치입니다</b><span>모든 응답이 증거등급 C로 계산됩니다. 정식 판정은 공부 서류와 현장 실측을 거쳐야 나옵니다.</span></li>
        </ul>
        <div class="side-formula">
          <span class="lbl">종합점수 산식</span>
          <p class="formula">S<sub>j</sub> = 0.30·B + 0.45·M<sub>j</sub> + 0.25·E<sub>j</sub> − P<sub>j</sub></p>
          <small>B 공통 기반 · M 모델 적합 · E 경제성 · P 감점</small>
        </div>
        <a class="link-arrow" href="/trust/methodology/">계산 기준 전체 보기</a>
      </aside>
      <div class="wiz" id="smfi-app" aria-live="polite">
        <noscript><div class="notice"><p>이 진단은 브라우저에서 계산됩니다. 자바스크립트를 켠 뒤 이용해 주세요.</p></div></noscript>
      </div>
    </div>
  </section>`;

  return {
    path: entry.path,
    title: entry.title,
    description: entry.desc,
    body,
    bodyClass: 'page-check page-smfi-check',
    extraBody:
      '<script src="/assets/js/smfi-data.js" defer></script>' +
      '<script src="/assets/js/smfi-engine.js" defer></script>' +
      '<script src="/assets/js/smfi-check.js" defer></script>',
  };
};
