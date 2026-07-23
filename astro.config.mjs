import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Porul.in is intentionally static-only so Cloudflare Pages can serve it from
// the free edge tier with no server, database, or patching surface.
export default defineConfig({
  site: "https://porul.in",
  output: "static",
  trailingSlash: "always",
  // Admin is a private editing surface in Stage 5; excluding it here keeps the
  // public sitemap policy correct before that static route is added.
  integrations: [sitemap({ filter: (page) => !new URL(page).pathname.startsWith("/admin/") })]
});
