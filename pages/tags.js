import Link from "next/link";
import React from "react";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

export default function Tag({ data }) {
  return (
    <Page className="bg-black text-white">
      <SEOHelmet title="the archives by tag: projects, posts, and more i've made, with <3." />
      <div className="mx-auto max-w-7xl text-center font-display">
        <h1 className="my-8 text-6xl">tags</h1>
        <div className="place-stretch m-8 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {data.allMdx.group
            .sort((a, b) => b.totalCount - a.totalCount)
            .map(({ tag, totalCount }) => (
              <Link key={tag} href={`/tags/${tag}`}>
                <a className="flex flex-col rounded-2xl border-4 border-black bg-white p-4 text-black focus:border-panpink dark:bg-gray-800 dark:text-white">
                  <h2 className="self-start text-4xl">{tag}</h2>
                  <p className="self-end text-gray-500">
                    ({totalCount} {totalCount === 1 ? "entry" : "entries"})
                  </p>
                </a>
              </Link>
            ))}
        </div>
      </div>
    </Page>
  );
}

// export const query = graphql`
//   {
//     allMdx {
//       group(field: frontmatter___tags) {
//         tag: fieldValue
//         totalCount
//       }
//     }
//   }
// `;
