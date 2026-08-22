import rss from "@astrojs/rss";
import { getCollection, render } from "astro:content";
import { getDateObject, getPostUrl } from "../utils/dates";
import { getContainerRenderer } from "@astrojs/mdx/container-renderer";
import type { APIContext } from "astro";
import { loadRenderers } from "astro:container";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { transform, walk } from "ultrahtml";
import sanitize from "ultrahtml/transformers/sanitize";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");
  const projects = await getCollection("projects");

  const allItems = [...posts, ...projects]
    .map((item) => {
      if ("writeup" in item.data) {
        // project writeups store date in metadata
        return { date: item.data.writeup, item, link: `/projects/${item.id}` };
      } else {
        // blog posts store date in filename
        return {
          date: getDateObject(item.id),
          item,
          link: getPostUrl(item.id),
        };
      }
    })
    .sort(({ date: a }, { date: b }) => b.getTime() - a.getTime());

  // Content rendering approach taken from here:
  // https://github.com/delucis/astro-blog-full-text-rss/blob/latest/src/pages/rss.xml.ts
  let baseUrl = context.site?.href || "https://example.com";
  if (baseUrl.at(-1) === "/") baseUrl = baseUrl.slice(0, -1);

  const renderers = await loadRenderers([getContainerRenderer()]);
  const container = await AstroContainer.create({ renderers });

  return rss({
    title: "breq.dev",
    description:
      "hey, i'm brooke. this feed tracks blog posts and project writeups.",
    site: context.site!,
    stylesheet: "/rss/styles.xsl",

    items: await Promise.all(
      allItems.map(async ({ item, date, link }) => {
        const { Content } = await render(item);
        const rawContent = await container.renderToString(Content);

        const content = await transform(
          rawContent.replace(/^<!DOCTYPE html>/, ""),
          [
            async (node) => {
              await walk(node, (node) => {
                if (
                  node.name === "a" &&
                  node.attributes.href?.startsWith("/")
                ) {
                  node.attributes.href = baseUrl + node.attributes.href;
                }
                if (
                  node.name === "img" &&
                  node.attributes.src?.startsWith("/")
                ) {
                  node.attributes.src = baseUrl + node.attributes.src;
                }
              });
              return node;
            },
            sanitize({ dropElements: ["script", "style"] }),
          ],
        );

        return {
          title: item.data.title,
          description: item.data.description,
          pubDate: date,
          link: link,
          content: content,
        };
      }),
    ),
  });
}
