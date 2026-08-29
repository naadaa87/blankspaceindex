/**
 * 사이트 공통 데이터 — 내비게이션(제작지시서 5.2절), 고정 고지(부록 C),
 * 실적 표기 규정(4.2절)을 데이터로 고정한다.
 */

const SITE = {
  version: '1.1',
  name: 'BLANK SPACE INDEX',
  shortName: 'BSI',
  tagline: '공간의 가치를, 데이터로 진단합니다.',
  system: '공간·상업용 부동산 통합 평가 체계',
  by: '공백 · 주식회사 블랭크',
  origin: 'https://index.vacancy.co.kr',
  companySite: 'https://vacancy.co.kr',
  email: 'spaceblank0100@gmail.com',
  desc: '공실 원인 진단부터 적정임대료, 영업 가능성, 공간수익화 적합성 평가까지 — 10년의 실행 경험으로 설계한 공간·상업용 부동산 평가 체계. 모든 결과에 근거와 한계를 함께 적습니다.',
  shortDesc: '공간의 가치를, 데이터로 진단합니다',
};

/* GNB — 다섯 항목을 넘기지 않는다 (5.2절) */
const NAV = [
  {
    label: '지수 체계',
    href: '/about-index/',
    match: ['/about-index/', '/index/'],
    children: [
      { label: '', links: [{ label: '지수 체계 소개', href: '/about-index/' }] },
      {
        label: '지금 이용 가능',
        links: [
          { label: '공실 원인 진단', href: '/index/vacancy/' },
          { label: '적정임대료 진단', href: '/index/rent/' },
          { label: '영업 가능성 확인', href: '/index/business/' },
          { label: '공간수익화 적합성 평가', href: '/index/smfi/' },
        ],
      },
      {
        label: '준비 중',
        links: [
          { label: '현금흐름 진단', href: '/index/cashflow/', preparing: true },
          { label: '시설·설비 상태 점검', href: '/index/facility/', preparing: true },
          { label: '임차인 안정성 진단', href: '/index/tenant/', preparing: true },
          { label: '건물 가치 범위 분석', href: '/index/value/', preparing: true },
        ],
      },
    ],
  },
  {
    label: '상품·가격',
    href: '/products/',
    match: ['/products/', '/apply/', '/samples/'],
    children: [
      {
        label: '',
        links: [
          { label: '상품 안내와 가격', href: '/products/' },
          { label: '샘플 결과지', href: '/samples/' },
          { label: '현장 점검', href: '/products/onsite/' },
          { label: '종합 심층 진단', href: '/products/deep/' },
          { label: '신청하기', href: '/apply/' },
        ],
      },
    ],
  },
  {
    label: '신뢰와 검증',
    href: '/trust/',
    match: ['/trust/', '/company/', '/verify/'],
    children: [
      {
        label: '',
        links: [
          { label: '신뢰와 검증', href: '/trust/' },
          { label: '방법론', href: '/trust/methodology/' },
          { label: 'Model Card', href: '/trust/model-cards/' },
          { label: '검증 현황', href: '/trust/validation/' },
          { label: '거버넌스 · 이의와 정정', href: '/trust/governance/' },
          { label: '데이터와 출처', href: '/trust/data/' },
          { label: '개정 이력', href: '/trust/revisions/' },
          { label: '리포트 진위 확인', href: '/verify/' },
          { label: '운영사·신뢰 구조', href: '/company/' },
        ],
      },
    ],
  },
  {
    label: '실적·자료',
    href: '/works/',
    match: ['/works/', '/insights/', '/faq/', '/glossary/'],
    children: [
      {
        label: '',
        links: [
          { label: '실적·레퍼런스', href: '/works/' },
          { label: '자료실', href: '/insights/' },
          { label: '자주 묻는 질문', href: '/faq/' },
          { label: '용어집', href: '/glossary/' },
        ],
      },
    ],
  },
  {
    label: 'B2B·제휴',
    href: '/b2b/',
    match: ['/b2b/'],
    children: [
      {
        label: '',
        links: [
          { label: '프랜차이즈 출점 검토', href: '/b2b/#franchise' },
          { label: '중개·자산관리 제휴', href: '/b2b/#broker' },
          { label: '지자체·공공', href: '/b2b/#public' },
          { label: '제휴 문의', href: '/b2b/#inquiry' },
        ],
      },
    ],
  },
];

