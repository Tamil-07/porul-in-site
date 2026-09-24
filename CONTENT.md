# Porul.in Content System

**2026-09-24 service expansion:** Porul now offers independent GeM assistance for Tamil Nadu MSMEs. Shreepriya is the founder-confirmed person handling GeM work, without invented credentials. Public service copy may describe registration and catalogue help and invite scoped bid enquiries. TN tender enquiries are for capability review. Service fees do not purchase editorial coverage. This supersedes the editorial-only positioning below for Porul's own services. Quotes replace unapproved package prices. Service guides identify their commercial purpose and link official sources; do not present them as independent reviews of Porul.

**Status:** Approved Phase 1 editorial foundation as of 2026-09-03. Content workflow and live edge configuration remain separate operational decisions.

## 1. Editorial purpose

Porul.in publishes durable, accountable editorial work about Tamil Nadu precision engineering. Its public content should help readers understand companies, people, processes, policy, demand, and operating realities without turning the publication into a sourcing product.

The core promise is:

- tell real company and operator stories properly;
- explain sector signals clearly and with visible evidence;
- convene a reviewed editorial network with explicit boundaries;
- disclose commercial influence;
- publish only when there is something worth keeping.

## 2. Repository evidence and unresolved architecture

The current application loads Markdown through Astro content collections:

- `src/content/stories/`
- `src/content/intelligence/`
- `src/content/tamil/`
- `src/content/pages/`

The older architecture document describes WordPress as a future content source, but no WordPress integration exists in the canonical repository. Until the founder chooses otherwise, Git-backed Markdown is the operational source of truth. Do not add a CMS or move Tamil off-site by assumption.

Public inventory must always be represented honestly. Archive and landing-page layouts must work with zero, one, or many entries without placeholder articles, invented scale, or implied publishing cadence.

## 3. Audience priority

- The homepage serves procurement and manufacturing readers first without opening with an audience label.
- Precision-shop owners and operators are a close secondary audience served primarily through Stories and the Tamil path.
- Room applicants and sponsors are secondary conversion audiences and must not displace published work on the homepage.

Do not imply that all audiences have equal priority on every page. Each route needs one primary audience and job.

## 4. Content types and page jobs

| Type | Primary job | Required proof | Prohibited drift |
| --- | --- | --- | --- |
| Home | Explain Porul and direct readers to its strongest proof | Real published work, accountable editorial promise | Fake scale, generic mission copy, multiple equal CTAs |
| Company story | Build a durable public record around a real company/operator | Reporting note, author, dates, attribution, images with rights | Capability sheet, customer list as sales proof, direct lead-generation contact block |
| Intelligence | Explain a durable sector signal | Visible primary sources, author, publish/update dates | Unsourced advice, stale policy claims, hidden or raw citation markup |
| Digest | Summarize a defined period or signal set | Date range, selection method, links | Pretending to be comprehensive, real-time, or statistically representative |
| Tamil article | Publish reviewed Tamil editorial work | Tamil-language review, same sourcing and disclosure bar | Placeholder translation or mixed-language filler |
| The Room | Explain fit, value, review process, and boundary | Clear application questions and human review | Vendor registration, RFQ, sourcing, buyer-access promise |
| About | Establish accountability | Institutional byline policy, sourcing/verification method, supplied-material and sponsorship labels, correction path | Invented newsroom persona, unsupported expertise, or anonymous standards |
| Sponsor | Explain what commercial support can and cannot buy | Visible disclosure policy and direct contact path | Hidden influence, paid ranking, buyer access, programmatic ads |

## 5. Voice and terminology

Write with seriousness, clarity, and restraint.

- Prefer plain English or natural Tamil over marketing jargon.
- Use specific nouns and verbs. Avoid “ecosystem,” “revolutionary,” “best-in-class,” “world-class,” and similar unsupported language.
- Explain technical terms where a procurement or policy reader may not know them.
- Distinguish observed facts, company claims, interpretation, and recommendations.
- Use sentence case for UI labels.
- Keep headings direct; do not repeat the same slogan across multiple sections.
- “Apply to The Room” is the approved phrase. “Request entry” is retired because it was mistaken for a sourcing request.
- State the boundary in plain language: The Room is not vendor registration, an RFQ, sourcing, or a sales-enquiry channel.
- Use `Porul.in`, `The Room`, `Stories`, and `Intelligence` consistently.
- Published bylines display `Porul.in` with the role `Editorial`. Do not name an individual or imply a newsroom persona or expertise claim.

