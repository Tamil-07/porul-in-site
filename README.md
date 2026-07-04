# Porul.in

Porul.in is a curated network and credibility engine for Tamil Nadu CNC machining and precision engineering. The public website exists to prove credibility, publish evergreen company stories and sector intelligence, and later support light utility without becoming a directory, marketplace, RFQ portal, or lead-generation machine.

## Local Development

```bash
npm i
npm run dev
```

Build the static site with:

```bash
npm run build
```

Cloudflare Pages will eventually run the same `npm run build` command on pushes to `main`.

## Deployment Model

The PRD locks the site to static output on Cloudflare Pages. Content will live as Markdown/MDX in Git in later stages, so publishing is a commit and deploy rather than a database write.

## Fonts And Images

Fonts must live in `public/fonts/` as `.woff2` files and be declared in `src/styles/fonts.css`. Runtime font CDNs are not allowed because local fonts protect Core Web Vitals and keep the site inside the zero-recurring-cost rule.

Real photography should be placed under `src/assets/` or `public/` in later stages depending on whether Astro image optimization is needed. Placeholder photography must carry the required `REPLACE: real licensed photography` comment wherever it appears.

## Hard Rules From The PRD

- **R1 — No directory structures.** No supplier listings, no capability tables, no filterable/searchable company database, no "find a manufacturer" feature, no RFQ submission forms. Company stories are narrative journalism only.
- **R2 — No fake scale.** No invented metrics, follower counts, member counts, tickers, testimonials, or placeholder stats presented as real. If a number appears on the site, the founder supplied it. Empty states are honest ("Stories are published as they are reported — no treadmill.").
- **R3 — No display-ad infrastructure.** No AdSense, no programmatic slots. Sponsorship is editorial and sold directly (see §7).
- **R4 — Zero recurring cost.** The stack must run entirely on free tiers. The only annual bill is the domain.
- **R5 — Zero-maintenance bias.** No databases, no servers, no plugins, nothing that needs patching. Static output only.
- **R6 — Everything documented.** Every config file and non-obvious code block carries comments explaining *why*, written so a future developer or a local AI can maintain the project without help. See §11.

## Stage Status

Stage 1 foundation is the only implemented scope in this pass: Astro scaffold, design tokens, self-hosted font declarations, layout shell, navigation, footer, and the archived v3 reference.
