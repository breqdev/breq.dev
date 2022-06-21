import { listContentFiles, loadMarkdown } from "./api";

type TaggedContent = {
  tags: string[];
};

export async function getTags(): Promise<Record<string, number>> {
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
  }, {} as Record<string, number>);

  return tags;
}

export async function getPostsByTag(tag: string) {
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
