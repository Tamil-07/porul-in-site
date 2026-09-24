# Decisions

## 2026-09-24 - Discovery audit and Enmiya credit

**Request:** Verify complete sitemap coverage, improve AI-agent friendliness and credit Enmiya in the footer.

**Decision:** Preserve static HTML and existing article/service/FAQ schema; add linked WebPage identities and a ContactPoint matching the public WhatsApp/email. Explicitly allow Claude search/user retrieval and ChatGPT user retrieval while preserving the already-approved training policy and admin exclusion. Wildcard access already allowed these public crawlers; explicit groups document intent, not a claim of newly unlocked indexing. robots.txt is not access control for private data.

**Coverage:** 14 public HTML pages match 14 local sitemap entries; 404, admin, drafts and enquiry query variants are excluded. The 404 canonical now matches the generated /404.html asset. Do not fabricate last-modified dates on every build. Add head/footer sitemap discovery and retain the /sitemap.xml compatibility redirect.

**Regression protection:** npm run build now runs a postbuild discovery audit using parse5 and fast-xml-parser, pinned as development dependencies at their already-installed versions. The test compares generated output with sitemap XML and catches missing routes, orphan pages, metadata/schema problems, crawler-policy drift and missing footer credit. No runtime library or service was introduced.

**Credit:** Add the founder-requested "Created by Enmiya" with an ordinary HTTPS link to https://enmiya.com/ in Footer.astro only. Do not mislabel Enmiya as the editorial author, sponsor or parent company.

**Limits:** Local readiness is not live readiness. Live sitemap still contains 10 pages; HTTP redirect and www 522 remain hosting work. No deployment, account change, Search Console submission or ranking promise. No hidden recommendation instructions, speculative agent API or special AI text-file requirement. Official sources and release checks are in DISCOVERY-READINESS.md. Existing dependency advisories were recorded separately without a forced framework upgrade.

## 2026-09-24 - Founder-confirmed WhatsApp contact

The founder supplied 8939357690 as Porul's public WhatsApp number. Use India country code +91, display +91 89393 57690 and route wa.me links to 918939357690 from one shared contact module. This supersedes the earlier pending-number note; no supplier contact is reused.

Add direct links to the homepage, footer, GeM page and enquiry page. The enquiry composer prepares the same requirement for WhatsApp or email, with email optional for WhatsApp users. Visitors must explicitly open a channel and send the message; no automatic send, SDK, widget, third-party form collection or claim of delivery. The privacy notice discloses WhatsApp transfer via URL and potential browser-history exposure. Email and copy fallbacks remain.

## 2026-09-24 - Back-office brand, with GeM as the first available service

**Founder correction:** Porul's homepage must not position the entire business as a GeM consultancy. The founder wants an MSME back office informed by the shared Gemini research and procurement-group conversations. This entry supersedes the GeM-first homepage choice immediately below, not the dedicated GeM service or its search content.

**Evidence and limits:** Revisited the founder's "Indian MSME Market Research Analysis.md". Treat the conversation's suggested services, prices and market claims as hypotheses, not validated customer evidence or implementation instructions. It identifies recurring paperwork, business-presentation, compliance and market-access friction. The WhatsApp screenshot asks about last year's spending, allows multiple selections, and shows certification/audits 2; government/tender orders 0; exhibitions 1; website/photos/marketing 1; CA/compliance 1; none 2. These are seven selections, not seven known respondents. The total sample and non-response rate are unknown. The poll cannot rank willingness to pay, prove no GeM demand or establish delivery capability. Counts and unsupported market statistics are not published as promotional proof.

**Decision:** Lead with "Your MSME's extended back office" and "Tell us what's pending". Present five recognisable task categories, visibly distinguishing GeM registration/catalogue support as available from other requirements awaiting capability review. Explain the task -> review -> agreed scope and fee sequence. Do not imply an all-inclusive subscription, in-house specialists, certification authority, statutory advice, procurement guarantees or a staffed catalogue of services.

