/**
 * 자료실 글 렌더러 — Article 구조화 데이터 포함
 */
const { ARTICLES } = require('../data/articles');
const { SITE } = require('../data/site');
const SEO = require('./seo');

module.exports = function renderArticle(entry, slug) {
  const a = ARTICLES.find((x) => x.slug === slug);
  const others = ARTICLES.filter((x) => x.slug !== slug).slice(0, 2);
  const plain = a.body.replace(/<[^>]+>/g, ' ');
  const ldArticle = SEO.article({
    title: a.title, description: a.summary, path: entry.path,
    date: a.date + '-01', modified: a.modified || (a.date + '-01'),
    keywords: a.keywords || [], image: `/assets/img/og/${a.slug}.png`,
    wordCount: plain.replace(/\s+/g, '').length, section: a.section || '공실과 임대',
  });
  ldArticle.speakable = SEO.speakable(['.article__lead', '.article__body > p:first-of-type']);
  const ldBc = SEO.breadcrumb([
    { name: '홈', path: '/' },
    { name: '자료실', path: '/insights/' },
    { name: a.title, path: entry.path },
  ]);
  const ldFaq = (a.faqs && a.faqs.length) ? SEO.faqPage(a.faqs.map((f) => [f.q, f.a])) : null;

  const body = `
  <article class="article">
    <header class="dhero article__hero">
      <div class="container" style="max-width:820px;">
        <p class="eyebrow">자료실 · ${a.section || "기록"}${a.no ? " · 창간 " + a.no : ""}</p>
        <h1 class="h-display" style="font-size:clamp(28px,3.4vw,40px);">${a.title}</h1>
        <p class="article__meta"><span>${a.date}</span><span>읽는 시간 ${a.read}</span><span>BLANK SPACE INDEX</span></p>
      </div>
    </header>
    <div class="section section--alt" style="padding-top:64px;">
      <div class="container article__body">
        <p class="article__lead">${a.summary}</p>
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
    extraHead: `${SEO.ld(ldArticle)}${SEO.ld(ldBc)}${ldFaq ? SEO.ld(ldFaq) : ''}`,
  };
};
