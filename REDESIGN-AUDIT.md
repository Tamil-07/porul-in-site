# Porul.in Redesign Foundation Audit

**Audit date:** 2026-09-02  
**Canonical repository:** `/Users/tamiliniyan/Documents/New project`  
**Status:** Audit and foundation complete; landing-page implementation is blocked pending founder approval.

## Executive finding

Porul.in already has a credible technical base and a distinctive visual seed: static Astro output, local fonts, structured content collections, semantic page shells, honest empty states, editorial routes, warm paper, strong ink, a copper action color, Tamil identity, and a recognizable chamfer.

The redesign should not begin with a new hero. Its highest-impact work is to make the product unmistakable and trustworthy: decide the primary audience/action, expose editorial evidence, reconcile live/local/source documentation, and convert the current styling into a small semantic design system. The proposed direction is **Precision editorial**—a calm, documentary publication interface with industrial exactness, not a marketplace and not a generic startup landing page.

## Evidence model

This audit uses three labels:

- **Repository evidence:** directly observed in the canonical code, content, build output, browser inspection, or live site.
- **Recommendation:** a proposed response to evidence.
- **Assumption:** a product premise that requires founder confirmation.

No user research, product claim, testimonial, or business result has been invented.

## Scope inspected

- Canonical Git repository and working-tree state.
- Route templates and generated static route inventory.
- Shared layouts, navigation, footer, cards, article components, and landing components.
- Current tokens, local fonts, component-local CSS, motion, focus, and responsive rules.
- Published and draft content, collection schemas, sourcing fields, and content workflows.
- Local responsive behavior at 320, 390, 768, and 1440px.
- Keyboard operation of the local mobile navigation.
- Heading structure, page language, skip links, image alternatives, and horizontal overflow across 11 generated surfaces.
- Current live homepage at `https://porul.in` and the uncommitted local fixes.
- The existing `AUDIT.md`, `DECISIONS.md`, README, architecture, and handover evidence.
- The four references requested by the founder.

## 1. Evidence-based product and UX audit

### Product and information architecture

**Repository evidence**

- The product boundary is consistent across README, decisions, and current copy: inform and convene; do not source, match, broker, or fulfil.
- The generated site has 11 pages/surfaces: Home, Stories archive/detail, Intelligence archive/two details, Tamil archive, The Room, About, Sponsor, and 404, plus RSS and sitemap output.
- The home page currently serves three competing jobs in its first screen: explain the publication, direct readers to Stories, and recruit Room applicants.
- Current copy names several audiences—shop operators, procurement people, sector readers, Room applicants, sponsors, and Tamil readers—but no durable document prioritizes them.
- The live homepage still uses “Request entry,” sourcing-adjacent hero language, prototype photography instructions, and an empty Stories section. Local uncommitted changes improve these points but are not live.
- The Room CTA has produced at least one real sourcing-style response, recorded in `AUDIT.md`; this is direct evidence of product-category confusion.

**Recommendation**

- Make reading published editorial work the default landing-page action unless the founder explicitly chooses Room growth as the primary business goal.
- Explain the publication through proof: lead story, current intelligence, named accountability, and sources before the Room application.
- Keep The Room distinct, reviewed, and visibly not a vendor-registration or RFQ channel.

**Assumption requiring confirmation**

- Procurement and manufacturing readers are presumed to be the primary landing audience; serious shop operators are a close secondary audience.

### Primary user journeys

| Journey | Repository evidence | Friction / risk | Recommended success condition |
| --- | --- | --- | --- |
| New reader understands Porul | Hero states the sector and “not a directory”; latest sections follow | Live hero mixes publishing, sourcing-adjacent language, and Room recruitment | In one viewport, a reader can state what Porul publishes, who it is for, and what to read first |
| Reader finds a company story | Stories archive/detail and home card exist locally | Live Home shows no story; local story reads partly like a capability sheet | Strongest story is immediate proof; article is narrative, attributed, dated, and not a vendor profile |
| Reader evaluates intelligence | Two articles and archive exist | Sources are stored but not rendered; dates/bylines absent; raw cite tags remain | Each article shows author, dates, takeaway if approved, visible sources, and updates |
| Person applies to The Room | Local application language, boundary, four email prompts, human review | Live “Request entry” has already been misunderstood; benefit remains abstract | Applicant understands fit, benefit, review, and non-sourcing boundary before acting |
| Reader finds Tamil work | Local nav and footer link to `/ta/`; page language is `ta` | No published Tamil inventory; older architecture says Tamil should be external | Route clearly communicates active, forthcoming, or external status without fake scale |
| Sponsor/editor contacts Porul | About, Sponsor, footer, and `hello@porul.in` exist | Contact intent is not consistently separated; founder accountability is thin | Editorial/corrections, Room, and sponsorship have distinct labels/subjects and clear expectations |