## 6. Claim and source policy

Never invent claims, testimonials, users, customers, members, statistics, research findings, quotes, or outcomes.

### Company stories

- State when the piece relies on company-supplied material.
- Attribute capabilities, customers, certifications, dates, and performance claims.
- Independently verify material claims where possible and say what was verified.
- Include technical detail only when it advances the narrative or explains why an operation matters.
- Do not publish direct business email, phone, address, exhaustive capability lists, or catalogue-like product lists as a standard story pattern.
- A single company-site link may be included when editorially useful; it must not turn the page into a lead form.

### Intelligence

- Use official primary sources for laws, schemes, eligibility, deadlines, rates, limits, and government program status.
- Show a visible source list with descriptive labels and working links.
- Remove raw research-system markup before publication.
- Display `publishDate` and `updatedDate` when time-sensitive facts change.
- Add a short update note when a material conclusion changes.
- Frame practical implications as analysis, not financial, legal, procurement, or investment advice.

### Sponsorship and correction

- `sponsored: true` must render an unmistakable text disclosure on archive cards and article pages.
- Sponsorship may fund attention and craft, not editorial opinion, access, ranking, sourcing, or undisclosed influence.
- Corrections should identify what changed and when if the change is material.
- A corrections contact path must remain distinct from Room and sponsorship intent, even if all routes use `hello@porul.in`.
- Correction requests are reviewed and answered with the change made or the reason no change was made. Material corrections carry a visible note and updated date.

### The Room

- Describe it as a small, reviewed room for people working in Tamil Nadu CNC and precision engineering.
- The only approved member benefits are a weekly digest and early access to Porul.in sector intelligence before public publication.
- Preserve the existing four application questions and boundary language.
- Do not imply supplier promotion, buyer introductions, sourcing help, RFQ access, member counts, or activity levels.

### Tamil

- Tamil is active at `/ta/` and follows the same review, authorship, sourcing, disclosure, and date standards as English work.
- Show an honest empty state until reviewed Tamil articles are published.
- `blog.porul.in` redirects to `/ta/`; the edge redirect must be configured and verified during deployment.

## 7. Structured content requirements

The current schema includes title, slug, dek, institutional author and role, dates, hero image, alt text, reading time, sponsorship, draft status, location, category, company, optional takeaway and sources, and story reporting/verification notes.

Rendered editorial fields now include:

- institutional `author` and `authorRole`;
- visible `publishDate` and optional `updatedDate`;
- optional `keyTakeaway` for Intelligence and Tamil;
- reporting/verification notes for company stories;
- sources for Intelligence and Tamil;

Still evaluate only when a publishing need is confirmed:

- sources for stories where public links are appropriate, not private supplied documents;
- image credit/source and caption fields;
- correction or update note;
- canonical external company link where editorially justified;
- clear validation for required alt text when an image exists, while permitting no image.

Do not add fields merely to make the schema look complete. Each field must have an editorial workflow and rendered use.

## 8. Landing-page content architecture

Approved landing-page order:

1. Publication promise and one primary reading action.
2. Lead published story as immediate proof in the first viewport.
3. Concrete explanation of Stories and Intelligence.
4. Current intelligence with visible category/date cues.
5. Editorial accountability and standards.
6. Tamil publishing path with an honest empty state.
7. The Room explanation, two approved benefits, review and boundary.
8. Final lead-story reading action; sponsorship and contact remain secondary in the footer.

Do not lead with invented proof, audience counts, testimonials, or a generic manifesto. Do not give “Read,” “Apply,” and “Sponsor” equal visual weight.

## 9. Editorial acceptance checklist

Before setting `draft: false`, verify:

- the title and dek are accurate and not promotional;
- the primary audience and page job are clear;
- author, publish date, and update date are correct;
- material claims are attributed or verified;
- sources are public, descriptive, current, and rendered;
- sponsorship and company-supplied material are disclosed;
- images have rights, useful alt text, captions/credits where needed, and no invented identity;
- the article cannot be mistaken for a supplier listing or purchasing lead;
- there is no raw citation markup or internal research notation;
- links work and private `research/` material is not exposed;
- English and Tamil copy have been reviewed in the language published;
- the build succeeds and the detail/archive pages render the entry honestly.
