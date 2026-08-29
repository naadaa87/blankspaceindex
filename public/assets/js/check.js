/* BLANK SPACE INDEX — 3분 무료 진단 (P0)
   원칙(제작지시서 7.1):
   · 응답은 서버로 전송·저장되지 않는다 — 계산은 전부 이 브라우저 안에서 끝난다
   · 전 문항 "모름" 허용 · 결과에는 점수·금액·기간을 표시하지 않는다
   · 결과 = 방향 한 문장 + 위험 신호 최대 2 + 확인되지 않은 항목 + Standard 추천 1~2 */
(function () {
  'use strict';
  var app = document.getElementById('check-app');
  if (!app) return;

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────── 데이터 ───────── */
  var SITUATIONS = [
    { key: 'vacant', label: '공실이다', desc: '비어 있는 공간을 갖고 있습니다' },
    { key: 'leased', label: '임대 중이다', desc: '임차인이 있고, 조건·재계약을 봅니다' },
    { key: 'startup', label: '계약·창업을 검토한다', desc: '들어갈 자리를 알아보고 있습니다' },
    { key: 'trade', label: '매입·매도를 검토한다', desc: '사거나 팔 물건을 보고 있습니다' },
  ];

  var COMMON_Q = [
    {
      id: 'floor', q: '공간은 몇 층에 있나요?',
      opts: [
        { v: 'b', label: '지하' },
        { v: '1', label: '1층' },
        { v: 'up', label: '2층 이상' },
        { v: 'whole', label: '건물 전체·단독' },
      ],
    },
    {
      id: 'size', q: '전용 면적은 어느 정도인가요?',
      opts: [
        { v: 's', label: '33㎡(10평) 미만' },
        { v: 'm', label: '33~66㎡' },
        { v: 'l', label: '66~165㎡' },
        { v: 'xl', label: '165㎡ 이상' },
      ],
      unknown: true,
    },
  ];

  var BRANCH_Q = {
    vacant: [
      {
        id: 'period', q: '공실이 얼마나 이어졌나요?',
        opts: [
          { v: 'lt3', label: '3개월 미만' },
          { v: 'm3', label: '3~6개월' },
          { v: 'm6', label: '6~12개월' },
          { v: 'y1', label: '12개월 이상' },
        ],
      },
      {
        id: 'inquiry', q: '최근 한 달, 임대 문의가 있었나요?',
        opts: [
          { v: 'none', label: '없었습니다' },
          { v: 'few', label: '1~2건' },
          { v: 'some', label: '3건 이상' },
        ],
        unknown: true,
      },
      {
        id: 'visit', q: '보러 온 사람은 있었나요?',
        opts: [
          { v: 'none', label: '없었습니다' },
          { v: 'no_deal', label: '있었지만 계약은 안 됐습니다' },
        ],
        unknown: true,
      },
      {
        id: 'cut', q: '임대 조건을 조정한 적이 있나요?',
        opts: [
          { v: 'no', label: '없습니다' },
          { v: 'once', label: '한 번 내렸습니다' },
          { v: 'multi', label: '두 번 이상 내렸습니다' },
        ],
        unknown: true,
      },
    ],
    leased: [
      {
        id: 'renew', q: '재계약 시점이 언제쯤인가요?',
        opts: [
          { v: 'in6', label: '6개월 안' },
          { v: 'in12', label: '1년 안' },
          { v: 'later', label: '그 이후' },
        ],
        unknown: true,
      },
      {
        id: 'feel', q: '지금 임대료, 시장 대비 어떤 느낌인가요?',
        opts: [
          { v: 'low', label: '낮은 것 같습니다' },
          { v: 'mid', label: '비슷한 것 같습니다' },
          { v: 'high', label: '높은 것 같습니다' },
        ],
        unknown: true,
      },
      {
        id: 'free', q: '렌트프리 등 조건을 제공하고 있나요?',
        opts: [
          { v: 'no', label: '아니요' },
          { v: 'yes', label: '네, 제공 중입니다' },
        ],
        unknown: true,
      },
      {
        id: 'issue', q: '임차인의 연체나 이슈가 있나요?',
        opts: [
          { v: 'no', label: '없습니다' },
          { v: 'some', label: '가끔 있습니다' },
          { v: 'often', label: '잦습니다' },
        ],
        unknown: true,
      },
    ],
    startup: [
      {
        id: 'biz', q: '어떤 업종을 계획하고 있나요?',
        opts: [
          { v: 'food', label: '음식점 · 카페' },
          { v: 'retail', label: '소매 · 판매' },
          { v: 'service', label: '서비스 · 사무' },
          { v: 'tbd', label: '아직 정하지 않았습니다' },
        ],
      },
      {
        id: 'stage', q: '지금 어느 단계인가요?',
        opts: [
          { v: 'look', label: '자리를 알아보는 중' },
          { v: 'target', label: '특정 매물을 검토 중' },
          { v: 'sign', label: '가계약·계약 직전' },
        ],
      },
      {
        id: 'history', q: '그 자리, 이전에 어떤 업종이 있었나요?',
        opts: [
          { v: 'same', label: '같은 업종이 있었습니다' },
          { v: 'diff', label: '다른 업종이 있었습니다' },
          { v: 'new', label: '신축이거나 오래 비어 있었습니다' },
        ],
        unknown: true,
      },
      {
        id: 'permit', q: '용도·인허가 관련 확인은 하셨나요?',
        opts: [
          { v: 'done', label: '확인했습니다' },
          { v: 'part', label: '일부만 확인했습니다' },
          { v: 'no', label: '아직 안 했습니다' },
        ],
        unknown: true,
      },
    ],
    trade: [
      {
        id: 'dir', q: '어느 쪽을 검토하시나요?',
        opts: [
          { v: 'buy', label: '매입' },
          { v: 'sell', label: '매도' },
        ],
      },
      {
        id: 'stage', q: '지금 어느 단계인가요?',
        opts: [
          { v: 'look', label: '물건을 탐색 중' },
          { v: 'target', label: '특정 물건을 검토 중' },
          { v: 'nego', label: '가격 협상 중' },
        ],
      },
      {
        id: 'occupy', q: '현재 임대 상태는 어떤가요?',
        opts: [
          { v: 'vacant', label: '공실이 있습니다' },
          { v: 'full', label: '전부 임대 중입니다' },
        ],
        unknown: true,
      },
      {
        id: 'plan', q: '취득·보유 후 계획은요?',
        opts: [
          { v: 'keep', label: '임대를 유지할 생각입니다' },
          { v: 'convert', label: '직접 운영·용도 전환을 봅니다' },
          { v: 'tbd', label: '아직 정하지 않았습니다' },
        ],
      },
    ],
  };


  var READS = {
    vacant: { href: '/insights/eight-causes/', t: '임대료를 내리기 전에 확인할 여덟 가지' },
    leased: { href: '/insights/effective-rent/', t: '보증금과 렌트프리까지 계산한 진짜 임대료' },
    startup: { href: '/insights/permit-gates/', t: '그 자리에 그 업종이 안 되는 이유' },
    trade: { href: '/insights/average-illusion/', t: '평균 공실률의 착시' },
  };

  /* 결과 규칙 — 신호는 우선순위 순, 최대 2개만 표시 */
  var RULES = {
    vacant: {
      direction: function (a) {
        if (a.cut === 'multi')
          return '입력하신 값이 맞다면, 조건을 더 내리기 전에 원인의 자리를 먼저 갈라야 하는 상황입니다. 가격이 원인이 아니라면 인하는 손실만 확정합니다.';
        if (a.inquiry === 'none' && (a.period === 'm6' || a.period === 'y1'))
          return '입력하신 값이 맞다면, 조건 이전에 매물이 시장에 닿고 있는지부터 확인해야 하는 상황입니다.';
        if (a.visit === 'no_deal')
          return '입력하신 값이 맞다면, 관심은 닿고 있는데 마지막 단계에서 끊기고 있습니다. 그 끊긴 지점을 좁히는 것이 먼저입니다.';
        return '입력하신 값이 맞다면, 감으로 조건을 만지기 전에 원인을 여덟 갈래로 나눠 볼 시점입니다.';
      },
      signals: [
        { when: function (a) { return a.period === 'y1' && a.inquiry === 'none'; }, t: '노출 축 적신호', d: '12개월 이상 공실인데 문의가 없다면, 조건 문제이기 전에 매물이 알려지는 방식의 문제일 수 있습니다.' },
        { when: function (a) { return a.cut === 'multi'; }, t: '가격 축만 반복 조정', d: '두 번 이상 인하에도 반응이 없다면, 원인이 가격 축 밖에 있을 가능성을 확인해야 합니다.' },
        { when: function (a) { return a.visit === 'no_deal'; }, t: '방문 후 이탈', d: '보러 온 뒤 계약이 안 되는 흐름은 물리·설비·조건 어딘가의 신호입니다. 어느 단계에서 끊기는지가 단서입니다.' },
        { when: function (a) { return a.period === 'm6' || a.period === 'y1'; }, t: '공실 장기화 구간', d: '6개월을 넘긴 공실은 기다림보다 구조적 점검이 필요한 구간에 들어와 있습니다.' },
        { when: function (a) { return a.floor === 'b'; }, t: '지하층 조건', d: '지하는 노출·환기·용도 제약이 겹치기 쉬워, 층 특성을 반영한 원인 확인이 필요합니다.' },
      ],
      unresolved: function (a) {
        var u = ['설비 상태(배기·급배수·전기 용량) — 현장 확인 필요', '건축물대장과 현장의 일치 여부 — 정식 진단에서 자동 대조', '가시성·정면성 — 현장 확인 필요'];
        if (a.inquiry === 'unknown') u.push('문의·방문 흐름 — 기록 확인 필요');
        if (a.cut === 'unknown') u.push('조건 조정 이력 — 계약 기록 확인 필요');
        return u;
      },
      reco: function (a) {
        var r = [{ slug: 'vacancy', why: '원인 후보를 최대 두 개로 좁히고, 무엇부터 확인할지 순서를 드립니다.' }];
        if (a.cut === 'once' || a.cut === 'multi') r.push({ slug: 'rent', why: '이미 조건을 만지셨다면, 유효임대료 기준으로 시장과의 간극부터 확인하세요.' });
        else r.push({ slug: 'rent', why: '조건 조정을 검토 중이라면, 감이 아니라 시장 범위 위에서 판단하세요.' });
        return r;
      },
    },
    leased: {
      direction: function (a) {
        if (a.renew === 'in6' && (a.feel === 'unknown' || !a.feel))
          return '입력하신 값이 맞다면, 재계약 협상까지 시간이 많지 않은데 부를 숫자의 근거가 아직 없습니다. 근거를 먼저 만드는 순서입니다.';
        if (a.feel === 'low')
          return '입력하신 값이 맞다면, 인상 여지를 확인할 근거를 갖출 시점입니다. 다만 감의 확인이 먼저입니다 — 낮다는 느낌과 시장의 실제는 다를 수 있습니다.';
        if (a.feel === 'high')
          return '입력하신 값이 맞다면, 다음 재계약에서 조건 방어가 과제가 됩니다. 지금 조건이 범위의 어디인지부터 확인하세요.';
        return '입력하신 값이 맞다면, 지금은 문제가 없어 보여도 재계약 국면 전에 조건의 위치를 확인해 둘 시점입니다.';
      },
      signals: [
        { when: function (a) { return a.renew === 'in6'; }, t: '재계약 6개월 전 구간', d: '협상은 근거 준비에서 갈립니다. 시점이 가까울수록 선택지가 줄어듭니다.' },
        { when: function (a) { return a.issue === 'often'; }, t: '임차인 리스크 신호', d: '연체가 잦다면 조건 논의 이전에 계약 안정성의 점검이 필요합니다.' },
        { when: function (a) { return a.free === 'yes'; }, t: '명목과 실질의 간극', d: '렌트프리를 제공 중이라면 명목 임대료와 실질 수취액이 다릅니다. 비교는 유효임대료 기준이어야 합니다.' },
        { when: function (a) { return a.feel === 'unknown'; }, t: '근거 없는 협상 위험', d: '시장 대비 위치를 모른 채 협상에 들어가면, 기준을 상대가 정하게 됩니다.' },
      ],
      unresolved: function (a) {
        var u = ['시장 대비 실제 위치 — 유효임대료 환산 비교 필요', '유사 계약 사례와의 간극 — 정식 진단에서 확인', '건축물대장 대조 — 정식 진단에서 자동'];
        if (a.issue !== 'no') u.push('임차인 안정성 — 별도 확인 필요');
        return u;
      },
      reco: function () {
        return [{ slug: 'rent', why: '보증금·렌트프리까지 환산한 실질 조건이 시장 범위의 어디인지, 판정과 함께 확인합니다.' }];
      },
    },
    startup: {
      direction: function (a) {
        if (a.stage === 'sign' && a.permit !== 'done')
          return '입력하신 값이 맞다면, 도장을 찍기 전에 확인해야 할 관문이 남아 있습니다. 계약 후에 아는 것과 전에 아는 것의 차이는 권리금 전액입니다.';
        if (a.biz === 'tbd')
          return '입력하신 값이 맞다면, 업종을 정하기 전에 이 공간에 무엇이 되는지부터 보는 순서가 유리합니다. 공간이 업종을 골라 줄 때도 있습니다.';
        return '입력하신 값이 맞다면, 이 자리에서 그 업종이 법적으로 가능한지 — 관문 확인이 다음 순서입니다.';
      },
      signals: [
        { when: function (a) { return a.stage === 'sign' && a.permit !== 'done'; }, t: '계약 직전, 관문 미확인', d: '용도·정화조·소방·학교 제한 같은 관문은 계약 뒤에는 되돌릴 수 없습니다.' },
        { when: function (a) { return a.biz === 'food' && a.permit !== 'done'; }, t: '음식업 설비 관문', d: '음식점·카페는 정화조 용량과 배기 경로에서 막히는 경우가 가장 잦습니다.' },
        { when: function (a) { return a.history === 'diff' || a.history === 'new'; }, t: '용도 이력의 공백', d: '같은 업종의 이력이 없는 자리는 인허가 관문을 처음부터 통과해야 합니다.' },
        { when: function (a) { return a.floor === 'b' && a.biz === 'food'; }, t: '지하 + 음식업 조합', d: '지하층 음식업은 환기·피난 요건이 겹쳐 확인 항목이 늘어납니다.' },
      ],
      unresolved: function (a) {
        var u = ['여덟 관문의 실제 판정 — 정식 확인 필요', '정화조·오수 용량 — 공부 대조 필요', '소방·피난 여건 — 현장 확인 필요'];
        if (a.biz === 'tbd') u.push('이 공간에 맞는 수익 모델 — 적합성 평가 영역');
        return u;
      },
      reco: function (a) {
        if (a.biz === 'tbd')
          return [
            { slug: 'smfi', why: '업종이 미정이라면, 열네 가지 모델 중 이 공간에 맞는 것부터 좁히세요.' },
            { slug: 'business', why: '후보 업종이 잡히면 관문 확인으로 이어집니다.' },
          ];
        return [
          { slug: 'business', why: '목표 업종의 여덟 관문을 3분 응답으로 확인하고, 관할에 물을 질문까지 받아 가세요.' },
        ];
      },
    },
    trade: {
      direction: function (a) {
        if (a.dir === 'buy' && a.plan === 'convert')
          return '입력하신 값이 맞다면, 가격보다 먼저 볼 것은 전환 계획의 성립 여부입니다. 계획이 안 되는 건물의 가격은 의미가 없습니다.';
        if (a.dir === 'buy')
          return '입력하신 값이 맞다면, 제시가를 판단할 기준 — 임대 가정과 수익 구조의 점검이 다음 순서입니다.';
        return '입력하신 값이 맞다면, 매도 조건을 잡기 전에 이 자산의 임대 조건이 시장 어디에 있는지부터 확인해 둘 시점입니다.';
      },
      signals: [
        { when: function (a) { return a.dir === 'buy' && a.stage === 'nego' && a.plan === 'tbd'; }, t: '계획 없는 협상', d: '활용 계획이 서기 전의 협상은 상한선 없는 협상이 되기 쉽습니다.' },
        { when: function (a) { return a.occupy === 'vacant'; }, t: '공실 포함 자산', d: '공실의 원인이 해소 가능한 것인지, 구조적인 것인지에 따라 같은 가격도 의미가 달라집니다.' },
        { when: function (a) { return a.dir === 'buy' && a.plan === 'convert'; }, t: '전환 전제의 매입', d: '전환은 법규·물리·경제성의 세 관문을 모두 통과해야 성립합니다. 계약 전에 확인할 수 있습니다.' },
      ],
      unresolved: function () {
        return ['임대료 가정의 시장 정합 — 정식 진단 필요', '시설 상태와 향후 지출 — 현장 확인 필요', '법규·용도 관문 — 공부 대조 필요'];
      },
      reco: function (a) {
        if (a.plan === 'convert' || a.plan === 'tbd')
          return [
            { slug: 'smfi', why: '이 공간으로 무엇이 되는지 — 모델 적합도와 경제성까지 본 평가로 확인하세요.' },
            { slug: 'rent', why: '수익률 계산의 출발점인 임대료 가정부터 점검하세요.' },
          ];
        return [
          { slug: 'rent', why: '수익률의 뿌리인 임대료 가정을 유효임대료 기준으로 점검하세요.' },
          { slug: 'business', why: '목표 임차 업종이 있다면 법규 관문을 미리 확인해 두세요.' },
        ];
      },
    },
  };

  var INDEX_META = {
    vacancy: { name: '공실 원인 진단', time: '9문항 · 5분', href: '/index/vacancy/' },
    rent: { name: '적정임대료 진단', time: '7문항 · 5분', href: '/index/rent/' },
    business: { name: '영업 가능성 확인', time: '2+α문항 · 3분', href: '/index/business/' },
    smfi: { name: '공간수익화 적합성 평가', time: '본 평가 · 상담', href: '/index/smfi/' },
  };

  /* ───────── 상태 ───────── */
  var state = { addr: '', situation: null, answers: {}, step: 0 };
  var flow = []; // 동적 화면 목록

  function buildFlow() {
    flow = [{ type: 'addr' }, { type: 'situation' }];
    COMMON_Q.forEach(function (q) { flow.push({ type: 'q', q: q }); });
    (BRANCH_Q[state.situation] || []).forEach(function (q) { flow.push({ type: 'q', q: q }); });
    flow.push({ type: 'calc' });
    flow.push({ type: 'result' });
  }

  /* ───────── 렌더 ───────── */
  function el(html) {
    var d = document.createElement('div');
    d.innerHTML = html.trim();
    return d.firstChild;
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  var qTotal = function () { return flow.filter(function (f) { return f.type === 'q'; }).length; };
  var qIndex = function () {
    var n = 0;
    for (var i = 0; i < state.step; i++) if (flow[i].type === 'q') n++;
    return n;
  };

  function header(showProgress) {
    var pct = 0, label = '';
    if (showProgress) {
      var t = qTotal();
      var i = Math.min(qIndex() + 1, t);
      pct = Math.round((qIndex() / t) * 100);
      label = '문항 ' + i + ' / ' + t;
    }
    return (
      '<div class="wiz__top">' +
      (state.step > 0
        ? '<button type="button" class="wiz__back" data-back aria-label="이전으로">&larr; 이전</button>'
        : '<span></span>') +
      (state.addr ? '<span class="wiz__addr" title="' + esc(state.addr) + '">' + esc(state.addr) + '</span>' : '<span></span>') +
      '</div>' +
      (showProgress
        ? '<div class="wiz__meta"><span class="lbl">' + label + '</span><span class="lbl" style="color:var(--slate);">전 문항 · 모름 선택 가능</span></div><div class="wiz__bar" aria-hidden="true"><span style="width:' + pct + '%"></span></div>'
        : '')
    );
  }

  function screenAddr() {
    return el(
      '<div class="wiz__screen">' + header(false) +
        '<h2 class="wiz__q">어느 공간이 궁금하신가요?</h2>' +
        '<p class="wiz__hint">주소나 건물 이름을 적어 주세요. 결과 화면의 표시에만 쓰이며, 어디로도 전송·저장되지 않습니다.</p>' +
        '<form class="wiz__addrform" data-addrform>' +
          '<input class="wiz__input" type="text" name="addr" autocomplete="off" placeholder="예) 서울 ○○구 ○○로 12, 1층" value="' + esc(state.addr) + '" aria-label="주소 또는 건물 이름">' +
          '<button class="btn btn--primary" type="submit">다음</button>' +
        '</form>' +
        '<p class="wiz__note">정식 진단에서는 이 단계에서 건축물대장이 자동으로 조회되어 확인만 하시면 됩니다.</p>' +
      '</div>'
    );
  }

  function screenSituation() {
    return el(
      '<div class="wiz__screen">' + header(false) +
        '<h2 class="wiz__q">지금 상황과 가장 가까운 것은요?</h2>' +
        '<div class="opts" role="group" aria-label="상황 선택">' +
          SITUATIONS.map(function (s, i) {
            return (
              '<button type="button" class="opt" data-sit="' + s.key + '"><i class="opt__key num">' + (i + 1) + '</i><span><b>' + s.label + '</b><small>' + s.desc + '</small></span></button>'
            );
          }).join('') +
        '</div>' +
      '</div>'
    );
  }

  function screenQuestion(q) {
    var opts = q.opts.slice();
    if (q.unknown) opts.push({ v: 'unknown', label: '모르겠습니다', muted: true });
    return el(
      '<div class="wiz__screen">' + header(true) +
        '<h2 class="wiz__q">' + esc(q.q) + '</h2>' +
        '<div class="opts" role="group">' +
          opts.map(function (o, i) {
            return (
              '<button type="button" class="opt' + (o.muted ? ' opt--muted' : '') + '" data-q="' + q.id + '" data-v="' + o.v + '"><i class="opt__key num">' + (i + 1) + '</i><span><b>' + esc(o.label) + '</b></span></button>'
            );
          }).join('') +
        '</div>' +
      '</div>'
    );
  }

  function screenCalc() {
    return el(
      '<div class="wiz__screen wiz__screen--calc">' + header(false) +
        '<h2 class="wiz__q">확인하고 있습니다</h2>' +
        '<ul class="calc" data-calc>' +
          ['입력 내용 정리', '위험 신호 대조', '확인이 필요한 항목 분류'].map(function (t) { return '<li><i></i>' + t + '</li>'; }).join('') +
        '</ul>' +
        '<p class="wiz__note">계산은 이 브라우저 안에서 끝납니다.</p>' +
      '</div>'
    );
  }

  function screenResult() {
    var R = RULES[state.situation];
    var a = state.answers;
    var direction = R.direction(a);
    var signals = R.signals.filter(function (s) { return s.when(a); }).slice(0, 2);
    var unresolved = R.unresolved(a);
    var recos = R.reco(a).slice(0, 2);
    var sitLabel = SITUATIONS.filter(function (s) { return s.key === state.situation; })[0].label;

    var summary =
      '[BLANK SPACE INDEX 3분 진단 요약]\n' +
      '대상: ' + (state.addr || '(미입력)') + ' · 상황: ' + sitLabel + '\n' +
      '방향: ' + direction + '\n' +
      (signals.length ? '위험 신호: ' + signals.map(function (s) { return s.t; }).join(', ') + '\n' : '') +
      '확인되지 않은 항목: ' + unresolved.join(' / ') + '\n' +
      '다음 단계: ' + recos.map(function (r) { return INDEX_META[r.slug].name; }).join(', ') +
      '\n(무료 진단은 점수·금액·기간을 제시하지 않습니다)';

    return el(
      '<div class="wiz__screen wiz__screen--result">' +
        '<div class="wiz__top">' +
          '<button type="button" class="wiz__back" data-back aria-label="마지막 문항으로 돌아가 답변 수정">&larr; 답변 수정</button>' +
          '<span class="chip chip--green">진단 완료</span>' +
          (state.addr ? '<span class="wiz__addr">' + esc(state.addr) + '</span>' : '<span></span>') +
        '</div>' +
        '<p class="eyebrow" style="margin:18px 0 10px;">방향</p>' +
        '<p class="res__direction">' + esc(direction) + '</p>' +

        (signals.length
          ? '<p class="eyebrow" style="margin:30px 0 12px;">위험 신호 · ' + signals.length + '건</p>' +
            '<div class="res__signals">' +
            signals.map(function (s) {
              return '<div class="res__signal"><span class="verdict verdict--warn">' + esc(s.t) + '</span><p>' + esc(s.d) + '</p></div>';
            }).join('') +
            '</div>'
          : '<p class="eyebrow" style="margin:30px 0 12px;">위험 신호</p><p class="muted">응답 범위에서 뚜렷한 적신호는 없었습니다. 아래 미확인 항목이 남은 변수입니다.</p>') +

        '<p class="eyebrow" style="margin:30px 0 12px;">확인되지 않은 항목</p>' +
        '<ul class="res__unresolved">' + unresolved.map(function (u) { return '<li>' + esc(u) + '</li>'; }).join('') + '</ul>' +
        '<p class="wiz__note" style="margin-top:10px;">이 목록이 다음 단계의 근거입니다 — 무료 진단은 여기서 멈추고, 점수·금액·기간은 제시하지 않습니다.</p>' +

        '<p class="eyebrow" style="margin:34px 0 12px;">상황에 맞는 다음 단계</p>' +
        '<div class="res__recos">' +
          recos.map(function (r) {
            var m = INDEX_META[r.slug];
            return (
              '<a class="reco" href="' + m.href + '"><div><span class="lbl" style="color:var(--teal);">' + (r.slug === 'smfi' ? '본 평가' : 'Standard · 셀프 진단') + '</span>' +
              '<b>' + m.name + '</b><p>' + esc(r.why) + '</p></div><span class="reco__meta"><span class="code-tag">' + m.time + '</span><span class="index-card__cta">자세히 보기</span></span></a>'
            );
          }).join('') +
        '</div>' +

        '<p class="res__read">더 읽어 보기 — <a href="' + READS[state.situation].href + '">' + READS[state.situation].t + '</a></p>' +
        '<div class="res__actions">' +
          '<button type="button" class="btn btn--ghost" data-copy>결과 요약 복사</button>' +
          '<button type="button" class="btn btn--ghost" data-restart>처음부터 다시</button>' +
        '</div>' +
        '<p class="wiz__note">응답은 저장되지 않았습니다. 이 화면을 벗어나면 결과도 사라지니, 필요하면 요약을 복사해 두세요. 결과 코드 이어받기와 이메일 수신은 정식 오픈과 함께 제공됩니다.</p>' +
        '<textarea class="sr-only" data-summary readonly>' + esc(summary) + '</textarea>' +
      '</div>'
    );
  }

  /* ───────── 전환 ───────── */
  var busy = false;
  function show(step, dir) {
    state.step = step;
    var f = flow[step];
    var node =
      f.type === 'addr' ? screenAddr()
      : f.type === 'situation' ? screenSituation()
      : f.type === 'q' ? screenQuestion(f.q)
      : f.type === 'calc' ? screenCalc()
      : screenResult();

    var old = app.firstElementChild;
    if (REDUCED || !old) {
      app.innerHTML = '';
      app.appendChild(node);
    } else {
      node.classList.add(dir === 'back' ? 'is-enter-back' : 'is-enter');
      app.appendChild(node);
      old.classList.add(dir === 'back' ? 'is-exit-back' : 'is-exit');
      setTimeout(function () { old.remove(); node.classList.remove('is-enter', 'is-enter-back'); }, 210);
    }
    bind(node, f);
    /* 전환 후 위저드 상단 정렬 — 모바일에서 다음 문항이 시야에 오도록 */
    if (state.step > 0) {
      var top = app.getBoundingClientRect().top + window.pageYOffset - 84;
      if (Math.abs(window.pageYOffset - top) > 40) window.scrollTo({ top: top, behavior: REDUCED ? 'auto' : 'smooth' });
    }
    var first = node.querySelector('input, .opt, [data-copy]');
    if (first && f.type !== 'calc') first.focus({ preventScroll: true });
    if (f.type === 'calc') runCalc(node);
    app.setAttribute('data-step-type', f.type);
  }

  function next() { if (state.step < flow.length - 1) show(state.step + 1, 'fwd'); }
  function back() {
    if (state.step === 0) return;
    var target = state.step - 1;
    if (flow[target] && flow[target].type === 'calc') target--; // 결과에서 뒤로 → 마지막 문항
    show(target, 'back');
  }

  function pick(btn, cb) {
    if (busy) return;
    busy = true;
    btn.classList.add('is-picked');
    setTimeout(function () { busy = false; cb(); }, REDUCED ? 40 : 300);
  }

  function bind(node, f) {
    var backBtn = node.querySelector('[data-back]');
    if (backBtn) backBtn.addEventListener('click', back);

    if (f.type === 'addr') {
      node.querySelector('[data-addrform]').addEventListener('submit', function (e) {
        e.preventDefault();
        state.addr = e.target.addr.value.trim();
        next();
      });
    }
    if (f.type === 'situation') {
      node.querySelectorAll('[data-sit]').forEach(function (b) {
        b.addEventListener('click', function () {
          pick(b, function () {
            state.situation = b.getAttribute('data-sit');
            state.answers = {};
            buildFlow();
            show(2, 'fwd'); // 공통 문항 시작
          });
        });
      });
    }
    if (f.type === 'q') {
      node.querySelectorAll('[data-q]').forEach(function (b) {
        b.addEventListener('click', function () {
          pick(b, function () {
            state.answers[b.getAttribute('data-q')] = b.getAttribute('data-v');
            next();
          });
        });
      });
    }
    if (f.type === 'result') {
      node.querySelector('[data-restart]').addEventListener('click', function () {
        state = { addr: '', situation: null, answers: {}, step: 0 };
        buildFlow();
        show(0, 'back');
      });
      var copyBtn = node.querySelector('[data-copy]');
      copyBtn.addEventListener('click', function () {
        var ta = node.querySelector('[data-summary]');
        var done = function () {
          copyBtn.textContent = '복사되었습니다';
          setTimeout(function () { copyBtn.textContent = '결과 요약 복사'; }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(ta.value).then(done, function () { ta.select(); document.execCommand('copy'); done(); });
        } else { ta.select(); document.execCommand('copy'); done(); }
      });
    }
  }

  function runCalc(node) {
    var items = node.querySelectorAll('[data-calc] li');
    var i = 0;
    (function tick() {
      if (i > 0) items[i - 1].classList.add('is-done');
      if (i < items.length) {
        items[i].classList.add('is-on');
        i++;
        setTimeout(tick, REDUCED ? 60 : 520);
      } else {
        setTimeout(function () { next(); }, REDUCED ? 60 : 340);
      }
    })();
  }

  /* 키보드 숫자 선택 */
  document.addEventListener('keydown', function (e) {
    if (e.key < '1' || e.key > '9') return;
    var t = flow[state.step] && flow[state.step].type;
    if (t !== 'q' && t !== 'situation') return;
    var btns = app.querySelectorAll('.opt');
    var idx = parseInt(e.key, 10) - 1;
    if (btns[idx]) btns[idx].click();
  });

  /* 시작 */
  buildFlow();
  show(0, 'fwd');
})();
