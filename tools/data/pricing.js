/**
 * 상품 가격 — 단일 원천
 * 금액을 바꿀 곳은 이 파일 한 곳이다. 상품·가격 페이지와 지수 상세가 모두 여기를 읽는다.
 *
 * 표기 규칙
 *  - from: false → 확정가. 원 단위로 쓴다 (50,000원).
 *  - from: true  → 범위 상품. 만원 단위 + '부터'로 쓴다 (120만원부터).
 *  - price: null → 금액을 지어내지 않고 '상담 후 견적 안내'로 자동 표기한다.
 */

const won = (n) => n.toLocaleString('ko-KR') + '원';
const manwon = (n) => (n / 10000).toLocaleString('ko-KR') + '만원';

const PRICING = {
  vatNote: '부가세 별도',

  /* ── 1단계 Standard — 즉시 계산·확정가 ── */
  standard: {
    vacancy:  { name: '공실 수익화 평가 진단', price: 50000, from: false },
    rent:     { name: '적정임대료 진단',       price: 50000, from: false },
    business: { name: '업종 영업 허가신청 진단', price: 50000, from: false },
  },

  /* ── 2단계 Pro — 자료 검증 + 검토자 서명 ── */
  pro: {
    vacancy:  { name: 'Pro · 공실 수익화 평가 진단',   price: 400000, from: false,
                note: '부가세 별도 · Standard 결제액 전액 공제' },
    rent:     { name: 'Pro · 적정임대료 진단',         price: 300000, from: false,
                note: '부가세 별도 · Standard 결제액 전액 공제' },
    business: { name: 'Pro · 업종 영업 허가신청 진단', price: 550000, from: false,
                note: '부가세 별도 · 관할 확인 비용 포함' },
  },

  /* ── 3·4단계 본 평가와 케이스형 — 범위 상품 ── */
  case: {
    smfiStandard: { name: '본 평가 · 표준', price: 1200000, from: true,
                    note: '서류 검토와 현장 실사 1회, 하드게이트 12 전수, 57지표 채점, 14모델 순위, 3개 시나리오와 손익분기' },
    smfiExpert:   { name: '본 평가 · 심화', price: 3100000, from: true,
                    note: '표준 전 범위 + 인근 동종 공간 관측, 하이브리드 조합 설계, 민감도 분석, 대면 보고회' },
    onsite:       { name: '현장 점검', price: 400000, from: true,
                    note: '기본 범위 기준. 면적 구간과 층 구성, 현장 거리에 따라 할증됩니다' },
    deep:         { name: '종합 심층 리포트', price: 4000000, from: true,
                    note: '전 지수 통합과 시나리오·실행 계획, 제본 리포트와 대면 보고' },
  },

  /* ── 공제 정책 ── */
  credit: {
    standardToPro: '전액',  // Standard 결제액 → 같은 지수 Pro 전환 시
    toProject: '50%',       // 유료 진단비 → 시공·운영 프로젝트 계약 시
  },
};

/** 카드에 찍을 표기 문자열. 금액이 없으면 견적 안내 문구를 돌려준다. */
function label(item) {
  if (!item || item.price == null) {
    return { main: '상담 후 견적 안내', sub: '범위를 확인한 뒤 확정 금액을 먼저 알려 드립니다' };
  }
  if (item.from) {
    return { main: manwon(item.price) + '부터', sub: item.note || (PRICING.vatNote + ' · 규모와 범위에 따라 조정') };
  }
  return { main: won(item.price), sub: item.note || (PRICING.vatNote + ' · 결제 즉시 계산') };
}

module.exports = { PRICING, label, won, manwon };
