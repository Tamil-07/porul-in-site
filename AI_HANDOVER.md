# Porul.in AI Handover and Operations Log

## 2026-09-24 - Current product update

Discovery pass: all 14 local indexable pages are covered by sitemap; npm run build now runs scripts/check-discovery.mjs automatically. Added WebPage/contact schema, explicit search/user crawler groups, head/footer sitemap discovery and "Created by Enmiya" footer backlink. Corrected noindex 404 canonical to /404.html. DISCOVERY-READINESS.md records scope, references, validation and live blockers. Live sitemap still lists 10 pages; nothing from this pass was deployed. Existing dependency audit warnings require a separate security assessment and tested toolchain upgrade.

Founder confirmed public WhatsApp: +91 89393 57690. src/data/contact.ts is the shared link source. Homepage/footer/GeM/enquiry paths now offer WhatsApp; the composer prepares a draft but sends nothing automatically. Email is optional and privacy copy covers the WhatsApp handoff. This supersedes earlier pending-number statements. Local only, not deployed.

Latest founder correction: Porul is an extended MSME back office, not a GeM-only brand. The homepage now starts with a general task enquiry, separates the available GeM offering from four broader needs under review, and keeps publication links and evidence-bearing reporting below. Generic enquiries hide/disable GeM status; specific GeM intents require it. Shared brand metadata, social card, navigation, footer and About are aligned. No services beyond confirmed capability, prices or WhatsApp number have been invented. The research/poll interpretation and supersession are recorded at the top of DECISIONS.md. No production deployment.

Correction validation: production build, 30 responsive checks, all 15 built pages and 494 internal links/assets passed. Six non-GeM enquiry categories, GeM-required status toggling and stale-status exclusion passed. Social card and desktop/mobile screenshots reviewed; local editorial images decode correctly. Preview remains at http://127.0.0.1:4325/.

The founder approved GeM services and an enquiry/search-readiness implementation. Shreepriya handles GeM work. The editorial-only boundary below is superseded for Porul's own GeM services, but not for supplier directories or editorial endorsements. See DECISIONS.md and GEM-LAUNCH.md for scope, implementation and launch checks. The new email composer requires the visitor to send the prepared message; it is not server-side form delivery. No production deployment is included yet.

Verification: final production build passed, 30 responsive checks across six routes passed, all 15 HTML pages had unique metadata and valid JSON-LD, and 442 internal links/assets resolved. Email preparation, validation, clipboard failure, no-JS fallback and mobile keyboard navigation passed. No messages were sent. The live HTTP URL still returns 200 and www returns 522; Cloudflare redirects remain a release task. Existing uncommitted editorial changes were preserved, with no blanket commit or push.

This is the living operational record for Porul.in. A future AI or developer should read this first, then read README.md, Porul_Website_Architecture.md, and DECISIONS.md.

Update this file whenever work changes the product, code, content model, visual system, deployment process, or editorial policy. Record meaningful outcomes and decisions; do not paste raw terminal output, credentials, access tokens, or private personal data.

## Canonical workspace

**The one production source of truth is:**

~~~
/Users/tamiliniyan/Documents/New project
~~~

**GitHub repository:** https://github.com/Tamil-07/porul-in-site

All future Porul.in design, code, content, images, research files, documentation, and deployment-related changes belong in this repository. Do not start a second Porul.in application or use a temporary preview folder as a production source.

### Non-canonical locations

- /Users/tamiliniyan/Documents/ChatGPT/Porul.in/ was used as temporary research and preview staging. It is not the production website.
- /Users/tamiliniyan/Documents/ChatGPT/Porul.in/PORUL-GITHUB-UPLOAD/ is a temporary browser-upload copy created on 2026-09-02. It is not a working source folder and should not receive future edits.
- /Users/tamiliniyan/Documents/Porul.in/Stories/ was the initial location of Orbit's supplied PDFs. Their repository copies live under research/stories/orbit-laser-cutting/.

## Product boundary

Porul.in is an editorial credibility and reference site for Tamil Nadu precision engineering. It informs and convenes; it does not broker, match, source, operate an RFQ flow, or become a supplier directory.

Key constraints:

- Publish narrative company stories, sector intelligence, and curated editorial work.
- Do not invent statistics, customers, capabilities, quotes, scale, or testimonials.
- Mark paid coverage as sponsored.
- Keep the site static, simple, fast, and low-maintenance.
- Keep public content separate from private research and working notes.

## Technical architecture

| Area | Current choice |
| --- | --- |
| Framework | Astro |
| Output | Static site |
| Hosting | Cloudflare Pages |
| Production domain | https://porul.in |
| Source control | GitHub |
| Content system | Markdown files in src/content/ |
| Fonts | Local .woff2 files in public/fonts/ |

### Local commands

Run these from the canonical workspace:

~~~
npm install
npm run dev
npm run build
~~~

npm run build must pass before any production push. A push to main is expected to trigger Cloudflare Pages. Confirm the Cloudflare Pages project remains connected to the GitHub repository, uses npm run build, and publishes the dist directory.

## Repository map

