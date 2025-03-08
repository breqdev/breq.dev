import React from "react";
import Link from "next/link";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faAddressCard,
  faCameraAlt,
  faCirclePlay,
  faGaugeHigh,
  faHeart,
  faPenRuler,
  faPencil,
  faRss,
  faSection,
  faSquareRss,
  faTags,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function EtcBlock({
  page,
  title,
  children,
  external,
  icon,
}: {
  page: string;
  title: string;
  children: React.ReactNode;
  external?: boolean;
  icon: IconDefinition;
}) {
  let content = (
    <>
      <div className="relative z-10 flex h-full flex-row gap-4 rounded-xl border-2 border-black bg-white p-4 text-black group-focus:border-panpink">
        <FontAwesomeIcon className="text-5xl" icon={icon} />
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-3xl">{title}</h2>
          <p className="font-body">{children}</p>
        </div>
      </div>
      <div className="absolute inset-0 transform rounded-xl bg-panpink group-hover:translate-x-3 group-hover:translate-y-2 group-focus:translate-x-3 group-focus:translate-y-2 motion-safe:transition-transform" />
    </>
  );

  if (external) {
    return (
      <a href={page} className="group relative z-0 h-full outline-none">
        {content}
      </a>
    );
  } else {
    return (
      <Link href={page} className="group relative z-0 h-full outline-none">
        {content}
      </Link>
    );
  }
}

export default function Etc() {
  const { data } = useSWR("https://sponsors.breq.workers.dev/", fetcher);

  return (
    <Page>
      <SEOHelmet title="Everything Else - breq.dev" />
      <div className="mx-auto my-8 max-w-2xl">
        <h1 className="text-center font-display text-5xl">
          all the other things
        </h1>
        <div className="mx-4 my-8 grid grid-cols-1 place-items-stretch gap-8 md:grid-cols-2">
          <EtcBlock title="photos" page="/photos" icon={faCameraAlt}>
            various photos i've taken and edited.
          </EtcBlock>
          <EtcBlock title="writing" page="/writing" icon={faPencil}>
            miscellaneous old assorted writing projects.
          </EtcBlock>
          <EtcBlock title="blogroll" page="/blogroll" icon={faRss}>
            my favorite rss feeds from friends and acquaintances.
          </EtcBlock>
          <EtcBlock title="colophon" page="/colophon" icon={faSection}>
            information about how i develop and host this site.
          </EtcBlock>
          <EtcBlock title="rss feed" page="/follow" icon={faSquareRss}>
            subscribe to blog posts and project writeups.
          </EtcBlock>
          <EtcBlock title="app launcher" page="/apps" icon={faCirclePlay}>
            open any of my web-based projects.
          </EtcBlock>
          <EtcBlock
            title="vcard (.vcf)"
            page="/vcard/breq.vcf"
            external
            icon={faAddressCard}
          >
            import my info into your contacts app.
          </EtcBlock>
          <EtcBlock
            title="my resume"
            page="/resume.pdf"
            external
            icon={faFileLines}
          >
            download my current resume.
          </EtcBlock>
          <EtcBlock title="status page" page="/status" icon={faGaugeHigh}>
            view the uptime of my gazillion side projects.
          </EtcBlock>
          <EtcBlock title="design sheet" page="/design" icon={faPenRuler}>
            reference fonts, colors, and names for my brand.
          </EtcBlock>
          {data?.sponsors?.length ? (
            <EtcBlock title="sponsors" page="/sponsors" icon={faHeart}>
              supporters of my work. thank you!
            </EtcBlock>
          ) : null}
        </div>
      </div>
    </Page>
  );
}
