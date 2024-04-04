import { defineCollection, z } from "astro:content";

const work = defineCollection({
    type: "content",
    schema: z.object({
        company: z.string(),
        role: z.string(),
        dateStart: z.date(),
        dateEnd: z.union([z.date(), z.string()]),
    }),
});

const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        date: z.date(),
        tags: z.array(z.string()),
        draft: z.boolean().optional(),
    }),
});

const projects = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        date: z.date(),
        tags: z.array(z.string()),
        draft: z.boolean().optional(),
        demoUrl: z.string().optional(),
        repoUrl: z.string().optional(),
    }),
});

export const collections = { work, blog, projects };