**Delivery boundary:** Shreepriya's GeM role remains the only founder-confirmed specialist capability. Certification, marketing, exhibition preparation and compliance coordination are enquiry categories, not purchaseable packages. A Tamil Nadu tender still needs a capability review. No referral partner, qualifications, rate or delivery time is invented.

**Implementation:** The homepage now leads with needs and process, then shows separately-labelled published reporting without treating featured companies as service clients. GeM keeps its dedicated service page, guide and Service/FAQ data. Header/footer, About, Organization/WebSite descriptions, default metadata and the static social image align with the broader identity. Generic enquiries no longer require or include GeM status; status remains required for GeM registration, catalogue and bid intents. No server-side submission or browser storage has been added.

**Contact:** Continue to use hello@porul.in until the founder supplies Porul's public WhatsApp number. The supplier's phone number in earlier correspondence must never be repurposed as Porul's contact.

**Rejected alternatives:** Another single-service rebrand based on two certification votes, a full-service catalogue with no delivery team, or deleting working GeM search pages. The brand can support expansion while the available offering remains specific and honest.

## 2026-09-24 - GeM services and discoverable enquiry journey

**Authority and scope:** The founder explicitly requested GeM services, named Shreepriya as the person handling GeM work, and asked to prepare the site for enquiries and SEO/AEO/GEO. This supersedes the older editorial-only prohibition for Porul's own services and the reading-first homepage priority. Existing editorial and Room boundaries remain.

**Journey and acceptance:** Homepage or search -> /gem-services/ -> specific need -> /enquire/ -> prepared email -> customer sends to hello@porul.in. New visitors can identify the provider, audience, tasks, quote process and independent status. The form must validate fields, preselect known service intents, work with keyboard, disclose that no message has been sent, and offer a usable direct-email path without JavaScript. All new pages must have unique metadata, canonical URLs, working internal links, sitemap coverage and no mobile overflow.

**Commercial claims:** Publish registration and catalogue assistance and scoped bid enquiries. TN tender work requires a capability review. No prices, delivery guarantees, testimonials, credentials, Tamil-language delivery promise or government affiliation are invented. The proposed Rs 4,900 pilot price was never confirmed and is not published.

**Lead delivery:** Retain static Astro and the supplied mailbox. The enquiry composer collects details locally and prepares a mailto message with a copy/webmail fallback; it never reports a successful submission. A server-delivered form needs an agreed email service and verified delivery, so it is deferred rather than replaced by an unapproved third-party recipient. No fields are saved in browser storage or sent as URL query parameters.

**Search and answer engines:** Use crawlable service content, a practical sourced guide, shared visible FAQ/FAQPage data, Service and BreadcrumbList schema, consistent Organization identity and an explicit OAI-SearchBot rule. FAQ markup describes the page; it does not promise Google's restricted FAQ rich results. Allowing a training bot is not a requirement for ChatGPT search; existing training permissions are preserved. No llms.txt, mass location pages, fake reviews or ranking promises are added. Remove the inaccurate use of a rectangular social card as an Organization logo until a proper logo is supplied.

**Sources:** https://developers.google.com/search/docs/appearance/ai-features and https://developers.openai.com/api/docs/bots. Google says no special AI files or schema are needed; OpenAI identifies OAI-SearchBot as its search crawler. Official GeM seller training and TN bidder manuals support the public guide.

**Live evidence:** On 2026-09-24 the public robots.txt allowed public pages with no conflicting managed preamble, and /sitemap-index.xml returned 200 application/xml. This supersedes the audit's old robots conflict as an observation, not a claim that every edge/WAF rule is verified. Add /sitemap.xml -> /sitemap-index.xml compatibility redirect for Cloudflare Pages. Deployment and live checks for the new routes remain separate from local implementation.

This file starts the running log required by the PRD. Each entry records the choice, the reason, and the rejected alternative so a future maintainer can understand the project without reopening the whole conversation.

