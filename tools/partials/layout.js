/**
 * 공통 레이아웃 — head / 헤더 / 푸터
 * 디자인: Modern Proptech Intelligence (무드보드 기준)
 * 페이지 모듈은 { path, title, description, body, bodyClass, extraHead, extraBody } 반환
 */
const { SITE, NAV, CTA, NOTICES } = require('../data/site');
const { INDEXES } = require('../data/registry');

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* 브랜드 마크 — 시안의 북마크 글리프 */
const MARK_SVG = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 4.6C6 3.72 6.72 3 7.6 3h8.8c.88 0 1.6.72 1.6 1.6V21l-6-4.05L6 21V4.6Z" fill="currentColor"/></svg>`;

const navLinks = (currentPath) => {
  const isActive = (item) =>
    item.match.some((m) => (m === '/' ? currentPath === '/' : currentPath.startsWith(m)));

  return NAV.map((item) => {
    const active = isActive(item) ? ' is-active' : '';
    if (!item.children) {
      return `<div class="nav__item"><a class="nav__link${active}" href="${item.href}">${item.label}</a></div>`;
    }
    const groups = item.children
      .map((g) => {
        const links = g.links
          .map(
            (l) =>
              `<a href="${l.href}"${l.preparing ? ' class="is-preparing"' : ''}>${l.label}${
                l.preparing ? ' <span class="code-tag">준비 중</span>' : ''
              }</a>`
          )
          .join('');
        return `<div class="nav-sub__group">${
          g.label ? `<div class="nav-sub__label">${g.label}</div>` : ''
        }${links}</div>`;
      })
      .join('');
    return `<div class="nav__item">
      <a class="nav__link${active}" href="${item.href}">${item.label} <span class="caret"></span></a>
      <div class="nav-sub">${groups}</div>
    </div>`;
  }).join('\n      ');
};

const mobileMenu = () => {
  const groups = NAV.map((item) => {
    if (!item.children) return `<a href="${item.href}" style="font-weight:600;">${item.label}</a>`;
    const sub = item.children
      .map((g) => {
        const links = g.links
          .map((l) => `<a href="${l.href}"${l.preparing ? ' class="is-preparing"' : ''}>${l.label}</a>`)
          .join('');
        return `${g.label ? `<div class="nav-sub__label">${g.label}</div>` : ''}${links}`;
      })
      .join('');
    return `<button class="mobile-menu__group" aria-expanded="false">${item.label} <span class="caret"></span></button>
      <div class="mobile-menu__sub" hidden>${sub}</div>`;
  }).join('\n      ');
  return `${groups}
      <a class="btn btn--primary mobile-menu__cta" href="${CTA.href}">${CTA.label}</a>`;
};

