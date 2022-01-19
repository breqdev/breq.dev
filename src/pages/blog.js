import { graphql, Link } from "gatsby";
import React from "react";

import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import parseDate from "../utils/parseDate";

function Post(props) {
  const date = parseDate(props.slug);

  return (
    <Link
      to={"/" + props.slug.replace(/-/g, "/")}
      className="block bg-white text-black p-4 rounded-2xl outline-none border-4 border-black focus:border-panpink"
    >
      <section className="flex flex-col h-full">
        <h2 className="text-2xl mb-2">{props.frontmatter.title}</h2>
        <p>{date}</p>
        <div className="flex-grow flex flex-col justify-center">
          <hr className="my-1 border-black " />
        </div>
        <p>{props.frontmatter.description}</p>
      </section>
    </Link>
  );
}

export default function Posts({ data }) {
  const posts = data.allMdx.edges.map(({ node }) => (
    <Post key={node.id} {...node} />
  ));

  return (
    <Page className="bg-black text-white">
      <SEOHelmet title="blog. ramblings about nothing in particular." />
      <div className="text-center max-w-7xl mx-auto font-display">
        <h1 className="my-8 text-6xl">posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-stretch m-8">
          {posts}
        </div>
      </div>
    </Page>
  );
}

export const query = graphql`
  query {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { fields: slug, order: DESC }
    ) {
      edges {
        node {
          id
          slug
          frontmatter {
            title
            description
          }
        }
      }
    }
  }
`;
