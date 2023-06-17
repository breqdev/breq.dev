import React from "react";
import { BADGES } from "../utils/badges";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

const SCALE = 2.0;

export default function Directory() {
  return (
    <Page>
      <SEOHelmet
        title="brooke's friends."
        description="a directory of cool people i know."
      />
      <h1 className="mx-auto my-16 max-w-2xl text-center font-display text-6xl">
        friends of breq
      </h1>
      <div className="mx-auto my-16 flex w-full max-w-2xl flex-col gap-4">
        {BADGES.filter((b) => b.tag !== "breq").map(
          ({ name, image, url, placeholder, tag, bio }) => (
            <a
              href={url}
              className="flex flex-row items-center gap-4"
              key={name}
            >
              <div
                style={{
                  imageRendering: "pixelated",
                  width: 88 * SCALE,
                  height: 31 * SCALE,
                }}
              >
                {image /* eslint-disable-next-line @next/next/no-img-element */ && (
                  <img
                    width={88 * SCALE}
                    height={31 * SCALE}
                    src={image}
                    alt={name}
                  />
                )}
                {placeholder && (
                  <div className="flex h-full items-center justify-center border-2 border-dashed border-white">
                    <span className="text-white">{placeholder}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-grow flex-col">
                <div className="flex items-center gap-1">
                  {tag && (
                    <>
                      <span className="font-mono text-xl">{tag}</span>
                      <span>•</span>
                    </>
                  )}
                  <span className="text-2xl font-bold">{name}</span>
                </div>
                <span>{bio}</span>
              </div>
            </a>
          )
        )}
      </div>
    </Page>
  );
}
