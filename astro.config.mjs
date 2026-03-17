import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@tailwindcss/vite";
import solidJs from "@astrojs/solid-js";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import matomo from "./src/integrations/matomo";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://hoelting.dev",
  trailingSlash: "always",

  integrations: [
      mdx(),
      sitemap(),
      solidJs(),
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

  markdown: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
  },

  vite: {
    plugins: [tailwindcss({ applyBaseStyles: false })],
  },
});
