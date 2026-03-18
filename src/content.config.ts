import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const work = defineCollection({
    loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        company: z.string(),
        role: z.string(),
        dateStart: z.date(),
        dateEnd: z.union([z.date(), z.string()]),
    }),
});

const education = defineCollection({
    loader: glob({ base: "./src/content/education", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        institution: z.string(),
        degree: z.string(),
        field: z.string().optional(),
        location: z.string().optional(),
        finalGrade: z.union([z.string(), z.number()]).optional(),
        dateStart: z.date(),
        dateEnd: z.union([z.date(), z.string()]),
    }),
});

const blog = defineCollection({
    loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        date: z.date(),
        tags: z.array(z.string()),
        draft: z.boolean().optional(),
    }),
});

const projects = defineCollection({
    loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
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

export const collections = { work, education, blog, projects };
