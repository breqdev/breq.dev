import { listContentFiles } from "./api";
import { loadMarkdown } from "./markdown";
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

export async function getSortedProjects(options?: {
  loadBody?: boolean;
  mode?: string;
}) {
  const projects = await listContentFiles("projects");

  const data = await Promise.all(
    projects.map((project) => loadMarkdown<ProjectInfo>(project, options))
  );

  return data.sort((a, b) => parseFloat(b.created) - parseFloat(a.created));
}
