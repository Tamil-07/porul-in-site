# Decisions

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
