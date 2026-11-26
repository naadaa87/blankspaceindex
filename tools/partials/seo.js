/**
 * 검색·생성엔진 최적화(SEO · GEO · AEO) 공통 모듈
 *
 * SEO — 전통 검색엔진: 구조화 데이터로 페이지의 정체를 기계가 읽게 한다.
 * AEO — 답변 엔진·음성 검색: 질문에 대한 짧고 사실적인 답을 명시한다.
 * GEO — 생성형 검색(AI 개요·챗봇): 인용하기 좋은 단위(정의·수치·출처·날짜)를 제공한다.
 *
 * 원칙: 없는 사실을 만들지 않는다. 후기·평점처럼 실체 없는 마크업은 쓰지 않는다.
 */
const { SITE } = require('../data/site');

const abs = (p) => (p.startsWith('http') ? p : SITE.origin + p);
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;

/* 사이트 전역 — 검색결과의 사이트명·대체명 인식 */
const website = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE.origin + '/#website',
  name: 'BLANK SPACE INDEX',
  alternateName: ['블랭크 스페이스 인덱스', '공백 스페이스 인덱스', 'BSI'],
  url: SITE.origin,
  inLanguage: 'ko-KR',
  publisher: { '@id': SITE.origin + '/#org' },
  description: SITE.desc,
});

/* 발행 주체 — 모든 글·서비스가 이 주체를 참조한다 */
const organization = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': SITE.origin + '/#org',
  name: 'BLANK SPACE INDEX',
  alternateName: '주식회사 블랭크 · 공백',
  url: SITE.origin,
  logo: abs('/assets/img/apple-touch-icon.png'),
  email: SITE.email,
  telephone: SITE.tel,
  foundingDate: '2015',
  knowsAbout: [
    '상업용 부동산 공실 진단', '적정임대료 산정', '유효임대료 환산',
    '업종 인허가 관문 확인', '공간 수익화 모델 평가', '상가 공실 해소',
    '용도변경 검토', '현장 실측 점검',
  ],
  areaServed: { '@type': 'Country', name: '대한민국' },
  sameAs: [SITE.companySite],
});

/* 빵부스러기 — 페이지의 위치를 알려 검색결과에 경로가 표시되게 한다 */
const breadcrumb = (trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((t, i) => ({
    '@type': 'ListItem', position: i + 1, name: t.name, item: abs(t.path),
  })),
});

/* 유료 서비스 — 가격을 기계가 읽게 한다. 금액이 없으면 Offer를 만들지 않는다. */
const service = ({ name, description, path, offers, serviceType }) => {
  const o = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': abs(path) + '#service',
    name, description,
    serviceType: serviceType || '상업용 공간 진단',
    provider: { '@id': SITE.origin + '/#org' },
    areaServed: { '@type': 'Country', name: '대한민국' },
    url: abs(path),
  };
  const valid = (offers || []).filter((x) => x && x.price != null);
  if (valid.length) {
    o.offers = valid.map((x) => ({
      '@type': 'Offer',
      name: x.name,
      price: String(x.price),
      priceCurrency: 'KRW',
      availability: 'https://schema.org/InStock',
      url: abs(path),
      ...(x.from ? { priceSpecification: { '@type': 'PriceSpecification', price: String(x.price), priceCurrency: 'KRW', valueAddedTaxIncluded: false, minPrice: String(x.price) } } : {}),
    }));
  }
  return o;
};

/* 질문과 답 — 답변 엔진이 그대로 인용할 수 있는 단위 */
const faqPage = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({
    '@type': 'Question', name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

/* 글 — 작성자·발행일·수정일·주제를 명시해 인용 가능성을 높인다 */
const article = ({ title, description, path, date, modified, keywords, image, wordCount, section }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': abs(path) + '#article',
  headline: title,
  description,
  datePublished: date,
  dateModified: modified || date,
  author: { '@id': SITE.origin + '/#org' },
  publisher: { '@id': SITE.origin + '/#org' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': abs(path) },
  inLanguage: 'ko-KR',
  isAccessibleForFree: true,
  ...(image ? { image: abs(image) } : {}),
  ...(keywords && keywords.length ? { keywords: keywords.join(', ') } : {}),
  ...(wordCount ? { wordCount } : {}),
  ...(section ? { articleSection: section } : {}),
});

/* 글 목록 — 자료실이 모음 페이지임을 알린다 */
const itemList = (items, path) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': abs(path) + '#list',
  itemListElement: items.map((a, i) => ({
    '@type': 'ListItem', position: i + 1, url: abs(a.path), name: a.title,
  })),
});

/* 음성 검색·AI 개요가 읽어 갈 핵심 문단 지정 */
const speakable = (selectors) => ({
  '@type': 'SpeakableSpecification',
  cssSelector: selectors,
});

module.exports = { ld, abs, website, organization, breadcrumb, service, faqPage, article, itemList, speakable };
