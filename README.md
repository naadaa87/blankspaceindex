# BLANK SPACE INDEX — 평가 플랫폼 홈페이지

공간·상업용 부동산 통합 평가 체계 **BLANK SPACE INDEX**의 공개 사이트입니다.
「홈페이지 제작기획·기능명세·제작지시서 v1.0」과 보충자료를 기준 문서로 제작되었습니다.

- 배포 대상: `index.vacancy.co.kr` (권고안 — 제작지시서 1.3절)
- 스택: 빌드 도구 없는 순수 HTML/CSS/JS + Cloudflare Pages (기존 vacancy.co.kr·smfi-console과 동일 구성)
- 디자인 기준: **Modern Proptech Intelligence 무드보드(Candidate 2)** — Off-White `#F7F8F6` · Graphite `#2B2F33` · Teal `#0F6B63` · Green `#16A34A`, Pretendard 산세리프 체계. 섹션 레이아웃은 제공된 섹션 시안(히어로·사례·현장·B2B 등)을 코드로 재현했습니다.
- 사진 자산: `public/assets/img/photos/`의 webp는 제공된 디자인 시안 이미지에서 크롭·최적화한 것입니다.

## 폴더 구조

```
├── public/            ← Cloudflare Pages가 서빙하는 배포 디렉터리 (생성 결과물)
│   ├── index.html     메인
│   ├── index/…        지수 상세 8종
│   ├── check/         3분 무료 진단
│   ├── trust/ …       신뢰와 검증
│   ├── assets/        css · js · fonts(자체 호스팅 서브셋) · img
│   ├── _headers       보안·캐시 헤더
│   ├── _redirects     (SMFI 이관 시 301 추가)
│   └── sitemap.xml · robots.txt · 404.html
├── tools/             ← 페이지 생성기 (수정은 여기서)
│   ├── build.js       빌드 스크립트: node tools/build.js
│   ├── partials/      레이아웃(헤더·푸터·head)
│   ├── pages/         페이지 모듈 (경로 1개 = 파일 1개)
│   └── data/          지수 레지스트리 · 사이트 공통 데이터 · 고지 문안
└── package.json
```

**수정 방법** — `public/`의 HTML을 직접 고치지 말고 `tools/`의 데이터·페이지 모듈을 고친 뒤
`node tools/build.js`로 다시 생성하세요. 지수 추가는 `tools/data/registry.js`에 객체 하나를
더하는 것으로 끝납니다(제작지시서 11.3절의 레지스트리 원칙).

## GitHub → Cloudflare Pages 배포

1. **저장소 생성·푸시**
   ```bash
   git init
   git add .
   git commit -m "BLANK SPACE INDEX v1"
   git branch -M main
   git remote add origin https://github.com/<계정>/blank-space-index.git
   git push -u origin main
   ```

2. **Cloudflare Pages 연결**
   - Cloudflare 대시보드 → Workers & Pages → **Create** → Pages → *Connect to Git*
   - 저장소 선택 후 빌드 설정:

   | 항목 | 값 |
   | --- | --- |
   | Framework preset | None |
   | Build command | *(비워 둠 — 정적 파일이 이미 커밋되어 있음)* |
   | Build output directory | `public` |

   > 빌드를 Cloudflare에서 돌리고 싶다면 Build command에 `node tools/build.js`를 넣어도
   > 됩니다. 결과는 같습니다.

3. **커스텀 도메인 연결**
   - 프로젝트 → *Custom domains* → `index.vacancy.co.kr` 추가
   - vacancy.co.kr 존이 이미 Cloudflare에 있으므로 CNAME이 자동 구성되고 SSL이 발급됩니다.

4. **이후 갱신** — `main`에 푸시하면 자동 배포됩니다.

## 오픈 전 확정 필요 항목 (본문에 자리 표시됨)

