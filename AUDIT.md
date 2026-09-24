# Porul.in Product, Editorial, SEO, and Technical Audit

## 2026-09-24 service launch update

The founder-approved GeM expansion supersedes the editorial-only prohibition for Porul's own services. See GEM-LAUNCH.md and DECISIONS.md. New service/guide/enquiry/privacy pages, homepage positioning, Service/FAQ schema, explicit OAI-SearchBot access and sitemap compatibility redirect are implemented locally. Production build, 30 responsive checks, all 15 HTML page metadata checks and 442 internal links/assets passed. The email composer requires the visitor to send the email; it is not server-side delivery.

Live recheck: /robots.txt no longer has the conflicting managed preamble described in P0-04; /sitemap-index.xml returns 200. P0-03 remains open: HTTP returns 200, www HTTPS returns 522. New pages are not deployed and real mailbox delivery, account-level crawler/WAF controls and webmaster submissions remain unverified.

**Audit date:** 2026-09-02  
**Audited site:** https://porul.in  
**Canonical repository:** `/Users/tamiliniyan/Documents/New project`  
**Audit status:** Baseline complete; Batch 1 is implemented locally and awaits deployment/live verification.

This is the working improvement register for Porul.in. It audits the live site and the canonical repository together so a fix is not considered complete merely because it exists in one place. The priority order protects the product boundary first: Porul.in informs and convenes; it does not source, match, broker, fulfil, or become a supplier directory.

## Executive Summary

Porul.in has a sound technical base. It is a small static Astro site with self-hosted fonts, almost no first-party JavaScript, unique page metadata, valid canonical URLs, a working XML sitemap index, RSS, structured data, a real 404 response, and no broken internal links in the current build. The visual language is distinctive and the article typography is readable.

The site is not yet ready to compound trust efficiently. The most consequential issue is product comprehension: **"Request entry" has already been interpreted as a supplier or purchasing request**, exactly the category confusion the Porul/Menerix boundary is meant to prevent. Mobile visitors lose the primary navigation, including the Tamil route. At the edge, HTTP serves a duplicate 200 response and `www.porul.in` fails with a 522 rather than redirecting. Cloudflare also prepends AI-crawler rules that contradict the repository's `robots.txt`.

The editorial system needs a trust pass before promotion. Sources exist in frontmatter but are not shown to readers, raw citation placeholders appear in an article, article dates and bylines are not visible, and the Orbit story includes contact and capability-detail patterns that read like a supplier profile. These are repairable without changing the site's architecture.

### Directional scorecard

Scores are a baseline for comparing future audits, not an industry certification.

| Area | Score | What holds it back |
| --- | ---: | --- |
| Product intent and journeys | 58/100 | Ambiguous Room entry language; weak application ritual |
| Mobile UX and navigation | 45/100 | Primary navigation disappears below 860px |
| Accessibility | 72/100 | Accent contrast failures; missing mobile nav; minor image-alt encoding |
| Editorial trust and E-E-A-T | 52/100 | Hidden sources, no visible dates/bylines, profile-like story details |
| Technical SEO | 76/100 | HTTP/www edge failures; no sitemap `lastmod`; missing favicon |
| AI/search answer readiness | 48/100 | Contradictory crawler policy; evidence not visible in articles |
| Performance and delivery | 86/100 | Strong static base; cache policy and hero image can improve |
| Operations and maintainability | 60/100 | Documentation drift, no CI/check scripts, dirty production branch |
| **Overall baseline** | **62/100** | Strong foundation with several high-impact trust and routing gaps |

## What Was Tested

