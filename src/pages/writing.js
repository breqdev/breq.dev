import React from "react";
import Page from "../components/Page";
import { graphql, Link } from "gatsby";
import SEOHelmet from "../components/SEOHelmet";

function Card(props) {
  return (
    <Link
      to={"/writing/" + props.slug}
      className="block bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-2xl border-black border-4 focus:border-panpink outline-none"
    >
      <section className="font-display">
        <h2 className="text-3xl">{props.frontmatter.title}</h2>
        <p className="italic">{props.frontmatter.date}</p>
        <hr className="my-2 border-black" />
        <p>{props.frontmatter.description}</p>
      </section>
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
      <div className="text-center max-w-7xl mx-auto font-display">
        <h1 className="my-8 text-6xl">writing</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-stretch m-8">
          {writing}
        </div>
      </div>
    </Page>
  );
}

export const query = graphql`
  query {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/writing/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          slug
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`;
