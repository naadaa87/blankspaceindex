/**
 * 신청 허브 (/apply) — 제작지시서 7.3절
 * 유형 네 갈래에서 시작한다. 온라인 결제·마이페이지 추적은 정식 오픈과 함께 열리며,
 * 지금은 이메일 사전 접수로 받고 영업일 1일 안에 회신한다.
 */
const { SITE } = require('../data/site');

const mail = (subject, lines) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent('[사전 신청] ' + subject)}&body=${encodeURIComponent(lines.join('\n'))}`;

module.exports = (entry) => {
  const COMMON = ['대상 공간(주소): ', '연락처: ', '희망 일정: '];
  const types = [
    {
      id: 'pro', chip: 'Standard · Pro', t: '전문가 진단 신청', code: '지수 선택형',
      d: '공실 원인 · 적정임대료 · 영업 가능성 중 지수를 골라 신청합니다. Standard는 즉시형, Pro는 자료 검증과 검토자 서명이 들어갑니다.',
      docs: ['원하는 지수(공실 원인 / 적정임대료 / 영업 가능성)', 'Pro 희망 시 — 임대차계약서·관리비 내역 등 보유 자료 여부', '의뢰 목적 한 줄'],
      href: mail('전문가 진단', ['신청 유형: 전문가 진단 (Standard/Pro)', '희망 지수: ', ...COMMON, '의뢰 목적: ', '보유 자료: ']),
      cta: '이메일로 신청하기',
    },
    {
      id: 'smfi', chip: '본 평가', t: 'SMFI 본 평가 신청', code: 'SMFI 2.1',
      d: '이 공간으로 무엇을 해야 하는가 — 5단계 파이프라인 전체를 수행하는 케이스형 평가입니다. 범위 확인 후 견적으로 진행합니다.',
      docs: ['공간 개요(층·면적·현재 상태)', '검토 배경(전환 검토 / 매입 검토 / 장기 공실 등)', '희망 납기'],
      href: mail('SMFI 본 평가', ['신청 유형: 공간수익화 적합성 본 평가', ...COMMON, '공간 개요: ', '검토 배경: ']),
      cta: '이메일로 신청하기',
    },
    {
      id: 'onsite', chip: '현장', t: '현장 점검 사전 신청', code: 'P5',
      d: '7개 영역 약 100개 항목의 실측·촬영. 오픈 초기에는 사전 신청으로 접수하고, 권역·일정이 열리는 순서대로 연락드립니다.',
      docs: ['점검 범위(점포 / 층 / 건물 전체)', '목표 업종(있는 경우)', '출입 조건(열쇠 보관처 · 임차인 점유 여부)'],
      href: mail('현장 점검', ['신청 유형: 현장 점검 (사전 신청)', ...COMMON, '점검 범위: ', '목표 업종: ', '출입 조건: ']),
      cta: '사전 신청하기',
    },
    {
      id: 'consult', chip: '상담', t: '상담 신청', code: 'B2B 포함',
      d: '무엇부터 해야 할지 모르겠을 때, 또는 프랜차이즈·중개·지자체의 제휴 논의가 필요할 때 — 상황을 먼저 들려주세요.',
      docs: ['상담 주제(진단 선택 / 실행 전환 / B2B·제휴)', '상황 요약 두세 줄'],
      href: mail('상담', ['신청 유형: 상담', ...COMMON, '상담 주제: ', '상황 요약: ']),
      cta: '상담 요청하기',
    },
  ];

  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">신청 허브</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);">무엇을 진행할지<br>여기서 고르시면 됩니다</h1>
      <p class="hero__sub" style="max-width:660px;">네 갈래 중 하나를 골라 신청을 남겨 주세요. 온라인 결제와 진행 추적은 정식 오픈과 함께 열리며, 지금은 이메일 사전 접수로 받고 <b>영업일 1일 안에</b> 회신드립니다.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="apply-grid">
        ${types
          .map(
            (x) => `<div class="apply-card reveal" id="${x.id}">
          <div class="prod__head"><span class="chip">${x.chip}</span><h2 class="h2">${x.t}</h2><span class="code-tag">${x.code}</span></div>
          <p class="prod__desc">${x.d}</p>
          <div class="apply-docs"><span class="lbl">신청 시 알려 주시면 좋은 것</span><ul>${x.docs.map((d) => `<li>${d}</li>`).join('')}</ul></div>
          <a class="btn btn--primary" href="${x.href}">${x.cta}</a>
        </div>`
          )
          .join('\n        ')}
      </div>
      <p class="muted reveal" style="margin-top:18px;">이메일 앱이 열리지 않으면 ${SITE.email} 로 직접 보내 주셔도 됩니다. 신청 정보는 접수·회신 목적으로만 사용됩니다.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">접수 후에는</p><h2 class="h1">진행은 이 순서로 갑니다</h2>
      <p class="lead">정식 오픈 후에는 마이페이지에서 아래 상태 바로 실시간 추적됩니다. 상태가 바뀔 때마다 알림을 드립니다.</p></div>
      <ol class="flow-bar reveal">
        ${['접수', '결제 확인', '자료 확인', '평가 중', '검토 중', '발행'].map((s, i) => `<li${i === 0 ? ' class="is-on"' : ''}><i class="num">${i + 1}</i>${s}</li>`).join('')}
      </ol>
      <div class="grid-2 reveal" style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:36px;">
        <div class="tile"><h3>견적과 납기</h3><p>표준 범위는 확인 즉시 견적을 드리고, 건물 단위·복수 호실은 영업일 1일 안에 안내합니다. 납기는 상품 기준 영업일 3~10일이며, 자료 제출이 늦어지는 기간은 납기에서 제외됩니다.</p></div>
        <div class="tile"><h3>공제</h3><p>Standard 결제액은 같은 지수의 Pro 전환 시 전액 공제되고, 유료 진단 비용은 이후 실행 프로젝트 계약 시 공제됩니다. 공제 예정액은 결제·계약 화면에 표시됩니다.</p></div>
      </div>
    </div>
  </section>

  <section class="section section--alt final-cta section--tight">
    <div class="container">
      <div class="section-head section-head--center reveal">
        <h2 class="h1">아직 고르기 어렵다면</h2>
        <p class="lead">3분 무료 진단이 상황을 읽고 다음 단계를 추천해 드립니다.</p>
        <div class="btn-row"><a class="btn btn--primary btn--lg" href="/check/">3분 무료 진단 시작하기</a></div>
      </div>
    </div>
  </section>`;

  return { path: entry.path, title: entry.title, description: entry.desc, body, bodyClass: 'page-apply' };
};