const footer = () => {
  const availableLinks = INDEXES.filter((i) => i.status === 'available')
    .map((i) => `<li><a href="/index/${i.slug}/">${i.name}</a></li>`)
    .join('');
  const preparingLinks = INDEXES.filter((i) => i.status === 'preparing')
    .map((i) => `<li><a class="is-preparing" href="/index/${i.slug}/">${i.name}</a></li>`)
    .join('');
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-tagline">
        <p>${SITE.tagline}</p>
        <span class="code-tag">index.vacancy.co.kr</span>
      </div>
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="brand">
            <span class="brand__mark">${MARK_SVG}</span>
            <span class="brand__text">
              <span class="brand__name" style="color:#F2F5F4;">BLANK SPACE INDEX</span>
              <span class="brand__sub" style="color:#93A19C;">by 공백 · 주식회사 블랭크</span>
            </span>
          </div>
          <p>공간·상업용 부동산 통합 평가 체계.<br>공실 진단과 수익화 평가, 현장 확인과 실행까지 —<br>모든 결과에 근거와 한계를 함께 적습니다.</p>
          <p style="margin-top:12px;">문의 <a href="mailto:${SITE.email}" style="color:#C6CFCC;">${SITE.email}</a></p>
        </div>
        <div class="footer-col">
          <span class="lbl">지수와 진단</span>
          <ul>
            <li><a href="/check/">3분 무료 진단</a></li>
            ${availableLinks}
          </ul>
        </div>
        <div class="footer-col">
          <span class="lbl">준비 중</span>
          <ul>${preparingLinks}</ul>
        </div>
        <div class="footer-col">
          <span class="lbl">회사와 신뢰</span>
          <ul>
            <li><a href="/trust/">신뢰와 검증</a></li>
            <li><a href="/works/">실적·레퍼런스</a></li>
            <li><a href="/company/">운영사 소개</a></li>
            <li><a href="/b2b/">B2B·제휴</a></li>
            <li><a href="/insights/">자료실</a></li>
            <li><a href="/faq/">자주 묻는 질문</a></li>
            <li><a href="/samples/">샘플 결과지</a></li>
            <li><a href="/verify/">리포트 진위 확인</a></li>
            <li><a href="/glossary/">용어집</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-legal">
        <p><strong>감정평가와의 구분</strong> — ${NOTICES.appraisal}</p>
        <p>${NOTICES.disclaimer}</p>
        <p style="margin-top:10px;color:#6B7774;">사업자 정보(사업자등록번호·통신판매업 신고번호·주소)는 정식 오픈 시점에 이 자리에 표기됩니다.</p>
      </div>
      <div class="footer-bottom">
        <span>© <span data-year>2026</span> BLANK Inc. · BLANK SPACE INDEX</span>
        <nav>
          <a href="/legal/terms/">이용약관</a>
          <a href="/legal/privacy/"><strong style="color:#C6CFCC;">개인정보처리방침</strong></a>
          <a href="/legal/refund/">환불 규정</a>
          <a href="/legal/notice/">고지 사항</a>
        </nav>
      </div>
    </div>
  </footer>`;
};

const layout = (page) => {
  const title = page.path === '/' ? `${SITE.name} — ${SITE.shortDesc}` : `${page.title} — ${SITE.name}`;
  const canonical = SITE.origin + page.path;
  const ogTitle = page.ogTitle || title;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(page.description || SITE.desc)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(ogTitle)}">
<meta property="og:description" content="${esc(page.description || SITE.desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.origin}${page.ogImage || '/assets/img/og-default.png'}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">
    <link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48" href="/favicon.ico">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/pretendard/woff2-dynamic-subset/PretendardVariable.subset.0.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/style.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"BLANK SPACE INDEX","alternateName":"주식회사 블랭크 · 공백","url":"${SITE.origin}","logo":"${SITE.origin}/assets/img/apple-touch-icon.png","email":"${SITE.email}","sameAs":["${SITE.companySite}"]}</script>
<link rel="alternate" type="application/rss+xml" title="BLANK SPACE INDEX 자료실" href="/rss.xml">
    ${page.crumbs ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: page.crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.title, item: SITE.origin + c.path })) })}</script>` : ''}
    ${page.extraHead || ''}
</head>
<body${page.bodyClass ? ` class="${page.bodyClass}"` : ''}>
<a class="skip-link" href="#main">본문으로 건너뛰기</a>
<header class="site-header">
  <div class="site-header__inner">
    <a class="brand" href="/" aria-label="BLANK SPACE INDEX 홈">
      <span class="brand__mark">${MARK_SVG}</span>
      <span class="brand__text">
        <span class="brand__name">BLANK SPACE INDEX</span>
        <span class="brand__sub">by 공백</span>
      </span>
    </a>
    <nav class="nav" aria-label="주 메뉴">
      ${navLinks(page.path)}
    </nav>
    <a class="btn btn--primary btn--sm header-cta" href="${CTA.href}">${CTA.label}</a>
    <button class="nav-burger" aria-expanded="false" aria-controls="mobile-menu" aria-label="메뉴 열기">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="mobile-menu" id="mobile-menu" hidden>
    ${mobileMenu()}
  </div>
</header>
<main id="main">
${page.body}
${page.docMeta ? `<div class="container"><p class="doc-meta">문서번호 ${page.docMeta.id} · 기준 ${page.docMeta.date} · 이 문서의 개정은 <a href="/trust/revisions/">개정 이력</a>에 기록됩니다.</p></div>` : ''}
  </main>
${footer()}
<script src="/assets/js/main.js" defer></script>
${page.extraBody || ''}
<!-- Cloudflare Web Analytics(쿠키 없는 방문 통계). 배포 후 대시보드에서 토큰을 발급받아 아래 주석을 해제하세요.
  <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "YOUR_TOKEN"}'></script> -->
</body>
</html>`;
};

module.exports = { layout, esc };
