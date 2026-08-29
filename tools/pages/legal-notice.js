const legal = require('../partials/legal');
const { NOTICES } = require('../data/site');

module.exports = (entry) =>
  legal(entry, {
    title: '면책·용도 제한 고지',
    sections: [
      ['표준 면책', NOTICES.disclaimer],
      ['감정평가와의 구분', NOTICES.appraisal],
      ['문서의 용도 제한', NOTICES.usage],
      ['현장 점검의 업무 범위', NOTICES.onsite],
      ['표기와 재배포', `결과 문서의 발췌·제3자 제공 시에는 검증 상태 표시(캘리브레이션 배지)와 본 고지의 포함이 조건입니다. 검증 전 지수의 수치는 확정형으로 표기할 수 없으며, 회사의 표현 규칙(금지 표현 사전)이 모든 발행물에 적용됩니다.`],
    ],
    note: '이 고지는 사이트 하단과 모든 결과 문서에 요약 형태로 함께 표시되며, 전문은 이 페이지를 기준으로 합니다.',
  });
