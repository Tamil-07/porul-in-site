# Porul.in global design system

Status: founder-approved system; refined Business desk Home completed locally on 9 October 2026. This redesign has not been deployed. The sole token authority is `src/styles/tokens.css`. This document records current conversation decisions and supersedes older visual proposals and completed stage gates. See `implementation/finalisation-20261009/RELEASE.md` for current production-build and browser evidence.

## Purpose and audience

Porul should feel like an established business publication whose team can help people get things done: approachable, credible, rooted in Tamil, and specific about its work. Primary users are new manufacturing-unit owners and small MSMEs.

Lead priorities, in order: GeM support; website and software requirements; story-related enquiries; MSME schemes and loan-related enquiries. Enquiry intent is not proof of delivery capability. Scope, prices, timelines, eligibility, and service promises must be supported before publication. Do not invent testimonials, customer counts, results or completed projects.

## One authority

`tokens.css` is the only token definition file for this redesign. `swatches.html` consumes it and contains only specimen presentation. Production fonts are local assets in `public/fonts/`, served at `/fonts/`; licenses and source manifest are included. No runtime font CDN.

The local production source imports the approved authority. The deployed website remains unchanged by this iteration. The older `design/porul-system` experiment and previous Satoshi/Georgia global specimen are not the approved redesign.

No consumer may hardcode color, font family, font size, font weight, leading, tracking, spacing, radius, border width, shadow or duration. Add a justified reusable role centrally when needed. No local palette overrides. Use token references even for zero spacing. Unitless grid fractions, native CSS keywords and percentage-based layout mechanics are not new brand decisions. Breakpoint thresholds must live in the token file because CSS custom properties cannot resolve inside media-query conditions.

## Three width modes

Modes set `--layout-max` only. They never select color, typography, density, radii or shadows. Content width excludes shared page gutters. Responsive changes are global.

| Pages | Mode | Maximum |
| --- | --- | --- |
| home, msme-benefits, gem-services, digital-signature-for-gem | catalog | 1152px |
| stories index, intelligence index, the-room, sponsor, ta index | catalog | 1152px |
| story article, intelligence article, guides index, guide article | editorial | 704px |
| about, privacy, ta article | editorial | 704px |
| enquire, contact | form | 640px |

404 and any future routes reuse these modes; propose their assignment rather than inventing a new theme. A future website/software page would use catalog, but its route and claims are not yet approved.

## Color

Exact founder palette, defined only in tokens.css:
- surfaces: #F8F6F3, #FFFFFF, #F1EEE9, #1A1816.
- text: #1A1816, #5C574F, #6F695F, #F8F6F3.
- accent: #2C4A3E; hover #243F35; subtle #E8F0EC.
- borders: #E5E1DB, #D1CBC3.
- available #2F6B4F; warning #7A5424; error #8B3A3A.

Accent denotes brand/actions/links/selection/focus, not arbitrary decoration. Status colors require text and convey available/warning/error only. Sponsors do not get status colors or their own palette. Neutral borders group content; meaningful field boundaries use text-tertiary. Overlay shadow is the approved transparent-black exception to the solid palette.

## Typography and Tamil

Global content roles, with mobile then desktop values (font size / leading):

| Role | Family / weight | Mobile | Desktop from 768px |
| --- | --- | --- | --- |
| Main title | Source Serif 4 / 600 | 32/38 | 48/54 |
| Exceptional lead | Source Serif 4 / 600 | 40/46 | 60/66 |
| Section heading | Source Sans 3 / 600 | 24/32 | 32/40 |
| Story/feature title | Source Serif 4 / 600 | 24/30 | 24/30 |
| Service/module title | Source Sans 3 / 600 | 24/30 | 24/30 |
| Article body | Source Serif 4 / 400 | 18/29 | 20/32 |
| Service explanation | Source Sans 3 / 400 | 18/28 | 18/28 |
| Controls/navigation/labels | Source Sans 3 / 600 | 16/24 | 16/24 |
| Metadata/captions | Source Sans 3 / 400 | 14/20 | 14/20 |

