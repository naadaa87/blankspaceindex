/* =====================================================================
   smfi-check.js — SMFI 예비 진단 화면 층
   계산은 smfi-engine.js가, 데이터는 smfi-data.js가 맡는다.
   이 파일은 묻고 보여 주기만 한다 — 점수를 만들거나 고치지 않는다.
   응답은 서버로 전송·저장되지 않고 이 브라우저 안에서만 계산된다.
   ===================================================================== */
(function () {
  'use strict';
  var app = document.getElementById('smfi-app');
  if (!app || !window.SMFI_DATA || !window.SMFI_ENGINE) return;

  var D = window.SMFI_DATA, E = window.SMFI_ENGINE;
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var state = { step: 0, basic: {}, gates: {}, answers: {}, result: null };

  var USES = [
    { v: 'ok', label: '확인했고, 검토 중인 용도에 맞습니다' },
    { v: 'change', label: '맞지 않아 용도변경이 필요합니다' },
    { v: 'unknown', label: '아직 확인하지 못했습니다' },
  ];
  var FLOORS = [
    { v: -1, label: '지하' }, { v: 1, label: '1층' },
    { v: 2, label: '2층' }, { v: 3, label: '3층' }, { v: 4, label: '4층 이상' },
  ];

  /* ── 화면 구성: 기본정보 → 게이트 6 → 문항 20(영역별 2) → 결과 ── */
  function flow() {
    var f = [{ type: 'basic' }];
    D.GATES.forEach(function (g) { f.push({ type: 'gate', g: g }); });
    D.AREAS.forEach(function (a) {
      var qs = D.QUESTIONS.filter(function (q) { return q.area === a.id; });
      f.push({ type: 'area', area: a, qs: qs });
    });
    f.push({ type: 'result' });
    return f;
  }
  var F = flow();

  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
  function num(v) { return (Math.round(v * 10) / 10).toLocaleString('ko-KR'); }
  function man(v) { return Number(v).toLocaleString('ko-KR'); }

  /* ── 진행 표시 ── */
  function head(label, pct) {
    return '<div class="wiz__top">' +
      (state.step > 0 ? '<button type="button" class="wiz__back" data-back>&larr; 이전</button>' : '<span></span>') +
      '<span class="wiz__addr">' + (state.basic.name ? esc(state.basic.name) : '') + '</span></div>' +
      '<div class="wiz__meta"><span class="lbl">' + label + '</span><span class="lbl" style="color:var(--slate);">응답은 저장되지 않습니다</span></div>' +
      '<div class="wiz__bar" aria-hidden="true"><span style="width:' + pct + '%"></span></div>';
  }

  /* ── 1. 기본 정보 ── */
  function screenBasic() {
    var b = state.basic;
    return el('<div class="wiz__screen">' + head('기본 정보', 0) +
      '<h2 class="wiz__q">공간의 조건을 알려 주세요</h2>' +
      '<p class="wiz__hint">경제성 점수(E)는 이 값으로 계산됩니다. 모르는 값은 대략으로 적으셔도 되지만, 그만큼 결과의 신뢰도가 내려갑니다.</p>' +
      '<form class="smfi-form" data-basic>' +
        '<label class="fld"><span>공간 이름 또는 주소 <em>표시용</em></span>' +
          '<input class="wiz__input" name="name" type="text" autocomplete="off" placeholder="예) ○○동 상가 2층" value="' + esc(b.name || '') + '"></label>' +
        '<div class="fld-row">' +
          '<label class="fld"><span>전용 면적 <em>㎡</em></span><input class="wiz__input" name="area" type="number" min="5" max="3000" step="1" required placeholder="60" value="' + (b.area || '') + '"></label>' +
          '<label class="fld"><span>층</span><select class="wiz__input" name="floor" required>' +
            '<option value="">선택</option>' +
            FLOORS.map(function (f) { return '<option value="' + f.v + '"' + (String(b.floor) === String(f.v) ? ' selected' : '') + '>' + f.label + '</option>'; }).join('') +
          '</select></label>' +
        '</div>' +
        '<div class="fld-row">' +
          '<label class="fld"><span>월 임대료 <em>만원</em></span><input class="wiz__input" name="rent" type="number" min="0" max="100000" step="1" required placeholder="300" value="' + (b.rent || '') + '"></label>' +
          '<label class="fld"><span>월 관리비 <em>만원</em></span><input class="wiz__input" name="maintenance" type="number" min="0" max="100000" step="1" placeholder="30" value="' + (b.maintenance || '') + '"></label>' +
        '</div>' +
        '<label class="fld"><span>건축물 용도 확인 여부</span><select class="wiz__input" name="use" required>' +
          '<option value="">선택</option>' +
          USES.map(function (u) { return '<option value="' + u.v + '"' + (b.use === u.v ? ' selected' : '') + '>' + u.label + '</option>'; }).join('') +
        '</select></label>' +
        '<button class="btn btn--primary btn--lg" type="submit">시작하기</button>' +
      '</form>' +
      '<p class="wiz__note">면적은 전용 기준, 임대료·관리비는 부가세 별도 월 금액(만원)으로 적어 주세요.</p>' +
    '</div>');
  }

  /* ── 2. 하드게이트 ── */
  function screenGate(g, idx) {
    var pct = Math.round((idx / (D.GATES.length + D.AREAS.length)) * 100);
    var yes = g.risk === 'yes';
    return el('<div class="wiz__screen">' + head('결격 확인 ' + (idx + 1) + ' / ' + D.GATES.length, pct) +
      '<p class="gate-tag"><span class="chip' + (g.kind === '절대' ? '' : ' chip--muted') + '">' + g.id + ' · ' + g.kind + '게이트</span> ' + esc(g.name) + '</p>' +
      '<h2 class="wiz__q">' + esc(g.q) + '</h2>' +
      '<p class="wiz__hint">' + esc(g.hint) + '</p>' +
      '<div class="opts">' +
        '<button type="button" class="opt" data-gate="' + g.id + '" data-v="yes"><i class="opt__key num">1</i><span><b>예</b></span></button>' +
        '<button type="button" class="opt" data-gate="' + g.id + '" data-v="no"><i class="opt__key num">2</i><span><b>아니오</b></span></button>' +
        '<button type="button" class="opt opt--muted" data-gate="' + g.id + '" data-v="unknown"><i class="opt__key num">3</i><span><b>모르겠습니다</b><small>확인 필요 항목으로 남고, 신뢰도에 반영됩니다</small></span></button>' +
      '</div>' +
      '<p class="wiz__note">' + (yes ? '"예"가 위험 신호인 항목입니다.' : '"아니오"가 위험 신호인 항목입니다.') + ' 결격은 점수로 덮지 않고 따로 판정합니다.</p>' +
    '</div>');
  }

  /* ── 3. 영역별 문항(2문항 한 화면) ── */
  function screenArea(a, qs, idx) {
    var pct = Math.round(((D.GATES.length + idx) / (D.GATES.length + D.AREAS.length)) * 100);
    return el('<div class="wiz__screen">' + head('영역 ' + (idx + 1) + ' / ' + D.AREAS.length + ' · ' + esc(a.name), pct) +
      '<p class="gate-tag"><span class="chip chip--muted">' + a.id + ' · 가중치 ' + a.weight + '</span> ' + esc(a.desc) + '</p>' +
      qs.map(function (q) {
        return '<div class="qblock" data-q="' + q.id + '">' +
          '<h3 class="qblock__t">' + esc(q.t) + '</h3>' +
          '<p class="qblock__d">' + esc(q.d) + '</p>' +
          '<div class="scale" role="group" aria-label="' + esc(q.t) + '">' +
            q.opts.map(function (o, i) {
              var v = 5 - i;
              return '<button type="button" class="scale__b" data-ans="' + q.id + '" data-v="' + v + '">' +
                '<i>' + v + '</i><span>' + esc(o) + '</span></button>';
            }).join('') +
          '</div></div>';
      }).join('') +
      '<div class="wiz__foot"><button type="button" class="btn btn--primary" data-next disabled>다음</button>' +
      '<span class="wiz__note" style="margin:0;">두 문항 모두 답하면 넘어갑니다</span></div>' +
    '</div>');
  }

  /* ── 4. 결과 ── */
  function verdictTone(bandId) {
    return bandId === 'fit' ? 'ok' : bandId === 'cond' ? 'warn' : bandId === 'hold' ? 'neutral' : 'fail';
  }

  function screenResult() {
    var r = state.result;
    var top = r.ranking[0];
    var band = r.overallBand;
    var tone = verdictTone(band.id);
    var sc = r.scenario;

    var limitNote = '';
    if (r.limit === 'blocked') limitNote = '<div class="res__signal"><span class="verdict verdict--fail">판정 미확정 · 절대게이트</span><p>비용으로 해소할 수 없는 결격 항목이 확인되었습니다. 해당 항목이 정리되기 전에는 어떤 모델도 확정하지 않습니다.</p></div>';
    else if (r.limit === 'need-doc') limitNote = '<div class="res__signal"><span class="verdict verdict--warn">판정 미확정 · 자료 미확인</span><p>건축물 용도가 확인되지 않았습니다. 용도 확인은 모델 선정보다 먼저입니다 — 건축물대장을 열람한 뒤 다시 산출해 주세요.</p></div>';
    else if (r.limit === 'floor') limitNote = '<div class="res__signal"><span class="verdict verdict--warn">판정 상한 제한 · 핵심 영역 최저선</span><p>' + r.core.areas.map(function (a) { return esc(a.name); }).join(' · ') + ' 영역이 최저선(' + D.CONST.coreFloor + '점)에 못 미칩니다. 종합점수와 무관하게 판정 상한이 ‘보류’로 제한됩니다.</p></div>';

    var gateRows = r.gates.risks.map(function (g) {
      return '<div class="res__signal"><span class="verdict verdict--' + (g.kind === '절대' ? 'fail' : 'warn') + '">' + g.id + ' · ' + esc(g.name) + '</span><p>' + esc(g.msgRisk) + '</p></div>';
    }).join('');
    var unkRows = r.gates.unknowns.map(function (g) {
      return '<li><b>' + g.id + ' ' + esc(g.name) + '</b> — ' + esc(g.msgUnk) + '</li>';
    }).join('');

    var areaBars = D.AREAS.map(function (a) {
      var v = r.areaScores[a.id] || 0;
      var low = a.core && v < D.CONST.coreFloor;
      return '<div class="abar' + (low ? ' abar--low' : '') + '"><em>' + esc(a.name) + (a.core ? ' <i class="abar__core">핵심</i>' : '') + '</em>' +
        '<span class="abar__t"><span style="width:' + Math.max(2, v) + '%"></span></span><b class="num">' + num(v) + '</b></div>';
    }).join('');

    var modelRows = r.ranking.slice(0, 5).map(function (m, i) {
      var t = verdictTone(m.finalBand.id);
      return '<tr' + (i === 0 ? ' class="is-top"' : '') + '><td><b>' + esc(m.name) + '</b><small>' + esc(m.group) + '</small></td>' +
        '<td class="num">' + num(m.M) + '</td><td class="num">' + num(m.E) + '</td>' +
        '<td class="num"><b>' + num(m.S) + '</b></td>' +
        '<td><span class="verdict verdict--' + t + '">' + m.finalBand.name + '</span></td></tr>';
    }).join('');

    var scenHtml = '';
    if (sc && sc.kind === 'unit') {
      scenHtml = '<table class="table smfi-t"><thead><tr><th>시나리오</th><th>가동</th><th>월 이용</th><th>월 매출</th><th>월 손익</th></tr></thead><tbody>' +
        sc.rows.map(function (row) {
          return '<tr><td>' + row.name + '</td><td class="num">' + Math.round(row.rate * 100) + '%</td>' +
            '<td class="num">' + row.units + sc.unit + '</td><td class="num">' + man(row.revenue) + '만</td>' +
            '<td class="num" style="color:' + (row.profit >= 0 ? 'var(--teal-deep)' : 'var(--v-fail)') + '">' + (row.profit >= 0 ? '+' : '') + man(row.profit) + '만</td></tr>';
        }).join('') + '</tbody></table>' +
        '<div class="kv3">' +
          '<div><span class="lbl">손익분기 가동률</span><b class="num">' + (sc.beRate != null ? sc.beRate + '%' : '—') + '</b><small>월 ' + (sc.beUnits != null ? sc.beUnits + sc.unit : '—') + ' 필요</small></div>' +
          '<div><span class="lbl">초기 투자(개산)</span><b class="num">' + man(sc.capex) + '만</b><small>모델 표준값</small></div>' +
          '<div><span class="lbl">회수 기간(보수)</span><b class="num">' + (sc.payback != null ? sc.payback + '개월' : '성립 안 함') + '</b><small>보수 시나리오 기준</small></div>' +
        '</div>';
    } else if (sc && sc.kind === 'sublease') {
      scenHtml = '<div class="kv3"><div><span class="lbl">전대 기준 월 수입</span><b class="num">' + man(sc.rows[0].revenue) + '만</b><small>임대료 대비 개산</small></div>' +
        '<div><span class="lbl">월 차액</span><b class="num">' + man(sc.rows[0].profit) + '만</b><small>임대료·관리비 차감</small></div>' +
        '<div><span class="lbl">초기 투자(개산)</span><b class="num">' + man(sc.capex) + '만</b><small>모델 표준값</small></div></div>' +
        '<p class="wiz__note">' + esc(sc.note) + '</p>';
    }

    var hybrid = r.hybrid.length
      ? '<p class="eyebrow" style="margin:30px 0 10px;">하이브리드 조합 후보</p><div class="hyb">' +
        r.hybrid.map(function (h) { return '<span class="hyb__i"><b>' + esc(h.a) + '</b> + <b>' + esc(h.b) + '</b><i class="num">' + num(h.score) + '</i></span>'; }).join('') +
        '</div><p class="wiz__note">시간대나 구역을 나눠 둘 이상의 모델을 함께 돌리는 구성입니다. 면적과 동선이 받쳐 줘야 성립합니다.</p>'
      : '';

    var summary = '[BLANK SPACE INDEX · SMFI 2.1 예비 진단]\n' +
      '대상: ' + (state.basic.name || '(미입력)') + ' / ' + state.basic.area + '㎡ / ' +
      (FLOORS.filter(function (f) { return String(f.v) === String(state.basic.floor); })[0] || {}).label + '\n' +
      '예비 점수: ' + num(r.overall) + ' (' + band.name + ') · 신뢰도 지수 ' + r.confidence.index + ' (등급 C · 자가 응답)\n' +
      '1순위 모델: ' + top.name + ' (M ' + num(top.M) + ' / E ' + num(top.E) + ')\n' +
      (sc && sc.beRate != null ? '손익분기 가동률: ' + sc.beRate + '%\n' : '') +
      '결격: 위험 ' + r.gates.risks.length + '건 · 미확인 ' + r.gates.unknowns.length + '건\n' +
      '※ 자가 응답 기준의 상한 추정치이며 정식 판정이 아닙니다.';

    return el('<div class="wiz__screen wiz__screen--result">' +
      '<div class="wiz__top"><button type="button" class="wiz__back" data-back>&larr; 답변 수정</button>' +
        '<span class="chip chip--green">예비 진단 완료</span></div>' +

      '<div class="smfi-score">' +
        '<div><span class="lbl">공간수익화 적합지수 · 예비</span>' +
          '<div class="smfi-score__n num">' + num(r.overall) + '<small>/100</small></div>' +
          '<span class="verdict verdict--' + tone + '">' + band.name + '</span></div>' +
        '<div class="smfi-conf"><span class="lbl">신뢰도 지수</span>' +
          '<div class="smfi-conf__n num">' + r.confidence.index + '<small> · 등급 ' + r.confidence.grade + '</small></div>' +
          '<span class="smfi-conf__t"><span style="width:' + r.confidence.index + '%"></span></span>' +
          '<small>' + esc(r.confidence.label) + '</small></div>' +
      '</div>' +
      '<p class="res__direction">' + esc(band.next) + '</p>' +
      limitNote +

      '<p class="eyebrow" style="margin:32px 0 10px;">결격 확인 · ' + D.GATES.length + '개 항목</p>' +
      (gateRows || '<p class="muted">응답 범위에서 결격 신호는 확인되지 않았습니다.</p>') +
      (unkRows ? '<ul class="res__unresolved" style="margin-top:12px;">' + unkRows + '</ul>' : '') +

      '<p class="eyebrow" style="margin:32px 0 10px;">영역별 기초 체력 · 공통 기반 점수 ' + num(r.base) + '</p>' +
      '<div class="abars">' + areaBars + '</div>' +

      '<p class="eyebrow" style="margin:32px 0 10px;">모델 적합도 상위 5 · 14개 모델 중</p>' +
      '<table class="table smfi-t"><thead><tr><th>모델</th><th>M</th><th>E</th><th>종합</th><th>판정</th></tr></thead><tbody>' + modelRows + '</tbody></table>' +
      '<p class="wiz__note">M은 모델별 적합 점수, E는 경제성 점수입니다. 종합 = 0.30×기반 + 0.45×M + 0.25×E − 감점.</p>' +
      hybrid +

      '<p class="eyebrow" style="margin:32px 0 10px;">1순위 모델의 간이 수지 · ' + esc(top.name) + '</p>' +
      scenHtml +

      '<div class="notice" style="margin-top:28px;"><p><strong>이 결과는 상한 추정치입니다.</strong> 모든 응답이 증거등급 C(당사자 진술)로 계산되어 신뢰도가 구조적으로 낮게 표시됩니다. 정식 판정은 공부 서류와 현장 실측으로 증거등급 A·B 자료를 확보하고, 12개 게이트 전수와 57개 지표 전수 채점을 거쳐야 나옵니다.</p></div>' +

      '<div class="res__actions">' +
        '<a class="btn btn--primary" href="/apply/">본 평가 상담하기</a>' +
        '<button type="button" class="btn btn--ghost" data-copy>결과 요약 복사</button>' +
        '<button type="button" class="btn btn--ghost" data-restart>처음부터 다시</button>' +
      '</div>' +
      '<p class="wiz__note">응답은 저장되지 않았습니다. 화면을 벗어나면 결과도 사라지니 필요하면 요약을 복사해 두세요.</p>' +
      '<textarea class="sr-only" data-summary readonly>' + esc(summary) + '</textarea>' +
    '</div>');
  }

  /* ── 전환 ── */
  function show(step, dir) {
    state.step = step;
    var f = F[step], node;
    if (f.type === 'basic') node = screenBasic();
    else if (f.type === 'gate') node = screenGate(f.g, F.slice(0, step).filter(function (x) { return x.type === 'gate'; }).length);
    else if (f.type === 'area') node = screenArea(f.area, f.qs, F.slice(0, step).filter(function (x) { return x.type === 'area'; }).length);
    else { state.result = E.evaluate({ basic: state.basic, gates: state.gates, answers: state.answers }); node = screenResult(); }

    var old = app.firstElementChild;
    if (REDUCED || !old) { app.innerHTML = ''; app.appendChild(node); }
    else {
      node.classList.add(dir === 'back' ? 'is-enter-back' : 'is-enter');
      app.appendChild(node);
      old.classList.add(dir === 'back' ? 'is-exit-back' : 'is-exit');
      setTimeout(function () { old.remove(); node.classList.remove('is-enter', 'is-enter-back'); }, 210);
    }
    bind(node, f);
    if (step > 0) {
      var top = app.getBoundingClientRect().top + window.pageYOffset - 84;
      if (Math.abs(window.pageYOffset - top) > 40) window.scrollTo({ top: top, behavior: REDUCED ? 'auto' : 'smooth' });
    }
  }
  function next() { if (state.step < F.length - 1) show(state.step + 1, 'fwd'); }
  function back() { if (state.step > 0) show(state.step - 1, 'back'); }

  var busy = false;
  function pick(btn, cb) {
    if (busy) return; busy = true; btn.classList.add('is-picked');
    setTimeout(function () { busy = false; cb(); }, REDUCED ? 40 : 260);
  }

  function bind(node, f) {
    var b = node.querySelector('[data-back]'); if (b) b.addEventListener('click', back);

    if (f.type === 'basic') {
      node.querySelector('[data-basic]').addEventListener('submit', function (e) {
        e.preventDefault();
        var fd = e.target;
        state.basic = {
          name: fd.name.value.trim(),
          area: Number(fd.area.value) || 0,
          floor: Number(fd.floor.value),
          rent: Number(fd.rent.value) || 0,
          maintenance: Number(fd.maintenance.value) || 0,
          use: fd.use.value,
        };
        next();
      });
    }
    if (f.type === 'gate') {
      node.querySelectorAll('[data-gate]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          pick(btn, function () { state.gates[btn.getAttribute('data-gate')] = btn.getAttribute('data-v'); next(); });
        });
      });
    }
    if (f.type === 'area') {
      var nextBtn = node.querySelector('[data-next]');
      var check = function () {
        var done = f.qs.every(function (q) { return typeof state.answers[q.id] === 'number'; });
        nextBtn.disabled = !done;
        if (done && !nextBtn.dataset.auto) { nextBtn.dataset.auto = '1'; setTimeout(function () { if (!nextBtn.disabled) next(); }, REDUCED ? 60 : 420); }
      };
      node.querySelectorAll('[data-ans]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var qid = btn.getAttribute('data-ans');
          state.answers[qid] = Number(btn.getAttribute('data-v'));
          node.querySelectorAll('[data-ans="' + qid + '"]').forEach(function (x) { x.classList.remove('is-on'); });
          btn.classList.add('is-on');
          check();
        });
      });
      f.qs.forEach(function (q) {
        var v = state.answers[q.id];
        if (typeof v === 'number') {
          var sel = node.querySelector('[data-ans="' + q.id + '"][data-v="' + v + '"]');
          if (sel) sel.classList.add('is-on');
        }
      });
      nextBtn.addEventListener('click', next);
      check();
    }
    if (f.type === 'result') {
      node.querySelector('[data-restart]').addEventListener('click', function () {
        state = { step: 0, basic: {}, gates: {}, answers: {}, result: null };
        show(0, 'back');
      });
      var cb = node.querySelector('[data-copy]');
      cb.addEventListener('click', function () {
        var ta = node.querySelector('[data-summary]');
        var done = function () { cb.textContent = '복사되었습니다'; setTimeout(function () { cb.textContent = '결과 요약 복사'; }, 1800); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(done, function () { ta.select(); document.execCommand('copy'); done(); });
        else { ta.select(); document.execCommand('copy'); done(); }
      });
    }
  }

  show(0, 'fwd');
})();
