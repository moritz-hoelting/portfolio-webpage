import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import matomo from "./src/integrations/matomo";

// https://astro.build/config
export default defineConfig({
    site: "https://hoelting.dev",
    trailingSlash: "always",
    integrations: [
        mdx(),
        sitemap(),
        solidJs(),
        tailwind({ applyBaseStyles: false }),
        matomo({
            enabled: import.meta.env.PROD, // only enable in production
            url: "https://analytics.hoelting.dev",
            siteId: 3,
            disableCookies: true,
            enableCrossDomainLinking: true,
            domains: ["*.hoelting.dev", "*.www.hoelting.dev"],
            respectDoNotTrack: true,
        }),
    ],
});
