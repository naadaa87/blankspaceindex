/* =====================================================================
   smfi-engine.js — 공간수익화 적합성 평가(SMFI 2.1) 계산 층
   화면과 분리된 순수 함수 모음. 브라우저와 Node에서 동일하게 동작한다.

   종합점수  Sj = 0.30·B + 0.45·Mj + 0.25·Ej − Pj
   · B  : 10개 영역 공통 기반 점수
   · Mj : 모델 j의 가중치 매트릭스를 적용한 적합 점수
   · Ej : 임대 조건·면적·층 기준 경제성 점수
   · Pj : 조건게이트 미해소에 따른 감점
   ===================================================================== */
(function (root, factory) {
  var data = (typeof module === 'object' && module.exports)
    ? require('./smfi-data.js')
    : root.SMFI_DATA;
  var engine = factory(data);
  if (typeof module === 'object' && module.exports) module.exports = engine;
  root.SMFI_ENGINE = engine;
})(typeof window !== 'undefined' ? window : this, function (D) {
  'use strict';

  var A = D.AREAS, Q = D.QUESTIONS, M = D.MODELS, G = D.GATES, C = D.CONST;

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function round(v, n) { var p = Math.pow(10, n || 0); return Math.round(v * p) / p; }

  /* ---------- 영역 점수 : 5점 척도 → 0~100 ---------- */
  function areaScores(answers) {
    var out = {};
    A.forEach(function (a) {
      var qs = Q.filter(function (q) { return q.area === a.id; });
      var vals = qs.map(function (q) { return answers[q.id]; })
                   .filter(function (v) { return typeof v === 'number'; });
      out[a.id] = vals.length
        ? round(((vals.reduce(function (x, y) { return x + y; }, 0) / vals.length) - 1) / 4 * 100, 1)
        : 0;
    });
    return out;
  }

  /* ---------- B : 공통 기반 점수 ---------- */
  function baseScore(as) {
    var num = 0, den = 0;
    A.forEach(function (a) { num += a.weight * (as[a.id] || 0); den += a.weight; });
    return round(num / den, 1);
  }

  /* ---------- Mj : 모델별 적합 점수 (가중치 합으로 정규화) ---------- */
  function modelFit(model, as) {
    var num = 0, den = 0;
    model.w.forEach(function (w, i) { num += w * (as[A[i].id] || 0); den += w; });
    return round(num / den, 1);   // den이 100이 아니어도(P12=102) 실제 합으로 나눈다
  }

  /* ---------- 규모 계수 : 면적이 늘면 회전 여력도 늘지만 비례하지는 않는다 ---------- */
  function capFactor(model, area) {
    if (!area || !model.minArea) return 1;
    return clamp(Math.sqrt(area / model.minArea), 0.7, 1.6);
  }

  /* ---------- 월 잠재 매출(만원, 기준 시나리오) ---------- */
  function potentialRevenue(model, basic, rate) {
    var rent = Number(basic.rent) || 0;
    var area = Number(basic.area) || 0;
    if (model.revenue === 'sublease') return round(rent * model.subleaseUplift, 0);
    var units = model.maxUnits * capFactor(model, area) * rate;
    return round(units * model.unitPrice / 10000, 0);
  }

  /* ---------- Ej : 경제성 점수 ---------- */
  function economyScore(model, basic) {
    var area = Number(basic.area) || 0;
    var rent = Number(basic.rent) || 0;
    var mnt = Number(basic.maintenance) || 0;
    var floor = Number(basic.floor);

    // 1) 임대료 부담 (평당 월 부담액, 만원)
    var perPy = area > 0 ? (rent + mnt * 0.5) / area : 99;
    var cap = model.rentCapPy;
    var rentSc = clamp(100 - ((perPy - cap * 0.6) / cap) * 100, 0, 100);

    // 2) 면적 적합
    var areaSc;
    if (area >= model.minArea * 1.5) areaSc = 100;
    else if (area >= model.minArea) areaSc = 70 + (area - model.minArea) / (model.minArea * 0.5) * 30;
    else areaSc = clamp((area - model.minArea * 0.5) / (model.minArea * 0.5) * 70, 0, 70);

    // 3) 층 적합
    var floorSc = 35;
    if (model.floors.indexOf(floor) >= 0) floorSc = 100;
    else if (model.floors.indexOf(floor - 1) >= 0 || model.floors.indexOf(floor + 1) >= 0) floorSc = 65;

    // 4) 수익 성립 가능성 — 기준 시나리오 공헌이익이 고정비를 넘는가
    var base = C.scenarios[1].rate;
    var revMan = potentialRevenue(model, basic, base);
    var fixedMan = (rent + mnt) * model.fixedRatio;
    var ratio = fixedMan > 0 ? (revMan * model.margin) / fixedMan : 0;
    var viaSc = clamp((ratio - 0.8) / 1.0 * 100, 0, 100);

    // 1층 유동에 의존하는 모델은 층이 어긋나면 수요 자체가 성립하지 않는다
    var raw = 0.30 * rentSc + 0.20 * areaSc + 0.15 * floorSc + 0.35 * viaSc;
    if (model.floorCritical && floorSc < 100) raw *= (floorSc >= 65 ? 0.80 : 0.55);

    return {
      score: round(raw, 1),
      rent: round(rentSc, 0), area: round(areaSc, 0), floor: round(floorSc, 0), via: round(viaSc, 0),
      perPy: round(perPy, 2), ratio: round(ratio, 2), revenue: revMan, fixed: round(fixedMan, 0)
    };
  }

  /* ---------- 게이트 판정 ---------- */
  function gateResult(gates) {
    var blocked = false, penalty = 0, risks = [], unknowns = [];
    G.forEach(function (g) {
      var v = gates[g.id];
      if (v === 'unknown' || v === undefined) { unknowns.push(g); return; }
      if (v === g.risk) {
        if (g.kind === '절대') { blocked = true; risks.push(g); }
        else { penalty += g.penalty; risks.push(g); }
      }
    });
    return { blocked: blocked, penalty: penalty, risks: risks, unknowns: unknowns };
  }

  /* ---------- 신뢰도 지수 : 자가진단은 C등급(0.50) 기준 ---------- */
  function confidence(answers, gates) {
    var total = 0, filled = 0, unknown = 0;
    Q.forEach(function (q) { total++; if (typeof answers[q.id] === 'number') filled++; });
    G.forEach(function (g) {
      total++;
      if (gates[g.id] === 'unknown' || gates[g.id] === undefined) unknown++;
      else filled++;
    });
    var k = (filled * C.selfCheckEvidence + unknown * C.unknownEvidence) / (total || 1);
    return {
      index: round(k * 100, 0),
      grade: 'C',                                   // 자가 응답 기준
      answered: filled, unknown: unknown, total: total,
      label: '자가 응답 기준 · 상한 추정치'
    };
  }

  /* ---------- 판정 밴드 ---------- */
  function band(score) {
    for (var i = 0; i < D.BANDS.length; i++) if (score >= D.BANDS[i].min) return D.BANDS[i];
    return D.BANDS[D.BANDS.length - 1];
  }

  /* ---------- 핵심 영역 최저선 ---------- */
  function coreFloor(as) {
    var hit = A.filter(function (a) { return a.core && (as[a.id] || 0) < C.coreFloor; });
    return { triggered: hit.length > 0, areas: hit };
  }

  /* ---------- 간이 시나리오 ---------- */
  function scenarios(model, basic) {
    var rent = Number(basic.rent) || 0;
    var mnt = Number(basic.maintenance) || 0;
    var area = Number(basic.area) || 0;
    var fixedMan = (rent + mnt) * model.fixedRatio;

    if (model.revenue === 'sublease') {
      var subMan = round(rent * model.subleaseUplift, 0);
      return {
        kind: 'sublease', fixed: round(fixedMan, 0), unit: '월',
        rows: [{ name: '전대 기준', revenue: subMan, profit: round(subMan - rent - mnt, 0) }],
        capex: model.capex, note: '입점·전대형은 이용 건수가 아니라 전대 조건으로 수지가 결정됩니다. 위 값은 임대료 대비 개산이며, 실제 조건은 입점 사업자와의 협의에 따라 달라집니다.'
      };
    }

    var maxU = Math.round(model.maxUnits * capFactor(model, area));
    var perUnit = model.unitPrice * model.margin;
    var beUnits = perUnit > 0 ? Math.ceil(fixedMan * 10000 / perUnit) : null;
    var beRate = (beUnits && maxU) ? round(beUnits / maxU * 100, 0) : null;

    var rows = C.scenarios.map(function (s) {
      var units = Math.round(maxU * s.rate);
      var revMan = round(units * model.unitPrice / 10000, 0);
      var profitMan = round(revMan * model.margin - fixedMan, 0);
      return { id: s.id, name: s.name, rate: s.rate, units: units, revenue: revMan, profit: profitMan };
    });

    var lowProfit = rows[0].profit;
    return {
      kind: 'unit', unit: model.unit, maxUnits: maxU, fixed: round(fixedMan, 0),
      beUnits: beUnits, beRate: beRate, rows: rows, capex: model.capex,
      margin: model.margin,
      payback: lowProfit > 0 ? round(model.capex / lowProfit, 1) : null
    };
  }

  /* ---------- 전체 평가 ---------- */
  function evaluate(input) {
    var basic = input.basic || {}, gates = input.gates || {}, answers = input.answers || {};

    var as = areaScores(answers);
    var B = baseScore(as);
    var gr = gateResult(gates);
    var cf = coreFloor(as);
    var conf = confidence(answers, gates);

    var ranking = M.map(function (m) {
      var e = economyScore(m, basic);
      var Mj = modelFit(m, as);
      var S = clamp(round(C.weightS.B * B + C.weightS.M * Mj + C.weightS.E * e.score - gr.penalty, 1), 0, 100);
      return {
        id: m.id, name: m.name, group: m.group, note: m.note,
        M: Mj, E: e.score, econ: e, S: S, band: band(S)
      };
    }).sort(function (a, b) { return b.S - a.S; });

    // 판정 제한: 절대게이트 저촉 · 용도 미확인 · 핵심 영역 최저선
    var limit = null;
    if (gr.blocked) limit = 'blocked';
    else if (basic.use === 'unknown') limit = 'need-doc';
    else if (cf.triggered) limit = 'floor';

    // 절대게이트 저촉·핵심 자료 미확인은 점수와 무관하게 판정을 확정하지 않는다.
    var HELD = {
      id: 'held', min: 0, name: '판정 미확정',
      next: limit === 'blocked'
        ? '비용으로 해소할 수 없는 결격 항목이 확인되었습니다. 해당 항목이 정리되기 전에는 어떤 모델도 확정하지 않습니다.'
        : '판정에 필요한 기초 자료가 확인되지 않았습니다. 자료를 확인한 뒤 다시 산출해야 합니다.'
    };

    ranking.forEach(function (r) {
      r.finalBand = r.band;
      if (limit === 'blocked' || limit === 'need-doc') r.finalBand = HELD;
      else if (limit === 'floor' && r.S >= 65) r.finalBand = D.BANDS[2];   // 보류로 상한 제한
    });

    var top = ranking[0];
    return {
      areaScores: as, base: B, gates: gr, core: cf, confidence: conf,
      ranking: ranking, top3: ranking.slice(0, 3), limit: limit,
      overall: top ? top.S : 0,
      overallBand: top ? top.finalBand : null,
      scenario: top ? scenarios(M.filter(function (m) { return m.id === top.id; })[0], basic) : null,
      hybrid: hybridPairs(ranking)
    };
  }

  /* ---------- 하이브리드 조합 후보 ---------- */
  function hybridPairs(ranking) {
    var out = [];
    for (var i = 0; i < 3 && i < ranking.length; i++) {
      for (var j = i + 1; j < 4 && j < ranking.length; j++) {
        if (ranking[i].group === ranking[j].group) continue;
        out.push({
          a: ranking[i].name, b: ranking[j].name,
          score: round((ranking[i].S + ranking[j].S) / 2, 1)
        });
      }
    }
    return out.slice(0, 3);
  }

  return {
    areaScores: areaScores, baseScore: baseScore, modelFit: modelFit,
    economyScore: economyScore, capFactor: capFactor, potentialRevenue: potentialRevenue, gateResult: gateResult, confidence: confidence,
    band: band, coreFloor: coreFloor, scenarios: scenarios, evaluate: evaluate,
    version: 'SMFI 2.1'
  };
});
