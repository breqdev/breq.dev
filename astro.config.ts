// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
// @ts-ignore
import remarkAbcjs from "remark-abcjs";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import { remarkReadingTime } from "./src/utils/remarkReadingTime";
import { h } from "hastscript";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],

  markdown: {
    // use Prism for broader language support
    syntaxHighlight: "prism",

    processor: unified({
      remarkPlugins: [remarkReadingTime, remarkMath, remarkAbcjs],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            content: () =>
              h(
                "span",
                {
                  class: "anchor",
                },
                "#",
              ),
            headingProperties: { class: "group" },
            properties: { class: "relative" },
          },
        ],
        rehypeKatex,
      ],
    }),
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Nunito",
      cssVariable: "--font-nunito",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Libre Franklin",
      cssVariable: "--font-libre-franklin",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Fira Code",
      cssVariable: "--font-fira-code",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Nunito Sans",
      cssVariable: "--font-nunito-sans",
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  site: "https://breq.dev/",
});
