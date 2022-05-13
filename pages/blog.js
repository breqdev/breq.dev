import Link from "next/link";
import React from "react";

import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import { listContentFiles, loadMarkdown } from "../utils/api";
import parseDate from "../utils/parseDate";

function Post(props) {
  const date = parseDate(props.slug);

  return (
    <Link href={"/" + props.slug.replace(/-/g, "/")}>
      <a className="block rounded-2xl border-4 border-black bg-white p-4 text-black outline-none focus:border-panpink">
        <section className="flex h-full flex-col">
          <h2 className="mb-2 text-2xl">{props.title}</h2>
          <p>{date}</p>
          <div className="flex flex-grow flex-col justify-center">
            <hr className="my-1 border-black " />
          </div>
          <p>{props.description}</p>
        </section>
      </a>
    </Link>
  );
}

export async function getStaticProps() {
  const posts = await listContentFiles("posts");

  const data = await Promise.all(posts.map(loadMarkdown));

  const sorted = data.sort(
    (a, b) =>
      parseFloat(b.slug.replace(/-/, "")) - parseFloat(a.slug.replace(/-/, ""))
  );

  return {
    props: {
      data: sorted,
    },
  };
}

export default function Posts({ data }) {
  const posts = data.map((data) => <Post key={data.filename} {...data} />);

  return (
    <Page className="bg-black text-white">
      <SEOHelmet title="blog. ramblings about nothing in particular." />
      <div className="mx-auto max-w-7xl text-center font-display">
        <h1 className="my-8 text-6xl">posts</h1>
        <div className="place-stretch m-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts}
        </div>
      </div>
    </Page>
  );
}
