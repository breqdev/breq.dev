import React from "react";
import Link from "next/link";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

export default function Tag({ data, pageContext }) {
  return (
    <Page className="bg-black text-white">
      <SEOHelmet title={`${pageContext.tag} - the archives of breq`} />
      <div className="mx-auto max-w-7xl text-center font-display">
        <h1 className="my-8 text-6xl">{pageContext.tag} - entries</h1>
        <div className="place-stretch m-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.allMdx.edges.map(({ node }) => (
            <Link key={node.id} href={node.fields.slug}>
              <a className="flex flex-col gap-2 rounded-3xl border-2 border-black bg-white p-4 text-black focus:border-panpink dark:bg-gray-800 dark:text-white">
                <h2 className="text-2xl">{node.frontmatter.title}</h2>
                <p>{node.frontmatter.description}</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Page>
  );
}

// export const query = graphql`
//   query ($tag: String) {
//     allMdx(
//       filter: { frontmatter: { tags: { eq: $tag } } }
//       sort: { fields: [frontmatter___created, frontmatter___date], order: DESC }
//     ) {
//       edges {
//         node {
//           id
//           frontmatter {
//             title
//             description
//           }
//           fields {
//             slug
//             type
//           }
//         }
//       }
//     }
//   }
// `;
