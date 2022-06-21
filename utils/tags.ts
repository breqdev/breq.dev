import { listContentFiles, loadMarkdown } from "./api";

type TaggedContent = {
  tags: string[];
};

export async function getTags() {
  const projects = [
    ...(await listContentFiles("projects")),
    ...(await listContentFiles("posts")),
  ];

  const data = await Promise.all(
    projects.map((file) => loadMarkdown<TaggedContent>(file))
  );

  const tags = data.reduce((acc, { tags }) => {
    tags.forEach((tag) => {
      if (!acc[tag]) {
        acc[tag] = 0;
      }

      acc[tag] += 1;
    });

    return acc;
  }, {});

  return tags;
}

export async function getPostsByTag(tag) {
  const projects = [
    ...(await listContentFiles("projects")),
    ...(await listContentFiles("posts")),
  ];

  const data = await Promise.all(
    projects.map((file) => loadMarkdown<TaggedContent>(file))
  );

  const posts = data.filter((post) => post.tags.includes(tag));

  return posts;
}
