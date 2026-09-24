# Porul.in Agent Instructions

## Latest founder correction: back-office identity, 2026-09-24

The homepage leads with Porul as an extended back office for Tamil Nadu MSMEs, not a GeM-only business. This supersedes the primary homepage GeM action described below. Keep GeM as the first available service, with Shreepriya handling portal work and dedicated search/service pages intact. Other business-presentation, certification, exhibition and compliance needs are enquiry categories subject to capability review, not advertised delivery commitments. Keep the broader brand consistent across shared metadata and contact paths. The WhatsApp spending poll is exploratory, multi-select evidence, not a validated demand ranking. See the latest DECISIONS.md entry.

## Founder-approved service expansion: 2026-09-24

The founder explicitly approved GeM services and asked to prepare Porul.in to capture enquiries and improve SEO/answer-engine discovery. This supersedes the editorial-only boundary and homepage reading priority below **only for Porul's own GeM services**. Shreepriya handles GeM work. Service pages, enquiry flows and a primary homepage GeM action are authorised. Tamil Nadu tender enquiries may be collected for scope review; delivery expertise is not yet confirmed. Do not publish pilot prices, language-support promises, qualifications, testimonials or timelines without evidence. Editorial independence, existing stories, Room boundaries and the prohibition on supplier marketplaces remain in force. See the 2026-09-24 entry in DECISIONS.md and GEM-LAUNCH.md.

These instructions apply to the canonical Porul.in repository at `/Users/tamiliniyan/Documents/New project`.

## Read order

Before changing product, content, or interface code, read:

1. `AGENTS.md`
2. `DESIGN.md`
3. `CONTENT.md`
4. `DECISIONS.md`
5. `AUDIT.md` for the current improvement register
6. `Porul_Website_Architecture.md` for historical architecture context

When those files disagree, prefer the current repository and newer dated decisions. Do not silently resolve a product contradiction in code; document it or ask the founder.

## Canonical source and current stage gate

- This repository is the only production source of truth.
- Folders under `/Users/tamiliniyan/Documents/ChatGPT/Porul.in/` are staging or historical copies, not implementation targets.
- The site is currently Astro with static output and Markdown content collections.
- The older WordPress content-flow proposal in `Porul_Website_Architecture.md` is not implemented and is not permission to add WordPress.
- The founder approved the precision-editorial landing direction and Phase 1 implementation on 2026-09-03. Future landing changes must preserve the decisions below rather than reopening them by default.

## Approved landing and editorial decisions

- The primary homepage audience is procurement and manufacturing readers. Precision-shop owners and operators are a close secondary audience served through Stories and Tamil.
- The homepage leads with published work. Its one dominant action is reading the lead story; “Explore Stories” is secondary, and The Room is not a primary homepage action.
- Published articles use the institutional byline `Porul.in` and role `Editorial`. Do not add an individual name, invented newsroom persona, or expertise claim.
- Compensate for the institutional byline with visible sources, company-supplied labels, verification limits, publication/update dates, sponsorship disclosure, editorial standards, and a corrections path.
- Tamil is an active first-class section at `/ta/`. It must show an honest empty state until reviewed Tamil work is published. `blog.porul.in` should redirect to `/ta/` at the edge; do not treat Tamil as external or forthcoming.
- The Room is a small, reviewed room for people working in Tamil Nadu CNC and precision engineering. The only approved member benefits are a weekly digest and early access to Porul.in sector intelligence before public publication.
- Preserve The Room’s current application boundary and four prefilled questions. Do not promise supplier spotlights, buyer introductions, sourcing help, RFQ access, member counts, or activity levels.

## Product boundary

Porul.in is an independent editorial credibility and reference publication for Tamil Nadu precision engineering. It may inform and convene. It must not become a directory, sourcing desk, vendor-registration portal, RFQ flow, marketplace, matching service, lead-generation product, or capacity board.

Never add:

