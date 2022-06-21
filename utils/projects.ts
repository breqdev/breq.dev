import { listContentFiles, loadMarkdown } from "./api";

type ProjectInfo = {
  created: string;
};

export async function getSortedProjects() {
  const projects = await listContentFiles("projects");

  const data = await Promise.all(
    projects.map((project) => loadMarkdown<ProjectInfo>(project))
  );

  return data.sort((a, b) => parseFloat(b.created) - parseFloat(a.created));
}
