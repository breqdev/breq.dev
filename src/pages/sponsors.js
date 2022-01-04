import React from "react";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { StaticImage } from "gatsby-plugin-image";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

// Ko-fi has no API
const KOFI_SPONSORS = null;

export default function Sponsors() {
  const { data } = useSWR("https://sponsors.breq.workers.dev/", fetcher);

  return (
    <Page className="bg-black text-white">
      <SEOHelmet title="Sponsors" />
      <div className="max-w-xl mx-auto w-full py-8">
        <h1 className="text-6xl font-display text-center">Sponsors</h1>
        <p className="text-2xl my-4 font-body mt-8">
          Generous contributions from these people help support my work. Thank
          you!
        </p>
        <div className="flex flex-row flex-wrap gap-4 justify-center mt-16">
          {[
            ...(data?.sponsors?.map?.((sponsor) => (
              <a
                key={sponsor}
                target="_blank"
                rel="noreferrer noopener"
                href={`https://github.com/${sponsor}`}
                className="bg-white text-black p-4 rounded-2xl flex flex-col items-center gap-4 text-lg"
              >
                <img
                  src={`https://github.com/${sponsor}.png`}
                  alt=""
                  className="w-28 h-28"
                />
                {sponsor}
              </a>
            )) || []),
            ...(KOFI_SPONSORS?.map?.((sponsor) => (
              <div
                key={sponsor}
                className="bg-white text-black p-4 rounded-2xl flex flex-col items-center gap-4 text-lg"
              >
                <div className="w-28 h-28 flex items-center justify-center text-6xl text-panpink">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                {sponsor}
              </div>
            )) || []),
          ]}
        </div>
        <div className="flex mt-16 font-display text-2xl gap-4">
          <a
            href="https://github.com/sponsors/Breq16"
            target="_blank"
            rel="noreferrer noopener"
            className="flex-grow w-full text-center bg-gray-200 text-black py-4 px-6 rounded-full flex items-center"
          >
            <span className="flex-grow">GitHub Sponsors</span>
            <FontAwesomeIcon icon={faHeart} />
          </a>
          <a
            href="https://ko-fi.com/breq16"
            target="_blank"
            rel="noreferrer noopener"
            className="flex-grow w-full text-center bg-panblue text-black py-4 px-6 rounded-full flex items-center"
          >
            <span className="flex-grow">Ko-Fi</span>
            <StaticImage
              src="../images/logo/ko-fi.png"
              className="w-12 -my-2"
            />
          </a>
        </div>
      </div>
    </Page>
  );
}