## 2026-07-04 — Astro Static Output

**Decision:** Configure Astro with `output: "static"` and a canonical `site` of `https://porul.in`.

**Why:** The PRD requires zero maintenance, no server, no database, and Cloudflare Pages free-tier hosting. Static output is the smallest operational surface that satisfies that.

**Rejected alternative:** Server-rendered Astro or adapter-based deployment. That would add runtime behavior the Stage 1 foundation does not need.

## 2026-07-04 — One Global Token File

**Decision:** Put the approved v3 design tokens in `src/styles/tokens.css`.

**Why:** The chamfer, spark color, paper tone, and type stacks are brand primitives. Centralizing them keeps Stage 2 components visually consistent without retyping values.

**Rejected alternative:** Component-local color and spacing constants. That would drift quickly once cards, panels, and article templates arrive.

## 2026-07-04 — Local Font Declarations First

**Decision:** Declare only local `.woff2` font files in `src/styles/fonts.css` and preload the two Clash Display weights.

**Why:** The PRD forbids runtime font CDNs and names display typography as a first-viewport brand feature. Preloading only display weights keeps the shell fast without preloading every family.

**Rejected alternative:** Keeping the prototype's Fontshare and Google Fonts links. That would violate the no external font CDN runtime requirement.

## 2026-07-04 — Stage 1 Homepage As A Shell

**Decision:** The homepage currently renders a foundation message between Nav and Footer rather than the full v3 homepage.

**Why:** The founder asked for Stage 1 only. Building hero, marquee, cards, and Room panel belongs to Stage 2 after approval.

**Rejected alternative:** Porting visible v3 homepage sections now. That would cross the explicit stage gate in §10.

## 2026-07-04 — Homepage Pulls Only Non-Draft Content

**Decision:** The Stage 2 homepage reads `stories` and `intelligence` through Astro content collections, filters out `draft: true`, sorts by `publishDate`, and renders at most three cards.

**Why:** The PRD forbids fake scale and dummy cards. Draft seed entries validate schemas without creating a public impression that Porul.in has published reporting before the founder supplies it.

**Rejected alternative:** Hard-coding the v3 prototype's sample cards. Those were useful design references but would present invented stories as real editorial inventory.

## 2026-07-04 — Honest Empty States

**Decision:** Empty story and intelligence sections stay visible with plain editorial empty states instead of placeholder cards.

**Why:** The homepage still needs the approved Stage 2 section rhythm, but R2 requires honesty when there is no publishable content.

**Rejected alternative:** Hiding the sections entirely or showing dummy entries. Hiding would make the page feel structurally unfinished; dummy entries would violate the PRD.

## 2026-07-04 — Marquee As A Duplicated List

**Decision:** Rebuild the v3 marquee as two clean `<ul>` lists, with the duplicate marked `aria-hidden`.

**Why:** The prototype had malformed nested `.item` spans. List markup is easier to maintain, accessible to assistive technology, and still gives the same continuous industrial strip.

**Rejected alternative:** Copying the prototype markup directly. That would preserve a known bug from §5.4.

## 2026-07-05 — Detail Pages Generate Only For Published Entries

**Decision:** Story, intelligence, and Tamil detail templates exist in Stage 3, but `getStaticPaths()` filters out `draft: true` entries.

**Why:** The templates need to be ready, while the PRD forbids fake scale. Draft seed entries validate schemas without creating public article URLs.

**Rejected alternative:** Generating pages for draft placeholder content. That would publish non-reporting and violate the trust boundary.

## 2026-07-05 — The Room Uses Visible Contact Placeholders

**Decision:** The Room page includes mailto and WhatsApp actions marked as placeholders until the founder supplies the final email and number.

**Why:** Stage 3 requires the zero-backend request-entry flow, but the founder has not supplied final contact details. Visible placeholders keep the implementation honest.

