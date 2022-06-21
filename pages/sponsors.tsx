import React from "react";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// Ko-fi has no API
const KOFI_SPONSORS: string[] | null = null;

export default function Sponsors() {
  const { data } = useSWR("https://sponsors.breq.workers.dev/", fetcher);

  return (
    <Page className="bg-black text-white">
      <SEOHelmet title="Sponsors" />
      <div className="mx-auto w-full max-w-xl py-8">
        <h1 className="text-center font-display text-6xl">Sponsors</h1>
        <p className="my-4 mt-8 font-body text-2xl">
          Generous contributions from these people help support my work. Thank
          you!
        </p>
        <div className="mt-16 flex flex-row flex-wrap justify-center gap-4">
          {[
            ...(data?.sponsors?.map?.((sponsor: string) => (
              <a
                key={sponsor}
                target="_blank"
                rel="noreferrer noopener"
                href={`https://github.com/${sponsor}`}
                className="flex flex-col items-center gap-4 rounded-2xl bg-white p-4 text-lg text-black"
              >
                <Image
                  src={`https://github.com/${sponsor}.png`}
                  alt=""
                  width={112}
                  height={112}
                />
                {sponsor}
              </a>
            )) || []),
            ...(KOFI_SPONSORS?.map?.((sponsor: string) => (
              <div
                key={sponsor}
                className="flex flex-col items-center gap-4 rounded-2xl bg-white p-4 text-lg text-black"
              >
                <div className="flex h-28 w-28 items-center justify-center text-6xl text-panpink">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                {sponsor}
              </div>
            )) || []),
          ]}
        </div>
        <p className="mt-16 font-body text-2xl">
          If you've gotten value from my work, and you have the means, consider
          supporting my work on one of these platforms:
        </p>
        <div className="my-6 flex gap-4 font-display text-2xl">
          <a
            href="https://github.com/sponsors/Breq16"
            target="_blank"
            rel="noreferrer noopener"
            className="flex w-full flex-grow items-center rounded-full bg-gray-200 py-4 px-6 text-center text-black"
          >
            <span className="flex-grow">GitHub Sponsors</span>
            <FontAwesomeIcon icon={faHeart} />
          </a>
          <a
            href="https://ko-fi.com/breqdev"
            target="_blank"
            rel="noreferrer noopener"
            className="flex w-full flex-grow items-center rounded-full bg-panblue py-4 px-6 text-center text-black"
          >
            <span className="flex-grow">Ko-Fi</span>
            <Image
              src="/images/logo/ko-fi.png"
              className="-my-2 w-12"
              alt=""
              width={12 * 4}
              height={12 * 4}
            />
          </a>
        </div>
      </div>
    </Page>
  );
}
