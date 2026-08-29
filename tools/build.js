#!/usr/bin/env node
/**
 * BLANK SPACE INDEX — 정적 사이트 빌드
 * 사용:  node tools/build.js
 * 출력:  public/  (Cloudflare Pages 배포 디렉터리)
 *
 * 페이지 모듈(tools/pages/*.js)이 있으면 그 내용으로,
 * 없으면 사이트맵의 경로마다 "다음 단계에서 채워집니다" 스텁을 생성한다.
 * 스텁을 만드는 이유: 단계별 제작 중에도 링크가 404로 끊기지 않게 하기 위해서다.
 */
const fs = require('fs');
const path = require('path');
const { layout } = require('./partials/layout');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public');
const PAGES_DIR = path.join(__dirname, 'pages');

/* 전체 사이트맵 — 제작지시서 부록 A의 공개 영역 총괄표 */
const SITEMAP = [
  { path: '/', title: '메인', desc: '공간·상업용 부동산 통합 평가 체계 BLANK SPACE INDEX. 왜 그런지, 그래서 무엇을 해야 하는지 — 주소 하나로 3분 진단을 시작해 보세요.' },
  { path: '/about-index/', title: '지수 체계 소개', desc: '조회가 아니라 진단. 여덟 개의 지수와 Standard·Pro 이원 체계, 평가에서 실행까지 이어지는 구조를 소개합니다.' },
  { path: '/index/vacancy/', title: '공실 원인 진단', desc: '이 공간은 왜 비어 있고, 무엇부터 바꿔야 하는가. 여덟 갈래 원인 분해와 확인 순서를 제시하는 진단입니다.' },
  { path: '/index/rent/', title: '적정임대료 진단', desc: '지금 조건이 시장과 맞는가. 보증금·렌트프리까지 반영한 실질 조건을 시장 범위 위에서 확인합니다.' },
  { path: '/index/business/', title: '영업 가능성 확인', desc: '이 공간에서 내가 하려는 영업이 합법적으로 가능한가. 여덟 관문을 차례로 확인합니다.' },
  { path: '/index/smfi/', title: '공간수익화 적합성 평가', desc: '이 공간으로 무엇을 해야 하는가. 결격 확인부터 수익 모델 적합도와 경제성 검증까지의 본 평가입니다.' },
  { path: '/index/cashflow/', title: '현금흐름 진단 (준비 중)', desc: '이 자산의 순수익은 얼마이고 어디서 새는가. 출시를 준비하고 있는 진단입니다.' },
  { path: '/index/facility/', title: '시설·설비 상태 점검 (준비 중)', desc: '이 건물·호실을 쓰려면 앞으로 얼마가 더 드는가. 출시를 준비하고 있는 진단입니다.' },
  { path: '/index/tenant/', title: '임차인 안정성 진단 (준비 중)', desc: '이 임차인·업종과 끝까지 갈 수 있는가. 출시를 준비하고 있는 진단입니다.' },
  { path: '/index/value/', title: '건물 가치 범위 분석 (준비 중)', desc: '이 가격이 시장 범위 어디에 있는가. 매입 검토 리포트 안에서 제공될 분석입니다.' },
  { path: '/products/', title: '상품·가격', desc: '무료 3분 진단부터 셀프 진단, 전문가 진단, 현장 점검, 종합 심층까지 — 상황에 맞는 상품을 안내합니다.' },
  { path: '/products/onsite/', title: '현장 점검', desc: '원격이 확인하지 못하는 것을 가서 보고 재고 사진으로 남기는 확정 진단. 사전 신청을 받습니다.' },
  { path: '/products/deep/', title: '종합 심층 진단', desc: '전 지수와 시나리오, 실행 계획까지 담는 종합 심층 리포트를 상담으로 안내합니다.' },
  { path: '/check/', title: '3분 무료 진단', desc: '주소 하나와 몇 개의 문항으로 방향과 위험 신호를 확인합니다. 응답은 저장되지 않습니다.' },
  { path: '/apply/', title: '신청', desc: '전문가 진단, 본 평가, 현장 점검, 상담 신청을 한 곳에서 접수합니다.' },
  { path: '/trust/', title: '신뢰와 검증', desc: '방법론, Model Card, 검증 현황, 거버넌스 — 신뢰를 주장 대신 구조로 보여 드립니다.' },
  { path: '/trust/methodology/', title: '방법론', desc: '접근법의 뼈대는 공인 기준에서, 판단의 살은 실행 데이터로, 성적표는 통계 지표로.' },
  { path: '/trust/model-cards/', title: 'Model Card', desc: '지수별 Model Card — 목적, 적용 범위, 사용 데이터, 한계, 검증 상태, 버전 이력을 한 장 규격으로 공개합니다.' },
  { path: '/trust/validation/', title: '검증 현황', desc: '설계에서 파일럿, 보정, 실증까지 — 지수별 검증 단계를 그대로 보여 드립니다.' },
  { path: '/trust/governance/', title: '거버넌스', desc: '이중 확인, 이의제기와 정정, 표현 통제 — 판정을 지키는 장치들입니다.' },
  { path: '/works/', title: '실적·레퍼런스', desc: '2015년부터 340여 개 공간을 직접 기획·개발·운영해 온 실행의 기록입니다.' },
  { path: '/company/', title: '운영사·신뢰 구조', desc: '평가하는 회사가 실행도 한다는 구조를 먼저 공개하고, 그 이해상충을 다루는 장치를 설명합니다.' },
  { path: '/insights/', title: '자료실', desc: '공실과 임대, 계약을 다루는 글과 반기 공실 리포트. 통계 인용에는 발표 기관과 기준시점을 붙이고, 글 중간에 광고를 끼우지 않습니다.' },
  { path: '/insights/average-illusion/', title: '평균 공실률의 착시', desc: '전국 상가 공실률 13.1%라는 숫자가 감추는 것 — 평균이 아니라 내 공간의 진단이 필요한 이유.' },
  { path: '/insights/eight-causes/', title: '임대료를 내리기 전에 확인할 여덟 가지', desc: '공실의 원인을 여덟 갈래로 가르는 법 — 가격 인하가 답이 아닌 경우에 대하여.' },
  { path: '/insights/effective-rent/', title: '보증금과 렌트프리까지 계산한 진짜 임대료', desc: '명목 임대료의 착시를 걷어 내는 유효임대료 기준.' },
  { path: '/insights/permit-gates/', title: '그 자리에 그 업종이 안 되는 이유', desc: '용도·정화조·주차·소방·학교 앞 제한 — 계약 전에 걸리는 관문들.' },
  { path: '/insights/why-we-disclose/', title: '우리가 판정 근거를 공개하기로 한 이유', desc: '배지, 공시, 이의 절차 — 평가와 실행을 함께 하는 회사의 신뢰 방식.' },
  { path: '/b2b/', title: 'B2B·제휴', desc: '프랜차이즈 출점 검토, 중개·자산관리 제휴, 지자체 상권 공실 진단 용역을 안내합니다.' },
  { path: '/samples/', title: '샘플 결과지', desc: '결과지의 공통 규격 여섯 요소와 지수별 샘플 — 사기 전에 받게 될 문서를 그대로 확인하세요.' },
  { path: '/samples/rent/', title: '샘플 — 적정임대료 진단 결과지', desc: '적정임대료 진단 Standard 결과지 5면 전체 샘플. 시장 밴드, 유효임대료 환산, 등가 조합, 시나리오, 신뢰도와 한계까지 실제 지면 그대로.' },
  { path: '/verify/', title: '리포트 진위 확인', desc: '발행 번호 규격과 진위 확인 절차 — 제3자에게 전달받은 결과지가 발행된 그대로인지 확인하는 자리입니다.' },
  { path: '/glossary/', title: '용어집', desc: '유효임대료, 신뢰도 C, 하드게이트, 캘리브레이션 배지 — 화면과 결과지 전체에서 같은 뜻으로 쓰이는 용어의 정의.' },
  { path: '/trust/data/', title: '데이터와 출처', desc: '여덟 개 공공 데이터의 역할과 사용하는 지수, 기준시점 병기·시차 고지·역할 한정의 취급 규칙을 밝힙니다.' },
  { path: '/trust/revisions/', title: '개정 이력', desc: '지수 버전의 총괄 기록 — 산식과 경계값의 조정을 근거와 함께 남기고, 발행된 결과에는 소급하지 않습니다.' },
  { path: '/faq/', title: '자주 묻는 질문', desc: '진단과 리포트, 결제와 환불, 전문가 진단과 현장 점검에 대한 질문과 답입니다.' },
  { path: '/contact/', title: '문의', desc: '진단 선택이 어렵거나 결과 해석이 궁금할 때, 제휴 논의가 필요할 때 — 용건별 창구로 보내 주시면 영업일 1일 안에 회신드립니다.' },
  { path: '/legal/terms/', title: '이용약관', desc: '이용약관 초안 — 서비스의 성격, 결제와 공제, 판정 불변과 유효기간, 책임의 한계를 정합니다.' },
  { path: '/legal/privacy/', title: '개인정보처리방침', desc: '개인정보처리방침 초안 — 무료 진단의 무저장 원칙, 유료 이용 시 수집 항목과 보유·파기 기준을 밝힙니다.' },
  { path: '/legal/refund/', title: '취소·환불 규정', desc: '취소·환불 규정 초안 — 셀프 진단과 케이스형 상품, 현장 점검의 취소·환불 기준을 안내합니다.' },
  { path: '/legal/notice/', title: '면책·용도 제한 고지', desc: '면책·용도 제한 고지 — 표준 면책, 감정평가와의 구분, 문서의 용도 제한, 현장 점검의 업무 범위 전문입니다.' },
];

