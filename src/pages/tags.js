import { graphql, Link } from "gatsby";
import React from "react";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

export default function Tag({ data }) {
  return (
    <Page className="bg-black text-white">
      <SEOHelmet title="the archives by tag: projects, posts, and more i've made, with <3." />
      <div className="text-center max-w-7xl mx-auto font-display">
        <h1 className="my-8 text-6xl">tags</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-stretch m-8">
          {data.allMdx.group
            .sort((a, b) => b.totalCount - a.totalCount)
            .map(({ tag, totalCount }) => (
              <Link
                key={tag}
                className="flex flex-col bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl p-4 border-black border-4 focus:border-panpink"
                to={`/tags/${tag}`}
              >
                <h2 className="text-4xl self-start">{tag}</h2>
                <p className="self-end text-gray-500">
                  ({totalCount} {totalCount === 1 ? "entry" : "entries"})
                </p>
              </Link>
            ))}
        </div>
      </div>
    </Page>
  );
}

export const query = graphql`
  {
    allMdx {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;
