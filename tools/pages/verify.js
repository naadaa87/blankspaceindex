/**
 * 리포트 진위 확인 — 발행 번호 체계와 조회 절차
 * 신용평가·인증 기관의 verify 관행을 따른다. 조회 시스템은 정식 오픈과 함께
 * 활성화되며, 그 전까지는 규격 안내와 이메일 대조 창구를 제공한다.
 */
const { SITE } = require('../data/site');

module.exports = (entry) => {
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">리포트 진위 확인</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);max-width:800px;">받으신 문서가<br>저희가 발행한 그대로인지</h1>
      <p class="hero__sub" style="max-width:680px;">제3자에게 전달받은 결과지의 진위가 궁금할 때 확인하는 자리입니다. 모든 유료 결과지에는 고유한 발행 번호가 부여되고, 이 번호로 발행 사실·지수·버전·발행일을 대조할 수 있습니다.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="grid-2" style="display:grid;grid-template-columns:minmax(0,6fr) minmax(0,6fr);gap:56px;align-items:start;">
        <div class="reveal">
          <p class="eyebrow">발행 번호 규격</p>
          <div class="verify-spec">
            <code class="verify-spec__code">BSI - SRVI - 2609 - 0184</code>
            <ul>
              <li><b>BSI</b> — 발행 체계 식별자</li>
              <li><b>SRVI</b> — 지수 코드(문서를 발행한 지수)</li>
              <li><b>2609</b> — 발행 연월</li>
              <li><b>0184</b> — 일련 번호</li>
            </ul>
          </div>
          <ul class="limit-list" style="margin-top:26px;">
            <li>발행 번호는 결과지 표지와 각 면 하단에 인쇄됩니다.</li>
            <li>조회로 확인되는 것 — 발행 여부, 지수와 버전, 발행일, 정정 이력의 유무. 결과의 내용 자체는 발행 대상자의 동의 없이 공개되지 않습니다.</li>
            <li>Standard 결과지는 본인 참고 전용이므로, 제3자 제시용 문서인지도 이 조회에서 함께 확인됩니다.</li>
          </ul>
        </div>
        <div class="reveal">
          <div class="verify-box">
            <span class="lbl">Verify</span>
            <h2 class="h2">발행 번호 조회</h2>
            <form class="verify-form" data-verify>
              <input class="wiz__input" type="text" name="no" placeholder="예) BSI-SRVI-2609-0184" autocomplete="off" aria-label="발행 번호">
              <button class="btn btn--primary" type="submit">조회하기</button>
            </form>
            <p class="verify-note" data-verify-note>온라인 조회는 정식 오픈과 함께 활성화됩니다. 지금은 아래 이메일 대조 창구를 이용해 주세요.</p>
            <div class="verify-alt">
              <p>급한 확인이 필요하시면 문서 사진(또는 발행 번호)과 함께 보내 주세요. 영업일 1일 안에 발행 사실을 회신드립니다.</p>
              <a class="btn btn--ghost" href="mailto:${SITE.email}?subject=${encodeURIComponent('[진위 확인] 발행 번호 대조 요청')}">이메일로 대조 요청</a>
            </div>
          </div>
        </div>
      </div>
      <div class="notice reveal" style="margin-top:36px;"><p><strong>위·변조 신고</strong> — 저희가 발행하지 않은 문서가 BLANK SPACE INDEX 명의로 유통되는 것을 발견하시면 같은 창구로 알려 주세요. 확인되는 즉시 조치하고, 필요한 경우 그 사실을 공지합니다.</p></div>
    </div>
  </section>`;

  return {
    path: entry.path, title: entry.title, description: entry.desc, body,
    bodyClass: 'page-verify',
    docMeta: { id: 'BSI-DOC-VR', date: '2026-08' },
  };
};
