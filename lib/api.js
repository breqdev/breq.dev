import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

import remarkMath from "remark-math";
import remarkAbcjs from "remark-abcjs";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeImgSize from "rehype-img-size";

export async function getAllFiles(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });

  return files
    .filter((file) => file.isFile())
    .map((file) => file.name)
    .map((file) => path.parse(file))
    .map((path) => path.name);
}

export async function getContent(dir, filename) {
  let file;

  try {
    file = await fs.readFile(path.join(dir, filename + ".mdx"), "utf8");
  } catch (error) {
    file = await fs.readFile(path.join(dir, filename + ".md"), "utf8");
  }

  const { data, content } = matter(file);

  return {
    data,
    content: await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkMath, remarkAbcjs, remarkUnwrapImages],
        rehypePlugins: [
          rehypeSlug,
          rehypeKatex,
          [rehypeImgSize, { dir: "public" }],
        ],
      },
    }),
  };
}
