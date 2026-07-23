import rss from "@astrojs/rss";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import type { APIContext } from "astro";
import { getCollection, render } from "astro:content";

export async function GET(context: APIContext) {
  const [stories, intelligence, tamil] = await Promise.all([
    getCollection("stories", ({ data }) => !data.draft),
    getCollection("intelligence", ({ data }) => !data.draft),
    getCollection("tamil", ({ data }) => !data.draft)
  ]);

  const entries = [
    ...stories.map((entry) => ({ entry, path: `/stories/${entry.data.slug}/`, category: "Company stories" })),
    ...intelligence.map((entry) => ({ entry, path: `/intelligence/${entry.data.slug}/`, category: "Intelligence" })),
    ...tamil.map((entry) => ({ entry, path: `/ta/${entry.data.slug}/`, category: "Tamil" }))
  ].sort((a, b) => b.entry.data.publishDate.getTime() - a.entry.data.publishDate.getTime());

  const container = await AstroContainer.create();
  const items = await Promise.all(
    entries.map(async ({ entry, path, category }) => {
      // Content comes from the reviewed Git collection, so rendering the full
      // article into RSS does not introduce an untrusted HTML input surface.
      const { Content } = await render(entry);
      const content = await container.renderToString(Content);
      return {
        title: entry.data.title,
        description: entry.data.dek,
        content,
        link: path,
        pubDate: entry.data.publishDate,
        categories: [category]
      };
    })
  );

  return rss({
    title: "Porul.in",
    description: "Company stories and sector intelligence from Tamil Nadu precision engineering.",
    site: context.site,
    items,
    customData: "<language>en-IN</language>"
  });
}
