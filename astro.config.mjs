import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import tailwind from "@astrojs/tailwind";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeExpressiveCode from "rehype-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://aicheha.github.io",
  base: "astro-article",
  trailingSlash: "never",
  integrations: [
    expressiveCode(),
    mdx({
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeKatex,
        [
          rehypeExpressiveCode,
          {
            frames: {
              // Pour activer ou non le bouton copier
              showCopyToClipboardButton: true,
            },
            themes: ["github-dark", "github-light"],
          },
        ],
      ],
    }),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
