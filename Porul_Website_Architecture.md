# PORUL.IN — Website Architecture Document

*The map of the Porul.in website. This document is written **before** any code and is the single source of truth for how the site is built, how its parts connect, and why each choice was made. Anyone — a future developer, a local AI on the founder's machine, or the founder themselves — should be able to read this and understand the entire system without anyone explaining it in person.*

*Read alongside: `Porul_Master_Document.md` (what the business is) and `Porul_Project_Instructions.md` (how to work on it).*

**Status:** Agreed foundation. Code is built against this document, file by file, documented as we go.

---

## 1. What we are building, in one paragraph

A fast, distinctive, fully-owned website for porul.in whose job is **credibility, evergreen reference, and light utility** — not daily news. The founder writes content in a familiar WordPress editor; a custom-designed front end renders it beautifully. The site is mostly stable structure with occasional new stories, so it needs very little maintenance. The frequent-publishing load (Tamil + long-form) lives separately on blog.porul.in.

---

## 2. The stack (and why each piece)

| Layer | Choice | Why this, in plain terms |
|---|---|---|
| **Front end** | **Astro** | Built specifically for content sites. Ships almost no JavaScript, so pages are fast and the code reads close to plain HTML — the easiest thing for a future developer or local AI to understand. Lower headache and fewer breakage surfaces than Next.js, which would be over-engineering for a credibility/reference site. |
| **Content backend** | **WordPress (headless)** | The founder already knows and runs WordPress. Content is authored there (no code, no Git needed to publish). Astro reads that content and renders it. Content stays portable — never locked inside code. |
| **How they connect** | **WordPress REST API** (built into WordPress, no plugin needed) | Astro fetches content from WordPress **at build time** and generates static pages. Simpler and more stable than GraphQL for our needs. |
| **Hosting (site)** | **Cloudflare Pages** (or Netlify — equivalent) | Free tier, global CDN, very fast, auto-deploys when we push code. Keeps the previous working version live if a build ever fails — a built-in safety net. |
| **Hosting (WordPress)** | **Existing host** for blog.porul.in | No change. WordPress stays where it is. |
| **Code storage** | **GitHub** | Holds the Astro code. Pushing to GitHub triggers an automatic deploy. Also the natural place a future developer/AI picks up the project. |

**The headache trade-off, stated honestly:** a custom site means that if something technical breaks while the founder is alone, it needs Claude (or a future developer/AI) to fix. This is accepted because (a) the main site changes rarely, so breakage opportunities are few, (b) the stack is deliberately boring and stable, and (c) the last working version stays live during any failed build.

---

## 3. How content flows (the most important diagram)

```
                    ┌─────────────────────────────┐
                    │   WordPress (one install)    │
                    │   The founder writes here.   │
                    └──────────────┬──────────────┘
                                   │
           ┌───────────────────────┴───────────────────────┐
           │                                                 │
   English content                                   Tamil + long-form
   (Story / Intelligence / Digest                    (own category)
    categories)                                              │
           │                                                 │
           ▼                                                 ▼
   Pulled via REST API at build time           Served directly by WordPress
           │                                    at  blog.porul.in
           ▼                                    (founder-run, normal WP theme)
   ┌─────────────────┐
   │   Astro build    │  ← turns content into fast static pages
   └────────┬────────┘
            ▼
   ┌─────────────────────────┐
   │  Cloudflare Pages (CDN)  │  →  porul.in  (the custom, owned front end)
   └─────────────────────────┘
```

**Write once, use in two places.** All content is authored in one WordPress. English pieces (tagged Story / Intelligence / Digest) are pulled into the Astro site at porul.in. Tamil and long-form pieces stay on blog.porul.in served by WordPress directly. The founder never edits code to publish.

**Auto-update:** when the founder publishes in WordPress, a webhook tells Cloudflare Pages to rebuild. The porul.in site updates by itself within a couple of minutes. Hands-off.

---

## 4. The content model (how content is organised in WordPress)

To keep things simple for a non-technical founder, v1 uses **WordPress categories on normal Posts** — no custom plugins, no code. Astro decides what to pull based on the category.

| Category | What it is | Where it appears |
|---|---|---|
| `Story` | A company story (narrative feature about a real TN CNC/precision manufacturer) | porul.in → Stories |
| `Intelligence` | A sector intelligence piece (analysis for procurement readers) | porul.in → Intelligence |
| `Digest` | The weekly published digest (the signal from the room, anonymised) | porul.in → Intelligence |
| `Tamil` (and others) | Tamil + long-form content | blog.porul.in only — **not** pulled into porul.in |

**Guardrail baked into the model:** there is no category, field, or page for supplier capability sheets, matchable directories, or a capacity board. Those are Menerix. The content model physically has no place to put them.

---

## 5. The v1 sitemap (six surfaces, each mapped to a job)

| Page | Path | Job | What's on it |
|---|---|---|---|
| **Home** | `/` | Credibility | Plain statement of what Porul.in is; latest few stories; latest digest. Restrained, serious tone (The Ken). |
| **Stories** | `/stories` and `/stories/[slug]` | Reference | The evergreen archive of company stories + each individual story. |
| **Intelligence** | `/intelligence` and `/intelligence/[slug]` | Reference + proof of life | Sector pieces and the published weekly digest. |
| **The Room** | `/room` | The network | What the network is; the two-question vetting ritual; the boundary line ("a room for information and relationships, not sourcing" — **no Menerix mention**). |
| **About** | `/about` | Credibility | Who's behind it and why it's credible — **without** publicly tying to Finbees. |
| **Blog** | external link | (founder-run) | Links out to blog.porul.in (Tamil + long-form). |

