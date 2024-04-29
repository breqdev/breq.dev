import React from "react";
import Page from "../../components/Page";
import Link from "next/link";
import Markdown from "../../components/markdown/Markdown";
import SEOHelmet from "../../components/SEOHelmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { parse } from "path";
import { listContentFiles } from "../../utils/api";
import { BasicMarkdownInfo, loadMarkdown } from "../../utils/markdown";
import { GetStaticPaths, GetStaticProps } from "next";
import { WritingInfo } from "../../utils/writing";

export const getStaticPaths: GetStaticPaths = async () => {
  const files = await listContentFiles("writing");

  return {
    paths: files.map((file) => ({ params: { slug: parse(file).name } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: await loadMarkdown<WritingInfo>(`writing/${params?.slug}.mdx`, {
      loadBody: true,
    }),
  };
};

export default function Writing(props: BasicMarkdownInfo & WritingInfo) {
  const [acknowledged, setAcknowledged] = React.useState(
    props.content === null
  );

  return (
    <Page>
      <SEOHelmet
        title={props.title + " - breq.dev"}
        description={props.description}
      />
      <div>
        <section className="relative flex h-screen flex-col items-center justify-center bg-black font-display text-white">
          <h1 className="p-8 text-center text-5xl md:text-7xl">
            {props.title}
          </h1>
          <h2 className="text-xl">{props.date}</h2>
          {props.pdf && (
            <a
              className="absolute bottom-0 right-0 m-4 rounded-full p-4 text-gray-200 outline-none hover:underline focus:bg-panblue focus:text-white focus:underline"
              href={props.pdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              original pdf edition
              <FontAwesomeIcon className="ml-2" icon={faDownload} />
            </a>
          )}
        </section>
        {acknowledged ? (
          <article className="p-4">
            <Markdown content={props.body} />
          </article>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="flex flex-col gap-4 rounded-xl bg-panblue p-8 text-center font-body text-xl text-black">
              <h2 className="">
                This post has the following content warning
                {props.content.length > 1 && "s"}:
              </h2>
              <ul className="mx-auto max-w-max list-disc text-left">
                {props.content.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
              <p className="mb-4 mt-8">Would you like to proceed?</p>
              <div className="flex gap-4">
                <button
                  className="flex-grow rounded-xl border-2 border-black bg-panpink p-4 outline-none focus:border-white"
                  onClick={() => setAcknowledged(true)}
                >
                  Yes
                </button>
                <Link
                  href="/"
                  className="flex-grow rounded-xl border-2 border-black p-4 outline-none focus:border-white"
                >
                  No
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}
