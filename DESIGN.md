# Porul.in Design Foundation

**2026-09-24 service expansion:** The founder approved a GeM service and enquiry journey. The homepage now prioritises GeM support while retaining the editorial lead story and established visual identity. Service pages use compact, unframed sections, direct answers and an email enquiry composer. The older homepage reading priority below is historical. See DECISIONS.md.

**Status:** Approved and implemented locally for the Phase 1 landing page on 2026-09-03. Live deployment is not part of this pass.

This document records the approved visual and interaction direction. The evidence and prioritization behind it are in `REDESIGN-AUDIT.md`.

## 1. Established constraints

These are supported by the current repository and decision log:

- Porul.in is an editorial credibility and reference publication for Tamil Nadu precision engineering.
- It informs and convenes; it does not source, match, broker, quote, fulfil, or operate as a supplier directory.
- The experience should be static, fast, low-maintenance, and honest about the size of its archive.
- Content and credibility outrank decorative novelty.
- The current identity uses warm paper, near-black ink, a molten/copper accent, a Tamil wordmark, local fonts, and a machined chamfer.
- The landing page leads with the strongest published story and one dominant reading action.

## 2. Approved design direction: Precision editorial

Porul should feel like a carefully machined editorial record: exact, calm, rooted in Tamil Nadu, and visibly accountable.

### Experience attributes

- **Documentary:** real companies, people, processes, source notes, and dates lead the experience.
- **Precise:** strong grids, controlled measures, consistent states, and sparse use of ornament.
- **Human:** people and working context matter more than isolated machinery glamour.
- **Tamil-rooted:** Tamil is treated as a first-class language and identity cue, not a decorative translation.
- **Independent:** the visual and verbal system must distinguish journalism, sponsorship, and community clearly.
- **Quietly distinctive:** avoid generic SaaS gradients, dashboard chrome, glass effects, fake metrics, and overbuilt animation.

### Visual recommendation

- Retain the current warm-paper and ink foundation.
- Retain a darker accessible copper as the action and editorial signal color; keep brighter orange for non-text accents on dark surfaces.
- Retain Clash Display, Satoshi, and Noto Sans Tamil for the first redesign prototype. Evaluate any additional editorial reading face only as a licensed, local-font prototype with a measured performance and readability benefit.
- Use the chamfer selectively on primary actions, lead media, and a small number of signature containers. Ordinary content grouping should rely on spacing and hairlines first.
- Prefer documentary photography with clear rights and specific captions. A disclosed non-specific generated image may be an interim brand asset, never evidence of a real company or person.
- Use motion to clarify entry, continuity, or state. Do not delay core content, run perpetual decorative motion by default, or conceal content from reduced-motion users.

## 3. Design principles

1. **Trust before conversion.** Show who is responsible, what is published, where claims came from, and what Porul does not do before asking for an application or sponsorship enquiry.
2. **One page, one primary job.** Every route gets one primary user intent and one dominant action. Secondary actions must be visibly secondary.
3. **Evidence is interface.** Sources, bylines, dates, disclosures, reporting notes, corrections, and image captions are designed components, not footnotes added later.
4. **Content creates the composition.** Layouts must work with one story, long titles, no image, Tamil text, and honest empty states without invented filler.
5. **Adaptive, not merely smaller.** Compact, medium, and expanded layouts change hierarchy and composition according to available space and ergonomics.
6. **Native before scripted.** Prefer semantic HTML, progressive enhancement, and CSS over client-side interface dependencies.
7. **Distinctive through restraint.** A small, repeatable system of typography, paper, ink, copper, hairlines, and occasional chamfers should create recognition.

## 4. Current design-system inventory

### Existing tokens

