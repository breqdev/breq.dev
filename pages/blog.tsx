import Link from "next/link";
import React from "react";
import Balancer from "react-wrap-balancer";

import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import {
  BasicMarkdownInfo,
  listContentFiles,
  loadMarkdown,
} from "../utils/api";
import { getDateLabel, getURL, PostInfo, slugComparator } from "../utils/posts";

function Post(props: PostInfo & BasicMarkdownInfo) {
  const date = getDateLabel(props.slug);

  return (
    <Link href={getURL(props.slug)} className="group relative outline-none">
      <section className="relative z-20 flex h-full flex-col rounded-2xl border-4 border-black bg-white p-4 text-black group-focus:border-panpink">
        <h2 className="mb-2 text-2xl">
          <Balancer>{props.title}</Balancer>
        </h2>
        <p>{date}</p>
        <div className="flex flex-grow flex-col justify-center">
          <hr className="my-1 border-black " />
        </div>
        <p>
          <Balancer>{props.description}</Balancer>
        </p>
      </section>
      <div className="absolute inset-0 z-10 transform rounded-2xl bg-panpink group-hover:translate-x-3 group-hover:translate-y-3 group-focus:translate-x-4 group-focus:translate-y-2 motion-safe:transition-transform" />
    </Link>
  );
}

export async function getStaticProps() {
  const posts = await listContentFiles("posts");

  const data = await Promise.all(
    posts.map((post) => loadMarkdown<PostInfo>(post))
  );

  const sorted = data.sort(slugComparator);

  return {
    props: {
      data: sorted,
    },
  };
}

export default function Posts({
  data,
}: {
  data: (PostInfo & BasicMarkdownInfo)[];
}) {
  const posts = data.map((data) => <Post key={data.filename} {...data} />);

  return (
    <Page className="bg-black text-white">
      <SEOHelmet title="Brooke's Blog: posts about tinkering with anything and everything" />
      <div className="mx-auto max-w-7xl text-center font-display">
        <h1 className="my-8 text-6xl">blog</h1>
        <div className="place-stretch m-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts}
        </div>
      </div>
    </Page>
  );
}