const CTA = { label: '3분 무료 진단', href: '/check/' };

/* 실적 표기 — 4.2절의 허용 표기만 사용. 각주 생략 금지 */
const TRACK = {
  years: { num: '10', unit: '년+', label: '직접 수행', sub: '2015년부터' },
  spaces: { num: '340', unit: '+', label: '직접 기획·개발·운영한 공간', sub: '전환 기획부터 운영까지' },
  branches: { num: '약 120', unit: '개', label: '쏘플파티룸 전국 지점', sub: '직접 만든 브랜드' },
  perf: { num: '3.4~5.8', unit: '배', label: '사례 성과 · 월평균 매출 기준', sub: '아래 각주 기준' },
  perfFootnote:
    '표기된 사례 성과는 공실 당시 기대 임대료 대비 개발 후 월평균 매출 기준입니다. 상세 산정 기간은 상담을 통해 안내해 드립니다.',
};

/* 고정 고지 문안 — 부록 C. 문구와 위치가 고정된 사이트의 상수 */
const NOTICES = {
  disclaimer:
    '본 결과는 사용자가 입력하거나 공개·제출된 자료를 기준으로 산출한 의사결정 참고용 분석입니다. 법적 효력이 있는 감정평가, 건축·소방·법률·세무·투자 자문을 대체하지 않으며, 실제 거래가격, 임대 성과, 인허가 결과 또는 투자수익을 보장하지 않습니다. 중요한 거래·개발·금융 의사결정 전에는 해당 자격을 가진 전문가의 별도 검토가 필요합니다.',
  appraisal:
    '본 서비스의 모든 진단·분석은 부동산의 경제적 가치를 가액으로 판정하는 감정평가가 아니며, 공간의 수익화·임대·계약 의사결정을 돕는 참고 분석입니다. 담보·소송·세무 등 공식 평가가 필요한 경우에는 감정평가법인 의뢰를 안내해 드립니다.',
  usage:
    '이 문서는 발행 대상 고객의 의사결정 참고용으로 발행되었습니다. 금융기관·법원·과세관청 제출 등 공식 목적으로 사용할 수 없으며, 제3자 제공·발췌 시에는 검증 상태 표시와 본 고지를 포함해야 합니다.',
  onsite:
    '현장 점검은 육안 관찰과 비파괴 측정의 범위에서 수행됩니다. 은폐부 확인, 구조 안전 진단, 정밀 안전점검은 별도의 전문 영역으로, 필요 시 해당 자격을 갖춘 기관의 검토를 안내해 드립니다.',
};

/* 시장 통계 — 출처·기준시점 병기 원칙 (4.2절 · 심층분석 1장) */
const MARKET = [
  {
    num: '13.1', unit: '%', label: '전국 일반상가 공실률',
    src: '한국부동산원 · 2026년 1분기 상업용부동산 임대동향조사', note: '전분기 대비 0.3%p 상승',
    icon: 'store',
  },
  {
    num: '6.5', unit: '%', label: '일반상가 1층 공실률',
    src: '한국부동산원 · 2026년 1분기 신규 공표', note: '상권 체감을 보여 주는 지표',
    icon: 'floor',
  },
  {
    num: '62.4', unit: '만 건', label: '2026년 상반기 자영업 폐업',
    src: '국세청 사업자 등록 현황 인용 보도 · 2026년 7월', note: '반기 기준 역대 최고',
    icon: 'close',
  },
];

/* 원격이 확인하지 못하는 것들 — 현장 점검 소개 (6.1절 9번 섹션) */
const ONSITE_ONLY = [
  '배기·급배수·전기 용량 같은 설비의 실제 상태',
  '건축물대장과 현장이 다른 부분 — 무단 증축·용도 불일치',
  '출입구와 피난 동선, 소방 완비의 실제 여건',
  '누수·결로·균열의 흔적과 마감의 상태',
  '실측 면적과 천장고, 기둥과 단차',
  '길에서 보이는 정도 — 가시성·정면성과 간판 여건',
  '주차의 실태와 차량 진출입 동선',
  '주변 블록의 실제 공실과 유동의 흐름',
];

module.exports = { SITE, NAV, CTA, TRACK, NOTICES, MARKET, ONSITE_ONLY };