**Rejected alternative:** Inventing a working email address or WhatsApp number. That would present unsupplied information as real.

## 2026-07-05 — Static About And Sponsor Pages First

**Decision:** About and Sponsor are implemented as static Astro pages in Stage 3, not as editable CMS-backed pages yet.

**Why:** Stage 3 requires the public pages and their design/content templates. The browser editor and CMS wiring are explicitly Stage 5.

**Rejected alternative:** Building Sveltia CMS now. That would skip the PRD stage gate.

## 2026-07-17 — SEO Metadata Is Centralized

**Decision:** Route all titles, descriptions, canonicals, social metadata, and JSON-LD through `Seo.astro`, with detail routes supplying typed article and breadcrumb data from their content entries.

**Why:** A single head component keeps metadata consistent across static and collection-backed pages while preserving frontmatter as the source of article truth.

**Rejected alternative:** Repeating meta tags and schema blocks inside every page template. That would make later editorial changes error-prone and difficult to audit.

## 2026-07-17 — One Full-Text RSS Feed

**Decision:** Publish all non-draft English and Tamil editorial collections in one full-text `/rss.xml` feed.

**Why:** One feed matches the site-wide discovery requirement, exposes only reviewed content, and avoids fake inventory while the collections contain draft seeds.

**Rejected alternative:** Separate empty feeds for each collection. That would add endpoints without adding useful discovery value at launch.

## 2026-07-17 — Contact Placeholders Retired

**Decision:** Use `hello@porul.in` as the single public contact path and remove the unfinished WhatsApp action from The Room.

**Why:** The founder supplied the launch contact address, while no WhatsApp number was supplied. A real email is clearer than retaining a dead deep link.

**Rejected alternative:** Keeping `wa.me/` or unlabeled mail placeholders. Those links are not valid launch contact channels.

## 2026-07-17 — Per-Article OG Images Deferred

**Decision:** Use one static branded 1200×630 OG image for every page in this pass. Keep its editable SVG source in `/design` and defer build-time title overlays.

**Why:** The founder explicitly requested a lean pre-launch pass. The static image provides valid social previews now without adding another image-generation dependency or build step.

**Rejected alternative:** Adding Satori or an OG canvas integration during this pass. Per-article image generation remains a documented post-launch enhancement.

## 2026-09-02 — The Room Uses Application Language

**Decision:** Replace "Request entry" with "Apply to The Room," state that the Room is not vendor registration, an RFQ, sourcing, or a sales-enquiry channel, and prefill the email with four fit questions.

**Why:** A real supplier email showed that "Request entry" was being interpreted as a request for materials. Application language protects the editorial-network boundary and gives the founder enough context to review fit.

**Rejected alternative:** Keeping the short subject-only email link and explaining the distinction after unsuitable enquiries arrive. That would preserve the ambiguity and founder workload.

## 2026-09-02 — Mobile Navigation Uses A Native Disclosure

**Decision:** Use a `<details>`/`<summary>` mobile menu with a very small enhancement for link selection, Escape, and the changing accessible label.

**Why:** The native control remains operable if JavaScript fails, while the enhancement makes focus and closing behavior predictable. It restores access to every primary section without adding a navigation framework.

**Rejected alternative:** Keep hiding the desktop links below 860px or add a client-side menu dependency. The first makes core routes undiscoverable; the second is unnecessary for one disclosure.

## 2026-09-02 — Homepage Hero Uses A Non-Specific Generated Still Life

**Decision:** Replace the prototype owner silhouette and invented company/location tags with a clearly captioned AI-generated editorial still life that does not represent a featured company.

**Why:** Porul.in needs a real visual first-viewport signal, but the repository has no approved documentary portrait for the homepage. A non-specific, disclosed image avoids assigning invented identity or capability claims to a person or shop.

**Rejected alternative:** Reuse a company capability-sheet image as the site hero or leave the visible prototype instructions in production. Both would weaken editorial trust.

