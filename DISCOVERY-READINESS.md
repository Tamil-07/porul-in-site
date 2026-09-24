# Search and agent readiness

Checked locally and against the live discovery endpoints on 2026-09-24. Local implementation is not deployed.

## Local public inventory

The generated sitemap contains all 14 indexable HTML pages: Home, About, Enquire, GeM services, the GeM seller registration guide, Intelligence index and its two published articles, Privacy, Sponsor, Stories index and the Orbit story, Tamil index, and The Room.

The 404 page is noindex and intentionally absent. Drafts do not generate detail routes or RSS items. Admin is excluded. Query-string enquiry variants canonicalise to /enquire/ and are not separate sitemap entries. RSS contains the three published collection articles; the service guide is discoverable through the sitemap and HTML links. Feed files, scripts, images and enquiry variants are not treated as content pages.

Canonical sitemap: https://porul.in/sitemap-index.xml
URL inventory: https://porul.in/sitemap-0.xml
Compatibility alias: /sitemap.xml -> /sitemap-index.xml (Cloudflare Pages redirect on deployment).

## Implemented

- Static Astro HTML: public text, links, FAQs, attribution and contact methods do not require JavaScript.
- Unique titles/descriptions, canonical URLs and page language.
- Organization, WebSite and WebPage JSON-LD; WhatsApp/email ContactPoint matches visible contact information.
- Article and breadcrumb entities on detail pages; Service and matching visible FAQ data on the GeM page.
- Direct WhatsApp and email paths work without the composer. The enhanced composer prepares a draft and never claims delivery.
- robots.txt allows public access for the general crawler group and explicit Googlebot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot, Claude-User, GPTBot and Google-Extended groups. Each preserves the admin exclusion.
- Sitemap and RSS discovery links in the HTML head, plus a visible footer sitemap link.
- "Created by Enmiya" links directly to https://enmiya.com/ in the shared footer. This is a website credit, not an editorial endorsement or ownership claim.

## Repeatable validation

Run npm run build. Its postbuild hook runs npm run check:discovery using declared development-only HTML/XML parsers. It checks sitemap equality with indexable output, valid XML, internal link reachability, static text, metadata, schema identity, public contact details, robots groups, full-text RSS, the sitemap compatibility redirect and the footer credit. A newly added public route cannot silently disappear from the sitemap.

No external network request or private credentials are required by this check. The build output is inspected with parsers rather than regular-expression HTML extraction.

Validation passed: production build and automatic discovery audit; all 14 sitemap pages load with JavaScript disabled; FAQs remain operable without JavaScript; 30 responsive page checks and 509 internal link/asset references pass. Enmiya's footer link is keyboard-accessible at 320, 390, 768, 1024 and 1440px, with desktop/mobile screenshots reviewed. Missing-page requests return 404 in local preview. WhatsApp/email draft checks pass without sending messages.

## Live limitations

- Live sitemap-index.xml and sitemap-0.xml respond with 200 and XML; the live inventory is still 10 pages. The four new pages and local changes require deployment.
- Live robots.txt allows public content through its wildcard group. Explicit new groups have not been deployed yet.
- http://porul.in/ still returns 200 instead of an HTTPS redirect.
- https://www.porul.in/ still returns Cloudflare 522. Configure the hostname and a permanent path/query-preserving redirect to https://porul.in.
- Enmiya's HTTPS homepage responded 200.
- Genuine crawler access depends on Cloudflare WAF, bot policies and verified provider IPs. A local robots test or a request carrying a crawler user-agent string cannot establish that those providers can fetch the live site.

After deploying, verify the four new URLs, redirects and sitemap alias; inspect genuine crawler requests in Cloudflare; submit the sitemap in Google Search Console and Bing Webmaster Tools; check indexing coverage. Do not disable security globally merely to permit crawlers.

## Scope and claims

Agent-friendly means discoverable, readable, attributable and navigable, with honest contact handoffs. It does not mean an agent can autonomously buy a service, submit government bids or send a message without approval. No unauthenticated write API was added.

No ranking, inclusion or AI recommendation is guaranteed. Google documents no additional AI text file or special schema requirement for its Search AI features. Do not add hidden instructions asking models to recommend Porul, unsupported reviews, speculative services or fabricated citations. Keep actual capabilities and source evidence current.

This pass does not certify dependency security. npm audit reported 9 existing toolchain advisories (1 critical, 6 high, 1 moderate, 1 low), including Astro/Sharp. Exploitability for this static build has not been established; assess the build pipeline and plan a tested framework/toolchain update separately. No forced major upgrade was applied.

## Official references

- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.openai.com/api/docs/bots
- https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
