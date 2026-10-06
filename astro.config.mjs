// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { satteri } from "@astrojs/markdown-satteri";

import headingSlugs from "./src/lib/heading-slugs.js";
import externalBlank from "./src/lib/external-blank.js";

const THEME = "dracula-soft";

export default defineConfig({
  site: "https://danfarrelly.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    "/blog/about/": "/about",
  },
  markdown: {
    shikiConfig: {
      theme: THEME,
      transformers: [
        {
          // The theme's background is #fff; no token color in it is, so this
          // only repaints the block to match an unhighlighted <pre>.
          name: "pre-background",
          pre(node) {
            const style = node.properties?.style;
            if (typeof style === "string") {
              node.properties.style = style.replace(
                "background-color:#fff",
                "background-color:#f0f5f9",
              );
            }
          },
        },
      ],
    },
    processor: satteri({
      features: {
        // Marked (the previous renderer) passed straight quotes through as-is.
        smartPunctuation: false,
      },
      hastPlugins: [headingSlugs, externalBlank],
    }),
  },
});