Main titles use serif across services and publishing. Section/module roles remain available everywhere. Main title and exceptional lead are alternative emphasis roles, not two competing H1s. Normal tracking for body and controls; -.015em only for large English headlines. Use real font weights, no synthetic bold or italic. Italic assets can be added centrally if actual content requires them; do not fabricate italic shapes.

Tamil uses Noto Serif Tamil for reading and titles, Noto Sans Tamil for UI, normal tracking, and global language-leading tokens (reading 1.8, headings 1.4, UI 1.6). These optical values need the swatch review recorded in QA. A Tamil-language editorial review remains required before publishing new Tamil copy. English and Tamil use the same size roles and layout modes. The current wordmark lettering and Clash font are preserved; the dot uses the approved brand accent. The visible Tamil signature remains in the header at small widths. A clear தமிழ் link leads to the Tamil section. Do not advertise translations that do not exist.

## Spacing, geometry, motion

Shared steps: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px. Label gap 8; related items 16; paragraph gaps, grids and panel padding 24; groups 32. Section padding 40 mobile / 64 desktop. Gutters 20 mobile, 32 from 768, 48 from 1024. Widths are caps, never mandatory minimums.

Controls 4px radius; panels/disclosures/overlays 8px; editorial media and unboxed previews square. Borders 1px, active/error emphasis 2px. Buttons and single-line fields minimum 48px; Tamil and wrapping labels may grow. Ordinary content has no shadow. Only actual layered UI uses 0 8px 24px rgba(0,0,0,.08).

Feedback durations 140ms / 200ms; no reading-content entrance animations. Reduced-motion sets both to zero. All controls need visible keyboard focus. Focus combines light and dark rings for light and inverse surfaces. Body copy must remain readable at 200% zoom. Minimum viewport 320px.

## Component contracts for the future implementation

These are contracts, not permission to build pages in this stage.

- Shell: preserved bilingual mark, visible language route, clear service and reading navigation, one primary enquiry action; mobile navigation keyboard operable with Escape and focus return.
- Preview: optional image, title, short summary when useful, category/date/read time, disclosure before headline. Image-led and text-led versions share type and metadata. Zero/one/many content must work without fabricated filler.
- Article: title, standfirst, institutional editorial byline where applicable, dates, read time, optional credited image, readable body, sources, disclosure, updates/corrections and related reading. Useful evidence remains visible, not hidden in tooltips.
- Intelligence: opening takeaway, dated/sourced metrics when justified, implications and source list. Every metric needs context, period and attribution. Do not manufacture dashboard charts for sparse content.
- Service: who it fits, confirmed scope, responsibilities, deliverables, exclusions/conditions, process and a specific next action. Descriptive tables are for Porul's services, not supplier listings. No speculative package tiers or fees.
- Form: name, one contact method, service interest, short requirement; optional business name and preferred language. Labels above controls, hints connected to fields, clear required/optional status and error summary plus inline errors. Preserve input on validation failure.
- Form states: enabled, hover, focus, pressed, disabled, working, invalid, empty and confirmed completion where supported. Never show sent/success without real delivery acknowledgement. Current static composition must explain that the visitor still sends the prepared message.
- Images: authentic owners, workshops, products and work, with rights and accurate captions. Company presentation slides must be described as supplied material, not documentary photos. Diagrams explain processes; illustrations are labelled when needed. Layout works without an image.
- Enquiries: generic action “Discuss your requirement”; service actions such as “Discuss GeM support”; carry non-sensitive service intent only. Do not put personal details into URLs or collect identity documents, credentials or financial records in initial contact.

## Editorial and commercial content

Articles are free to read now. Sponsorship is an independent attribute from access. Do not add a subscription, account or paywall as part of this redesign.

