import React from "react";
import { Link } from "gatsby";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

function EtcBlock(props) {
  return (
    <Link to={props.page} className="relative z-0 group outline-none">
      <div className="rounded-xl border-2 border-black group-focus:border-panpink bg-white text-black p-4 relative z-10">
        <h2 className="font-display text-3xl text-center mb-2">
          {props.title}
        </h2>
        <p className="font-body text-center">{props.children}</p>
      </div>
      <div className="absolute inset-0 rounded-xl bg-panpink transform group-hover:translate-x-3 group-hover:translate-y-2 group-focus:translate-x-3 group-focus:translate-y-2 transition-transform" />
    </Link>
  );
}

export default function Etc() {
  const { data: sponsors } = useSWR(
    "https://sponsors.breq.workers.dev/",
    fetcher
  );

  return (
    <Page>
      <SEOHelmet title="all the other things." />
      <div className="mx-auto max-w-xl my-8">
        <h1 className="text-5xl font-display text-center">
          all the other things
        </h1>
        <div className="flex flex-col gap-8 my-8 mx-2">
          <EtcBlock title="status page" page="/status">
            view the uptime status of any of my gazillion side projects.
          </EtcBlock>
          <EtcBlock title="design reference" page="/design">
            fonts, colors, names, and other for my brand.
          </EtcBlock>
          <EtcBlock title="contact me" page="/contact">
            ways to contact me.
          </EtcBlock>
          {sponsors?.length && (
            <EtcBlock title="sponsors" page="/sponsors">
              supporters of my work. thank you!
            </EtcBlock>
          )}
        </div>
      </div>
    </Page>
  );
}
