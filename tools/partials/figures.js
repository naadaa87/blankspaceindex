/**
 * 공용 다이어그램 — 인라인 SVG 생성기
 * 홈·지수 상세·체계 소개가 함께 쓴다. 색은 디자인 토큰과 동일한 헥스를 직접 사용.
 */

/* SMFI 5단계 파이프라인 — 아이소메트릭 레이어 */
const pipeline = (compact = false) => `
<svg viewBox="0 0 560 348" role="img" aria-label="공간수익화 적합성 평가의 다섯 단계 파이프라인 구조도" style="width:100%;height:auto;display:block;">
  <defs>
    <linearGradient id="lg5" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0F6B63"/><stop offset="1" stop-color="#128074"/>
    </linearGradient>
  </defs>
  ${[
    { y: 26, fill: '#EAF1EF', stroke: '#D5E2DE', no: '01', name: '데이터 적정성 확인', sub: '입력·증빙의 품질 게이트' },
    { y: 88, fill: '#D9E9E4', stroke: '#C2DAD3', no: '02', name: '하드게이트 12개', sub: '결격 사유 선별 — 위음성 최소화' },
    { y: 150, fill: '#B9D8CE', stroke: '#A0C9BC', no: '03', name: '10개 영역 · 57개 지표', sub: '입지·수요·물리·법규·운영 평가' },
    { y: 212, fill: '#7FB8A6', stroke: '#69A997', no: '04', name: '14개 모델 적합도', sub: '용도별 사업 모델 매칭' },
    { y: 274, fill: 'url(#lg5)', stroke: '#0B554E', no: '05', name: '경제성 검증', sub: '수익 구조의 성립 확인' },
  ]
    .map(
      (L) => `
  <g>
    <path d="M 40 ${L.y + 22} L 150 ${L.y} L 260 ${L.y + 22} L 150 ${L.y + 44} Z" fill="${L.fill}" stroke="${L.stroke}" stroke-width="1.2"/>
    <path d="M 40 ${L.y + 22} L 40 ${L.y + 34} L 150 ${L.y + 56} L 150 ${L.y + 44} Z" fill="${L.fill}" stroke="${L.stroke}" stroke-width="1.2" opacity="0.75"/>
    <path d="M 260 ${L.y + 22} L 260 ${L.y + 34} L 150 ${L.y + 56} L 150 ${L.y + 44} Z" fill="${L.fill}" stroke="${L.stroke}" stroke-width="1.2" opacity="0.55"/>
    <line x1="268" y1="${L.y + 26}" x2="300" y2="${L.y + 26}" stroke="#C9D4D1" stroke-width="1.2" stroke-dasharray="3 3"/>
    <text x="310" y="${L.y + 20}" font-family="Archivo, sans-serif" font-size="10.5" font-weight="700" letter-spacing="1.5" fill="#0F6B63">${L.no}</text>
    <text x="336" y="${L.y + 21}" font-family="Pretendard Variable, sans-serif" font-size="14.5" font-weight="700" fill="#1D2327">${L.name}</text>
    <text x="310" y="${L.y + 40}" font-family="Pretendard Variable, sans-serif" font-size="12" fill="#64707A">${L.sub}</text>
  </g>`
    )
    .join('')}
</svg>`;

