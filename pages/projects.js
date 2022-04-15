import React from "react";
import SEOHelmet from "../components/SEOHelmet";

import Page from "../components/Page";
import ProjectCard from "../components/ProjectCard";
import { listContentFiles, loadMarkdown } from "../utils/api";

export default function Projects({ data }) {
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

export async function getStaticProps() {
  const projects = await listContentFiles("projects");

  const data = await Promise.all(projects.map(loadMarkdown));

  return {
    props: {
      data,
    },
  };
}

// export const query = graphql`
//   query {
//     allMdx(
//       filter: { fileAbsolutePath: { regex: "/projects/" } }
//       sort: { fields: [frontmatter___created], order: DESC }
//     ) {
//       edges {
//         node {
//           id
//           slug
//           frontmatter {
//             title
//             description
//             tags
//             image {
//               childImageSharp {
//                 gatsbyImageData(
//                   width: 1000
//                   placeholder: BLURRED
//                   formats: [AUTO, WEBP, AVIF]
//                 )
//               }
//             }
//             video
//           }
//         }
//       }
//     }
//   }
// `;
