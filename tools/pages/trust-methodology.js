/**
 * 방법론 — 네 층의 스택(참조 틀) + SMFI 2.1 계산 기준 전면 공개
 * 표는 모두 public/assets/js/smfi-data.js에서 읽는다 — 코드가 기준.
 */
const { NOTICES } = require('../data/site');
const D = require('../../public/assets/js/smfi-data.js');

const sumIndicators = D.AREAS.reduce((a, b) => a + b.indicators, 0);
const absGates = D.GATES_ALL.filter((g) => g.kind === '절대').length;
const condGates = D.GATES_ALL.length - absGates;

module.exports = (entry) => {
  const body = `
  <section class="dhero">
    <div class="container">
      <p class="eyebrow">신뢰와 검증 · 방법론</p>
      <h1 class="h-display" style="font-size:clamp(30px,3.8vw,44px);max-width:820px;">새 이론을 발명하지 않습니다.<br><em>검증된 것 위에 서서, 계산을 공개합니다</em></h1>
      <p class="hero__sub" style="max-width:700px;">평가의 권위는 결과를 감추는 데서 오지 않습니다. 무엇을 참조했고, 어떤 기준으로 무엇을 재며, 어디까지가 이 평가의 한계인지를 모두 공개합니다. 아래 표와 산식은 실제 계산에 쓰는 데이터 파일에서 그대로 읽어 온 값입니다.</p>
      <div class="hero__tags" style="gap:14px;">
        <a href="#stack" style="color:var(--teal);font-weight:600;font-size:14px;"># 방법론 스택</a>
        <a href="#principles" style="color:var(--teal);font-weight:600;font-size:14px;"># 설계 원칙</a>
        <a href="#gates" style="color:var(--teal);font-weight:600;font-size:14px;"># 하드게이트 ${D.GATES_ALL.length}</a>
        <a href="#areas" style="color:var(--teal);font-weight:600;font-size:14px;"># ${D.AREAS.length}영역 ${sumIndicators}지표</a>
        <a href="#formula" style="color:var(--teal);font-weight:600;font-size:14px;"># 산식</a>
        <a href="#evidence" style="color:var(--teal);font-weight:600;font-size:14px;"># 증거등급</a>
        <a href="#limits" style="color:var(--teal);font-weight:600;font-size:14px;"># 한계</a>
      </div>
    </div>
  </section>

  <!-- 1. 방법론 스택 -->
  <section class="section section--alt" id="stack">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">무엇을 참조했는가</p><h2 class="h1">방법론 스택 — 네 개의 층</h2>
      <p class="lead">전문성을 입증하는 가장 확실한 방법은 검증된 방법론들 위에 서 있음을 보여 주고, 블랭크의 고유 데이터로 그것을 보정하는 것이라고 믿습니다.</p></div>
      <div class="sp-wrap reveal">
        <table class="table sp-table">
          <thead><tr><th style="width:18%;">층위</th><th>채택 방법론</th><th style="width:28%;">적용 위치</th></tr></thead>
          <tbody>
            <tr><th scope="row">① 가치평가 정합</th><td>감정평가에 관한 규칙과 실무기준이 정의하는 비교·수익·원가 3방식의 용어와 논리 구조, IVS(국제평가기준)의 가치 전제·접근법·보고 원칙을 참조 틀로 채택합니다.</td><td>기준시점·가치 전제 메타데이터, 리포트의 전제 명시</td></tr>
            <tr><th scope="row">② 다기준 의사결정</th><td>전문가 합의(Delphi)와 쌍대비교(AHP, 일관성비율 0.10 이하 목표)로 평가축 가중치의 상대 중요도를 검토하되, 그 결과를 확정치로 쓰지 않고 실증 보정과 병행합니다.</td><td>${D.AREAS.length}개 영역 가중치, ${D.MODELS.length}개 모델 가중치 매트릭스</td></tr>
            <tr><th scope="row">③ 통계·계량 모형</th><td>특성 분해 회귀(임대료), 로지스틱·생존분석(공실 발생과 기간), 분위 기반 정규화와 극단값 처리(왜도 자료)를 사용합니다.</td><td>전문가 진단의 보정, 공통 정규화 함수</td></tr>
            <tr><th scope="row">④ 성능·공정성 지표</th><td>오차율(MAPE·중앙값 APE)과 범위 포함률, 판별력(AUC)·확률 보정(Brier·캘리브레이션), 산포 지표, 평가자 간 편차 분석으로 성적표를 만듭니다.</td><td>검증 로드맵 전 단계, 오차 요약 공시</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tier-grid reveal" style="margin-top:36px;">
        ${[
          ['뼈대', '공인된 기준에서', '접근법의 구조와 용어는 이미 검증된 기준에서 가져옵니다. 발명이 아니라 채택입니다.'],
          ['살', '실행 데이터로', '판단의 기준값은 2015년부터 쌓아 온 직접 실행 데이터로 채우고 보정합니다.'],
          ['성적표', '통계 지표로', '결과의 정확도는 주장 대신 오차·판별력·산포의 숫자로 공개합니다.'],
        ].map(([c, t, d]) => `<div class="tier"><span class="tier__code">${c}</span><b>${t}</b><p>${d}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <!-- 2. 설계 원칙 -->
  <section class="section" id="principles">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">설계 원칙</p><h2 class="h1">평가 체계가 스스로에게 거는 제약</h2></div>
      <div class="pri-grid reveal">
        ${D.PRINCIPLES.map((p, i) => `<div class="pri"><i class="num">${String(i + 1).padStart(2, '0')}</i><b>${p.t}</b><p>${p.d}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <!-- 3. 하드게이트 -->
  <section class="section section--alt" id="gates">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">STEP 1 · 탈락 우선</p><h2 class="h1">하드게이트 ${D.GATES_ALL.length} — 통과 조건이지 감점 항목이 아닙니다</h2>
      <p class="lead">가중평균 점수가 치명적 결함을 덮어 버리는 일을 막기 위해, ${D.GATES_ALL.length}가지 결격 항목은 점수와 별개로 먼저 판정합니다. 해소할 수 없는 <b>절대게이트 ${absGates}개</b>는 미해소 시 평가를 진행하지 않고, 공사·인허가·계약으로 풀 수 있는 <b>조건게이트 ${condGates}개</b>는 해소 조건과 개략 비용, 기간을 명시한 채 평가를 계속합니다.</p></div>
      <div class="sp-wrap reveal">
        <table class="table sp-table">
          <thead><tr><th style="width:9%;">No</th><th style="width:20%;">게이트</th><th style="width:11%;">구분</th><th>확인 내용</th></tr></thead>
          <tbody>
            ${D.GATES_ALL.map((g) => `<tr><th scope="row" class="num">${g.id}</th><td><b>${g.name}</b>${g.self ? ' <span class="chip chip--muted" style="font-size:10px;">예비 진단 포함</span>' : ''}</td><td><span class="verdict verdict--${g.kind === '절대' ? 'fail' : 'warn'}">${g.kind}</span></td><td>${g.check}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="notice reveal" style="margin-top:22px;"><p><strong>해소 비용은 감점이 아니라 투자비로 산입합니다.</strong> 결격의 무게를 감이 아니라 회계로 다루기 위해서입니다. 예비 진단에는 이 가운데 스스로 답할 수 있는 ${D.GATES.length}개를 발췌해 적용합니다.</p></div>
    </div>
  </section>

  <!-- 4. 영역·지표 -->
  <section class="section" id="areas">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">STEP 2 · 기초 체력</p><h2 class="h1">${D.AREAS.length}개 영역 ${sumIndicators}개 지표</h2>
      <p class="lead">게이트를 통과한 공간은 모델과 무관하게 갖춰야 할 기초 체력을 평가받습니다. <b>핵심 영역</b>으로 표시한 네 영역은 어느 하나라도 만점의 ${D.CONST.coreFloor}%에 미치지 못하면 종합점수와 무관하게 판정 상한이 ‘보류’로 제한됩니다.</p></div>
      <div class="sp-wrap reveal">
        <table class="table sp-table">
          <thead><tr><th style="width:22%;">평가 영역</th><th style="width:10%;">지표 수</th><th style="width:10%;">가중치</th><th>주요 확인 내용</th></tr></thead>
          <tbody>
            ${D.AREAS.map((a) => `<tr${a.core ? ' class="is-core"' : ''}><th scope="row">${a.name}${a.core ? ' <span class="chip" style="font-size:10px;">핵심</span>' : ''}</th><td class="num">${a.indicators}</td><td class="num">${a.weight}</td><td>${a.desc}</td></tr>`).join('')}
            <tr><th scope="row" style="background:var(--teal-tint);">합계</th><td class="num" style="background:var(--teal-tint);"><b>${sumIndicators}</b></td><td class="num" style="background:var(--teal-tint);"><b>${D.AREAS.reduce((a, b) => a + b.weight, 0)}</b></td><td style="background:var(--teal-tint);">지표별 정의와 척도의 최종 원천은 SMFI 워크북이며, 개별 채점표 전문은 본 평가 리포트에서 전부 공개합니다.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- 5. 모델 -->
  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">STEP 3 · 모델 적합도</p><h2 class="h1">${D.MODELS.length}개 수익모델</h2>
      <p class="lead">같은 공간이라도 모델에 따라 중요한 조건이 다릅니다. 촬영 스튜디오에 층고가 결정적이라면, 무인 리테일에는 관리 동선과 방범이 앞섭니다. 모델마다 다른 가중치 매트릭스를 적용해 순위를 냅니다. 둘 이상의 모델을 시간대나 구역으로 나눠 결합하는 하이브리드 조합도 함께 검토합니다.</p></div>
      <div class="mg-grid reveal">
        ${D.MODEL_GROUPS.map((g) => `<div class="mg"><div class="mg__h"><b>${g.name}</b><span class="chip chip--muted">${g.count}개 모델</span></div><p>${g.list}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <!-- 6. 산식 -->
  <section class="section" id="formula">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">산식</p><h2 class="h1">종합점수와 신뢰도는 함께 읽습니다</h2>
      <p class="lead">평가가 산출하는 최종 수치를 <b>공간수익화 적합지수</b>, 영문으로 SMFI(Space Monetization Fit Index)라고 부릅니다. 아래 산식으로 계산한 0~100 사이의 값이며, 뒤에 붙는 숫자는 체계의 버전입니다.</p></div>
      <div class="formula-box reveal">
        <p class="formula formula--lg">S<sub>j</sub> = ${D.CONST.weightS.B.toFixed(2)} × B &nbsp;+&nbsp; ${D.CONST.weightS.M.toFixed(2)} × M<sub>j</sub> &nbsp;+&nbsp; ${D.CONST.weightS.E.toFixed(2)} × E<sub>j</sub> &nbsp;−&nbsp; P<sub>j</sub></p>
        <div class="formula-leg">
          <span><b>B</b> ${D.AREAS.length}개 영역 ${sumIndicators}개 지표의 공통 기반 점수</span>
          <span><b>M<sub>j</sub></b> 모델 j의 가중치를 적용한 모델별 적합 점수</span>
          <span><b>E<sub>j</sub></b> 임대 조건·면적·층 기준의 경제성 점수</span>
          <span><b>P<sub>j</sub></b> 조건게이트 미해소에 따른 감점항</span>
        </div>
        <p class="formula-note">각 항은 100점 만점으로 환산합니다. 이 산식은 설명이 아니라 실제로 실행되는 코드이며, <a href="/index/smfi/check/">예비 진단</a>이 같은 엔진으로 계산합니다.</p>
      </div>
      <div class="section-head reveal" style="margin-top:64px;"><p class="eyebrow">판정</p><h2 class="h1">판정 밴드와 다음 행동</h2></div>
      <div class="sp-wrap reveal">
        <table class="table sp-table">
          <thead><tr><th style="width:16%;">판정</th><th style="width:14%;">구간</th><th>의미와 표준 다음 행동</th></tr></thead>
          <tbody>
            ${D.BANDS.map((b, i) => {
              const tone = b.id === 'fit' ? 'ok' : b.id === 'cond' ? 'warn' : b.id === 'hold' ? 'neutral' : 'fail';
              const range = i === 0 ? `${b.min} 이상` : i === D.BANDS.length - 1 ? `${D.BANDS[i - 1].min} 미만` : `${b.min} ~ ${D.BANDS[i - 1].min - 1}`;
              return `<tr><th scope="row"><span class="verdict verdict--${tone}">${b.name}</span></th><td class="num">${range}</td><td>${b.next}</td></tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
      <div class="notice reveal" style="margin-top:22px;"><p><strong>모든 밴드에 공통으로 적용되는 해석 규칙</strong> — 종합점수는 검토 모델 사이의 상대적 우선순위와 위험 신호를 요약한 값이며, 성공 확률이나 수익의 보증이 아닙니다. 핵심 영역 최저선에 걸린 모델은 점수와 무관하게 판정 상한이 ‘보류’로 제한됩니다.</p></div>
    </div>
  </section>

  <!-- 7. 증거등급 -->
  <section class="section section--alt" id="evidence">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">증거등급</p><h2 class="h1">증거등급은 점수를 깎지 않습니다</h2>
      <p class="lead">이전 버전은 자료의 등급을 점수에 곱해 감점했습니다. 그러면 ‘조건이 나쁘다’와 ‘조건을 모른다’가 한 숫자에 섞여, 자료 준비가 부족한 공간은 실제 조건과 무관하게 점수가 무너집니다. 그래서 2.1에서는 둘을 분리했습니다 — 점수는 보수적 산정 원칙만으로 내고, 증거등급은 <b>신뢰도 지수</b>가 되어 점수 옆에 함께 표기됩니다.</p></div>
      <div class="sp-wrap reveal">
        <table class="table sp-table">
          <thead><tr><th style="width:10%;">등급</th><th style="width:24%;">자료의 성격</th><th style="width:12%;">계수</th><th>대표 예시</th></tr></thead>
          <tbody>
            ${D.EVIDENCE.map((e) => `<tr><th scope="row" class="num" style="font-size:17px;">${e.g}</th><td><b>${e.name}</b></td><td class="num">${e.k.toFixed(2)}</td><td>${e.ex}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="notice reveal" style="margin-top:22px;"><p>법규·안전·권리관계 계열의 핵심 지표는 A 또는 B등급 자료를 요구하며, 충족되지 않으면 점수를 내기 전에 자료 보완 단계로 되돌립니다. 예비 진단은 응답 전체가 C등급이므로 신뢰도가 구조적으로 낮게 표시됩니다.</p></div>
    </div>
  </section>

  <!-- 8. 한계 -->
  <section class="section" id="limits">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">한계</p><h2 class="h1">이 평가가 하지 못하는 것</h2>
      <p class="lead">한계를 적는 것이 이 페이지의 마지막 항목인 이유는, 감춘 한계가 결국 신뢰를 무너뜨리기 때문입니다. 아래 네 가지는 현재 체계가 안고 있는 제약이며, 관리 방법과 함께 공개합니다.</p></div>
      <div class="tile-grid reveal">
        <div class="tile"><h3>판정 경계값은 아직 실측 보정 전입니다</h3><p>${D.BANDS[0].min}·${D.BANDS[1].min}·${D.BANDS[2].min}이라는 경계는 설계 단계의 전문가 설정값입니다. 과거 프로젝트를 착수 전 조건으로 다시 채점하는 소급 채점과, 평가 이후 실제 성과를 대조하는 예측-실적 대장이 쌓이는 대로 실측 기반으로 조정하고 이력을 버전으로 남깁니다.</p></div>
        <div class="tile"><h3>실적은 수행 역량의 증거이지 예측력의 증거가 아닙니다</h3><p>340개가 넘는 공간을 운영한 경험은 지표를 만든 근거이지, 이 산식이 성패를 얼마나 잘 맞히는지에 대한 증거는 아직 아닙니다. 두 가지를 섞어 말하지 않습니다.</p></div>
        <div class="tile"><h3>평가는 특정 시점의 스냅숏입니다</h3><p>상권과 규제는 변합니다. 결과의 유효기간을 보고일로부터 6개월로 정하고, 이후 진행을 재개할 때는 변동 항목만 갱신하는 경감 수수료 재평가를 제공합니다.</p></div>
        <div class="tile"><h3>평가자가 이후 사업의 수행사를 겸합니다</h3><p>구조적인 이해상충입니다. 없앨 수 없으므로 공개하고 통제합니다. 판정 불변 원칙, 수기 조정 금지, 채점표 전면 열람, 판정 분포 집계·공시가 그 장치입니다.</p></div>
      </div>
      <div class="notice reveal" style="margin-top:26px;"><p><strong>감정평가와의 구분</strong> — 감정평가 기준의 용어와 논리 구조를 “참조”하는 것과 감정평가를 “수행”하는 것은 다릅니다. 모든 문서와 화면에서 이 구분을 유지합니다. ${NOTICES.appraisal}</p></div>
      <div class="btn-row reveal">
        <a class="btn btn--primary" href="/index/smfi/check/">같은 산식으로 내 공간 계산해 보기</a>
        <a class="btn btn--ghost" href="/trust/calibration/">보정과 교정 절차 보기</a>
        <a class="btn btn--ghost" href="/trust/model-cards/">지수별 Model Card</a>
      </div>
    </div>
  </section>`;

  return {
    path: entry.path, title: entry.title, description: entry.desc, body,
    docMeta: { id: 'BSI-DOC-MT', date: '2026-08' },
    bodyClass: 'page-methodology',
  };
};
