import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    canonical: z.string().optional(),
    canonicalSource: z.string().optional(),
    xImpressions: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const speakingPress = defineCollection({
  loader: file("./src/data/speaking-press.yaml"),
  schema: z.object({
    id: z.string(),
    type: z.enum(["talk", "podcast", "interview", "press", "feature"]),
    title: z.string(),
    source: z.string(),
    date: z.string().optional(),
    links: z
      .array(z.object({ label: z.string(), url: z.string() }))
      .default([]),
  }),
});

export const collections = { blog, speakingPress };