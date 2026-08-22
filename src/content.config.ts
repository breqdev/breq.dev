import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ base: "./posts", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
  }),
});

const projects = defineCollection({
  loader: glob({ base: "./projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      created: z.int(),
      video: z.optional(z.string()),
      image: z.optional(image()),
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      demo: z.optional(z.string()),
      repo: z.optional(z.url()),
      writeup: z.date(),
      coauthors: z.optional(z.array(z.string())),
    }),
});

export const collections = { projects, posts };
