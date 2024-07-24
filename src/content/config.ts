import { defineCollection, z } from "astro:content";

const articlesCollection = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    folder: z.string().default("articles"),
  }),
});

const pagesCollection = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    cover: z.string().optional(),
    folder: z.string().default(""),
  }),
});

export const collections = {
  articles: articlesCollection,
  pages: pagesCollection,
};
