import rss from "@astrojs/rss";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import type { APIContext } from "astro";
import { getCollection, render } from "astro:content";
import CommercialDisclosure from "@/components/CommercialDisclosure.astro";

// Text is used in HTML content and XML customData. Escape it before inserting
// either context; Astro separately escapes the shared disclosure component.
const escapeText = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);

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
      const body = await container.renderToString(Content);
      const disclosure = await container.renderToString(CommercialDisclosure, { props: entry.data });
      const producer = entry.data.authorship === "partner" ? entry.data.producerName! : `${entry.data.author} · ${entry.data.authorRole}`;
      const fundingLabels = [
        ...(entry.data.sponsored ? [`Sponsored · ${entry.data.sponsorName}`] : []),
        ...(entry.data.authorship === "partner" ? [`Partner content · ${entry.data.producerName}`] : [])
      ];
      const content = `${disclosure}<p>By ${escapeText(producer)}</p>${body}`;
      return {
        title: entry.data.title,
        description: [...fundingLabels, entry.data.dek].join(" — "),
        content,
        customData: `<dc:creator>${escapeText(producer)}</dc:creator>`,
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
    xmlns: { dc: "http://purl.org/dc/elements/1.1/" },
    customData: "<language>en-IN</language>"
  });
}