- searchable or filterable supplier listings;
- capability tables intended to help buyers select a vendor;
- quote, match, source, broker, or fulfilment flows;
- invented scale, testimonials, customers, statistics, quotes, or research;
- undisclosed sponsored coverage;
- daily-news mechanics, engagement pressure, or fake urgency;
- public references to private business strategy or products unless the founder explicitly approves them.

## Evidence and claims

Keep three categories separate in plans and handoffs:

- **Repository evidence:** directly observed in code, content, build output, or the live site.
- **Recommendation:** a proposed design, product, editorial, or technical choice.
- **Assumption:** an unresolved premise that requires founder confirmation.

Do not upgrade an assumption into a product claim. Where a source is company-supplied, say so. Policy, finance, certification, customer, machine-capacity, and date-sensitive claims require a visible and appropriate source before publication.

## Content rules

- Follow `CONTENT.md` for page jobs, voice, frontmatter, attribution, and prohibited patterns.
- Public stories are narrative editorial work, not capability sheets.
- Public intelligence must show its evidence, author, publication date, and update date where applicable.
- Sponsored work must be visibly labeled on the card and article.
- Never expose private research files or working notes from `research/`.
- Do not publish draft seed content.

## Design rules

- Follow the approved landing-page direction in `DESIGN.md`.
- Preserve the existing brand assets unless a redesign decision explicitly replaces them.
- Use shared tokens for reusable values. Do not introduce arbitrary component-local colors, spacing, type sizes, shadows, or motion values when a token exists or should exist.
- Prefer semantic HTML and Astro components. Add client JavaScript only when native HTML cannot provide the required behavior.
- Do not install ReUI, shadcn, or another component system wholesale. This is an Astro editorial site; borrow patterns selectively and implement only what the product needs.
- Favor content hierarchy and documentary evidence over decorative effects.
- The chamfer is a signature, not a requirement on every container.
- Brand color must not carry meaning by itself.

## Responsive and accessibility quality bar

Design mobile-first from a 320px minimum viewport. Verify at least 320, 390, 768, 1024, and 1440 CSS pixels when a change affects layout.

Required for changed UI:

- no unintended horizontal scrolling;
- one logical `h1` and a coherent heading order;
- keyboard access and visible `:focus-visible` treatment;
- interactive targets at least 44 by 44 CSS pixels where practical;
- text and meaningful non-text contrast meeting WCAG 2.2 AA;
- meaningful image alternatives, with decorative images using empty alt text;
- no content available only on hover;
- reduced-motion support and no essential content hidden behind animation;
- readable text measure, generally 60–75 characters for long-form body copy;
- resilient layouts at 200% zoom and with longer Tamil or English labels.

For interactive components, define and verify enabled, hover, focus, pressed, disabled, loading, empty, error, and success states when those states exist.

## Architecture and component discipline

- Keep Astro static output unless the founder approves a documented architecture change.
- Reuse `BaseLayout`, `Seo`, `Nav`, `Footer`, editorial cards, article primitives, and shared global styles before creating near-duplicates.
- Build primitives around content jobs, not speculative component-library completeness.
- A new shared component should have a repeated use case, documented anatomy, responsive behavior, accessibility contract, and content constraints.
- Use Astro image optimization for editorial images where appropriate; declare dimensions or aspect ratios to prevent layout shift.
- Keep local `.woff2` fonts; do not add runtime font CDNs.
- Preserve honest empty states and filter `draft: true` content from public routes.

## Safe implementation workflow

1. Inspect `git status` and preserve unrelated or uncommitted work.
2. Write the user journey and acceptance criteria before changing a major surface.
3. Change tokens and primitives before duplicating styles across page sections.
4. Run `npm run build`.
5. Verify affected routes in a browser at the required viewport widths and by keyboard.
6. Compare local and live behavior after deployment; a local fix is not a live fix.
7. Update durable documentation only when a decision has been made or evidence has materially changed.

Do not deploy, publish, or broaden scope unless the user asks. Never overwrite local work to make the tree look clean.
