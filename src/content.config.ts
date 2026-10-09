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
  author: z.literal("Porul.in").default("Porul.in"),
  authorRole: z.literal("Editorial").default("Editorial"),
  publishDate: z.date(),
  updatedDate: z.date().optional(),
  heroImage: image().optional(),
  heroImageAlt: z.string(),
  heroImageCaption: z.string().optional(),
  readingMinutes: z.number(),
  sponsored: z.boolean().default(false),
  sponsorName: z.string().trim().min(1).optional(),
  sponsorInvolvement: z.string().trim().min(1).optional(),
  authorship: z.enum(["porul", "partner"]).default("porul"),
  producerName: z.string().trim().min(1).optional(),
  draft: z.boolean().default(true)
});

// Funding and authorship remain independent. Drafts may be incomplete, but
// publishing commercial material requires its visible disclosure fields.
const validateDisclosure = (data: { draft: boolean; sponsored: boolean; sponsorName?: string; sponsorInvolvement?: string; authorship: string; producerName?: string }, context: z.RefinementCtx) => {
  if (data.draft) return;
  const required = data.sponsored ? ["sponsorName", "sponsorInvolvement"] : [];
  if (data.authorship === "partner") required.push("producerName");
  for (const field of required) {
    if (!data[field as keyof typeof data]) context.addIssue({ code: z.ZodIssueCode.custom, path: [field], message: `${field} is required for published commercial content.` });
  }
};

const intelligenceCategories = ["materials", "capacity", "policy", "demand", "digest"] as const;

const stories = defineCollection({
  // Markdown stays in Git so the future CMS edits plain files and the site
  // keeps the PRD's no-database, no-lock-in promise.
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/stories" }),
  schema: ({ image }) => z.object({
    ...editorialBase(image),
    location: z.string(),
    company: z.string(),
    reportingNote: z.string().optional(),
    verificationNote: z.string().optional()
  }).superRefine(validateDisclosure)
});

const intelligence = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/intelligence" }),
  schema: ({ image }) => z.object({
    ...editorialBase(image),
    location: z.string(),
    category: z.enum(intelligenceCategories),
    keyTakeaway: z.string().optional(),
    sources: z.array(sourceSchema).optional()
  }).superRefine(validateDisclosure)
});

const tamil = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tamil" }),
  schema: ({ image }) => z.object({
    ...editorialBase(image),
    location: z.string(),
    category: z.enum(intelligenceCategories),
    keyTakeaway: z.string().optional(),
    sources: z.array(sourceSchema).optional(),
    lang: z.literal("ta").default("ta")
  }).superRefine(validateDisclosure)
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