- Editorial: standard byline/date/category/read time. No repetitive Free badge.
- Sponsored: “Sponsored · [Sponsor name]” on every preview and above the article headline, plus a plain disclosure of the sponsor's involvement before the body.
- Partner-supplied: “Partner content · [Partner name]”, explicit producer attribution and a clear distinction from Porul-authored editorial. It may also be sponsored; funding and authorship must both remain visible.
- Attribution: sponsor identity sits inside a bounded neutral area. No sponsor takeover of fonts, colors or page layout. Disclosure never depends on color or hover.
- Schema planning: existing sponsored boolean alone cannot express sponsor identity, involvement or partner authorship. Plan backward-compatible optional fields, conditional validation for commercial entries, and a shared disclosure renderer. Missing required disclosure blocks publication of the affected entry, not silent removal of its label.
- Story-related enquiry is an enquiry about possible coverage or commissioned work. It does not buy undisclosed endorsement or create a supplier lead directory. Commercial scope still needs definition before publishing package claims.

The Room keeps its existing reviewed-membership boundary and four questions. Articles about companies are not proof that they are Porul service customers. Empty Tamil/archive states stay honest.

## Reference rationale

The Ken: narrative hierarchy and editorial character. Rest of World: clear reading and discovery. BDC: approachable advice and business-task orientation. Pilot: explicit scope and deliverables. Charter/CB Insights: useful briefing and research organisation. Work & Co: concrete project evidence. GOV.UK: forms and question clarity. These supply patterns, not separate page themes or imported fonts/assets.

## Stage gate

1. Update and validate tokens and swatch.
2. Review agent proposals critically. The initial handoff stayed within this chat; the founder later authorised three OpenCode role reviews through DeepSeek. Those completed on 8 October 2026. The combined-plan challenge attachment awaits its additional-document approval; see opencode-review/2026-10-08/RUN-RECORD.md.
3. Codex critically reviews the proposals and produces one implementation-ready plan, recording accepted/rejected ideas and content dependencies.
4. Present the reviewed plan. Production migration and publishing occur in a subsequent explicit implementation phase; this handoff does not deploy anything.

## Token corrections and swatch check — 8 October 2026

Scope: token fixes, their font assets, documentation and swatch verification only. Page map, width caps, founder palette and wordmark usage are unchanged. No production page was built or edited.

### Explicit semibold font files

Inspection found that the original files named `400` are variable fonts with a real weight axis that includes 600. Reusing a variable asset does not, by itself, establish synthetic bold. Each 600 face now has a separate static WOFF2 instantiated at `wght=600` from its corresponding licensed source using FontTools 4.66.1. Verification confirmed `OS/2.usWeightClass=600` and no remaining `fvar` axis for all six outputs. The existing 400 assets and declarations remain unchanged. Their SHA-256 hashes match the original manifest. These are variable source files, not static 400 files.

All filenames below are relative to `fonts/`. Browser requests returned HTTP 200 for all twelve assets across the swatch and a temporary language/subset check. The extended Latin check included `Ā` so those subsets were exercised.

| Family / subset | 400 declaration | 600 declaration |
| --- | --- | --- |
| Noto Sans Tamil / Tamil | `noto-sans-tamil-400-tamil.woff2` | `noto-sans-tamil-600-tamil.woff2` |
| Noto Serif Tamil / Tamil | `noto-serif-tamil-400-tamil.woff2` | `noto-serif-tamil-600-tamil.woff2` |
| Source Sans 3 / Latin | `source-sans-3-400-latin.woff2` | `source-sans-3-600-latin.woff2` |
| Source Sans 3 / Latin extended | `source-sans-3-400-latin-ext.woff2` | `source-sans-3-600-latin-ext.woff2` |
| Source Serif 4 / Latin | `source-serif-4-400-latin.woff2` | `source-serif-4-600-latin.woff2` |
| Source Serif 4 / Latin extended | `source-serif-4-400-latin-ext.woff2` | `source-serif-4-600-latin-ext.woff2` |

`clash-display-700.woff2` remains unchanged and restricted to the wordmark. Font provenance, instancing details and hashes are recorded in `fonts/manifest.json`. The swatch retains `font-synthesis: none`.

### Tamil cascade

The complete `:lang(ta)` block is now the last block in `tokens.css`, after both width breakpoints and reduced-motion rules. This also protects `<html lang="ta">`, where a later `:root` media rule could previously win at equal specificity.