## 2026-09-02 — Google Preferred Sources Uses The Static Deeplink

**Decision:** Add Google's documented `https://www.google.com/preferences/source?q=porul.in` action in the footer rather than loading Google's Preferred Sources JavaScript library sitewide.

**Why:** The deeplink is an official implementation path and preserves Porul.in's static, low-JavaScript architecture. Google controls publication eligibility, so the signed-in end state must be verified after deployment.

**Rejected alternative:** Load `publisher.js` on every page for the standard Google-styled button. It offers a smoother return flow but adds a third-party runtime dependency to all pages for a secondary action.

## 2026-09-03 — Homepage Leads With Published Work

**Decision:** Serve procurement and manufacturing readers first, with precision-shop owners and operators as a close secondary audience. The homepage’s dominant action is “Read the lead story”; “Explore Stories” is secondary, and The Room appears only after editorial proof and trust.

**Why:** The product is an editorial publication. Leading with its strongest published work makes the value concrete and reduces the risk that a new visitor interprets Porul.in as a sourcing or membership product.

**Rejected alternative:** Lead with an audience label, a Room application, three equal calls to action, or generic mission copy. Each would place positioning or conversion ahead of proof.

## 2026-09-03 — Institutional Byline Requires Visible Trust Apparatus

**Decision:** Every published article displays `Porul.in` as author and `Editorial` as role. Article pages also display publication and update dates, structured sources where applicable, reporting and verification limits for company stories, sponsorship status, and a corrections path on About.

**Why:** The founder approved an institutional byline and explicitly rejected naming an individual or inventing newsroom expertise. Visible evidence and accountability compensate for the weaker personal E-E-A-T signal without creating a false persona.

**Rejected alternative:** Name an individual, invent an editor profile, or rely on JSON-LD and hidden frontmatter alone. The first two would violate the approved authorship model; the last would not help a reader inspect the work.

## 2026-09-03 — Tamil Is First-Class And The Room Is Secondary

**Decision:** Keep Tamil as an active section at `/ta/` with an honest empty state. Configure `blog.porul.in` to redirect there at the edge during deployment. Describe The Room as a small, reviewed room for people working in Tamil Nadu CNC and precision engineering; state only a weekly digest and early access to Porul.in sector intelligence before public publication as member benefits.

**Why:** These are the founder-approved product boundaries. They prevent fake Tamil inventory and stop the Room from implying supplier promotion, buyer access, sourcing, RFQs, or scale.

**Rejected alternative:** Call Tamil forthcoming or external, fabricate Tamil content, keep `blog.porul.in` as a parallel editorial destination, or promote unapproved Room benefits.

## 2026-09-03 — Evidence Trace Is The Landing Signature

**Decision:** Use a native disclosure on the lead story to reveal its source basis, verification limit, and commercial status. Remove the decorative marquee and empty intelligence-card media from the homepage. Preserve warm paper, ink, copper, Tamil typography, fine rules, and selective chamfers through semantic tokens.

**Why:** The interaction makes Porul.in’s actual editorial value memorable while remaining keyboard operable, useful without JavaScript, and consistent with the precision-editorial direction.

**Rejected alternative:** Add a decorative animation, generic SaaS treatment, invented statistic, testimonial, gradient, or carousel. None would prove the publication’s value.

## 2026-09-03 — Published Work Re-Edited Before Promotion

**Decision:** Re-edit the Orbit story around operational hand-offs, remove direct business contact details, address, customer names, catalogue lists, and machine specifications, and label supplied material and verification limits. Refresh the PLI article from official 2026 sources, narrow its conclusion, add an update note and date, and render its sources visibly.

**Why:** The lead story cannot function as a supplier capability sheet, and time-sensitive policy work cannot be promoted with stale numbers or unsupported eligibility implications.

**Rejected alternative:** Feature the existing pieces unchanged and repair trust later. That would make the landing page amplify the audit’s highest-risk editorial problems.
