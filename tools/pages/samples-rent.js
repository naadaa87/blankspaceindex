/**
 * 샘플 결과지 — 적정임대료 진단(SRVI 2.1) Standard 5면 전체
 * 리포트 공통 규격 6요소를 실제 지면으로 구현한다. 모든 수치는 가상의 예시.
 * 인쇄 시 면 단위로 A4에 앉도록 print CSS와 짝을 이룬다.
 */
module.exports = (entry) => {
  const NO = 'BSI-SRVI-2609-SAMPLE';
  const pageFoot = (n) => `<div class="doc__foot"><span>${NO}</span><span>적정임대료 진단 · SRVI 2.1 · Standard</span><span class="num">${n} / 5</span></div>`;

  const body = `
  <section class="section section--alt" style="padding-top:56px;">
    <div class="container doc-wrap">
      <div class="doc-toolbar reveal">
        <div><p class="eyebrow" style="margin-bottom:6px;">샘플 결과지 · 전 수치는 가상의 예시</p>
        <h1 class="h2" style="font-size:22px;">적정임대료 진단 — Standard 결과지 (5면)</h1></div>
        <div class="btn-row" style="margin:0;">
          <button class="btn btn--ghost" type="button" onclick="window.print()">인쇄 · PDF 저장</button>
          <a class="btn btn--primary" href="/index/rent/">이 진단 시작하기</a>
        </div>
      </div>

      <!-- 표지 -->
      <article class="doc doc--cover reveal" aria-label="샘플 결과지 표지">
        <span class="doc__wm" aria-hidden="true">SAMPLE</span>
        <div class="doc__brand"><span class="doc__logo"></span>BLANK SPACE INDEX</div>
        <p class="doc__kind">적정임대료 진단 결과지 <span class="code-tag">SRVI 2.1 · Standard</span></p>
        <h2 class="doc__title">서울 ○○구 ○○로 12, 1층 101호</h2>
        <dl class="doc__issue">
          <div><dt>발행 번호</dt><dd class="num">${NO}</dd></div>
          <div><dt>발행일</dt><dd class="num">2026-09-14</dd></div>
          <div><dt>기준시점</dt><dd>통계 2026년 2분기 · 실거래 2026-09-10 수집</dd></div>
          <div><dt>결과 유효기간</dt><dd>발행일로부터 6개월</dd></div>
          <div><dt>문서의 용도</dt><dd>본인 참고 전용 — 제3자 제시용이 아닙니다</dd></div>
        </dl>
        <div class="doc__premise">
          <span class="lbl">이 결과의 전제</span>
          <p>아래 입력을 사실로 전제하고 계산되었습니다 — 전용 52㎡ · 1층 · 근린생활시설 · 준공 2009년 · 현재 조건 보증금 5,000만 원 / 월 320만 원 / 관리비 별도 15만 원 / 렌트프리 없음. 입력이 사실과 다르면 결과도 달라집니다.</p>
        </div>
        ${pageFoot(1)}
      </article>

      <!-- 1면: 결론 -->
      <article class="doc reveal">
        <span class="doc__wm" aria-hidden="true">SAMPLE</span>
        <h3 class="doc__h">1 · 결론 — 시장 밴드 위의 내 위치</h3>
        <div class="spec-range" style="margin-top:8px;">
          <span class="lbl">유효임대료 기준 · ㎡당 월 환산</span>
          <div class="spec-range__bar" style="margin-top:30px;">
            <span class="spec-range__zone" style="left:16%;width:58%;"></span>
            <span class="spec-range__me" style="left:68%;"><i></i>현재 조건 6.1만</span>
            <span class="spec-range__tick" style="left:16%;">하단 4.8만</span>
            <span class="spec-range__tick" style="left:74%;transform:translateX(-100%);">상단 6.4만</span>
          </div>
        </div>
        <p class="doc__lead" style="margin-top:30px;">현재 조건은 시장 범위 <b>안</b>에 있으며 상단에 가깝습니다. <span class="verdict verdict--warn">판정 · 상단 주의</span></p>
        <p class="doc__p">입력하신 값이 맞다면, 지금 조건으로 임차인을 새로 맞는 일은 시장 상단을 시도하는 일과 같습니다. 공실 상태가 아니라면 다음 재계약에서 조건 방어가 과제가 되고, 공실 상태라면 아래 등가 조합(3면)으로 실질을 조정하는 선택지부터 검토할 만합니다.</p>
        <div class="doc__kv">
          <div><dt>적정 비율</dt><dd class="num">104%</dd><small>기준 범위 중앙 대비</small></div>
          <div><dt>신뢰도 C</dt><dd class="num">71</dd><small>발행 기준 60 이상 충족</small></div>
          <div><dt>비교 근거</dt><dd class="num">사례 9건</dd><small>+ 분기 벤치마크</small></div>
        </div>
        ${pageFoot(2)}
      </article>

      <!-- 2면: 유효임대료 환산 -->
      <article class="doc reveal">
        <span class="doc__wm" aria-hidden="true">SAMPLE</span>
        <h3 class="doc__h">2 · 유효임대료 환산 — 명목을 실질로</h3>
        <p class="doc__p">보증금의 운용 가치와 렌트프리, 관리비의 성격을 반영해 현재 조건과 비교 사례를 같은 기준 위에 올렸습니다.</p>
        <table class="doc__table">
          <thead><tr><th>항목</th><th>현재 조건</th><th>환산 반영</th></tr></thead>
          <tbody>
            <tr><td>명목 월 임대료</td><td class="num">3,200,000원</td><td rowspan="4" class="doc__table-note">보증금 환산 가산 +125,000원<br>렌트프리 차감 0원<br>관리비 성격 반영 — Pro에서 판정</td></tr>
            <tr><td>보증금</td><td class="num">50,000,000원</td></tr>
            <tr><td>렌트프리</td><td>없음</td></tr>
            <tr><td>관리비(별도)</td><td class="num">150,000원</td></tr>
          </tbody>
          <tfoot><tr><th>유효임대료(월)</th><th class="num">3,325,000원</th><th class="num">㎡당 약 6.1만 원</th></tr></tfoot>
        </table>
        <p class="doc__note">환산 계수는 기준시점의 공표 지표를 따르며, 세부 계수는 공개하지 않습니다. 관리비의 실질 성격(포함 범위) 판정은 자료 검증이 필요한 Pro 항목입니다.</p>
        ${pageFoot(3)}
      </article>

      <!-- 3면: 등가 조합 -->
      <article class="doc reveal">
        <span class="doc__wm" aria-hidden="true">SAMPLE</span>
        <h3 class="doc__h">3 · 등가 조합 — 같은 실질, 다른 구성</h3>
        <p class="doc__p">협상에서 고를 수 있도록, 실질 부담이 동일한 두 가지 구성을 제시합니다.</p>
        <table class="doc__table">
          <thead><tr><th style="width:26%;">구성</th><th>조건</th><th style="width:30%;">이런 상대에게</th></tr></thead>
          <tbody>
            <tr><td><b>명목 유지안</b></td><td>보증금 5,000만 / 월 320만 + <b>렌트프리 1개월</b></td><td>장부상 명목가를 지켜야 하는 임대인</td></tr>
            <tr><td><b>명목 조정안</b></td><td>보증금 5,000만 / 월 <b>295만</b> / 렌트프리 없음</td><td>초기 부담을 낮추려는 임차인</td></tr>
          </tbody>
        </table>
        <p class="doc__note">두 구성의 1년 실질 수취액은 같습니다. 협상은 한 숫자의 줄다리기가 아니라 구성의 선택이 됩니다.</p>
        ${pageFoot(4)}
      </article>

      <!-- 4·5면: 시나리오 + 신뢰도와 한계 -->
      <article class="doc reveal">
        <span class="doc__wm" aria-hidden="true">SAMPLE</span>
        <h3 class="doc__h">4 · 3가격점 시나리오</h3>
        <table class="doc__table">
          <thead><tr><th>시나리오</th><th>유효임대료(월)</th><th>기대되는 흐름</th></tr></thead>
          <tbody>
            <tr><td>안정 우선</td><td class="num">3,050,000원</td><td>문의 회복이 우선일 때 — 범위 중앙 아래로 내려 반응 폭을 넓힙니다</td></tr>
            <tr><td>기준</td><td class="num">3,250,000원</td><td>범위 중앙 부근 — 통상적 수요 흐름을 전제로 한 기준선</td></tr>
            <tr><td>상단 시도</td><td class="num">3,400,000원</td><td>대기 수요가 확인될 때만 — 공실 기간이 길어질 위험을 함께 짊어집니다</td></tr>
          </tbody>
        </table>
        <h3 class="doc__h" style="margin-top:34px;">5 · 근거 · 신뢰도 · 한계</h3>
        <div class="spec-conf" style="margin-top:6px;"><span class="lbl">신뢰도 C</span><span class="spec-conf__track"><span style="width:71%"></span></span><b class="num">71</b><small>사례 9건 · 벤치마크 정합 양호</small></div>
        <ul class="doc__limits">
          <li>이 결과는 감정평가액이 아니며, 확정가·보증가로 쓸 수 없습니다.</li>
          <li>공실 상태를 반영한 권장가와 관리비 성격 판정은 Pro에서 제공됩니다.</li>
          <li>확인되지 않은 항목 — 관리비 포함 범위(자료 필요), 실측 면적(현장 확인 필요).</li>
        </ul>
        <div class="doc__next"><span class="lbl">다음 단계</span><p>재계약 협상에 이 문서를 제시하려면 검토자 서명이 있는 <b>Pro</b>로 전환하세요(Standard 결제액 전액 공제). 실측이 필요한 항목은 <b>현장 점검</b>에서 확정됩니다.</p></div>
        ${pageFoot(5)}
      </article>

      <div class="btn-row reveal" style="justify-content:center;margin-top:36px;">
        <a class="btn btn--primary btn--lg" href="/index/rent/">적정임대료 진단 시작하기</a>
        <a class="btn btn--ghost btn--lg" href="/samples/">샘플 안내로 돌아가기</a>
      </div>
    </div>
  </section>`;

  return {
    path: entry.path,
    title: entry.title, description: entry.desc, body,
    bodyClass: 'page-sample-doc',
  };
};
