/**
 * 용어집 — 이 체계가 쓰는 말의 정의
 * 국제 기준(ISO 등)의 Terms & Definitions 관행을 따라, 화면·리포트 전체에서
 * 같은 뜻으로 쓰이는 용어를 한곳에 고정한다. DefinedTermSet 구조화 데이터 포함.
 */
const { SITE } = require('../data/site');

const GROUPS = [
  {
    label: '평가 체계 공통',
    terms: [
      ['셀프 진단 (Standard)', '이용자의 응답을 전제로 즉시 계산되는 진단. 사람의 판단이 개입하지 않으며, 결과지는 본인 참고 전용이다.'],
      ['전문가 진단 (Pro)', '제출 자료를 검증하고 담당 평가자가 산출한 뒤, 별도 검토자가 확인·서명해 발행하는 진단. 협상·설득 자리에 제시할 수 있다.'],
      ['본 평가', '공간수익화 적합성 평가(SMFI)의 정식 수행. 범위 확인 후 견적으로 진행하는 케이스형이다.'],
      ['판정', '점수를 해석해 내리는 결론. 적합 · 조건부 · 보류 · 부적합의 네 등급을 쓰며, 발행 후 실행 수주 여부와 무관하게 바뀌지 않는다.'],
      ['신뢰도 C', '결과가 얼마나 단단한 근거 위에 있는지를 나타내는 별도 지표. 판정 점수와 분리해 표기하며, 자료 보강과 현장 확인으로 올라간다.'],
      ['하드게이트', '점수와 무관하게 통과 여부만 따지는 결격 선별 관문. 하나라도 걸리면 이후 단계로 가지 않는다.'],
      ['캘리브레이션 배지', '지수의 검증 단계 표시. Expert-designed(전문가 설계) → Pilot-calibrated(파일럿 보정) → Backtested(실증 검증)의 순서로 올라간다.'],
    ],
  },
  {
    label: '지수와 지표',
    terms: [
      ['유효임대료 (ENR)', '보증금의 운용 가치, 렌트프리, 관리비의 성격까지 반영해 환산한 실질 임대 조건. 명목가 대신 이 기준으로 사례를 비교한다.'],
      ['등가 조합', '실질 부담이 같은 서로 다른 조건 조합. 명목가를 유지하며 렌트프리로 조정하는 안과, 명목가를 조정하는 안을 함께 제시한다.'],
      ['시장 밴드', '유사 조건 사례와 기준값이 만드는 유효임대료의 범위. 결과는 한 점의 값이 아니라 이 범위 위의 위치로 제시된다.'],
      ['원인 축', '공실 원인을 나누는 여덟 갈래 — 가격 · 물리 · 설비 · 법규 · 상권 · 계약 · 노출 · 관리.'],
      ['퍼널 증거', '문의와 방문의 흐름이 어느 단계에서 끊기는지의 기록. 공실 원인 진단이 최우선으로 삼는 증거다.'],
      ['관문 (L1~L8)', '영업 가능성 확인이 차례로 통과시키는 여덟 개의 법규 확인 지점 — 용도지역·조례, 건물 용도, 위반건축물 표기, 정화조·오수, 주차, 소방·피난, 학교 주변 제한, 지역 개별 규정.'],
      ['CLEAR 라벨', '관문 통과 판정에 붙는 근거의 등급 — 대장 기준, 현장 확인, 관할 확인. 같은 통과라도 근거의 무게가 다르다는 것을 표시한다.'],
      ['위음성 0 원칙', '안 되는 것을 된다고 말하지 않는다는 원칙. 판정선 근처의 애매한 값은 통과가 아니라 확인 필요로 남긴다.'],
    ],
  },
  {
    label: '문서와 발행',
    terms: [
      ['기준시점', '결과 계산에 쓰인 데이터가 수집·집계된 시점. 모든 결과지에 병기되며, 통계는 기준 분기를 따른다.'],
      ['확인 불가 항목', '원격 진단이 닿지 못해 추정으로 채우지 않고 그대로 남긴 항목. 현장 점검의 대상 목록이기도 하다.'],
      ['발행 번호', '모든 유료 결과지에 부여되는 고유 번호(예: BSI-SRVI-2609-0000). 진위 확인의 열쇠가 된다.'],
      ['결과 유효기간', '발행일로부터 6개월. 시장·법규·공간 조건이 바뀌면 그 전이라도 재진단을 권한다.'],
    ],
  },
];

module.exports = (entry) => {
  const ld = {
    '@context': 'https://schema.org', '@type': 'DefinedTermSet',
    name: 'BLANK SPACE INDEX 용어집', url: SITE.origin + '/glossary/',
    hasDefinedTerm: GROUPS.flatMap((g) => g.terms.map(([t, d]) => ({ '@type': 'DefinedTerm', name: t.replace(/\s*\([^)]*\)/, ''), description: d }))),
  };
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">용어집</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);">같은 말을,<br>같은 뜻으로 씁니다</h1>
      <p class="hero__sub" style="max-width:660px;">화면과 결과지 전체에서 아래 용어는 여기 적힌 정의대로만 쓰입니다. 정의가 바뀌면 개정 이력에 남습니다.</p>
    </div>
  </section>
  <section class="section section--alt">
    <div class="container" style="max-width:900px;">
      ${GROUPS.map(
        (g) => `<div class="gloss-group">
        <h2 class="h2 faq-cat__title">${g.label}</h2>
        <dl class="gloss">
          ${g.terms.map(([t, d]) => `<div class="gloss__row"><dt>${t}</dt><dd>${d}</dd></div>`).join('\n          ')}
        </dl>
      </div>`
      ).join('\n      ')}
      <div class="btn-row" style="margin-top:36px;">
        <a class="btn btn--ghost" href="/trust/methodology/">방법론 보기</a>
        <a class="btn btn--ghost" href="/samples/">샘플 결과지에서 용어 확인하기</a>
      </div>
    </div>
  </section>`;

  return {
    path: entry.path, title: entry.title, description: entry.desc, body,
    bodyClass: 'page-glossary',
    docMeta: { id: 'BSI-DOC-GL', date: '2026-08' },
    extraHead: `<script type="application/ld+json">${JSON.stringify(ld)}</script>`,
  };
};
