/**
 * BLANK SPACE INDEX — 지수 레지스트리 v1
 * 제작지시서 11.3절의 정의 객체. 사이트의 카드·상세 페이지·내비게이션·진단 진입이
 * 전부 이 정의를 읽어 동작한다. 새 지수의 추가는 이 배열에 객체 하나를 더하는 일이다.
 *
 * 표기 원칙(3.4절): 화면 본문에서는 대외 서비스명(name)만 쓰고,
 * 코드·버전(code/version)은 상세 페이지 하단과 리포트 표기에서만 소형으로 병기한다.
 * 배지(badge): expert(전문가 설계) / pilot(파일럿 보정) / backtested(실증 검증)
 */

const INDEXES = [
  {
    slug: 'vacancy',
    code: 'SVDI', version: '1.1',
    name: '공실 원인 진단',
    question: '이 공간은 왜 비어 있고, 무엇부터 바꿔야 하는가',
    oneLiner: '비어 있는 이유를 가격·물리·설비·법규·상권·계약·노출·관리의 여덟 갈래로 나눠 확인하고, 무엇부터 바꿀지 순서를 잡아 드립니다.',
    status: 'available',            // available | preparing
    badge: 'expert',
    standard: { time: '9문항 · 5분 내외', report: '결과지 4면 · 즉시 발행', note: '원인 후보 최대 2개와 확인 순서, 이번 주 할 일까지' },
    pro: { remote: '전문가 진단(원격) 영업일 3일', onsite: '현장 결합 영업일 7일' },
    audience: '공실을 가진 임대인',
    related: ['rent', 'onsite'],
    pictogram: 'vacancy',
  },
  {
    slug: 'rent',
    code: 'SRVI', version: '2.1',
    name: '적정임대료 진단',
    question: '지금 조건이 시장과 맞는가. 재계약 때 얼마를 불러야 하는가',
    oneLiner: '보증금과 렌트프리까지 반영한 실질 임대 조건을 시장 범위 위에 올려놓고, 지금 조건이 어디쯤인지 확인합니다.',
    status: 'available',
    badge: 'expert',
    standard: { time: '7문항 · 5분 이내', report: '결과지 5면 · 신뢰도 충족 시 즉시 발행', note: '범위 위의 내 위치와 판정, 동등한 조건 조합 3가지' },
    pro: { remote: '전문가 진단 영업일 3일 · 검토자 서명' },
    audience: '재계약·조건 조정을 앞둔 임대인, 매입·매도 검토자',
    related: ['vacancy', 'cashflow'],
    pictogram: 'rent',
  },
  {
    slug: 'business',
    code: 'SCPI', version: '1.1',
    name: '영업 가능성 확인',
    question: '이 공간에서 내가 하려는 영업이 합법적으로 가능한가',
    oneLiner: '용도부터 정화조·주차·소방·학교 앞 제한까지 여덟 관문을 차례로 확인하고, 확정할 수 없는 것은 확인 필요로 정직하게 남깁니다.',
    status: 'available',
    badge: 'expert',
    standard: { time: '주소·업종 2문항 + 조건 분기 3~5문항 · 3분', report: '결과지 5면 · 즉시 발행', note: '여덟 관문의 판정과 확인 필요 항목, 관할에 물을 질문까지' },
    pro: { remote: '전문가 진단 영업일 5일 · 관할 확인 포함' },
    audience: '계약을 앞둔 예비 창업자·임차인',
    related: ['smfi', 'onsite'],
    pictogram: 'business',
  },
  {
    slug: 'smfi',
    code: 'SMFI', version: '2.1',
    name: '공간수익화 적합성 평가',
    question: '이 공간으로 무엇을 해야 하는가',
    oneLiner: '결격 조건과 열 개 영역의 검증을 거쳐 열네 가지 수익 모델의 적합도를 판정하고, 손익분기까지 확인한 답을 드립니다.',
    status: 'available',
    badge: 'expert',
    standard: null,
    pro: { remote: '본 평가 영업일 10일 · 제출 가능 보고서', label: '본 평가' },
    audience: '활용 방향을 정해야 하는 소유자·투자자',
    related: ['business', 'deep'],
    pictogram: 'smfi',
  },
  {
    slug: 'cashflow',
    code: 'SCFI', version: null,
    name: '현금흐름 진단',
    question: '이 자산의 순수익은 얼마이고 어디서 새는가',
    oneLiner: '임대 수입과 나가는 비용을 한 장 위에 올려, 순수익의 구조와 새는 지점을 확인하는 진단으로 준비하고 있습니다.',
    status: 'preparing',
    badge: 'expert',
    audience: '보유 자산의 수지를 점검하려는 소유자',
    related: ['rent', 'tenant'],
    pictogram: 'cashflow',
  },
  {
    slug: 'facility',
    code: 'SFCI', version: null,
    name: '시설·설비 상태 점검',
    question: '이 건물·호실을 쓰려면 앞으로 얼마가 더 드는가',
    oneLiner: '설비의 상태와 남은 수명을 점검해, 앞으로 필요한 지출의 구간을 미리 확인하는 진단으로 준비하고 있습니다.',
    status: 'preparing',
    badge: 'expert',
    audience: '매입·임차 전 상태를 확인하려는 분',
    related: ['onsite'],
    pictogram: 'facility',
  },
  {
    slug: 'tenant',
    code: 'STQI', version: null,
    name: '임차인 안정성 진단',
    question: '이 임차인·업종과 끝까지 갈 수 있는가',
    oneLiner: '업종의 계속성과 임차 구성의 안정성을 함께 보는 진단으로 준비하고 있습니다.',
    status: 'preparing',
    badge: 'expert',
    audience: '장기 임대의 안정성을 보려는 임대인',
    related: ['cashflow'],
    pictogram: 'tenant',
  },
  {
    slug: 'value',
    code: 'SAVI', version: null,
    name: '건물 가치 범위 분석',
    question: '이 가격이 시장 범위 어디에 있는가',
    oneLiner: '매입 검토 리포트 안에서만 제공되는 범위 분석입니다. 확정 가격이 아니라 시장 범위 위의 위치를 봅니다.',
    status: 'preparing',
    badge: 'expert',
    onlyBundle: true,
    audience: '건물 매입·매도를 검토하는 분',
    related: ['rent'],
    pictogram: 'value',
  },
];

