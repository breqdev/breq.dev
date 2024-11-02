import Link from "next/link";
import React from "react";

import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import { listContentFiles } from "../utils/api";
import { BasicMarkdownInfo, loadMarkdown } from "../utils/markdown";
import { getDateLabel, PostInfo, slugComparator } from "../utils/posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRssSquare } from "@fortawesome/free-solid-svg-icons";

function Post(props: PostInfo & BasicMarkdownInfo) {
  const date = getDateLabel(props.slug);

  return (
    <Link href={props.url} className="group relative outline-none">
      <section className="relative z-20 flex h-full flex-col gap-1 rounded-2xl border-4 border-black bg-white p-4 text-left text-black group-focus:border-panpink md:gap-0">
        <h2 className="text-2xl md:mb-2 md:text-4xl">{props.title}</h2>
        <p className="flex-shrink-0 text-left text-sm text-gray-800 md:hidden">
          {date}
        </p>
        <p className="md:text-lg">{props.description}</p>
        <div className="mt-2 hidden flex-row gap-2 md:flex">
          <p className="self-center">{date}</p>
          <div className="my-1.5 w-0.5 self-stretch bg-gray-200" />
          {props.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-block whitespace-nowrap rounded-full bg-panblue-light px-3 py-1 text-sm text-black"
            >
              {tag}
            </span>
          ))}
        </div>
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
      <div className="mx-auto max-w-5xl text-center font-display">
        <div className="my-8 flex flex-col items-center gap-4 px-4">
          <h1 className="text-6xl">blog posts</h1>
          <p className="text-xl">
            available via{" "}
            <a
              href="https://breq.dev/rss.xml"
              className="font-bold text-orange-300"
            >
              <FontAwesomeIcon
                icon={faRssSquare}
                className="-mb-px -mr-0.5 ml-0.5"
              />{" "}
              rss
            </a>
            , and updated when i feel like it.
          </p>
        </div>
        <div className="flex flex-col gap-6 p-4">{posts}</div>
      </div>
    </Page>
  );
}