| Group | Current tokens | Assessment |
| --- | --- | --- |
| Surfaces | primitives plus `--surface-*` aliases | Page, raised, subtle, and inverse roles are implemented. |
| Text | primitives plus `--text-*` aliases | Strong, default, muted, inverse, and disabled roles are implemented. |
| Accent | `--spark`, `--spark-2`, `--action-*`, `--focus-ring` | Copper remains the editorial/action signal with separate state roles. |
| Border | `--line`, `--border-*` | Subtle, default, strong, and inverse roles are implemented. |
| Type | family, display, heading, body, meta, and measure tokens | Shared landing/editorial scales are implemented; legacy routes may still be migrated incrementally. |
| Layout | `--maxw`, `--gut`, measures, spacing scale | Container, gutters, measures, and spacing steps are centralized. |
| Shape | `--cham` and small/medium/large roles | Chamfers are selective and scaled. |
| Motion | fast/standard/deliberate durations and standard easing | New interactions use shared motion roles. |
| Elevation | low and overlay shadows | Borders remain primary; shadows are reserved for layering. |
| Layering | header and overlay roles | Sticky navigation uses a named layer. |

### Existing components

| Layer | Components | Proposed treatment |
| --- | --- | --- |
| Shell | `BaseLayout`, `Seo`, `Nav`, `Footer` | Keep; align navigation hierarchy, active states, metadata, and mobile chrome with the approved IA. |
| Landing | `Hero`, `SectionHead`, `RoomPanel`, `EvidenceTrace` | Implemented as promise + lead proof, content explanation, intelligence, standards, Tamil, Room, and final read. `MarqueeStrip` is preserved but removed from the homepage. |
| Editorial discovery | `StoryCard`, `IntelCard` | Keep separate content semantics; share media, meta, disclosure, and action primitives where useful. |
| Article | `ArticleHeader`, `Prose`, `ArticleEndNote` | Extend with byline/date, source list, update note, disclosure, and visible breadcrumbs when useful. |

### Editorial primitives

Implemented in Phase 1 where the repeated use case was confirmed:

- `EditorialMeta`: author, published date, updated date, location, reading time.
- `SourceList`: numbered descriptive links from structured frontmatter.
- `DisclosureBadge`: still represented by existing text pills; extract only when a third shared variant requires it.
- `ReportingNote`: concise evidence and verification context.
- `KeyTakeaway`: optional article summary with schema support.
- `ResponsiveMedia`: not extracted yet; current lead/article media implement the contract directly.
- `EmptyState`: remains a shared visual pattern; extract only when behavior, not just styling, repeats.
- `SectionIntro`: `SectionHead` continues to fill this role.
- `ContactPath`: implemented as intent-specific mail links on About and The Room.

## 5. Token architecture

Phase 1 maps the approved primitives to semantic surface, text, action, border, spacing, type, measure, shape, motion, elevation, focus, and layer roles in `src/styles/tokens.css`.

### Color

- Primitives: paper and ink neutral scales, copper scale, optional status scales.
- Semantic surfaces: `page`, `surface`, `surface-subtle`, `inverse`.
- Semantic text: `strong`, `default`, `muted`, `inverse`, `disabled`, `link`.
- Semantic action: `primary`, `primary-hover`, `primary-pressed`, `on-primary`, `focus-ring`.
- Semantic border: `subtle`, `default`, `strong`, `inverse`.
- Status roles only when needed: `info`, `success`, `warning`, `critical`, each with foreground and background pairs.

Every documented foreground/background pair must meet WCAG 2.2 AA for its text size. Brand color alone must never communicate state.

### Typography

Define tokens rather than component-specific clamps:

- display: `display-xl`, `display-lg`, `display-md`;
- headings: `heading-xl`, `heading-lg`, `heading-md`, `heading-sm`;
- body: `body-lg`, `body-md`, `body-sm`;
- utility: `label`, `caption`, `meta`;
- Tamil equivalents where line height or wrapping needs a separate value;
- text measures: narrow, reading, and wide.

Use balanced wrapping for short headings and a readable 60–75 character measure for long-form body copy.

### Spacing and layout

- Base spacing steps: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, and 96px.
- Container: retain a 1240px expanded maximum unless the prototype disproves it.
- Reading measure: approximately 68 characters.
- Compact gutter: 20px at 320–390px.
- Medium gutter: 32–40px.
- Expanded gutter: 48–56px.
- Grid: 4 columns compact, 8 columns medium, 12 columns expanded; editorial layouts may span the grid asymmetrically.

### Breakpoints

Use a small adaptive model, then adjust only when content proves a need:

