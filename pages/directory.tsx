import React from "react";
import { BADGES } from "../utils/badges";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

export default function Directory() {
  return (
    <Page className="bg-gray-800 p-2 text-white">
      <SEOHelmet
        title="Friends - breq.dev"
        description="A directory of cool people I know."
      />
      <div className="mx-auto my-12 flex max-w-2xl flex-col rounded-2xl bg-black p-4 text-white">
        <h1 className="text-center font-display text-6xl">friends</h1>
        <p className="max-w-2xl text-center font-display text-xl">
          these are my awesome friends. check them out!
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,min(90vw,24rem))] justify-center gap-8 px-4 py-8">
        {BADGES.filter((b) => !b.exclude).map(
          ({ name, image, url, placeholder, tag, bio, textColor }) => (
            <a
              href={url}
              className="flex flex-col gap-2 rounded-2xl bg-black p-2 text-white focus-visible:outline"
              key={name}
              style={{
                outlineColor: textColor,
              }}
            >
              <h2
                className="text-center font-mono text-3xl font-bold lowercase"
                style={{ color: textColor }}
              >
                {tag || name.split(" ")[0]}
              </h2>
              <div
                style={{
                  imageRendering: "pixelated",
                  aspectRatio: "88 / 31",
                }}
                className="w-full"
              >
                {image /* eslint-disable-next-line @next/next/no-img-element */ && (
                  <img className="w-full" src={image} alt={name} />
                )}
                {placeholder && (
                  <div className="flex h-full items-center justify-center border-2 border-dashed border-white">
                    <span className="font-display text-white">
                      {placeholder}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <h2 className="font-display text-4xl font-bold">{name}</h2>
                <p className="font-body">{bio}</p>
              </div>
            </a>
          )
        )}
      </div>
    </Page>
  );
}
