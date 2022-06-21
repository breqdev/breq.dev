import React from "react";
import Image from "next/image";

import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faSpotify } from "@fortawesome/free-brands-svg-icons";

import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import Markdown from "../components/markdown/Markdown";

import { listContentFiles, loadMarkdown } from "../utils/api";

const ICONS = {
  url: faLink,
  spotify: faSpotify,
  instagram: faInstagram,
};

export async function getStaticProps() {
  const files = await listContentFiles("friends");
  const friends = await Promise.all(
    files.map((file) => loadMarkdown(file, { loadBody: true }))
  );

  return {
    props: {
      friends,
    },
  };
}

export default function Friends({ friends }) {
  return (
    <Page className="bg-black">
      <SEOHelmet title="cool people i know!" />
      <div className="mx-auto my-8 max-w-xl text-white">
        <h1 className="text-center font-display text-5xl">friends</h1>
        <h2 className="mt-2 text-center font-display text-3xl">
          cool people that i know!
        </h2>
      </div>
      <div className="mx-auto flex max-w-2xl flex-col px-4 py-8">
        {friends.map(({ filename, name, pronouns, image, links, body }) => (
          <div
            className="flex w-full flex-col overflow-hidden rounded-2xl bg-gray-800 text-white md:flex-row"
            key={filename}
          >
            {image && <Image className="w-full" {...image} alt="" />}
            <div className="flex w-full flex-col p-8">
              <h2 className="font-display text-3xl">{name}</h2>
              {pronouns && (
                <h3 className="font-display italic text-gray-200">
                  {pronouns}
                </h3>
              )}
              {body && <Markdown content={body} dark />}
              <div className="flex-grow" />
              <div className="flex flex-row gap-4 text-lg">
                {links?.map(({ icon, link }) => (
                  <a
                    href={link}
                    className="text-2xl text-gray-300 transition-colors duration-300 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                    key={icon}
                  >
                    <FontAwesomeIcon icon={ICONS[icon]} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}
