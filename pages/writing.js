import React from "react";
import Page from "../components/Page";
import Link from "next/link";
import SEOHelmet from "../components/SEOHelmet";

function Card(props) {
  return (
    <Link href={"/writing/" + props.slug}>
      <a className="block rounded-2xl border-4 border-black bg-white p-4 text-black outline-none focus:border-panpink dark:bg-gray-800 dark:text-white">
        <section className="font-display">
          <h2 className="text-3xl">{props.frontmatter.title}</h2>
          <p className="italic">{props.frontmatter.date}</p>
          <hr className="my-2 border-black" />
          <p>{props.frontmatter.description}</p>
        </section>
      </a>
    </Link>
  );
}

export default function Writing({ data }) {
  const writing = data.allMdx.edges.map(({ node }) => (
    <Card key={node.id} {...node} />
  ));

  return (
    <Page className="bg-black text-white">
      <SEOHelmet title="words i've written, with <3." />
      <div className="mx-auto max-w-7xl text-center font-display">
        <h1 className="my-8 text-6xl">writing</h1>
        <div className="place-stretch m-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {writing}
        </div>
      </div>
    </Page>
  );
}

// export const query = graphql`
//   query {
//     allMdx(
//       filter: { fileAbsolutePath: { regex: "/writing/" } }
//       sort: { fields: [frontmatter___date], order: DESC }
//     ) {
//       edges {
//         node {
//           id
//           slug
//           frontmatter {
//             title
//             date(formatString: "MMMM DD, YYYY")
//             description
//           }
//         }
//       }
//     }
//   }
// `;
