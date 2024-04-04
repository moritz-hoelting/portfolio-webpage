import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@consts";

type Context = {
    site: string;
};

export async function GET(context: Context) {
    const posts = (await getCollection("blog")).map((item) => ({
        item,
        pre: "blog",
    }));
    const projects = (await getCollection("projects")).map((item) => ({
        item,
        pre: "projects",
    }));

    const items = [...posts, ...projects].filter(
        ({ item }) => !item.data.draft
    );

    items.sort(
        (a, b) =>
            new Date(b.item.data.date).getTime() -
            new Date(a.item.data.date).getTime()
    );

    return rss({
        title: SITE.TITLE,
        description: SITE.DESCRIPTION,
        site: context.site,
        items: items.map(({ item, pre }) => ({
            title: item.data.title,
            description: item.data.summary,
            pubDate: item.data.date,
            link: `/${pre}/${item.slug}/`,
        })),
    });
}
