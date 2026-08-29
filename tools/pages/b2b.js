/**
 * B2B·제휴 — 6.9절
 * 세 고객군을 절로 나눠 받고, 제안서 요청·미팅 신청으로 마무리한다.
 */
const { SITE } = require('../data/site');

const mail = (subject) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent('[B2B 제안 요청] ' + subject)}&body=${encodeURIComponent(['기관·회사명: ', '담당자·연락처: ', '검토 배경: ', '규모(월 건수·대상 지역 등): ', '희망 미팅 일정: '].join('\n'))}`;

const ICONS = {
  fr: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 9 5.6 4.5h12.8L19.5 9"/><path d="M4.5 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0"/><path d="M6 12v7.5h12V12"/><path d="M9.5 19.5V15h5v4.5"/></svg>`,
  broker: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><rect x="4" y="4" width="9" height="16.5" rx="1"/><path d="M13 9h6.5v11.5H13"/><path d="M7 8h3M7 11.5h3M7 15h3M16 12.5h1.5M16 16h1.5"/></svg>`,
  gov: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3.5 8.5 4.5H3.5L12 3.5Z"/><path d="M5 8v9M9.7 8v9M14.3 8v9M19 8v9"/><path d="M3.5 17h17M3 20.5h18"/></svg>`,
};

const sect = (id, icon, tag, title, lead, rows, cta) => `
  <section class="section${id === 'broker' ? '' : ' section--alt'}" id="${id}">
    <div class="container">
      <div class="b2b-head reveal">
        <span class="partner__icon">${icon}</span>
        <div><p class="eyebrow" style="margin-bottom:8px;">${tag}</p><h2 class="h1">${title}</h2></div>
      </div>
      <p class="lead reveal" style="max-width:760px;">${lead}</p>
      <div class="sp-wrap reveal" style="margin-top:32px;">
        <table class="table sp-table"><tbody>
          ${rows.map(([k, v]) => `<tr><th scope="row" style="width:20%;">${k}</th><td>${v}</td></tr>`).join('')}
        </tbody></table>
      </div>
      <div class="btn-row reveal"><a class="btn btn--primary" href="${mail(cta)}">${cta} 제안서 요청 · 미팅 신청</a></div>
    </div>
  </section>`;

module.exports = (entry) => {
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">B2B · 제휴</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);max-width:820px;">데이터로 연결하고,<br><em>인사이트로 성장하는 파트너십</em></h1>
      <p class="hero__sub" style="max-width:680px;">개인의 판단을 돕던 같은 체계를, 조직의 반복 업무 규격으로 제공합니다. 세 고객군의 자리로 나눠 안내드립니다.</p>
      <div class="sit-btns">
        <a class="sit-btn" href="#franchise"><b>프랜차이즈 · 다점포</b><span>출점 검토의 표준화</span></a>
        <a class="sit-btn" href="#broker"><b>중개 · 자산관리</b><span>설득의 근거 공급</span></a>
        <a class="sit-btn" href="#public"><b>지자체 · 공공</b><span>상권 단위 공실 진단</span></a>
      </div>
    </div>
  </section>

  ${sect('franchise', ICONS.fr, 'Franchise · 다점포', '출점 검토의 마지막 구간을 표준으로',
    '상권 분석과 로드뷰 임장까지는 정교해졌지만, 실제 현장 확인은 여전히 담당자 개인의 눈과 시간에 달려 있습니다. 후보지별 표준 검토를 건당 단가로 공급하면, 본사는 인력을 늘리지 않고 검토 품질을 올리고, 부진점에는 원인 진단으로 대응할 수 있습니다.',
    [
      ['표준 검토 구성', '공간수익화 적합성 평가 + 영업 가능성 확인(법규 관문) + 현장 점검 실측 — 후보지 1건 단위의 고정 규격'],
      ['공급 방식', '건당 단가 · 표준 리포트 규격 · 복수 후보지 일괄 검토 시 일정 협의'],
      ['부진점 대응', '기존 점포의 공실·매출 부진에는 원인 진단과 개선 실행 연계'],
      ['데이터', '검토 이력은 귀사 전용으로 관리되며, 재배포 조건과 표기 규칙이 계약에 포함됩니다'],
    ], '프랜차이즈')}

  ${sect('broker', ICONS.broker, 'Brokerage · Asset Management', '설득의 근거를 함께 만듭니다',
    '"이 조건이면 나갑니다"를 말로 하는 것과 근거 문서로 보여 주는 것은 성사율이 다릅니다. 매물 진단 리포트를 고객 설득 자료로 공동 활용하고, 의뢰 연계에서 공동 제안, 정례 협력까지 표준 절차로 함께합니다.',
    [
      ['공동 리포트', '적정임대료 진단·공실 원인 진단을 귀사 고객 설득 자료로 — 검토자 서명본 기준'],
      ['협업 절차', '① 의뢰 연계(케이스 단위) → ② 공동 제안(리포트 + 중개 실행) → ③ 정례 협력(월 단위 물량)'],
      ['역할 구분', '진단·판정은 블랭크가, 거래·중개는 귀사가 — 판정은 거래 성사 여부와 무관하게 불변입니다'],
      ['표기 규칙', '리포트의 제3자 제공 시 검증 상태 표시와 고지 포함이 조건이며, 계약에 명시됩니다'],
    ], '중개·자산관리')}

  ${sect('public', ICONS.gov, 'Public · 지자체', '상권 단위의 공실 진단 규격',
    '개별 점포의 진단 체계를 상권 단위로 확장한 용역 규격입니다. 거리·블록 단위의 공실 실태와 원인 분포를 진단하고, 정책 수립의 참고 분석과 유휴 공간 활용 검토까지 잇습니다.',
    [
      ['용역 규격', '대상 상권의 공실 실태 조사 + 원인 축 분포 진단 + 활용 가능성 검토 리포트'],
      ['수행 방식', '현장 조사와 공공 데이터 결합 · 표본과 집계 기준 병기 · 결과는 정책 참고 분석으로 한정'],
      ['진행', '입찰·제안 요청에 대응합니다. 과업 범위 협의 후 규격서를 제출드립니다'],
    ], '지자체·공공')}

  <section class="section section--alt final-cta section--tight" id="inquiry">
    <div class="container">
      <div class="section-head section-head--center reveal">
        <h2 class="h1">어느 자리든, 시작은 대화입니다</h2>
        <p class="lead">규모와 배경을 알려 주시면 영업일 1일 안에 회신드립니다. ${SITE.email}</p>
        <div class="btn-row"><a class="btn btn--primary btn--lg" href="${mail('일반')}">제휴 문의하기</a></div>
      </div>
    </div>
  </section>`;

  return { path: entry.path, title: entry.title, description: entry.desc, body, bodyClass: 'page-b2b' };
};
