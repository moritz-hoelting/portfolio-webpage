import { OGImageRoute } from "astro-og-canvas";

import { getCollection } from "astro:content";

const projects = Object.fromEntries(
    (await getCollection("projects"))
        .filter((project) => !project.data.draft)
        .map((project) => [
            "projects/" + project.slug,
            {
                title: project.data.title,
                description: project.data.summary,
            },
        ])
);
const blogs = Object.fromEntries(
    (await getCollection("blog"))
        .filter((blog) => !blog.data.draft)
        .map((blog) => [
            "blog/" + blog.slug,
            {
                title: blog.data.title,
                description: blog.data.summary,
            },
        ])
);

export const { getStaticPaths, GET } = OGImageRoute({
    param: "route",

    // A collection of pages to generate images for.
    // The keys of this object are used to generate the path for that image.
    pages: {
        ...projects,
        ...blogs,
    },
    // For each page, this callback will be used to customize the OpenGraph image.
    getImageOptions: (_, page) => ({
        title: page.title,
        description: page.description,
        bgImage: {
            path: "./src/images/open-graph-background.png",
            fit: "cover",
        },
        logo: {
            path: "./src/images/me.jpg",
            size: [300],
        },
        // There are a bunch more options you can use here!
    }),
});
