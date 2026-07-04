import { defineConfig } from "astro/config";

// Porul.in is intentionally static-only so Cloudflare Pages can serve it from
// the free edge tier with no server, database, or patching surface.
export default defineConfig({
  site: "https://porul.in",
  output: "static",
  trailingSlash: "always"
});
