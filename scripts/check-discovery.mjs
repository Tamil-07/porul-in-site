import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "parse5";
import { XMLParser, XMLValidator } from "fast-xml-parser";

// Inspect built output, not route filenames: content collections add routes at build time.
const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const origin = "https://porul.in";
const xmlParser = new XMLParser({ ignoreAttributes: false });
const array = value => value == null ? [] : Array.isArray(value) ? value : [value];
const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value;
const children = node => [node, ...(node.childNodes ?? []).flatMap(children)];
const content = node => node.nodeName === "#text" ? node.value : (node.childNodes ?? []).map(content).join("");
const select = (nodes, tag, name, value) => nodes.filter(node =>
  node.tagName === tag && (!name || attr(node, name) === value));

async function filesIn(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(name));
    else if (entry.name.endsWith(".html")) files.push(name);
  }
  return files;
}

async function xmlFile(name) {
  const text = await readFile(path.join(dist, name), "utf8");
  assert.equal(XMLValidator.validate(text), true, `Malformed XML: ${name}`);
  return xmlParser.parse(text);
}

const sitemapIndex = await xmlFile("sitemap-index.xml");
const sitemapUrls = [];
for (const sitemap of array(sitemapIndex.sitemapindex?.sitemap)) {
  const url = new URL(sitemap.loc);
  assert.equal(url.origin, origin, "Unexpected sitemap host");
  const document = await xmlFile(url.pathname.slice(1));
  sitemapUrls.push(...array(document.urlset?.url).map(item => item.loc));
}
assert.ok(sitemapUrls.length > 0, "Empty sitemap");
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, "Duplicate sitemap URL");
const publicUrls = [];
const documents = new Map();
const titles = new Set();
const descriptions = new Set();

for (const file of await filesIn(dist)) {
  const relative = path.relative(dist, file).split(path.sep).join("/");
  const route = relative === "index.html" ? "/" : "/" + relative.replace(/index\.html$/, "");
  const url = new URL(route, origin).href;
  const nodes = children(parse(await readFile(file, "utf8")));
  documents.set(url, nodes);
  const canonical = select(nodes, "link", "rel", "canonical");
  assert.equal(canonical.length, 1, `Canonical count: ${route}`);
  assert.equal(attr(canonical[0], "href"), url, `Noncanonical URL: ${route}`);
  assert.equal(select(nodes, "h1").length, 1, `H1 count: ${route}`);
  const main = select(nodes, "main")[0];
  assert.ok(main && content(main).trim().length > 80, `Missing static content: ${route}`);
  const title = content(select(nodes, "title")[0]);
  const description = attr(select(nodes, "meta", "name", "description")[0], "content");
  assert.ok(title && !titles.has(title), `Missing/duplicate title: ${route}`);
  assert.ok(description && !descriptions.has(description), `Missing/duplicate description: ${route}`);
  titles.add(title);
  descriptions.add(description);
  const robots = attr(select(nodes, "meta", "name", "robots")[0], "content") ?? "";
  if (!robots.includes("noindex")) {
    publicUrls.push(url);
    assert.ok(!/nosnippet|max-snippet:\s*0/.test(robots), `Snippet blocked: ${route}`);
  }
  const ids = nodes.map(node => attr(node, "id")).filter(Boolean);
  assert.equal(new Set(ids).size, ids.length, `Duplicate HTML IDs: ${route}`);
  const graph = select(nodes, "script", "type", "application/ld+json")
    .flatMap(node => JSON.parse(content(node))["@graph"]);
  const organization = graph.find(node => node["@type"] === "Organization");
  assert.equal(organization?.contactPoint?.url, "https://wa.me/918939357690");
  assert.equal(organization?.email, "hello@porul.in");
  assert.ok(graph.some(node => node["@type"] === "WebSite"), `Missing WebSite: ${route}`);
  assert.ok(graph.some(node => node["@type"] === "WebPage" && node["@id"] === url), `Missing WebPage: ${route}`);
  const graphIds = graph.map(node => node["@id"]).filter(Boolean);
  assert.equal(new Set(graphIds).size, graphIds.length, `Duplicate schema IDs: ${route}`);
  const footer = children(select(nodes, "footer")[0]);
  const credit = select(footer, "a", "href", "https://enmiya.com/")[0];
  assert.equal(content(credit), "Enmiya", `Missing footer credit: ${route}`);
  assert.ok(!/(nofollow|sponsored)/.test(attr(credit, "rel") ?? ""), "Credit should be an ordinary link");
  assert.equal(attr(select(nodes, "link", "rel", "sitemap")[0], "href"), origin + "/sitemap-index.xml");
  assert.equal(attr(select(nodes, "link", "type", "application/rss+xml")[0], "href"), origin + "/rss.xml");
}

// Equality catches both missing public routes and accidentally indexed private/error pages.
assert.deepEqual([...sitemapUrls].sort(), [...publicUrls].sort(), "Sitemap does not match indexable HTML");
for (const url of sitemapUrls) {
  assert.ok(!new URL(url).search, "Query variants do not belong in sitemap");
  assert.ok(!new URL(url).pathname.startsWith("/admin"), "Admin is not public content");
}

// Every public page must be reachable through HTML links, not only via its sitemap.
const reached = new Set();
const queue = [origin + "/"];
while (queue.length) {
  const url = queue.shift();
  if (reached.has(url)) continue;
  reached.add(url);
  for (const link of select(documents.get(url) ?? [], "a")) {
    const href = attr(link, "href");
    if (!href) continue;
    const target = new URL(href, url);
    target.hash = "";
    target.search = "";
    if (documents.has(target.href) && !reached.has(target.href)) queue.push(target.href);
  }
}
for (const url of publicUrls) assert.ok(reached.has(url), `Orphan page: ${url}`);

const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
for (const agent of ["*", "Googlebot", "OAI-SearchBot", "ChatGPT-User", "GPTBot", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Claude-User", "Google-Extended"]) {
  const group = robots.split(/\n\s*\n/).find(block => block.split("\n").includes(`User-agent: ${agent}`));
  assert.ok(group?.includes("Allow: /\n"), `Public crawl not allowed: ${agent}`);
  assert.ok(group?.includes("Disallow: /admin/"), `Admin exclusion missing: ${agent}`);
}
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap-index.xml`));
const redirects = await readFile(path.join(dist, "_redirects"), "utf8");
assert.ok(redirects.includes("/sitemap.xml /sitemap-index.xml 301"));
const rss = await xmlFile("rss.xml");
const items = array(rss.rss?.channel?.item);
for (const item of items) {
  assert.ok(sitemapUrls.includes(item.link), `RSS item missing from sitemap: ${item.link}`);
  assert.ok(item["content:encoded"], `RSS full text missing: ${item.link}`);
}
console.log(JSON.stringify({
  publicPages: publicUrls.length,
  sitemapUrls: sitemapUrls.length,
  rssArticles: items.length,
  checks: ["sitemap equality", "static HTML", "internal discoverability", "metadata",
    "page and contact schema", "crawler policy", "RSS", "Enmiya credit"]
}, null, 2));
