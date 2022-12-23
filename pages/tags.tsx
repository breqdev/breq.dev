import Link from "next/link";
import React from "react";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import { getTags } from "../utils/tags";

export async function getStaticProps() {
  return {
    props: {
      tags: await getTags(),
    },
  };
}

export default function Tag({ tags }: { tags: Record<string, number> }) {
  return (
    <Page className="bg-black text-white">
      <SEOHelmet title="the archives by tag: projects, posts, and more i've made, with <3." />
      <div className="mx-auto max-w-7xl text-center font-display">
        <h1 className="my-8 text-6xl">tags</h1>
        <div className="place-stretch m-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Object.entries(tags)
            .sort(([, a], [, b]) => b - a)
            .map(([tag, count]) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="flex flex-col rounded-2xl border-4 border-black bg-white p-4 text-black focus:border-panpink dark:bg-gray-800 dark:text-white"
              >
                <h2 className="self-start text-4xl">{tag}</h2>
                <p className="self-end text-gray-500">
                  ({count} {count === 1 ? "entry" : "entries"})
                </p>
              </Link>
            ))}
        </div>
      </div>
    </Page>
  );
}