**Explicitly NOT built (walls held):**
- No Capacity Board (it's sourcing signal → Menerix).
- No supplier directory / matching / RFQ portal (→ Menerix).
- No public Menerix mention anywhere (breaks stealth).
- No Porul Index yet (held until the methodology is genuinely defensible — an honest number or none).
- No daily-news section (that's the treadmill we escaped).

---

## 6. Folder structure (what lives where, and why)

```
porul-website/
├── README.md              ← Start here. What this is, how to run it locally, how to deploy.
├── ARCHITECTURE.md         ← This document. The map.
├── package.json            ← Lists the project's dependencies.
├── astro.config.mjs        ← Astro configuration.
├── .env.example            ← Shows which secrets are needed (e.g. WORDPRESS_API_URL). Real values go in .env, never committed.
│
├── public/                 ← Static files served as-is: favicon, fonts, the copper-rule SVG.
│
└── src/
    ├── config/
    │   └── site.ts         ← Site-wide constants: name, tagline, navigation links, social URLs. Edit here to change them everywhere.
    │
    ├── lib/
    │   └── wordpress.ts    ← ALL communication with WordPress lives here, heavily commented. One file to understand how content is fetched.
    │
    ├── styles/
    │   └── tokens.css      ← Design tokens: colours, fonts, spacing, and the copper rule. The single place that defines how the site looks.
    │
    ├── components/         ← Reusable building blocks (Header, Footer, CopperRule, StoryCard, etc.). Each file does one visible thing.
    │
    ├── layouts/
    │   └── BaseLayout.astro ← The shared page shell (head tags, header, footer) every page uses.
    │
    └── pages/             ← Each file here becomes a page on the site. The folder structure mirrors the sitemap in Section 5.
        ├── index.astro            (Home)
        ├── stories/
        │   ├── index.astro        (Stories archive)
        │   └── [slug].astro       (one story)
        ├── intelligence/
        │   ├── index.astro        (Intelligence archive)
        │   └── [slug].astro       (one piece)
        ├── room.astro             (The Room)
        └── about.astro            (About)
```

**Documentation rule for every file:** each file begins with a short plain-English comment saying what it does and why it exists. Code is written boring and readable over clever. A future local AI or developer should understand it without the founder in the room.

---

## 7. Design tokens (the look, decided once)

| Token | Value | Notes |
|---|---|---|
| Headings font | **DM Serif Display** | Serious, editorial (The Ken / Bloomberg Businessweek feel). |
| Body font | **DM Sans** | Clean, highly readable. |
| Tamil font | **Noto Serif Tamil** | For any Tamil that appears. |
| Background | Warm off-white / cream | Calm, premium, not stark white. |
| Text | Near-black | High readability. |
| **Accent — the copper rule** | A 2px oxidised-copper line at the top of every page, email, and digest | The brand signature. Copper = machining. Costs nothing, takes no bandwidth, and becomes recognisably "Porul.in" over time (like The Economist's red bar). Exact hex finalised in the design pass. |

**Voice:** The Ken's seriousness + Finshots' clarity. Short, plain-language, no jargon for its own sake. Never daily cadence — content is evergreen and occasional.

---

## 8. How the founder makes common changes (no developer needed)

- **Publish a story:** write it in WordPress, set category `Story`, publish. porul.in updates itself within ~2 minutes.
- **Publish intelligence or a digest:** same, with category `Intelligence` or `Digest`.
- **Publish Tamil / long-form:** publish normally in WordPress; it appears on blog.porul.in. It does **not** touch porul.in.
- **Change a navigation link or the tagline:** this is a small code edit in `src/config/site.ts` — done with Claude.
- **Change the design:** a code edit in `src/styles/tokens.css` or a component — done with Claude.

The dividing line: **content = founder, alone, in WordPress. Structure and design = founder + Claude, in code, rarely.**

---

## 9. Build & deploy flow

1. Code lives on GitHub.
2. Pushing to GitHub triggers Cloudflare Pages to build the Astro site.
3. During the build, Astro pulls the latest English content from WordPress via the REST API and generates static pages.
4. The finished static site is served worldwide from Cloudflare's CDN at porul.in.
5. A webhook from WordPress also triggers this rebuild whenever the founder publishes, so content stays current without anyone touching code.
6. If a build fails, the previous working version stays live. No downtime.

---

## 10. What is deliberately out of scope for v1

Kept out to protect bandwidth and the walls — revisited only on proof of need:
- Logins, accounts, memberships, comments.
- Any matching, sourcing, directory, or capacity feature (→ Menerix, always).
- The Porul Index (until a defensible methodology exists).
- Display ads / programmatic (fails the revenue test).
- Bilingual main site (Tamil lives on the blog).

---

## 11. Handoff notes (for a future developer or local AI)

- Start with `README.md`, then this file, then `src/lib/wordpress.ts` to see how content is fetched, then `src/pages/` to see how pages are built.
- The site is a static Astro site reading a headless WordPress over its REST API at build time. There is no database or server to run for the front end.
- The business rules that constrain what this site may become are in `Porul_Master_Document.md` and `Porul_Project_Instructions.md`. The most important: **Porul.in informs and convenes; it never matches or fulfils. Anything that sources, matches, or builds a supplier directory belongs to Menerix and must not be added here.**

---

*End of architecture document. Build proceeds against this map, file by file, each documented as written.*