### Content and editorial trust

**Repository evidence**

- Intelligence frontmatter contains source arrays, but detail templates do not render them.
- The PLI article contains raw `<cite index="…">` research markup and a time-sensitive forward-looking claim that needs a September 2026 review.
- Article headers omit visible author, publication date, and update date even though dates exist in content/schema.
- `keyTakeaway` exists in intelligence frontmatter but is absent from the Zod schema, so Astro discards it.
- The Orbit story discloses company-supplied material but includes direct business contact information, address, named customers, machine dimensions, capability/product lists, and catalogue-like detail.
- The About page says “founder-led” without naming the accountable editor or explaining relevant expertise and corrections practice.

**Recommendation**

- Treat evidence as a designed interface layer: author/date/update, source list, reporting note, disclosure badge, image credit, and corrections/update note.
- Re-edit the Orbit article around a reported narrative and remove the standard supplier-profile pattern.
- Resolve time-sensitive intelligence before promoting it on a redesigned landing page.

### Current design system

**Repository evidence**

- `src/styles/tokens.css` has a compact 17-token foundation covering eight colors/effects, three font families, container width/gutter, and one chamfer.
- Type sizes, weights, spacing, shadows, motion, interaction colors, and breakpoints are mostly component-local.
- Breakpoints are inconsistent across components (760, 860, 900px and smaller overrides), so “mobile/tablet/desktop” behavior is emergent rather than systematic.
- `StoryCard` and `IntelCard` share a conceptual anatomy but duplicate many local styles.
- Current components cover the page shell, discovery cards, landing sections, and article body, but not sources, bylines/dates, reporting notes, or update states.
- The visual identity is distinctive, but chamfers, orange accents, large display type, and animated marquee can compete with editorial proof when used too often.

**Recommendation**

- Keep the identity; formalize semantic tokens and repeated editorial primitives before changing the landing composition.
- Use one adaptive layout model and one state contract across components.
- Do not import a React component library into Astro merely because a reference uses shadcn; copy only patterns the product actually needs.

### Responsive behavior

**Repository evidence**

- The canonical local build has no horizontal overflow on the 11 tested routes at 390px.
- Local navigation switches to an accessible native disclosure below 860px; its five menu links are 48–49px high and Escape returns focus to the trigger.
- At 320px, brand, persistent “Apply to The Room” CTA, and menu all fit without overflow, but the persistent CTA is only about 39px high and the header is visually crowded.
- The hero is one column at 320, 390, and 768px, then becomes a two-column composition at expanded widths.
- At 768px the phone composition becomes very tall, showing the need for an intentional medium layout rather than one breakpoint.
- Some text styles are 11–13px, including captions and card metadata; these require deliberate contrast and legibility testing.

**Recommendation**

- Use compact (320–599), medium (600–1023), and expanded (1024+) layout strategies.
- On compact widths, remove the persistent header Room CTA if it compromises 44px targets or publication identity; keep the action inside the page.
- Art-direct medium layouts instead of stretching the compact stack.

### Accessibility

**Repository evidence**

- Every tested page has one `main`, one `h1`, a skip link, a document language, and no image missing an `alt` attribute.
- Local global styles include visible focus treatment and reduced-motion overrides.
- The local mobile menu is keyboard operable, exposes all primary routes, closes on Escape, and restores focus.
- A local token change darkens the copper accent to address previously recorded contrast failures; it is not live.
- The live site still lacks mobile navigation according to the existing audit and live page version.
- The compact persistent Room CTA falls below the 44px target in the observed 320px layout.
- Article trust information is structurally absent, which is also an accessibility-of-information problem even when HTML mechanics pass.

**Recommendation**

- Preserve current semantic strengths, add explicit state tokens, meet WCAG 2.2 AA across all foreground/background pairs, and verify 200% zoom, forced colors, Tamil wrapping, and touch targets during implementation.

### Technical and operational foundation

**Repository evidence**

- `npm run build` succeeds and produces 11 static pages plus RSS and a sitemap index in about 1.3 seconds in the audited environment.
- Astro sends almost no client JavaScript; the only current enhancement is the mobile navigation behavior.
- Fonts are local; images use Astro optimization in the current home/story work.
- The canonical worktree already contains extensive uncommitted changes and an untracked audit/content batch.
- Two non-canonical staging copies exist under the ChatGPT workspace, including a separate Next/Vinext app whose root is an Orbit story.
- `Porul_Website_Architecture.md` describes a WordPress workflow, external Tamil blog, and `/room` route that do not match the current Markdown collections, local Tamil route, and `/the-room/` implementation.
- `AGENTS.md`, `DESIGN.md`, and `CONTENT.md` were absent before this audit.

**Recommendation**

