import fs from "fs/promises";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import { join, parse } from "path";

import remarkMath from "remark-math";
import remarkAbcjs from "remark-abcjs";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeImgSize from "rehype-img-size";
import { ImageInfo, loadImage } from "./images";
import { MDXRemoteSerializeResult } from "next-mdx-remote/dist/types";

export async function listContentFiles(path: string) {
  return (await fs.readdir(path, { withFileTypes: true }))
    .filter((file) => file.isFile())
    .filter((file) => file.name.endsWith(".md") || file.name.endsWith(".mdx"))
    .map((file) => file.name)
    .map((file) => join(path, file));
}

export type BasicMarkdownInfo = {
  filename: string;
  slug: string;
  source: string;
  body: MDXRemoteSerializeResult | null;
  image: ImageInfo | null;
};

export async function loadMarkdown<FrontmatterType extends {}>(
  path: string,
  { loadBody = false } = {}
): Promise<BasicMarkdownInfo & FrontmatterType> {
  const filedata = await fs.readFile(path, "utf8");
  const { data: frontmatter, content: body } = matter(filedata);

  const mdx = loadBody
    ? await serialize(body, {
        mdxOptions: {
          remarkPlugins: [remarkMath, remarkAbcjs, remarkUnwrapImages],
          rehypePlugins: [
            rehypeKatex as any,
            [rehypeImgSize, { dir: "public/images" }],
            rehypeSlug,
          ],
        },
      })
    : null;

  return {
    ...(frontmatter as FrontmatterType),
    filename: path,
    slug: parse(path).name,
    source: parse(path).dir,
    body: mdx,
    image: await loadImage(frontmatter.image),
    date: frontmatter.date
      ? new Date(frontmatter.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null,
  };
}