- Live desktop and 390px mobile journeys across Home, Stories, Intelligence, Tamil, The Room, About, Sponsor, article detail, and 404 surfaces.
- Navigation availability, CTA meaning, responsive layout, headings, image alternatives, focus styling, motion preferences, typography, and color contrast.
- Titles, descriptions, canonicals, Open Graph/Twitter tags, Organization/WebSite/Article/Breadcrumb JSON-LD, RSS, robots directives, sitemap output, and response status codes.
- HTTP/HTTPS and apex/`www` behavior, redirect consistency, response headers, and asset caching.
- Astro content schemas, collection filtering, detail templates, article frontmatter, source rendering, and product-boundary compliance.
- Production build, generated route inventory, internal links/assets, duplicate metadata, duplicate IDs, H1 counts, bundle size, dependency audit, and repository state.
- A sample fact check of both intelligence articles against official government sources.

## Priority Definitions

| Priority | Meaning |
| --- | --- |
| **P0** | Fix before active promotion or accepting more Room applications. It affects product meaning, trust, discoverability, or domain availability. |
| **P1** | Fix in the next two improvement batches. It materially improves reader confidence, accessibility, or maintainability. |
| **P2** | Useful compounding improvement after the P0/P1 foundation is stable. |

## P0 Findings

### P0-01 — "Request entry" is being mistaken for a sourcing or supplier-registration action

**Status:** Implemented locally on 2026-09-02; founder copy review and live enquiry-quality verification remain.  
**Surface:** Live and local  
**Evidence:** The phrase appears in the header, hero, homepage Room panel, and Room page. The Room email link supplies only the subject `Porul.in Room entry request`. A company responded with, "Please share your requirements in stainless steel and copper material," demonstrating that the CTA was understood as a purchasing lead.

**Why it matters:** This is not just copy polish. It creates exactly the sourcing expectation Porul.in must avoid and spends founder time correcting unsuitable enquiries.

**Recommended fix:**

1. Rename every public CTA to **"Apply to The Room"**.
2. Place a short boundary next to the CTA: **"For procurement leaders and precision-engineering operators. Not an RFQ, sourcing request, vendor registration, or sales enquiry."**
3. Prefill the email with four application prompts: name and role; company; connection to Tamil Nadu precision engineering; why the Room is useful to them.
4. Change the subject to `Application to The Room at Porul.in`.
5. Add a small contact split: Room applications versus editorial tips/corrections, both at `hello@porul.in` with different subjects.

**Acceptance test:** A first-time user shown only the header and Room CTA can correctly state that it is an application to a reviewed editorial network, not a request for suppliers or materials.

**Owner / effort:** Founder approves wording; Codex implements. Small.

### P0-02 — Mobile visitors have no primary navigation

**Status:** Implemented locally on 2026-09-02; live verification remains.  
**Surface:** Live and local  
**Evidence:** `src/components/Nav.astro` hides `.nav__links` below 860px and provides no menu replacement. Only the logo and ambiguous Room CTA remain. The footer omits the Tamil link, so `/ta/` has no mobile navigation path.

**Why it matters:** Most new visitors will arrive on mobile or on an article. They cannot reliably discover Stories, Intelligence, About, The Room, or Tamil.

**Recommended fix:** Add an accessible compact menu button with an inline disclosure panel. It must work with keyboard and touch, expose all primary links including Tamil, close on Escape and link selection, preserve focus, and indicate the current page. Add Tamil to the footer as a permanent fallback.

**Acceptance test:** At 320px, 390px, and 768px, all routes are reachable without horizontal scrolling; the menu is usable by keyboard; focus returns to the menu button after closing; JavaScript-disabled behavior still exposes a usable navigation fallback.

**Owner / effort:** Codex. Medium.

### P0-03 — The domain has broken canonical edge behavior

**Surface:** Live infrastructure  
**Evidence:** `http://porul.in/` returns `200` instead of redirecting to HTTPS. `https://www.porul.in/` returns Cloudflare `522` instead of redirecting to the apex. The canonical tags point to HTTPS apex, but crawlers can still encounter separate or failing host/protocol variants.

**Why it matters:** This splits signals, weakens security expectations, creates a broken brand URL, and is a plausible contributor to Bing's duplicate-title and duplicate-description reports.

