/**
 * 상품 가격 — 단일 원천
 * 금액을 바꿀 곳은 이 파일 한 곳이다. 상품·가격 페이지와 지수 상세가 모두 여기를 읽는다.
 *
 * 규칙
 *  - price가 숫자면 확정가로 표기한다 (원 단위, 부가세 별도 표기는 vatNote가 맡는다).
 *  - price가 null이면 자동으로 '상담·견적 안내'로 표기된다. 금액을 지어내지 않는다.
 *  - from: true 이면 '○○원부터'로 표기한다.
 */

const won = (n) => n.toLocaleString('ko-KR') + '원';

const PRICING = {
  vatNote: '부가세 별도',

  /* Standard — 즉시 계산·확정가 */
  standard: {
    vacancy:  { name: '공실 원인 진단',    price: null, from: false },
    rent:     { name: '적정임대료 진단',   price: null, from: false },
    business: { name: '영업 가능성 확인',  price: null, from: false },
  },

  /* 전문가 진단 Pro — 자료 검증 + 검토자 서명 */
  pro: {
    vacancy:  { name: 'Pro · 공실 원인 진단',   price: null, from: false },
    rent:     { name: 'Pro · 적정임대료 진단',  price: null, from: false },
    business: { name: 'Pro · 영업 가능성 확인', price: null, from: false },
  },

  /* 케이스형 */
  case: {
    smfiStandard: { name: 'SMFI 본 평가 · 표준', price: null, from: true },
    smfiExpert:   { name: 'SMFI 본 평가 · 심화', price: null, from: true },
    onsite:       { name: '현장 점검',           price: null, from: true },
    deep:         { name: '종합 심층 리포트',    price: null, from: true },
  },

  /* 공제 정책 */
  credit: {
    standardToPro: '전액',   // Standard 결제액 → 같은 지수 Pro 전환 시
    toProject: null,         // 진단비 → 프로젝트 계약 시 ('전액' | '50%' 등)
  },
};

/** 표기 문자열을 만든다. 금액이 없으면 견적 안내 문구를 돌려준다. */
function label(item) {
  if (!item || item.price == null) return { main: '상담 후 견적 안내', sub: '범위를 확인한 뒤 확정 금액을 먼저 알려 드립니다' };
  return {
    main: won(item.price) + (item.from ? '부터' : ''),
    sub: PRICING.vatNote + (item.from ? ' · 규모와 범위에 따라 조정' : ' · 결제 즉시 계산'),
  };
}

module.exports = { PRICING, label, won };
