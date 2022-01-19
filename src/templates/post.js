import React from "react";
import { graphql } from "gatsby";

import Page from "../components/Page";
import Markdown from "../components/markdown/Markdown";
import SEOHelmet from "../components/SEOHelmet";
import Comments from "../components/Comments";
import parseDate from "../utils/parseDate";

function PostHeader({ data }) {
  const date = parseDate(data.mdx.slug);

  return (
    <div className="relative z-0">
      <section className="bg-black dark:bg-gray-800 text-white rounded-xl text-center font-display p-8 mb-8 z-10 relative">
        <SEOHelmet
          title={data.mdx.frontmatter.title + " - breq.dev"}
          description={data.mdx.frontmatter.description}
        />
        <h1 className="text-4xl md:text-6xl mb-4">
          {data.mdx.frontmatter.title}
        </h1>
        <p className="text-2xl">{date}</p>
      </section>
      <div className="absolute inset-0 z-0 rounded-xl bg-panpink transform translate-x-3 translate-y-2" />
    </div>
  );
}

export default function Post({ data }) {
  return (
    <Page>
      <article className="max-w-6xl mx-auto p-4">
        <PostHeader data={data} />
        <Markdown>{data.mdx.body}</Markdown>
      </article>
      <hr className="max-w-4xl mx-auto border-black border-1 my-4" />
      <Comments />
    </Page>
  );
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      body
      slug
      frontmatter {
        title
        description
      }
    }
  }
`;