**Recommended fix:**

1. Enable a permanent HTTP-to-HTTPS redirect at Cloudflare.
2. Add/proxy the `www` DNS record and permanently redirect `www.porul.in/*` to `https://porul.in/$1`.
3. Keep one trailing-slash policy and test all route variants.
4. Submit only the HTTPS apex property and sitemap index in Bing and Google webmaster tools.

**Acceptance test:** HTTP and `www` variants return one 301/308 hop to the matching HTTPS-apex URL; the destination returns 200; no variant returns 522.

**Owner / effort:** Founder supplies Cloudflare access; Codex configures and verifies. Small.

### P0-04 — Live AI-crawler policy contradicts the repository and conflates search with training

**Surface:** Live infrastructure and local  
**Evidence:** The repository allows GPTBot, PerplexityBot, ClaudeBot, and Google-Extended. Cloudflare prepends managed rules that disallow several of those agents and adds `Content-Signal: search=yes,ai-train=no,use=reference`. The source file does not explicitly name `OAI-SearchBot`, which OpenAI identifies as the crawler used for ChatGPT search visibility; GPTBot is separately associated with model training.

**Why it matters:** The live policy is difficult to reason about, may block desired discovery, and does not express the founder's likely intent cleanly: allow search/citation while choosing separately whether content may be used for training.

**Recommended fix:** Decide the policy explicitly. A sensible default is to allow normal search and answer-engine discovery, including `OAI-SearchBot` and Perplexity's search crawler, while separately permitting or blocking training crawlers according to founder preference. Disable or reconfigure Cloudflare Managed `robots.txt` so it does not contradict the committed file, then verify Cloudflare AI Crawl Control/WAF behavior as well as the text file.

**Acceptance test:** The live `robots.txt` has one unambiguous rule per intended crawler; `OAI-SearchBot` can fetch public pages; training-bot behavior matches the written policy; `/admin/` remains disallowed.

**Sources:** [OpenAI publishers and developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq), [Cloudflare Managed robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/)

**Owner / effort:** Founder decides training preference; Codex implements and verifies. Small.

### P0-05 — Editorial evidence is stored but not presented reliably

**Status:** Implemented locally on 2026-09-03; live verification remains.

**Surface:** Live and local  
**Evidence:** Intelligence frontmatter contains `sources`, but the detail template never renders a source list. The PLI article exposes raw `<cite index="...">` elements with internal-looking identifiers and no links. Neither intelligence article has visible external references in its body.

**Why it matters:** Policy and finance-adjacent content needs a visible evidence trail. Hidden sources reduce reader trust, make corrections harder, and weaken the page's usefulness to search and answer engines.

**Recommended fix:** Build a reusable `Sources` component that renders numbered, descriptive links from frontmatter after the article and before the end note. Replace every raw citation placeholder with an ordinary linked footnote or clearly attributed sentence. Require an official primary source for scheme limits, dates, fees, and eligibility; add a secondary source only when it contributes analysis.

**Acceptance test:** Every factual intelligence article shows a visible Sources section; every inline citation maps to a working source; no raw citation-system markup remains in HTML or RSS.

**Owner / effort:** Founder/editor validates source relevance; Codex implements. Medium.

### P0-06 — The first company story crosses into supplier-profile and lead-generation territory

**Status:** Implemented locally on 2026-09-03; founder editorial review and live verification remain.

**Surface:** Live and local content  
**Evidence:** The Orbit story includes detailed machine dimensions/capacity, capability and product lists, named customer claims, a full business address, and a direct business email. In combination, the page can be used like a supplier capability sheet despite its editorial framing.

**Why it matters:** The repository's hard rule forbids supplier listings, capability tables, contact-detail profiles, matching, and lead generation. The first story establishes the editorial precedent for every future company feature.

**Recommended fix:** Re-edit the article as a reported narrative. Keep only operational details needed to support the story's central idea; remove direct business contact details, postal address, catalogue-like lists, and unverified customer names. Link to the company's public site once only if editorially useful. Add explicit attribution where a fact comes from company-supplied material and record what was independently checked.

