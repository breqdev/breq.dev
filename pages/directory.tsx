import React, { useEffect } from "react";
import { BADGES } from "../utils/badges";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import Head from "next/head";

function getFontURL(font: string): string {
  if (font === "Pretendard") {
    return "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css";
  } else if (font === "Futura") {
    // ideally would find a less sus source for this
    return "https://fonts.cdnfonts.com/css/futura-medium";
  } else if (font === "Equestria") {
    // no clue where izzy got his one from, so we'll just make our own CSS shim
    return "/shims/equestria.css";
  } else {
    // Fall back to Google Fonts
    return `https://fonts.googleapis.com/css2?family=${font.replaceAll(
      " ",
      "+"
    )}&display=swap`;
  }
}

export default function Directory() {
  useEffect(() => {
    const fonts = BADGES.map((b) => b.font);

    const elements = fonts.map((font) => {
      if (font === undefined) {
        return null;
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = getFontURL(font);

      document.head.appendChild(link);
      return link;
    });
    return () => {
      elements.forEach((e) => {
        if (e !== null) {
          document.head.removeChild(e);
        }
      });
    };
  }, []);

  return (
    <Page className="bg-gray-800 p-2 text-white">
      <SEOHelmet
        title="Friends - breq.dev"
        description="A directory of cool people I know."
      />
      <div className="mx-auto my-12 flex max-w-2xl flex-col rounded-2xl bg-black p-4 text-white">
        <h1 className="text-center font-display text-6xl">friends</h1>
        <p className="max-w-2xl text-center font-display text-xl">
          these are my awesome friends. check out their sites below!
        </p>
        <p className="max-w-2xl text-center font-display text-lg italic">
          this page is{" "}
          <a
            className="text-panblue-light hover:underline"
            href="https://microformats.org/wiki/h-card"
          >
            h-card
          </a>{" "}
          and{" "}
          <a
            className="text-panblue-light hover:underline"
            href="http://www.gmpg.org/xfn/intro"
          >
            XFN
          </a>{" "}
          compliant! view parsed data on{" "}
          <a
            className="text-panblue-light hover:underline"
            href="https://pin13.net/mf2/?url=https%3A%2F%2Fbreq.dev%2Fdirectory"
          >
            pin13
          </a>
          .
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,min(90vw,24rem))] justify-center gap-8 px-4 py-8">
        {BADGES.filter((b) => !b.exclude).map(
          ({
            name,
            image,
            url,
            placeholder,
            tag,
            bio,
            color,
            textColor,
            borderIsTextColor,
            font,
            rel,
          }) => (
            <div className="h-card group relative" key={name}>
              <div
                className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-transform group-focus-within:translate-x-4 group-focus-within:translate-y-2 group-hover:translate-x-4 group-hover:translate-y-2"
                style={{
                  backgroundColor: borderIsTextColor ? textColor : color,
                }}
              />
              <a
                href={url}
                className="u-url relative z-10 flex flex-col gap-2 rounded-2xl bg-black p-2 font-display text-white focus-visible:outline"
                style={{
                  outlineColor: borderIsTextColor ? textColor : color,
                }}
                rel={rel}
              >
                <h2
                  className="p-nickname text-center font-mono text-3xl font-bold lowercase"
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
                    <img className="u-logo w-full" src={image} alt={name} />
                  )}
                  {placeholder && (
                    <div className="flex h-full items-center justify-center border-2 border-dashed border-white">
                      <span className="font-display text-white">
                        {placeholder}
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className="text-center"
                  style={{ fontFamily: font ? `"${font}"` : "inherit" }}
                >
                  <h2 className="p-name text-4xl font-bold">{name}</h2>
                  <p className="p-note">{bio}</p>
                </div>
              </a>
            </div>
          )
        )}
      </div>
    </Page>
  );
}
