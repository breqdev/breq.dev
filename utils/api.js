import fs from "fs/promises";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import imageSize from "image-size";
import { join, parse } from "path";

export async function listContentFiles(path) {
  return (await fs.readdir(path, { withFileTypes: true }))
    .filter((file) => file.isFile())
    .filter((file) => file.name.endsWith(".md") || file.name.endsWith(".mdx"))
    .map((file) => file.name)
    .map((file) => join(path, file));
}

export async function loadImage(src) {
  if (!src) {
    return {};
  }

  const { width, height } = await new Promise((resolve, reject) => {
    imageSize(join("public", src), (err, dimensions) => {
      if (err) reject(err);
      resolve(dimensions);
    });
  });

  return {
    src,
    width,
    height,
  };
}

export async function loadMarkdown(path, { loadBody = false }) {
  const filedata = await fs.readFile(path, "utf8");
  const { data: frontmatter, content: body } = matter(filedata);

  return {
    ...frontmatter,
    filename: path,
    slug: parse(path).name,
    body: loadBody ? await serialize(body) : null,
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