Swatch checks passed at 320, 390, 767, 768, 1024 and 1440px, with no horizontal overflow. Both nested Tamil content and a temporary Tamil-root version retained reading leading 1.8, title leading 1.4 and UI leading 1.6.

| Tamil role | Below 768px: size / computed leading | From 768px: size / computed leading |
| --- | --- | --- |
| Reading | 18px / 32.4px | 20px / 36px |
| Main title | 32px / 44.8px | 48px / 67.2px |
| Control | 16px / 25.6px | 16px / 25.6px |

English reading remains 18/29 and 20/32; English main titles remain 32/38 and 48/54. The temporary root-language specimen is a verification fixture, not a new site page.

### Secondary text on inverse surfaces

`--text-inverse-secondary: var(--border-strong)` reuses the approved `#D1CBC3` neutral. Contrast on `--surface-inverse` (`#1A1816`) is **10.99:1**, above 4.5:1 for normal text. This role is only for text on the inverse surface. Do not use `--text-secondary` there, or use the new inverse role for text on light surfaces.

The swatch applies the new role only through `.inverse .meta`; browser-computed text is `rgb(209, 203, 195)`. All 16 original palette declarations remain exact. The existing system checker passes token resolution, width-only modes, local font references, consumer token use and its contrast checks. The new inverse pair was calculated separately. Mobile Tamil and desktop inverse specimens were visually checked; evidence is in `evidence/tamil-mobile.jpg` and `evidence/inverse-secondary.jpg`.

## Local implementation authorisation — 8 October 2026

The founder approved the Home direction and provisional copy, then instructed Codex to proceed with implementation. This supersedes this document's earlier token-and-swatch-only stage gate and migration prohibition. Local implementation is now authorised; deployment has not occurred. Earlier swatch evidence remains evidence for that foundation stage, not proof that the migrated production pages have passed browser checks.

The sole token authority is now `src/styles/tokens.css`. `design/global-system/tokens.css` contains only a compatibility import of that file, so the review swatch and production use the same definitions. Approved font files are self-hosted in `public/fonts` and requested through `/fonts/` URLs. The original font-manifest and correction history above remain the provenance record; their earlier design-directory paths describe the foundation stage.

Responsive mechanics also live centrally: `--nav-wide-display`, `--nav-compact-display`, `--nav-link-gap` and `--nav-panel-width` control navigation composition; `--layer-header` and `--layer-skip` define stacking; `--skip-hidden-transform` positions the inactive skip link; `--image-story-ratio` gives story media its shared ratio. These add composition mechanics without changing the founder palette, type roles or width-only layout modes. Breakpoints remain in the same production token file, with Tamil overrides last.

Serve the swatch from a repository-root server at `/design/global-system/swatches.html`, with `/fonts/` mapped to `public/fonts`. A server rooted only in the design directory cannot resolve the compatibility import or public font URLs. Astro's development server supplies the public asset mapping; a plain Python root server needs the same mapping for a complete font preview.

The updated `check-system.mjs` passes against the production authority: import-only compatibility, exact founder palette, token resolution, local font existence, width-only modes, specimen heading/ID/link integrity and text/action/selection/inverse-secondary contrast. Production build, responsive browser verification, keyboard checks and release validation remain pending for this implementation stage. This note does not claim deployment or new user research.

## 9 October 2026 — Completed local iteration

The refined C / Business desk Home is implemented in the site's shared Astro structure. Page map, widths, palette and font definitions remain approved and unchanged. Supporting service copy names the government-scheme outputs: written shortlist, written checklist and explanatory call. All service work remains subject to agreed scope and any fee.

The design supports free reading, sponsored articles and partner authorship within the same tokens. Disclosures remain visible on cards and articles. Story captions now come from content metadata. The Home's conceptual AI illustration has an explicit caption and does not replace the source record in the article.

Future design refinement is planned. Current local verification and its limits are recorded in `implementation/finalisation-20261009/RELEASE.md`; this work does not include deployment.
