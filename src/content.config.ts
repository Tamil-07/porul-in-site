import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const sourceSchema = z.object({
  label: z.string(),
  url: z.string().url()
});

const editorialBase = (image: () => ReturnType<import("astro:content").ImageFunction>) => ({
  title: z.string(),
  slug: z.string(),
  dek: z.string(),
  publishDate: z.date(),
  updatedDate: z.date().optional(),
  heroImage: image().optional(),
  heroImageAlt: z.string(),
  readingMinutes: z.number(),
  sponsored: z.boolean().default(false),
  draft: z.boolean().default(true)
});

const intelligenceCategories = ["materials", "capacity", "policy", "demand", "digest"] as const;

const stories = defineCollection({
  // Markdown stays in Git so the future CMS edits plain files and the site
  // keeps the PRD's no-database, no-lock-in promise.
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/stories" }),
  schema: ({ image }) => z.object({
    ...editorialBase(image),
    location: z.string(),
    company: z.string()
  })
});

const intelligence = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/intelligence" }),
  schema: ({ image }) => z.object({
    ...editorialBase(image),
    location: z.string(),
    category: z.enum(intelligenceCategories),
    sources: z.array(sourceSchema).optional()
  })
});

const tamil = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tamil" }),
  schema: ({ image }) => z.object({
    ...editorialBase(image),
    location: z.string(),
    category: z.enum(intelligenceCategories),
    sources: z.array(sourceSchema).optional(),
    lang: z.literal("ta").default("ta")
  })
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    dek: z.string(),
    draft: z.boolean().default(true)
  })
});

export const collections = { stories, intelligence, tamil, pages };