- Preserve Astro/static/Markdown until the founder makes a separate content-operations decision.
- Make the canonical path and stage gate impossible to miss.
- Reconcile or mark stale architecture after the founder resolves WordPress and Tamil strategy; do not silently rewrite history.

## 2. Five highest-impact issues

| Priority | Issue | User impact | Business impact | Evidence / next move |
| --- | --- | --- | --- | --- |
| 1 | Product meaning and primary action are not settled | New visitors can confuse publishing, sourcing, and Room membership | Wrong-intent enquiries consume founder time and weaken positioning | Real sourcing-style Room response; decide primary audience/action, deploy unambiguous language, make reading proof primary by default |
| 2 | Editorial evidence is not visible or consistently current | Readers cannot easily judge authority, freshness, or accountability | Weakens search/reference value, corrections, sponsorship trust, and credibility | Hidden sources, no byline/dates, raw cite markup, stale policy language; build trust primitives and re-edit before promotion |
| 3 | The landing page does not lead from promise to proof | Visitors meet a broad claim and competing CTAs before strong accountability | The site cannot efficiently convert attention into durable readership or qualified Room interest | Use the proposed IA: promise → lead story → intelligence → standards → Tamil → Room → sponsor/contact |
| 4 | Live, local, and documented product states disagree | Users see stale mobile and copy behavior while maintainers see different systems | High regression/deployment risk and wasted redesign effort | Canonical Astro vs two staging copies; live lacks local fixes; architecture conflicts with repository; reconcile source and deploy intentionally |
| 5 | Design and responsive rules are under-specified | Quality varies by component and medium/tablet layouts feel stretched | Every new page increases design debt and QA cost | 17 base tokens but component-local type/spacing/motion and inconsistent breakpoints; implement semantic tokens and shared editorial primitives first |

## 3. Proposed Porul design direction

**Precision editorial:** a documentary publication with industrial exactness.

- Keep warm paper, deep ink, accessible copper, local typography, Tamil identity, fine rules, and selective machined chamfers.
- Make sources, dates, captions, reporting notes, and disclosures as visible and considered as hero imagery.
- Prefer asymmetrical editorial grids and controlled reading measures over generic equal cards.
- Prefer real, licensed, captioned process/people photography. Disclosed non-specific generated imagery is interim brand material only.
- Use one accent per view and reserve it for action, current state, and evidence markers.
- Reduce decorative animation; motion should explain navigation or state and respect reduced-motion settings.
- Avoid marketplace cues: search/filter chrome, supplier cards, capability tables, quote CTAs, star ratings, testimonials, and availability signals.

Detailed principles and tokens are in `DESIGN.md`.

## 4. Landing-page information architecture

1. Global publication navigation.
2. Clear publication promise with one primary reading action.
3. Lead story as immediate proof.
4. Latest intelligence with date/category/evidence cues.
5. Editorial accountability: founder/editor, standards, sponsorship, corrections, and boundary.
6. Honest Tamil publishing path.
7. The Room: fit, benefit, review ritual, boundary, then application.
8. Quiet sponsorship/editorial contact split.
9. Complete footer with RSS and identity.

This hierarchy intentionally delays The Room conversion until the publication has earned trust. If the founder chooses community applications as the primary business goal, steps 2–7 should be reconsidered explicitly rather than adjusted through visual emphasis alone.

## 5. Component and token inventory

### Keep and refine

- Shell: `BaseLayout`, `Seo`, `Nav`, `Footer`.
- Discovery: `StoryCard`, `IntelCard`, `SectionHead`.
- Article: `ArticleHeader`, `Prose`, `ArticleEndNote`.
- Contextual: `Hero`, `RoomPanel`; `MarqueeStrip` only if it carries meaningful taxonomy.

### Add before/with redesign implementation

- semantic color/type/space/layout/shape/motion/elevation/state tokens;
- `EditorialMeta`, `SourceList`, `DisclosureBadge`, `ReportingNote`, `ResponsiveMedia`, optional `KeyTakeaway`, and shared `EmptyState`;
- documented compact/medium/expanded variants and component state contracts.

### Do not add now

- dashboard, data-grid, form framework, carousel, testimonials, stats, pricing, auth, search/filter, directory, or RFQ components;
- a wholesale React/shadcn/ReUI layer.

## 6. Mobile-first responsive strategy

- Build the semantic order at 320px first.
- Compact 320–599: one column, 20px gutters, page-level CTA, 44px targets, real content before decorative media.
- Medium 600–1023: deliberate one/two-column editorial layouts, not a stretched phone stack.
- Expanded 1024+: full navigation, 12-column editorial grid, 1240px maximum container, constrained reading measure.
- Test 320, 390, 768, 1024, 1440; keyboard, 200% zoom, reduced motion, Tamil wrapping, missing images, long titles, and empty states.
- Keep intrinsic media dimensions and avoid primary horizontal scrollers.