/* 캘리브레이션 배지 3단계 (제작지시서 4.3절) */
const BADGES = {
  expert:     { label: 'Expert-designed', ko: '전문가 설계', desc: '10년의 실행 경험과 공인 방법론으로 설계되었으며, 실제 사례 보정을 앞둔 단계입니다.' },
  pilot:      { label: 'Pilot-calibrated', ko: '파일럿 보정', desc: '파일럿 표본으로 1차 보정을 마친 단계입니다.' },
  backtested: { label: 'Backtested', ko: '실증 검증', desc: '홀드아웃 검증을 통과해 성능 요약을 공개하는 단계입니다.' },
};

/* 지수 픽토그램 — 24px 그리드 · 1.5px 라인 · 골드 포인트 1점 이내 (보충자료 4.3절) */
const PICTOGRAMS = {
  vacancy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V21"/><path d="M12 21v-3"/><path d="M12 14 4 8.5M12 14l-6-1M12 14l-5 3.5M12 14l8-5.5M12 14l6-1M12 14l5 3.5"/><circle cx="13.6" cy="12" r="0.9" fill="#16A34A" stroke="none"/></svg>`,
  rent: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M3 14h18"/><path d="M5 14v-2.5M9 14v-2.5M13 14v-2.5M17 14v-2.5M21 14v-2.5"/><path d="M7 14v-4.2M15 14v-4.2"/><path d="M11 19.5v-2" stroke="#16A34A"/><path d="M9.6 19.5h2.8" stroke="#16A34A"/><circle cx="11" cy="16" r="1.4" stroke="#16A34A"/></svg>`,
  business: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 20v-8a2.5 2.5 0 0 1 5 0v8"/><path d="M9.5 20v-9a2.5 2.5 0 0 1 5 0v9"/><path d="M16 20v-10a2.5 2.5 0 0 1 5 0v10"/><path d="M2 20h21"/><path d="m17.6 6.6 1.3 1.3 2.1-2.4" stroke="#16A34A"/></svg>`,
  smfi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="13" height="13" rx="1"/><path d="M3 9h13M9 3v13"/><rect x="8" y="8" width="13" height="13" rx="1"/><path d="m11.8 14.6 2 2 3.4-4" stroke="#16A34A"/></svg>`,
  cashflow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v16M4 20h16"/><path d="M4 9h5l-1.6-1.6M9 9 7.4 10.6"/><path d="M20 12h-5l1.6-1.6M15 12l1.6 1.6"/><circle cx="12" cy="4" r="1.2" stroke="#16A34A"/></svg>`,
  facility: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21V5.5L11 3v18"/><path d="M4 9h7M4 13h7M4 17h7"/><path d="M11 21h9"/><circle cx="16.5" cy="12.5" r="3.2" stroke="#16A34A"/><path d="m18.8 14.8 2.7 2.7" stroke="#16A34A"/></svg>`,
  tenant: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h18M5 7V4h14v3"/><rect x="5" y="11" width="6" height="4.5"/><rect x="13" y="11" width="6" height="4.5"/><rect x="9" y="15.5" width="6" height="4.5" stroke="#16A34A"/><path d="M3 20h18"/></svg>`,
  value: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M5 17V8M3.6 8h2.8M3.6 17h2.8"/><path d="M12 20V5M10.6 5h2.8M10.6 20h2.8"/><path d="M19 15v-5M17.6 10h2.8M17.6 15h2.8"/><circle cx="12" cy="12.5" r="1.1" fill="#16A34A" stroke="none"/></svg>`,
};

/* 여정 5단계 (제작지시서 6.1절 5번 섹션) */
const JOURNEY = [
  { name: '무료 진단', out: '방향과 위험 신호, 확인되지 않은 항목', time: '3분 · 무료' },
  { name: '셀프 진단', out: '즉시 계산되는 결과지', time: '5분 내외 · Standard' },
  { name: '전문가 진단', out: '검토·서명이 들어간 리포트', time: '영업일 3~10일 · Pro' },
  { name: '현장 점검', out: '실측과 사진 증빙으로 확정', time: '방문 후 5일' },
  { name: '실행', out: '개선·시공·오픈·운영', time: '진단 비용 공제' },
];

module.exports = { INDEXES, BADGES, PICTOGRAMS, JOURNEY };
