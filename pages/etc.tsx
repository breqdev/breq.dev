import React from "react";
import Link from "next/link";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function EtcBlock({
  page,
  title,
  children,
  external,
}: {
  page: string;
  title: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  let content = (
    <>
      <div className="relative z-10 rounded-xl border-2 border-black bg-white p-4 text-black group-focus:border-panpink">
        <h2 className="mb-2 text-center font-display text-3xl">{title}</h2>
        <p className="text-center font-body">{children}</p>
      </div>
      <div className="absolute inset-0 transform rounded-xl bg-panpink transition-transform group-hover:translate-x-3 group-hover:translate-y-2 group-focus:translate-x-3 group-focus:translate-y-2" />
    </>
  );

  if (external) {
    return (
      <a href={page} className="group relative z-0 outline-none">
        {content}
      </a>
    );
  } else {
    return (
      <Link href={page} className="group relative z-0 outline-none">
        {content}
      </Link>
    );
  }
}

export default function Etc() {
  const { data } = useSWR("https://sponsors.breq.workers.dev/", fetcher);

  return (
    <Page>
      <SEOHelmet title="all the other things." />
      <div className="mx-auto my-8 max-w-xl">
        <h1 className="text-center font-display text-5xl">
          all the other things
        </h1>
        <div className="my-8 mx-4 flex flex-col gap-8">
          <EtcBlock title="browse tags" page="/tags">
            projects and blog posts, categorized by tag.
          </EtcBlock>
          <EtcBlock title="my resume" page="/resume.pdf" external>
            download my current resume.
          </EtcBlock>
          <EtcBlock title="status page" page="/status">
            view the uptime status of any of my gazillion side projects.
          </EtcBlock>
          <EtcBlock title="design reference" page="/design">
            fonts, colors, names, and other for my brand.
          </EtcBlock>
          {data?.sponsors?.length ? (
            <EtcBlock title="sponsors" page="/sponsors">
              supporters of my work. thank you!
            </EtcBlock>
          ) : null}
        </div>
      </div>
    </Page>
  );
}
