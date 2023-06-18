import React from "react";
import Balancer from "react-wrap-balancer";

import Page from "../components/Page";
import Markdown from "../components/markdown/Markdown";
import SEOHelmet from "../components/SEOHelmet";
import Comments from "../components/Comments";
import { getDateLabel } from "../utils/posts";
import {
  BasicMarkdownInfo,
  listContentFiles,
  loadMarkdown,
} from "../utils/api";
import { parse } from "path";
import { PostInfo } from "../utils/posts";
import { GetStaticPaths, GetStaticProps } from "next";

function PostHeader(props: BasicMarkdownInfo & PostInfo) {
  const date = getDateLabel(props.slug);

  return (
    <div className="relative z-0">
      <section className="relative z-10 mb-8 rounded-xl bg-black p-8 text-center font-display text-white dark:bg-gray-800">
        <SEOHelmet
          title={props.title + " - breq.dev"}
          description={props.description}
          image={props.image?.src || undefined}
        />
        <h1 className="mb-4 text-4xl md:text-6xl">
          <Balancer>{props.title}</Balancer>
        </h1>
        <p className="text-2xl">{date}</p>
      </section>
      <div className="absolute inset-0 z-0 translate-x-3 translate-y-2 transform rounded-xl bg-panpink" />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = await listContentFiles("posts");
  const names = files.map((file) => parse(file).name);
  const paths = names.map((name) => {
    let parts = name.split("-");
    return [parts[0], parts[1], parts[2], parts.slice(3).join("-")];
  });

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = (params?.slug as string[]).join("-");

  return {
    props: await loadMarkdown<PostInfo>(`posts/${slug}.md`, {
      loadBody: true,
    }),
  };
};

export default function Post(props: BasicMarkdownInfo & PostInfo) {
  return (
    <Page>
      <article className="mx-auto max-w-6xl p-4">
        <PostHeader {...props} />
        <Markdown content={props.body} />
      </article>
      <hr className="border-1 mx-auto my-4 max-w-4xl border-black" />
      <Comments />
    </Page>
  );
}