**Acceptance test:** A reader cannot use the article as a substitute vendor profile; the story still explains why the company matters; all material claims have an attribution or verification note.

**Owner / effort:** Founder makes editorial call; Codex edits after approval. Medium.

### P0-07 — The PLI article needs a publication-date freshness review

**Status:** Implemented locally on 2026-09-03 using official releases current through 17 August 2026; founder editorial review and live verification remain.

**Surface:** Live and local content  
**Evidence:** The article is dated July 2026 but uses an older March 2024 auto-sector investment snapshot and says PLI is "expected to phase out by mid-2026." It is now September 2026. Official releases published later contain newer program and sector figures. The exact claim that ECMS covers the described precision mechanical parts also needs a visible link to the relevant guideline section.

**Why it matters:** Time-sensitive policy analysis can become misleading even when the original numbers were once correct. No visible update date currently warns readers.

**Recommended fix:** Re-report the time-sensitive paragraphs from current official releases, change future-tense phrasing to confirmed status, display an `updatedDate`, and add a short "What changed since publication" note when material facts change.

**Acceptance test:** Every dated policy claim is current as of the visible update date and linked to an official source; stale forward-looking language is removed.

**Sources:** [PIB PLI updates](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2246089&lang=1&reg=3), [MeitY ECMS overview](https://www.meity.gov.in/offerings/schemes-and-services/details/electronics-component-manufacturing-scheme-UTM1IjMtQWa)

**Owner / effort:** Founder/editor verifies interpretation; Codex updates and marks dates. Medium.

## P1 Findings

### P1-01 — Articles omit visible dates, update dates, and bylines

**Status:** Implemented locally on 2026-09-03; live verification remains. The founder chose the institutional author `Porul.in` with role `Editorial` and rejected an individual byline. Visible sourcing, verification limits, dates, sponsorship disclosure, standards, and corrections now provide the compensating accountability apparatus.

Article JSON-LD contained publication dates, but the page header showed only category/location and reading time. There was no author schema field or visible byline. The founder decision above supersedes the audit's earlier recommendation to use an individual identity.

**Acceptance test:** Readers and crawlers see consistent author, published date, and modified date in HTML and Article JSON-LD.

### P1-02 — `keyTakeaway` is silently discarded by the content schema

Both intelligence articles define `keyTakeaway`, but `src/content.config.ts` does not. Zod strips the undeclared field, so it cannot render. Add it to the intelligence/Tamil schema and present it as a concise editorial summary near the opening, or remove it from content if the founder does not want that pattern.

**Acceptance test:** Collection data and rendered pages contain the approved takeaway; schema validation catches a missing or malformed value according to the chosen rule.

### P1-03 — The About page does not establish accountable expertise

**Status:** Implemented locally on 2026-09-03 under the founder-approved institutional authorship model; live verification remains.

The page says Porul.in is founder-led but does not name the founder, explain relevant experience, identify the editorial role, or provide reporting/corrections standards. Add a restrained founder block, editorial mission, sourcing policy, sponsorship disclosure, corrections path, and contact link. This is an accountability page, not a personal-brand biography.

**Acceptance test:** A procurement reader can answer who is responsible, why they are qualified to cover the sector, how claims are sourced, how sponsored work is labeled, and how to request a correction.

### P1-04 — The homepage hero still contains prototype instructions presented as production copy

**Status:** Implemented locally on 2026-09-02; live verification remains.  
The silhouette is explicitly a placeholder, the tags state specific places/capabilities not tied to a real subject, and the visible caption says, "Photography: real Tamil Nadu shop owners & machinists — treated boldly." On mobile, the image appears before the value proposition after animation settles.

Replace it with an approved real editorial image or a clearly non-specific brand texture that makes no company claim. Remove the implementation-note caption and invented location/capability tags. On mobile, place the headline and primary CTA before media.

**Acceptance test:** No visible placeholder/instructional copy remains; all specific claims belong to the depicted subject; the mobile first screen communicates what Porul.in is before decorative media.

### P1-05 — Brand orange fails contrast in several small-text uses

**Status:** Implemented locally on 2026-09-02; live verification remains.  
`#F0420D` on `#F7F6F2` is approximately 3.54:1, below WCAG AA's 4.5:1 threshold for normal text. White on the same orange is approximately 3.83:1. The failing combinations affect small kickers, links, and hover/button states.

Keep the bright spark for non-text accents, but introduce a darker accessible text/action orange. Validate default, hover, focus, visited, and dark-panel variants.

**Acceptance test:** All normal text meets 4.5:1 and large text/non-text controls meet 3:1 in every state.

### P1-06 — Security response headers are absent

Live HTML does not send HSTS, Content-Security-Policy, X-Content-Type-Options, Referrer-Policy, or Permissions-Policy. Add a documented Cloudflare Pages `_headers` policy. Start CSP in report-only or with a tested narrow policy because Cloudflare Web Analytics currently injects a third-party script.

**Acceptance test:** Security-header checks pass without breaking images, fonts, JSON-LD, analytics, mail links, or navigation.

### P1-07 — Hashed assets are forced to revalidate on every visit

`/_astro/` assets, fonts, and the static OG image currently return `cache-control: public, max-age=0, must-revalidate`. Astro asset filenames are content-hashed and can safely use long immutable caching. Add route-specific cache headers; keep HTML short-lived/revalidated.

**Acceptance test:** Hashed assets return `public, max-age=31536000, immutable`; HTML remains deploy-safe; a repeat visit transfers fewer bytes.

### P1-08 — The site has no favicon and uses the social card as its Organization logo

`/favicon.ico` returns 404. Organization JSON-LD points its `logo` field to the 1200x630 social card rather than a dedicated square logo. Add SVG/PNG/favicon assets and reference an appropriate square identity mark in schema.

**Acceptance test:** Browser tabs display the mark, favicon requests return 200, and the schema logo is crawlable and suitably proportioned.

### P1-09 — The homepage does not pass the story image to `StoryCard`

**Status:** Implemented locally on 2026-09-02; live verification remains.  
The local archive has been enhanced to pass `heroImage`, but `src/pages/index.astro` still omits it. The live homepage therefore shows a generic silhouette for the published Orbit story.

**Acceptance test:** The homepage and Stories archive use the same approved image and alt text, with an honest fallback only for entries that truly have no image.

### P1-10 — Apostrophes in Markdown image alt text are double-escaped

Orbit body-image alternatives expose literal `&#x27;` text in the accessibility tree. Trace the Markdown/image pipeline and ensure alt strings are escaped exactly once.

**Acceptance test:** Browser accessibility output reads natural apostrophes and all images retain meaningful alternatives.

### P1-11 — Documentation describes mutually incompatible architectures

`Porul_Website_Architecture.md` says production content comes from headless WordPress and Tamil lives only on `blog.porul.in`. The actual site uses Git-backed Astro collections and has `/ta/`. `README.md` and `EDITOR-GUIDE.md` still say only Stage 1 exists. `AI_HANDOVER.md` describes the current system most accurately.

Choose and document the current architecture as the source of truth. Mark the old WordPress proposal as superseded instead of leaving instructions that a future maintainer may follow.

**Acceptance test:** README, architecture, editor guide, handover, code, and deployment instructions agree on content source, routes, publication steps, and stage status.

### P1-12 — Production provenance is fragile

The canonical workspace is on `main` with uncommitted changes and untracked published content/research. Some of that content is already live, so local Git state and production are not clearly traceable to one commit. Reconcile the live deployment with GitHub, commit approved work in coherent units, and use short-lived `codex/*` branches for future changes.

**Acceptance test:** The live deployment identifies a Git commit; the canonical workspace is clean after approved work; private research remains excluded from public build output.

## P2 Findings

### P2-01 — Sitemap compatibility and freshness signals can improve

`/sitemap-index.xml` and `/sitemap-0.xml` are valid and current, but `/sitemap.xml` returns 404 and entries have no `<lastmod>`. Keep the index as canonical, add a compatibility redirect from `/sitemap.xml`, and emit truthful last-modified values from content. Never use build time as a fake update timestamp.

**Source:** [Bing sitemap discovery guidance](https://blogs.bing.com/webmaster/July-2025/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search)

### P2-02 — Every page shares one generic social image

The static launch image is a documented deferral and valid fallback. Generate article-specific OG images once the content system is stable, using title, section, date, and Porul identity. Avoid build complexity until P0/P1 items are complete.

### P2-03 — Detail pages have weak recirculation

Articles end with the boundary note and footer, with no related story/intelligence link, previous/next item, or section return. Add restrained, editorially selected recirculation rather than engagement widgets.

### P2-04 — Analytics and privacy handling are undocumented

Cloudflare Web Analytics injects the only live third-party script. Decide which minimal metrics matter, document the service and retention posture, and add a short privacy page if visitor data is processed. Do not add a consent banner unless the chosen implementation and applicable rules require it.

### P2-05 — The build toolchain needs a maintenance policy

`npm audit --omit=dev` reports seven advisories in the Astro/build dependency graph (one low, six high). The output is static, which reduces production runtime exposure, but the build pipeline still parses content and images. Apply compatible patches first, test the current Astro 5 line, and plan a separately tested major upgrade rather than running a blind forced upgrade.

### P2-06 — There is no automated quality gate

The package has build/dev scripts only. Add `astro check`, a generated-link/asset audit, content-schema validation, and a small CI workflow. Include a test that rejects raw `<cite index>` markup, public research files, empty article alt text, and drafts in generated routes.

### P2-07 — Image delivery can improve

The build is under 1 MB and body images are optimized, but Orbit's hero remains a roughly 236 KB PNG served through a plain image path. Move all editorial hero images through Astro's image pipeline, generate AVIF/WebP, set dimensions, and choose eager/high-priority loading only for true above-the-fold images.

### P2-08 — Tamil is technically present but not yet a complete editorial surface

The route has an intentionally honest empty state, but its description is only 28 characters and it disappears from mobile navigation. Before publishing Tamil work, define Tamil editorial ownership, visible date/byline/source patterns, translation/original-language labeling, and `hreflang` only where genuine equivalents exist.

### P2-09 — Intelligence fee wording needs tighter attribution

The CGTMSE article's main ceiling and annual-guarantee-fee slabs align with current official material. However, the statement that banks "routinely pass" the fee to borrowers is stronger than the official scheme wording, which says passing it on is at the lender's discretion. Rephrase as a possibility, attribute observed practice if retained, and show the official source.

**Sources:** [CGTMSE circulars](https://cgtmse.in/Circulars), [CGTMSE Annual Guarantee Fee](https://www.cgtmse.in/Home/VS/98), [DC MSME scheme guidelines](https://www.dcmsme.gov.in/CLCS_TUS_Scheme/Credit_Guarantee_Scheme/Scheme_Guidelines.aspx)

## What Is Already Working

- The Astro build succeeds and currently generates 11 HTML pages plus RSS and sitemap output.
- The static output is roughly 1 MB and source templates ship no application JavaScript.
- All generated pages have one H1, unique titles/descriptions, valid canonicals, no duplicate IDs, and no broken internal links or assets in the build audit.
- Draft collection entries do not render, and empty states do not invent scale.
- Organization and WebSite JSON-LD are sitewide; Article and BreadcrumbList schemas exist on detail pages.
- The live sitemap index contains current published URLs, and `robots.txt` points to it.
- Self-hosted fonts, reduced-motion handling, a skip link, visible focus rules, and a real 404 page provide a good accessibility/performance base.
- The product boundary is stated repeatedly in public copy and internal documentation, even though some implementation details need to align with it.
- Private reporting PDFs remain outside `public/` and are not copied into the static build.

## Recommended Improvement Sequence

Each batch should be small enough to review, deploy, verify live, and roll back independently.

### Batch 1 — Clarify the product and restore mobile discovery

**Scope:** P0-01, P0-02, P1-04, P1-05, P1-09. Implemented locally on 2026-09-02; deployment and live verification remain.  
**Outcome:** Visitors understand Porul.in and can navigate it on every device.  
**Metric:** Wrong-intent Room emails fall to zero; all primary routes pass 320/390/768/1440px navigation checks.  
**Release gate:** Founder approves the Room application language and replacement hero treatment.

### Batch 2 — Repair domain and crawler infrastructure

**Scope:** P0-03, P0-04, P1-06, P1-07, P1-08, P2-01.  
**Outcome:** One canonical domain, intentional crawler access, stronger delivery/security defaults.  
**Metric:** All host/protocol variants redirect correctly; crawler fetch tests and header checks pass; Bing and Google accept the sitemap.

### Batch 3 — Raise editorial trust before further publishing

**Scope:** P0-05, P0-06, P0-07, P1-01, P1-02, P1-03, P1-10, P2-09.  
**Outcome:** Every published claim has accountable authorship, dates, attribution, and visible sources.  
**Metric:** Zero raw citations; 100% of published articles pass the editorial checklist; no direct supplier-contact profile pattern remains.

### Batch 4 — Make maintenance boring and traceable

**Scope:** P1-11, P1-12, P2-05, P2-06.  
**Outcome:** The repository accurately explains itself and rejects common regressions before deployment.  
**Metric:** Clean approved branch, traceable deployment commit, passing build/check/link/content CI.

### Batch 5 — Add compounding discovery and publishing quality

**Scope:** P2-02, P2-03, P2-04, P2-07, P2-08.  
**Outcome:** Better article sharing, recirculation, image delivery, privacy clarity, and Tamil readiness without adding a content treadmill.

## Daily Operating Rhythm

1. Select one batch item with a founder-visible outcome; do not mix unrelated redesign work into it.
2. Record the baseline evidence and the expected acceptance test before editing.
3. Implement in the canonical repository on a short-lived branch while preserving unrelated work.
4. Run build, type/content checks, link audit, and responsive browser verification.
5. Deploy and verify the live response, not only the local preview.
6. Update this register: mark the finding fixed, link the commit, record the live verification date, and note any regression or follow-up.
7. Review webmaster coverage, Room enquiry quality, top landing pages, and content freshness weekly rather than chasing daily traffic volume.

## Suggested Metrics

Porul.in should optimize for qualified trust, not raw traffic.

| Signal | Why it matters | Cadence |
| --- | --- | --- |
| Correct-intent Room applications | Tests whether product language works | Per enquiry |
| Editorial tips/correction requests | Tests accountability and sector relevance | Monthly |
| Story/intelligence search impressions | Measures reference value | Weekly trend |
| Indexed canonical URLs | Detects technical discovery failures | Weekly |
| Returning readers to article pages | Indicates durable usefulness | Monthly |
| Article source-link usage | Indicates evidence is helping readers | Monthly, if measured |
| Mobile navigation success | Protects the dominant entry context | Every release |
| Content freshness review due/complete | Prevents policy articles silently aging | Monthly |

Do not add vanity member counts, supplier counts, engagement popups, or conversion pressure to improve these numbers.

## Verification Baseline

The following checks passed on 2026-09-02 before any remediation:

- `npm run build`
- 11 generated HTML pages inspected
- no broken generated internal link or asset reference
- one H1 per page
- no duplicate IDs
- no empty or missing image alt attribute in generated HTML
- no duplicate title or meta description in generated HTML
- live sitemap index and RSS return 200
- unknown live route returns 404

The following checks failed or need action:

- HTTP-to-HTTPS redirect
- `www` host availability/redirect
- mobile primary navigation
- text/action contrast for brand orange
- crawler-policy consistency
- favicon and dedicated Organization logo
- security and long-lived asset cache headers
- clean, traceable repository/deployment state

## Audit Limits

- No private analytics, Bing/Google account, Cloudflare dashboard, DNS zone, or deployment logs were available. Edge recommendations are based on public responses and repository configuration.
- No real-user interviews or task-completion study was conducted. The received supplier email provides one strong observed failure case for CTA comprehension.
- Performance conclusions are based on static output, asset inventory, response headers, and browser inspection rather than a lab Lighthouse trace; browser performance APIs were not available in the audit environment.
- Editorial fact checking was a targeted sample, not a full legal, financial, or technical verification of every sentence.

## Change Register

| ID | Status | Commit | Live verified | Notes |
| --- | --- | --- | --- | --- |
| P0-01 | Implemented locally | — | Pending | CTA renamed, boundary added, structured application email added |
| P0-02 | Implemented locally | — | Pending | Mobile disclosure menu tested at 320px and 390px; Tamil added to footer |
| P0-05 | Implemented locally | — | Pending | `SourceList` renders frontmatter sources; raw citation markup removed from source and build output |
| P0-06 | Implemented locally | — | Pending | Orbit re-edited as a narrative; contact/address/customer/capability-list pattern removed; supplied material and verification limits labelled |
| P0-07 | Implemented locally | — | Pending | PLI/ECMS article refreshed from official 2026 sources, narrowed, and marked updated 2026-09-03 |
| P1-01 | Implemented locally | — | Pending | Institutional byline, Editorial role, publish date, and optional update date render on every article |
| P1-02 | Implemented locally | — | Pending | `keyTakeaway` is now schema-backed and rendered on Intelligence/Tamil detail templates |
| P1-03 | Implemented locally | — | Pending | About exposes sourcing, verification, supplied-material, sponsorship, and correction standards without inventing a persona |
| P1-04 | Superseded locally | — | Pending | Approved homepage now uses the real lead-story image with a supplied-material crop and label; prior generated still-life treatment is no longer used |
| P1-05 | Implemented locally | — | Pending | Accessible spark token now clears AA for normal text on paper and white button text |
| P1-09 | Implemented locally | — | Pending | Homepage lead uses the published story image and alt text with intrinsic responsive output |
| G-01 | Implemented locally | — | Pending | Google Preferred Sources deeplink added to the sitewide footer |
| G-02 | Implemented locally | — | Pending | Precision-editorial homepage, semantic tokens, evidence trace, honest Tamil state, secondary Room, and final reading conversion verified at 320/375/390/768/1024/1150/1440px |
| R-01 | External configuration pending | — | No | `blog.porul.in` must be redirected to `/ta/` in Cloudflare/DNS; this repository cannot verify the edge rule |
| Remaining findings | Open | — | — | Continue in the documented batch order after review and live verification |

### 2026-09-03 local verification note

- Clean `npm run build`: 11 public HTML pages plus RSS and sitemap output; no content-loader warning.
- Generated audit: 261 internal links checked, no missing targets, duplicate IDs, missing H1s, or empty image alt attributes.
- Browser checks: primary lead-story journey, mobile menu open/Escape/focus return, evidence disclosure, About standards, Room prefilled application, and PLI source list.
- Responsive checks: no horizontal overflow at 320, 375, 390, 768, 1024, 1150, or 1440 CSS pixels; compact and expanded navigation switch at the documented boundary.
- Contrast spot checks: copper on paper 4.69:1, white on copper 5.08:1, muted text on paper 5.78:1, and inverse metadata on ink 9.19:1.
- Browser console: no warnings or errors on the tested Home, Story, Intelligence, About, Tamil, and Room journeys.
