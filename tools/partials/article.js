/**
 * 자료실 글 렌더러 — Article 구조화 데이터 포함
 */
const { ARTICLES } = require('../data/articles');
const { SITE } = require('../data/site');

module.exports = function renderArticle(entry, slug) {
  const a = ARTICLES.find((x) => x.slug === slug);
  const others = ARTICLES.filter((x) => x.slug !== slug).slice(0, 2);
  const ld = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: a.title, description: a.summary, datePublished: '2026-08-01',
    author: { '@type': 'Organization', name: '주식회사 블랭크 · BLANK SPACE INDEX' },
    publisher: { '@type': 'Organization', name: SITE.name },
    mainEntityOfPage: SITE.origin + entry.path,
  };
  const bc = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '자료실', item: SITE.origin + '/insights/' },
      { '@type': 'ListItem', position: 2, name: a.title, item: SITE.origin + entry.path },
    ],
  };
  const body = `
  <article class="article">
    <header class="dhero article__hero">
      <div class="container" style="max-width:820px;">
        <p class="eyebrow">자료실 · 창간 ${a.no}</p>
        <h1 class="h-display" style="font-size:clamp(28px,3.4vw,40px);">${a.title}</h1>
        <p class="article__meta"><span>${a.date}</span><span>읽는 시간 ${a.read}</span><span>BLANK SPACE INDEX</span></p>
      </div>
    </header>
    <div class="section section--alt" style="padding-top:64px;">
      <div class="container article__body">
        ${a.body}
        ${a.sources.length ? `<div class="article__src"><span class="lbl">통계 출처</span><ul>${a.sources.map((s) => `<li>${s}</li>`).join('')}</ul></div>` : ''}
        <div class="article__cta">
          <p>이 글과 이어지는 진단</p>
          <a class="btn btn--primary" href="${a.cta.href}">${a.cta.label}</a>
        </div>
      </div>
    </div>
    <div class="section section--tight">
      <div class="container">
        <p class="eyebrow">함께 읽기</p>
        <div class="next-cards" style="grid-template-columns:repeat(2,1fr);">
          ${others.map((o) => `<a class="next-card" href="/insights/${o.slug}/"><b>${o.title}</b><p>${o.summary}</p><span class="index-card__cta">읽기</span></a>`).join('')}
        </div>
      </div>
    </div>
  </article>`;
  return {
    path: entry.path, title: a.title, description: a.summary,
    ogTitle: `${a.title} — ${SITE.name} 자료실`,
    body, bodyClass: 'page-article',
    ogImage: `/assets/img/og/${a.slug}.png`,
    extraHead: `<script type="application/ld+json">${JSON.stringify(ld)}</script><script type="application/ld+json">${JSON.stringify(bc)}</script>`,
  };
};