function pathToFile(p) {
  if (p === '/') return path.join(OUT, 'index.html');
  return path.join(OUT, p.replace(/^\//, ''), 'index.html');
}

function pageModuleFor(p) {
  // '/' -> home.js, '/index/vacancy/' -> index-vacancy.js, '/trust/model-cards/' -> trust-model-cards.js
  const name = p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '-');
  const file = path.join(PAGES_DIR, `${name}.js`);
  return fs.existsSync(file) ? file : null;
}

function stubBody(entry) {
  return `<section class="section">
    <div class="container container--narrow">
      <p class="eyebrow">준비 중인 페이지</p>
      <h1 class="h1">${entry.title.replace(/ \(준비 중\)/, '')}</h1>
      <p class="lead">이 페이지는 단계별 제작 계획에 따라 곧 채워집니다. 지금은 자리만 마련해 두었고, 내용이 준비되는 대로 이 주소 그대로 열립니다.</p>
      <div class="notice">
        <p>빈 껍데기 페이지를 먼저 만들지 않는다는 원칙에 따라, 검증되지 않은 내용은 싣지 않습니다. 그때까지는 메인의 소개와 3분 무료 진단을 이용해 주세요.</p>
      </div>
      <p class="btn-row"><a class="btn btn--primary" href="/check/">3분 무료 진단 시작하기</a><a class="btn btn--ghost" href="/">메인으로 돌아가기</a></p>
    </div>
  </section>`;
}

function build() {
  let built = 0, stubbed = 0;
  for (const entry of SITEMAP) {
    const mod = pageModuleFor(entry.path);
    let page;
    if (mod) {
      delete require.cache[require.resolve(mod)];
      page = require(mod)(entry);
      built++;
    } else {
      page = { path: entry.path, title: entry.title, description: entry.desc, body: stubBody(entry), bodyClass: 'page-stub' };
      stubbed++;
    }
    // 브레드크럼 — 사이트맵에 존재하는 상위 경로만 수집 (홈 → … → 현재)
    // 단, 페이지 모듈이 자체 BreadcrumbList를 이미 넣었다면 중복 주입하지 않는다
    if (entry.path !== '/' && !String(page.extraHead || '').includes('BreadcrumbList')) {
      const titleOf = Object.fromEntries(SITEMAP.map((e) => [e.path, e.title]));
      const segs = entry.path.split('/').filter(Boolean);
      const crumbs = [{ path: '/', title: '홈' }];
      let acc = '';
      for (let i = 0; i < segs.length; i++) {
        acc += '/' + segs[i];
        const pth = acc + '/';
        if (pth === entry.path) crumbs.push({ path: pth, title: page.title || entry.title });
        else if (titleOf[pth]) crumbs.push({ path: pth, title: titleOf[pth] });
      }
      if (crumbs.length > 1) page.crumbs = crumbs;
    }
    const file = pathToFile(entry.path);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, layout(page));
  }

  // 404
  const notFound = layout({
    path: '/404.html', title: '페이지를 찾을 수 없습니다',
    description: '요청하신 페이지를 찾을 수 없습니다. 주소를 확인하시거나, 메인에서 다시 시작해 주세요.',
    body: `<section class="section"><div class="container container--narrow">
      <p class="eyebrow">404</p>
      <h1 class="h1">페이지를 찾지 못했습니다</h1>
      <p class="lead">주소가 바뀌었거나 잘못 입력되었을 수 있습니다. 아래에서 가려던 곳을 다시 찾아보세요.</p>
      <p class="btn-row"><a class="btn btn--primary" href="/">메인으로</a><a class="btn btn--ghost" href="/check/">3분 무료 진단</a></p>
    </div></section>`,
  });
  fs.writeFileSync(path.join(OUT, '404.html'), notFound);

  // sitemap.xml — 색인 정책: 진단 진행 화면(/check 내부 단계)은 단일 URL이므로 그대로 두고, 스텁 포함 공개 페이지를 나열
  const { SITE } = require('./data/site');
  const today = new Date().toISOString().slice(0, 10);
  const urls = SITEMAP.map((e) => `  <url><loc>${SITE.origin}${e.path}</loc><lastmod>${today}</lastmod></url>`).join('\n');
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  
  // rss.xml — 자료실 피드
  const { ARTICLES } = require('./data/articles');
  const rssItems = ARTICLES.map((a) => `  <item>
    <title>${a.title}</title>
    <link>${SITE.origin}/insights/${a.slug}/</link>
    <guid isPermaLink="true">${SITE.origin}/insights/${a.slug}/</guid>
    <pubDate>${new Date('2026-08-01').toUTCString()}</pubDate>
    <description><![CDATA[${a.summary}]]></description>
  </item>`).join('\n');
  fs.writeFileSync(path.join(OUT, 'rss.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel>\n  <title>BLANK SPACE INDEX 자료실</title>\n  <link>${SITE.origin}/insights/</link>\n  <description>공실과 임대, 계약을 다루는 글</description>\n  <language>ko</language>\n${rssItems}\n</channel></rss>\n`);
  fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE.origin}/sitemap.xml\n`);

  console.log(`빌드 완료 — 페이지 ${built}면 생성, 스텁 ${stubbed}면, 404·sitemap·robots 포함`);
}

build();
