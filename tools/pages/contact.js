/**
 * 문의 — 6.10절. 서버 접수 폼과 접수 번호는 정식 오픈과 함께 제공되며,
 * 지금은 용건별 이메일 템플릿으로 받는다.
 */
const { SITE } = require('../data/site');

const mail = (tag, lines) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(`[${tag}] `)}&body=${encodeURIComponent(lines.join('\n'))}`;

module.exports = (entry) => {
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">문의</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);">궁금한 것을<br>그대로 보내 주세요</h1>
      <p class="hero__sub" style="max-width:640px;">용건에 맞는 갈래를 고르시면 제목과 항목이 채워진 메일이 열립니다. 영업일 1일 안에 회신드리며, 화면에서 바로 접수되는 폼과 접수 번호는 정식 오픈과 함께 제공됩니다.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="apply-grid">
        <div class="apply-card reveal">
          <div class="prod__head"><span class="chip">일반</span><h2 class="h2">서비스 · 진단 문의</h2></div>
          <p class="prod__desc">진단 선택이 어렵거나, 결과의 해석이 궁금하거나, 이용 중 막히는 것이 있을 때 — 상황을 두세 줄로 적어 주시면 됩니다.</p>
          <a class="btn btn--primary" href="${mail('일반 문의', ['문의 내용: ', '', '(선택) 대상 공간: ', '(선택) 이용한 진단: '])}">일반 문의 보내기</a>
        </div>
        <div class="apply-card reveal">
          <div class="prod__head"><span class="chip chip--green">제휴</span><h2 class="h2">B2B · 제휴 문의</h2></div>
          <p class="prod__desc">프랜차이즈 출점 검토, 중개·자산관리 협업, 지자체 용역 — 조직 단위의 논의는 이쪽으로 주세요. 규격과 제안서로 답합니다.</p>
          <a class="btn btn--primary" href="${mail('제휴 문의', ['기관·회사명: ', '담당자·연락처: ', '검토 배경: ', '규모: '])}">제휴 문의 보내기</a>
        </div>
        <div class="apply-card reveal">
          <div class="prod__head"><span class="chip chip--muted">알림</span><h2 class="h2">출시 알림 신청</h2></div>
          <p class="prod__desc">준비 중인 지수(현금흐름·시설·임차인·가치 범위)나 상품이 열리면 이메일로 알려 드립니다. 원하는 이름을 적어 보내 주세요.</p>
          <a class="btn btn--ghost" href="${mail('출시 알림 신청', ['알림 받을 지수·상품: ', '이메일(회신 주소와 다르면): '])}">알림 신청하기</a>
        </div>
        <div class="apply-card reveal">
          <div class="prod__head"><span class="chip chip--muted">이의</span><h2 class="h2">이의 · 정정 요청</h2></div>
          <p class="prod__desc">받으신 결과에 동의하기 어렵다면 발행 번호와 함께 보내 주세요. 근거를 열람하실 수 있고, 검토 결과와 정정 여부를 회신드립니다.</p>
          <a class="btn btn--ghost" href="${mail('이의·정정', ['발행 번호(또는 결제 이메일): ', '이의 내용: '])}">이의 접수하기</a>
        </div>
      </div>
      <p class="muted reveal" style="margin-top:18px;">메일 앱이 열리지 않으면 ${SITE.email} 로 직접 보내 주세요. 보내 주신 정보는 접수와 회신 목적으로만 사용합니다.</p>
      <div class="btn-row reveal"><a class="btn btn--ghost" href="/faq/">먼저 FAQ에서 찾아보기</a></div>
    </div>
  </section>`;

  return { path: entry.path, title: entry.title, description: entry.desc, body, bodyClass: 'page-contact' };
};