- [ ] 푸터 사업자 정보: 사업자등록번호 · 통신판매업 신고번호 · 주소 (오픈 절차 1번)
- [ ] 법적 문서 4종의 법률 검토 반영과 시행일 표기 (오픈 절차 2번)
- [ ] Standard 결제(PG)·계정·마이페이지 — Pages Functions + D1 단계에서 연동 (본편 제3부)
- [ ] 문의 폼 서버 접수(Functions) — 현재는 이메일 안내로 대체
- [ ] 서치콘솔·네이버 서치어드바이저 등록, OG 노출 확인 (오픈 절차 9번)

## 제작 단계 현황

| 단계 | 범위 | 상태 |
| --- | --- | --- |
| 1 | 디자인 시스템 · 공통 레이아웃 · 메인 페이지 · 배포 골격 | ✅ 완료 |
| 2 | 지수 체계 소개 + 지수 상세 8종 (10절 템플릿 · 스페시먼 4종) | ✅ 완료 |
| 3 | 3분 무료 진단(브라우저 내 계산·무저장) · 상품·가격 3면 · 신청 허브 | ✅ 완료 |
| 4 | 신뢰와 검증 4면 · 실적 · 운영사 · B2B | 예정 |
| 5 | 자료실(창간 5편) · FAQ · 문의 · 법적 문서 4종 초안 · 최종 검수 | ✅ 완료 |
| 6 | 기관급 강화 — 샘플 결과지(SRVI 풀샘플·인쇄 A4) · 진위 확인 · 용어집 · 데이터 카탈로그 · 개정 이력 · RSS · 글별 OG · FAQ 검색(25문) · 문서번호 체계 | ✅ 완료 |

전 35개 경로가 실페이지로 완성되어 있으며(스텁 0), 새 경로를 추가하면 빌드가
사이트맵까지 자동 갱신합니다. 신규 지수는 레지스트리 등록, 신규 글은 articles.js 등록으로 끝납니다.


## 운영 가이드 — 콘텐츠와 개정의 루틴

이 사이트는 "데이터 한 곳 → 여러 화면 자동 반영" 구조입니다. 자주 하게 될 작업의 손잡이는 다음과 같습니다.

**글 한 편 올리기** — `tools/data/articles.js`에 항목 하나 추가 → `node tools/og-articles.js`(OG 이미지 생성, sharp 필요·산출물은 커밋) → `tools/build.js`의 SITEMAP에 경로 한 줄 → `node tools/build.js` → 커밋·푸시. 자료실 목록·RSS·사이트맵·개별 페이지가 함께 갱신됩니다.

**지수 개정하기** — `tools/data/versions.js`에 새 버전 한 줄을 추가하면 Model Card와 개정 이력 페이지가 함께 갱신됩니다. 규칙: 무엇을 왜 바꿨는지 한 문장, 발행된 결과에는 소급하지 않음.

**새 지수 열기** — `tools/data/registry.js`의 status를 available로 바꾸고 `tools/data/index-content.js`에 상세 콘텐츠 객체를 채우면 카드·내비·상세·Model Card가 이어집니다.

**FAQ·용어 추가** — 각각 `tools/pages/faq.js`, `tools/pages/glossary.js`의 배열에 항목 추가. FAQ 총수 카피는 자동이 아니므로 히어로 문구의 숫자만 함께 조정하세요.

**방문 통계** — 배포 후 Cloudflare 대시보드에서 Web Analytics 토큰을 발급받아 `tools/partials/layout.js` 하단 주석의 스니펫을 해제하세요. 쿠키 없는 계측이라 무저장 원칙과 충돌하지 않습니다.

**정적 이후(본편) 로드맵** — 결제(토스페이먼츠)·접수 폼·마이페이지·진위 확인 조회는 Cloudflare Pages Functions + D1로 이 저장소 안에서 확장하는 것을 권합니다(`/functions` 디렉터리 추가 방식). 내부 운영 콘솔(smfi-console)과는 D1을 공유하거나 API로 연결해 케이스 데이터를 한 곳에 둡니다.
