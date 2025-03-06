import React from "react";
import SEOHelmet from "../components/SEOHelmet";

import Page from "../components/Page";
import ProjectCard from "../components/ProjectCard";
import { getSortedProjects, ProjectInfo } from "../utils/projects";
import { BasicMarkdownInfo } from "../utils/markdown";
import { GetStaticProps } from "next";

export default function Projects({
  data,
}: {
  data: (BasicMarkdownInfo & ProjectInfo)[];
}) {
  const groups: Record<number, JSX.Element[]> = {};

  data.forEach((project) => {
    const group = parseInt(project.created);

    if (!(group in groups)) {
      groups[group] = [];
    }

    groups[group].push(<ProjectCard key={project.filename} {...project} />);
  });

  return (
    <Page className="bg-black text-white">
      <SEOHelmet title="Projects I've made, with <3." />
      <div className="mx-auto max-w-7xl text-center font-display">
        <h1 className="my-8 text-6xl">projects</h1>
        {Object.entries(groups)
          .sort(([a, _], [b, __]) => parseInt(b) - parseInt(a))
          .map(([year, projects]) => (
            <div key={year} className="flex flex-col">
              <hr className="mx-16 -mb-5 mt-4" />
              <h2 className="-mb-4 text-4xl">
                <span className="bg-black px-2">{year}</span>
              </h2>
              <div className="place-stretch m-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects}
              </div>
            </div>
          ))}
      </div>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      data: await getSortedProjects(),
    },
  };
};
