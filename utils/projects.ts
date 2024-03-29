import { listContentFiles, loadMarkdown } from "./api";
import { ImageInfo } from "./images";

export type ProjectInfo = {
  created: string;
  video?: string;
  image?: ImageInfo;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  demo?: string;
  repo?: string;
  writeup: string; // ISO date
};

export async function getSortedProjects() {
  const projects = await listContentFiles("projects");

  const data = await Promise.all(
    projects.map((project) => loadMarkdown<ProjectInfo>(project))
  );

  return data.sort((a, b) => parseFloat(b.created) - parseFloat(a.created));
}
