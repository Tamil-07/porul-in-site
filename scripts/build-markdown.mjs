// Build public Markdown equivalents and an allowlisted route manifest, never research files.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { XMLParser } from "fast-xml-parser";
import { toMarkdown } from "./markdown.mjs";
const dist = new URL("../dist/", import.meta.url);
const parser = new XMLParser();
const list = value => Array.isArray(value) ? value : [value];
const index = parser.parse(await readFile(new URL("sitemap-index.xml", dist), "utf8"));
const routes = {};
for (const sitemap of list(index.sitemapindex.sitemap)) {
  const doc = parser.parse(await readFile(new URL(new URL(sitemap.loc).pathname.slice(1), dist), "utf8"));
  for (const item of list(doc.urlset.url)) {
    const route = new URL(item.loc).pathname;
    const relative = route.slice(1) + "index";
    const html = await readFile(new URL(relative + ".html", dist), "utf8");
    await writeFile(new URL(relative + ".md", dist), toMarkdown(html, item.loc));
    routes[route] = route + "index.md";
  }
}
await writeFile(new URL("404.md", dist), "# Page not found\n\nThe requested page does not exist on Porul.in. Check the address or use the links below to find our public content.\n\n- [Homepage](https://porul.in/)\n- [Sitemap](https://porul.in/sitemap-index.xml)\n- [Agent guide](https://porul.in/llms.txt)\n");
await mkdir(new URL("../.generated/", import.meta.url), { recursive: true });
await writeFile(new URL("../.generated/routes.json", import.meta.url), JSON.stringify(routes, null, 2));
console.log(`Generated ${Object.keys(routes).length} Markdown pages and Markdown 404.`);
