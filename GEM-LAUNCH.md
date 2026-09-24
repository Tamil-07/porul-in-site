# GeM service launch - 2026-09-24

## Implemented journey

- Homepage now leads with the founder-approved MSME back-office identity. GeM is the first available service, with a dedicated landing page; other enquiry categories are reviewed for capability before any offer. Editorial stories remain separate.
- /gem-services/ describes registration, catalogue help, bid scope review, the quote process, Shreepriya's role and the independent-provider boundary.
- /guides/gem-seller-registration/ explains registration, catalogues and bidding with official sources and visible authorship/date.
- /enquire/ prepares a message for WhatsApp (+91 89393 57690) or email (hello@porul.in). It has native validation, known-intent preselection, copy fallback and direct contact links without JavaScript. Email is optional for WhatsApp users. Nothing is sent until the visitor sends the message. No credentials, identity documents or files are requested.
- /privacy/ explains how the enquiry works.
- Shared SEO exposes consistent Organization/WebSite identity, Service, FAQPage and breadcrumbs; the guide has Article data. FAQs and schema share one source.
- New routes enter Astro's sitemap. /sitemap.xml redirects to /sitemap-index.xml on Cloudflare Pages. Explicit OAI-SearchBot access preserves /admin/ exclusion.

## Commercial facts and limits

Founder-confirmed: GeM services are part of Porul, Tamil Nadu MSMEs are the initial audience, Shreepriya handles GeM portal work, hello@porul.in and WhatsApp +91 89393 57690 are public contacts.

Not confirmed: package pricing, turnaround, specific qualifications, guaranteed approvals, Tamil-language delivery and TN eProcurement delivery capability. None is advertised. TN enquiries are for an initial scope review.

## Before and after deployment

1. Review service scope with Shreepriya and verify the founder can receive and reply from hello@porul.in. A browser test cannot establish mailbox delivery.
2. Review the combined existing worktree changes before choosing what to commit; many editorial changes predate this task. Build and inspect the new pages before publishing. Pushing main is documented as triggering Cloudflare Pages.
3. After deployment, fetch /gem-services/, /enquire/, /guides/gem-seller-registration/, /privacy/, /robots.txt, /sitemap-index.xml and /sitemap.xml. Check HTTPS and www redirects, and inspect the live HTML for canonical/JSON-LD consistency. An allowed user-agent string alone does not prove genuine crawler IPs pass the WAF.
4. Submit https://porul.in/sitemap-index.xml in Google Search Console and Bing Webmaster Tools. Request indexing for the service page and guide. Verify access for Googlebot and OAI-SearchBot in Cloudflare crawl controls.
5. Send and receive one real enquiry from mobile and desktop. Record qualified enquiries, quotes, deposits and completed work. Preparing or copying an email is not a conversion.
6. Review indexed coverage and search queries (GeM registration help, product listing support and Tamil Nadu service intent). Record AI citations as observations, without promising a ranking or recommendation date.

## Next evidence that can improve discovery

Publish customer-permitted examples only after delivery: the original issue, Porul's scope, the work completed and its limits. Link the service page from Porul's real LinkedIn identity and relevant association listings when authorised. These mentions and actual customer evidence are not replaced by technical markup.

Server-delivered lead capture is deferred until an email delivery service and credentials are available. Do not add a third-party form collector silently. The current composer is deliberately labelled as email preparation and includes a copy fallback for devices without a mail handler.

## Verification completed locally

Back-office correction rechecked on 2026-09-24: 30 responsive checks across five widths, 15 HTML pages and 494 local links/assets passed. All six non-GeM intents prepare an enquiry without GeM status; switching to a GeM intent restores its required status field and switching back excludes stale status. Desktop/mobile screenshots and the broader social card were reviewed. Images decode successfully. These checks did not send email or verify mailbox delivery.

- Production build passed: 15 HTML pages plus RSS and sitemap.
- Browser checks passed at 320, 390, 768, 1024 and 1440px on Home, GeM services, Enquire, the registration guide, Privacy and About (30 responsive checks).
- All 15 built pages have unique titles/descriptions, one H1, valid JSON-LD and no duplicate IDs. All 442 checked internal link/asset references resolve.
- FAQ text and FAQPage answers match exactly; Service and Article entities are present; new routes are in the sitemap and canonicals exclude enquiry query parameters.
- Enquiry checks passed: required fields, intent preselection, generated email content, explicit unsent state, copy-denied fallback, ignored unknown service keys, no browser storage and JavaScript-disabled email fallback. No test emails were sent.
- Mobile menu/Escape and FAQ keyboard operation passed; no browser page errors were observed. Desktop/mobile screenshots and the social card were visually reviewed.
- Local preview: http://127.0.0.1:4325/ (production build).

## Live infrastructure still requiring action

Rechecked 2026-09-24: http://porul.in/ returns 200 instead of redirecting; https://www.porul.in/ returns 522. The apex HTTPS sitemap returns 200 and live robots.txt allows public crawling. The new service routes have not been deployed.

Cloudflare release tasks: enable HTTP-to-HTTPS redirection and configure the www hostname/DNS with a permanent path-preserving redirect to https://porul.in. Verify query preservation and a one-hop 301/308 response. A static code change cannot repair a hostname that fails before reaching Pages. No Cloudflare account settings were modified in this task.

## Official references

- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.openai.com/api/docs/bots
- https://elearning.gem.gov.in/course/index.php?categoryid=2
- https://www.tntenders.gov.in/nicgep/app?page=BiddersManualKit&service=page

Google documents no special requirements or AI text files for its Search AI features. ChatGPT search uses OAI-SearchBot, independently of GPTBot training. These controls make content accessible; they do not guarantee that ChatGPT or Gemini recommends Porul. FAQ structured data is not a promise of a Google FAQ rich result.