## 7. Phased implementation plan

### Phase 0 — Founder decisions and approval

- Confirm primary landing audience and primary action.
- Resolve Room role/benefit, Tamil strategy, accountable byline, content workflow, and imagery policy.
- Approve or amend `DESIGN.md`, `CONTENT.md`, and the landing IA.

**Exit:** founder explicitly authorizes implementation.

### Phase 1 — Trust and source-of-truth blockers

- Reconcile live/local deployment and canonical documentation.
- Correct time-sensitive intelligence and raw citation markup.
- Add author/date/update/source/reporting/disclosure primitives and schema fields.
- Re-edit the Orbit story away from the supplier-profile pattern.

**Exit:** current published work is trustworthy enough to feature prominently.

### Phase 2 — Design-system foundation

- Map current values to semantic tokens.
- Define typography, spacing, measures, grids, breakpoints, shape, motion, elevation, and interaction states.
- Refactor only repeated primitives needed by the approved landing composition.

**Exit:** components can express compact, medium, and expanded layouts without arbitrary values.

### Phase 3 — Landing-page implementation

- Build the approved IA mobile-first with real current content.
- Keep one primary action and explicit Room boundary.
- Verify keyboard, contrast, zoom, reduced motion, images, long titles, empty inventory, and Tamil labels.

**Exit:** local acceptance criteria pass and founder reviews the complete page.

### Phase 4 — Route consistency

- Apply the approved shell, trust primitives, tokens, and responsive rules to Stories, Intelligence, Tamil, The Room, About, Sponsor, and 404 without making every route identical.

**Exit:** no route feels like a separate design system.

### Phase 5 — Publish and learn

- Build, deploy, and verify the live apex domain, mobile navigation, metadata, routes, and edge redirects.
- Monitor correct-intent Room applications, article discovery, source use if measured, corrections, and content freshness—not vanity scale.

## 8. Questions requiring product or business input

**Resolution on 2026-09-03:** Questions 1–5, 7, and 8 were answered and approved for implementation. Procurement/manufacturing readers are primary; reading the lead story is the primary action; The Room has only the two approved benefits; the byline is institutional; Tamil is first-class at `/ta/`; the published lead image is used with supplied-material context; and the Orbit re-edit is approved. Questions 6, 9, and 10 are not blockers for this landing pass and remain future operational/business decisions.

1. Who must the landing page serve first: procurement/manufacturing readers, shop owners/operators, or Room applicants?
2. What single action should define landing-page success: read a story, read intelligence, subscribe/follow, or apply to The Room?
3. What concrete ongoing value does The Room provide after acceptance, and what minimum fit should reject an application?
4. May the site name the founder/editor and summarize relevant sector experience? Who is the public author of current articles?
5. Is Tamil a first-class section on `porul.in`, a future section, or external to `blog.porul.in`? The repository and older architecture disagree.
6. Should content remain Git-backed Markdown for now, or is WordPress still a committed operational requirement? If WordPress remains desired, what publishing problem must it solve?
7. Is the non-specific AI-generated hero image acceptable as an interim disclosed asset, or should implementation wait for licensed documentary photography?
8. Do you approve re-editing the Orbit story to remove direct contact/address, catalogue-like capabilities, and unverified customer names before it becomes landing-page proof?
9. Is sponsorship currently an active revenue offer? If yes, what formats are actually sold and what disclosure wording is approved?
10. Should the landing page include an email/RSS/follow action, and what consent/measurement tooling is acceptable within the zero-recurring-cost and low-JavaScript constraints?

## Research references

- [Material Design 3](https://m3.material.io/) — adaptive components/layout, tokenized expression, and consistent accessible states.
- [Material canonical layouts](https://m3.material.io/foundations/layout/canonical-examples/overview) — compact, medium, and expanded compositions around user needs.
- [ReUI components](https://reui.io/components) — copy-and-own composition of accessible primitives in realistic patterns.
- [UI Skills playbook](https://www.ui-skills.com/playbook) — touch targets, layout stability, readable measure, focus, contrast, state feedback, and restraint.
- [Design System Checklist: foundations](https://www.designsystemchecklist.com/category/foundations) — semantic color, grid, spacing, breakpoints, type, and documented use.
- [Design System Checklist: components](https://www.designsystemchecklist.com/category/components) — component anatomy, variants, states, responsive behavior, and accessibility.
- [Design System Checklist: maintenance](https://www.designsystemchecklist.com/category/maintenance) — principles, documentation, decision logs, contribution, and lifecycle.

## Approval gate

The founder approved the direction and Phase 1 implementation on 2026-09-03. The local implementation must be reviewed before deployment; live edge configuration, including the `blog.porul.in` redirect, remains outside the repository pass.