| Path | Responsibility |
| --- | --- |
| src/content/stories/ | Published company-story Markdown and story imagery |
| src/content/intelligence/ | Published intelligence Markdown |
| src/pages/stories/ | Story archive and detail-route templates |
| src/components/StoryCard.astro | Archive card presentation |
| src/styles/ | Shared brand tokens, local fonts, and global styling |
| public/ | Static public assets, including fonts and site-level OG image |
| research/ | Private source material and reporting evidence; never link these files publicly unless explicitly approved |
| DECISIONS.md | Durable architectural and product decisions |
| AI_HANDOVER.md | This ongoing execution and handover log |

## Editorial publishing workflow

1. Put the reported story Markdown and approved images under src/content/stories/.
2. Use frontmatter that matches src/content.config.ts; set draft: false only when the story is ready to publish.
3. Keep wording factual and attribute claims to supplied source material when reporting has not independently verified them.
4. Ensure the story has a real heroImage, meaningful heroImageAlt, title, dek, location, and reading time.
5. Run npm run build.
6. Confirm both the detail route and /stories/ archive are generated.
7. Record the publication below, commit, and push to main.

## Change log

### 2026-09-02 - First audit remediation batch implemented locally

**Outcome**

- Replaced "Request entry" with "Apply to The Room" across the header, homepage, and Room page.
- Added an explicit no-RFQ/vendor-registration/sourcing boundary and a four-question prefilled application email.
- Added a native mobile disclosure menu with every primary route, current-page state, Escape handling, and Tamil navigation; Tamil is also in the footer.
- Replaced the homepage prototype silhouette and invented tags with a clearly labeled, non-company AI-generated editorial still life at `src/assets/home-precision-still-life.png`.
- Darkened the spark token to meet AA contrast for its normal-text and button uses.
- Wired published story imagery into the homepage card.
- Added Google's official Preferred Sources deeplink to the sitewide footer without a third-party runtime script.

**Verification**

- `npm run build` passed and generated all 11 pages.
- Browser checks passed at 320px, 390px, and 1440px; the refined homepage has no horizontal overflow at 390px and its primary actions are visible in a 1440x900 first viewport.
- The Room mail link decodes to the approved subject, four questions, and boundary text.
- Deployment and live-domain verification are still pending; `AUDIT.md` reflects that status.

**Generated image record**

- Built-in image generation was used for a portrait editorial still life of anonymous precision-machined components, metal swarf, and a vernier caliper on a workshop bench.
- The prompt prohibited people, logos, text, company/location identifiers, unsafe machining, smoke, and claims that it represented a named company.

### 2026-09-02 - End-to-end audit baseline created

**Outcome**

- Added `AUDIT.md` as the prioritized product, editorial, accessibility, SEO/GEO, technical, and operations improvement register.
- Audited both the live site and canonical repository; no public-site remediation was included in this documentation-only pass.
- Ranked the first work around Room application clarity, mobile navigation, canonical domain behavior, crawler policy, and editorial evidence.

**Verification**

- The production build passed before the audit was written.
- Generated routes, internal links/assets, metadata, live HTTP behavior, responsive journeys, crawler directives, content schemas, and published article evidence were checked.

**Next action**

Begin with Batch 1 in `AUDIT.md` after founder review. Keep each batch independently reviewable and verify it on the live domain after deployment.

### 2026-09-02 - Orbit Laser Cutting becomes the first published story

**Outcome**

- Added published story route: https://porul.in/stories/orbit-laser-cutting/
- Added Orbit to the /stories/ archive.
- Removed the temporary wording “PORUL STORIES · 01” from the earlier standalone preview; the production Astro site uses Porul.in’s normal navigation and footer.

**Production source**

- Story: src/content/stories/orbit-laser-cutting.md
- Images: src/content/stories/orbit-laser-cutting/
- Evidence: research/stories/orbit-laser-cutting/
- Archive-card enhancement: src/components/StoryCard.astro
- Archive data wiring: src/pages/stories/index.astro

**Editorial basis**

The story is based on the company profile and ISO 9001:2015 certificate supplied by Orbit Laser Cutting. It deliberately distinguishes company-supplied descriptions from independent reporting. It does not present the profile as a directory listing or sourcing offer.

**Technical verification**

npm run build completed successfully on 2026-09-02 and generated both /stories/ and /stories/orbit-laser-cutting/.

**Future maintenance note**

The story card now accepts an optional hero image. Future published stories should provide one so the archive does not fall back to the generic placeholder illustration.

### 2026-09-02 - One-repository operating rule

**Decision:** Treat /Users/tamiliniyan/Documents/New project and its GitHub repository as the only canonical Porul.in workspace.

**Why:** Splitting source files between temporary projects and previews makes handover, deployment, and future AI maintenance unreliable.

**Rejected alternative:** Continuing to create standalone preview sites or content folders outside the repository. These may be useful for brief experiments, but they must never become an alternate production source.

## Future AI checklist

Before changing anything:

1. Read this file, README.md, Porul_Website_Architecture.md, and DECISIONS.md.
2. Check git status and preserve unrelated user changes.
3. Work only in the canonical workspace.
4. Respect the Porul.in editorial boundary.
5. Build before handing off.
6. Add a dated entry to this log describing the outcome, important decision, verification, and any remaining follow-up.