- **Compact:** 320–599px. One-column reading order, page-level actions, no persistent header CTA if it crowds identity or menu.
- **Medium:** 600–1023px. One or two columns according to content; navigation may remain compact; do not stretch a phone composition across a tablet.
- **Expanded:** 1024px and above. Full navigation and asymmetric editorial grids; cap line length and container width.

Breakpoints are layout decisions, not device labels.

### Shape, motion, elevation, and state

- Shape: square/hairline, small chamfer, signature chamfer. Avoid applying the signature shape to every card.
- Motion: fast 120ms, standard 180ms, deliberate 240ms; use ease-out for entrances and symmetric short transitions for open/close.
- Reduced motion: remove marquee and nonessential entrance movement; preserve state changes without spatial animation.
- Elevation: use borders for structure; reserve one low and one overlay shadow for true layering.
- Interaction states: enabled, hover, focus, pressed, selected/current, disabled, and loading where relevant. Focus must have a visible indicator in addition to color change.

## 6. Landing-page information architecture

Approved and implemented order:

1. **Global header** — identity, Stories, Intelligence, The Room, About, Tamil; no ambiguous sourcing language.
2. **First viewport: publication promise + lead story** — the promise and one dominant “Read the lead story” action appear before the lead proof; “Explore Stories” is secondary.
3. **What Porul offers** — Stories and Intelligence explained concretely without invented scale.
4. **Current intelligence** — two durable analyses with category, freshness, and reading cues.
5. **Why trust Porul** — institutional authorship, sourcing, verification limits, sponsorship disclosure, and corrections path.
6. **Tamil path** — active first-class section with an honest empty state until reviewed Tamil work exists.
7. **The Room** — secondary, after trust; only the approved audience, benefits, review, and boundary are stated.
8. **Final reading conversion** — returns to the lead story as the page's primary job.
9. **Footer** — complete navigation, RSS, contact, social identity, and quiet sponsorship access.

The marquee is removed from the landing composition because it did not advance the primary reading journey.

The signature interaction is `EvidenceTrace`, a native disclosure on the lead story that reveals source basis, verification limit, and commercial status. It is useful without motion, keyboard operable, and based on Porul.in's actual editorial value.

## 7. Mobile-first responsive strategy

- Start with the semantic reading order at 320px, then compose medium and expanded layouts.
- Keep the publication promise, primary action, and first proof before nonessential media or animation.
- At 320–390px, use one-column sections, 20px gutters, at least 16px body text, 44px controls, and captions that remain readable.
- If the header cannot fit brand, persistent CTA, and menu at 320px with 44px targets, remove the persistent CTA at compact widths; the same action remains in page content.
- Cards are full width on compact screens. Two-column grids are permitted at medium widths only when titles and summaries remain readable.
- Do not use horizontal scrolling for primary stories, navigation, or application steps.
- Set intrinsic dimensions or aspect ratio for all images. Art-direct crops where the subject changes between compact and expanded layouts.
- Keep article body measure independent of viewport width; wide screens should add margins, not longer lines.
- Verify Tamil labels and mixed Tamil/English layouts for wrapping rather than shrinking type.
- Validate at 320, 375, 390, 768, 1024, 1150, and 1440px, plus 200% zoom, keyboard-only use, reduced motion, and high-contrast/forced-color behavior where feasible.

## 8. Reference interpretation

- [Material Design 3](https://m3.material.io/) informs adaptive layout, token discipline, and consistent multi-indicator interaction states. Porul should adopt the principles, not Material's visual identity.
- [ReUI](https://reui.io/components) demonstrates the value of composing real product patterns from accessible primitives and owning the code. Because Porul is Astro, ReUI is a pattern reference, not a dependency recommendation.
- [UI Skills](https://www.ui-skills.com/playbook) supports practical craft rules used here: stable aspect ratios, readable measure, 44px touch targets, visible focus, sufficient muted-text contrast, restrained accents, and reduced motion.
- [Design System Checklist](https://www.designsystemchecklist.com/category/foundations) supports explicit foundations, semantic tokens, per-breakpoint grids, documented component anatomy/states, and ongoing maintenance rules.