/* 지수 연동 — SRVI·SCPI 출력을 SVDI가 입력으로 소비하는 어셈블리 구조 */
const assembly = () => {
  const box = (x, y, w, name, code, fill, stroke, tc) => `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="58" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>
      <text x="${x + w / 2}" y="${y + 26}" text-anchor="middle" font-family="Pretendard Variable, sans-serif" font-size="14" font-weight="700" fill="${tc}">${name}</text>
      <text x="${x + w / 2}" y="${y + 44}" text-anchor="middle" font-family="Archivo, sans-serif" font-size="10" letter-spacing="1.2" fill="${tc}" opacity="0.72">${code}</text>
    </g>`;
  const arrow = (x1, y1, x2, y2) => `
    <path d="M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2 - 8}" fill="none" stroke="#9DB4AE" stroke-width="1.6"/>
    <path d="M ${x2 - 4.5} ${y2 - 10} L ${x2} ${y2 - 2} L ${x2 + 4.5} ${y2 - 10} Z" fill="#9DB4AE"/>`;
  return `
<svg viewBox="0 0 560 262" role="img" aria-label="적정임대료 진단과 영업 가능성 확인의 결과를 공실 원인 진단이 입력으로 사용하는 연동 구조" style="width:100%;height:auto;display:block;">
  ${box(28, 22, 156, '적정임대료 진단', 'SRVI 2.1', '#FFFFFF', '#E4E8EA', '#1D2327')}
  ${box(202, 22, 156, '영업 가능성 확인', 'SCPI 1.1', '#FFFFFF', '#E4E8EA', '#1D2327')}
  ${box(376, 22, 156, '공간수익화 적합성 평가', 'SMFI 2.1', '#FFFFFF', '#E4E8EA', '#1D2327')}
  ${arrow(106, 80, 216, 128)}
  ${arrow(280, 80, 280, 128)}
  ${arrow(454, 80, 344, 128)}
  ${box(170, 130, 220, '공실 원인 진단', 'SVDI 1.1 · 어셈블리 지수', '#0F6B63', '#0B554E', '#FFFFFF')}
  <text x="280" y="222" text-anchor="middle" font-family="Pretendard Variable, sans-serif" font-size="12.5" fill="#64707A">가격의 간극, 법규의 결격, 모델 적합도가 원인 축의 증거로 흘러 들어옵니다</text>
  <line x1="150" y1="238" x2="410" y2="238" stroke="#E4E8EA" stroke-width="1"/>
</svg>`;
};

/* 평가 → 실행 순환 */
const loop = () => `
<svg viewBox="0 0 560 220" role="img" aria-label="진단, 실행, 데이터가 순환하는 구조" style="width:100%;height:auto;display:block;">
  ${[
    { x: 60, name: '진단', sub: '원인과 적합성 판정' },
    { x: 235, name: '실행', sub: '개선·시공·운영' },
    { x: 410, name: '데이터', sub: '결과가 보정으로' },
  ]
    .map(
      (n, i) => `
  <g>
    <circle cx="${n.x + 45}" cy="86" r="45" fill="${i === 1 ? '#0F6B63' : '#FFFFFF'}" stroke="${i === 1 ? '#0B554E' : '#CBDFDB'}" stroke-width="1.5"/>
    <text x="${n.x + 45}" y="82" text-anchor="middle" font-family="Pretendard Variable, sans-serif" font-size="15.5" font-weight="700" fill="${i === 1 ? '#fff' : '#1D2327'}">${n.name}</text>
    <text x="${n.x + 45}" y="100" text-anchor="middle" font-family="Pretendard Variable, sans-serif" font-size="10.5" fill="${i === 1 ? '#CFE2DE' : '#64707A'}">${n.sub}</text>
  </g>`
    )
    .join('')}
  <path d="M 155 86 H 225" stroke="#9DB4AE" stroke-width="1.6"/><path d="M 223 81 L 233 86 L 223 91 Z" fill="#9DB4AE"/>
  <path d="M 330 86 H 400" stroke="#9DB4AE" stroke-width="1.6"/><path d="M 398 81 L 408 86 L 398 91 Z" fill="#9DB4AE"/>
  <path d="M 455 138 C 455 186, 105 186, 105 138" fill="none" stroke="#9DB4AE" stroke-width="1.6" stroke-dasharray="4 4"/>
  <path d="M 100 148 L 105 136 L 112 147 Z" fill="#9DB4AE"/>
  <text x="280" y="205" text-anchor="middle" font-family="Pretendard Variable, sans-serif" font-size="12" fill="#64707A">실행의 결과가 다음 진단의 근거가 되는 순환 — 판정은 수주 여부와 무관하게 불변입니다</text>
</svg>`;

module.exports = { pipeline, assembly, loop };
