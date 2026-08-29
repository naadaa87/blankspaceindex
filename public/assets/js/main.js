/* BLANK SPACE INDEX — 공통 인터랙션
   원칙: 상태 변화의 이해를 돕는 최소한만. 장식 스크립트는 두지 않는다. */
(function () {
  'use strict';

  /* 모바일 메뉴 */
  var burger = document.querySelector('.nav-burger');
  var menu = document.getElementById('mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      burger.setAttribute('aria-label', open ? '메뉴 열기' : '메뉴 닫기');
      menu.hidden = open;
      menu.classList.toggle('is-open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });
    /* 그룹 아코디언 */
    menu.querySelectorAll('.mobile-menu__group').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        var sub = btn.nextElementSibling;
        if (sub) sub.hidden = open;
      });
    });
    /* 링크 이동 시 메뉴 닫기 */
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        burger.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  /* 데스크톱 드롭다운 — 터치·키보드 대응: 링크는 이동, 첫 탭에서는 하위 열림 */
  document.querySelectorAll('.nav__item').forEach(function (item) {
    var link = item.querySelector('.nav__link');
    if (!link) return;
    link.addEventListener('touchend', function (e) {
      if (!item.classList.contains('is-open')) {
        e.preventDefault();
        document.querySelectorAll('.nav__item.is-open').forEach(function (o) { o.classList.remove('is-open'); });
        item.classList.add('is-open');
      }
    }, { passive: false });
  });

  /* 연도 자동화 */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* 배지 설명 — 클릭 시 단계 설명 레이어 (4.3절) */
  var BADGE_DESC = {
    expert: 'Expert-designed · 전문가 설계 — 10년의 실행 경험과 공인 방법론으로 설계되었으며, 실제 사례 보정을 앞둔 단계입니다.',
    pilot: 'Pilot-calibrated · 파일럿 보정 — 파일럿 표본으로 1차 보정을 마친 단계입니다.',
    backtested: 'Backtested · 실증 검증 — 홀드아웃 검증을 통과해 성능 요약을 공개하는 단계입니다.'
  };
  var pop = null;
  function closePop() { if (pop) { pop.remove(); pop = null; } }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.badge[data-badge]');
    if (!b) { closePop(); return; }
    e.preventDefault();
    if (pop && pop._for === b) { closePop(); return; }
    closePop();
    pop = document.createElement('div');
    pop._for = b;
    pop.className = 'badge-pop';
    pop.setAttribute('role', 'note');
    pop.textContent = BADGE_DESC[b.getAttribute('data-badge')] || '';
    document.body.appendChild(pop);
    var r = b.getBoundingClientRect();
    pop.style.cssText = 'position:fixed;z-index:120;max-width:300px;background:#20262A;color:#F2F5F4;font-size:13px;line-height:1.6;padding:12px 14px;border-radius:6px;box-shadow:0 10px 32px rgba(29,35,39,.28);';
    var top = r.bottom + 8;
    var left = Math.min(Math.max(12, r.left), window.innerWidth - 312);
    pop.style.top = top + 'px';
    pop.style.left = left + 'px';
  });
  window.addEventListener('scroll', closePop, { passive: true });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePop(); });
  /* 섹션 리빌 — 미세한 등장 모션 (reduced-motion 시 CSS에서 즉시 표시) */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4 * 60, 180) + 'ms';
      io.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* FAQ 검색 필터 — 질문·답변 텍스트 매칭, 빈 카테고리는 함께 숨김 */
  var faqQ = document.getElementById('faq-q');
  if (faqQ) {
    var cats = [].slice.call(document.querySelectorAll('.faq-cat'));
    var items = [].slice.call(document.querySelectorAll('.faq-cat details'));
    var count = document.getElementById('faq-count');
    var total = items.length;
    faqQ.addEventListener('input', function () {
      var q = faqQ.value.trim().toLowerCase();
      var shown = 0;
      items.forEach(function (d) {
        var hit = !q || d.textContent.toLowerCase().indexOf(q) !== -1;
        d.style.display = hit ? '' : 'none';
        if (hit) shown++;
      });
      cats.forEach(function (c) {
        var any = [].slice.call(c.querySelectorAll('details')).some(function (d) { return d.style.display !== 'none'; });
        c.style.display = any ? '' : 'none';
      });
      if (count) count.textContent = q ? shown + ' / ' + total + '문' : '';
    });
  }

  /* 진위 확인 폼 — 온라인 조회는 정식 오픈과 함께. 지금은 정중한 안내로 응답 */
  var vf = document.querySelector('[data-verify]');
  if (vf) {
    vf.addEventListener('submit', function (e) {
      e.preventDefault();
      var no = (vf.no.value || '').trim().toUpperCase();
      var note = document.querySelector('[data-verify-note]');
      var okForm = /^BSI-[A-Z]{4}-\d{4}-[0-9A-Z]{4,}$/.test(no);
      note.textContent = no
        ? (okForm
          ? '형식이 맞는 발행 번호입니다. 온라인 조회는 정식 오픈과 함께 열립니다 — 그때까지는 아래 이메일 대조 창구로 보내 주시면 영업일 1일 안에 발행 사실을 회신드립니다.'
          : '발행 번호 형식이 다릅니다. 예시 형식(BSI-SRVI-2609-0184)을 확인해 주세요. 형식이 다른 문서를 받으셨다면 위·변조 가능성이 있으니 이메일로 문서 사진과 함께 알려 주세요.')
        : '발행 번호를 입력해 주세요.';
      note.classList.add('is-active');
    });
  }
})();