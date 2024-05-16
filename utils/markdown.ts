import fs from "fs/promises";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import { parse } from "path";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkAbcjs from "remark-abcjs";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeImgSize from "rehype-img-size";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import { ImageInfo, loadImage } from "./images";
import { MDXRemoteSerializeResult } from "next-mdx-remote/dist/types";

export type BasicMarkdownInfo = {
  filename: string;
  slug: string;
  source: string;
  url: string;
  body: MDXRemoteSerializeResult | null;
  image: ImageInfo | null;
};

function getURL(path: string) {
  if (parse(path).dir === "posts") {
    const slug = parse(path).name;
    const [year, month, date, ...rest] = slug.split("-");
    return `/${year}/${month}/${date}/${rest.join("-")}`;
  } else {
    return `/${parse(path).dir}/${parse(path).name}`;
  }
}

export async function loadMarkdown<FrontmatterType extends {}>(
  path: string,
  { loadBody = false, mode = "full" } = {}
): Promise<BasicMarkdownInfo & FrontmatterType> {
  const filedata = await fs.readFile(path, "utf8");
  const { data: frontmatter, content: body } = matter(filedata);

  const mdx = loadBody
    ? await serialize(body, {
        mdxOptions: {
          remarkPlugins: [
            remarkGfm,
            remarkMath,
            remarkAbcjs,
            remarkUnwrapImages,
          ],
          rehypePlugins: [
            rehypeMdxCodeProps as any,
            [
              rehypeKatex as any,
              // RSS readers only like MathML
              { output: mode === "full" ? "htmlAndMathml" : "mathml" },
            ],
            [rehypeImgSize as any, { dir: "public/images" }],
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
    url: getURL(path),
    body: mdx,
    image: await loadImage(frontmatter.image),
    writeup:
      frontmatter.writeup instanceof Date
        ? frontmatter.writeup.toISOString()
        : frontmatter.writeup || null,
    date: frontmatter.date
      ? new Date(frontmatter.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null,
  };
}

("math");
