import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// Porul.in is intentionally static-only so Cloudflare Pages can serve it from
// the free edge tier with no server, database, or patching surface.
export default defineConfig({
  site: "https://porul.in",
  output: "static",
  trailingSlash: "always",
  // Only canonical public documents belong in the sitemap. Drafts are excluded
  // by getStaticPaths; the build audit also rejects any noindex document here.
  // Admin is reserved for future private editing work.
  integrations: [sitemap({
    filter: (page) => {
      const path = new URL(page).pathname;
      return path !== "/admin" && !path.startsWith("/admin/") && !["/404/", "/404.html"].includes(path);
    }
  })],
  adapter: cloudflare()
});
