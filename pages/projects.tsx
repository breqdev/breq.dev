import React from "react";
import SEOHelmet from "../components/SEOHelmet";

import Page from "../components/Page";
import ProjectCard from "../components/ProjectCard";
import { getSortedProjects, ProjectInfo } from "../utils/projects";
import { BasicMarkdownInfo } from "../utils/api";
import { GetStaticProps } from "next";

export default function Projects({
  data,
}: {
  data: (BasicMarkdownInfo & ProjectInfo)[];
}) {
  const projects = data.map((data) => (
    <ProjectCard key={data.filename} {...data} />
  ));

  return (
    <Page className="bg-black text-white">
      <SEOHelmet title="projects i've made, with <3." />
      <div className="mx-auto max-w-7xl text-center font-display">
        <h1 className="my-8 text-6xl">projects</h1>
        <div className="place-stretch m-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects}
        </div>
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
