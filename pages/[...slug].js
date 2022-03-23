import React from "react";

import Page from "../components/Page";
import Markdown from "../components/markdown/Markdown";
import SEOHelmet from "../components/SEOHelmet";
import Comments from "../components/Comments";
import parseDate from "../utils/parseDate";

function PostHeader({ data }) {
  const date = parseDate(data.mdx.slug);

  return (
    <div className="relative z-0">
      <section className="relative z-10 mb-8 rounded-xl bg-black p-8 text-center font-display text-white dark:bg-gray-800">
        <SEOHelmet
          title={data.mdx.frontmatter.title + " - breq.dev"}
          description={data.mdx.frontmatter.description}
        />
        <h1 className="mb-4 text-4xl md:text-6xl">
          {data.mdx.frontmatter.title}
        </h1>
        <p className="text-2xl">{date}</p>
      </section>
      <div className="absolute inset-0 z-0 translate-x-3 translate-y-2 transform rounded-xl bg-panpink" />
    </div>
  );
}

export default function Post({ data }) {
  return (
    <Page>
      <article className="mx-auto max-w-6xl p-4">
        <PostHeader data={data} />
        <Markdown>{data.mdx.body}</Markdown>
      </article>
      <hr className="border-1 mx-auto my-4 max-w-4xl border-black" />
      <Comments />
    </Page>
  );
}

// export const query = graphql`
//   query ($id: String) {
//     mdx(id: { eq: $id }) {
//       body
//       slug
//       frontmatter {
//         title
//         description
//       }
//     }
//   }
// `;
