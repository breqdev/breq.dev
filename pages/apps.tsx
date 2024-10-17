import React from "react";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

const APPS = [
  {
    name: "Rolodex",
    link: "https://rolodex.breq.dev/",
    icon: "https://rolodex.breq.dev/icon/512.png",
  },
  {
    name: "Picto",
    link: "https://picto.breq.dev/",
    icon: "https://picto.breq.dev/favicon.svg",
  },
  {
    name: "Nuisance",
    link: "https://nuisance.breq.dev/",
    icon: "https://nuisance.breq.dev/favicon.svg",
  },
  {
    name: "88x31 Dungeon",
    link: "https://dungeon.breq.dev/",
    icon: "https://dungeon.breq.dev/favicon.svg",
    invert: true,
  },
  {
    name: "Wordle",
    link: "https://wordle.breq.dev/",
  },
  {
    name: "Flowspace",
    link: "https://flowspace.breq.dev/",
    icon: "https://flowspace.breq.dev/android-chrome-512x512.png",
  },
  {
    name: "GenReGen",
    link: "https://genregen.breq.dev/",
  },
  {
    name: "BotBuilder",
    link: "https://botbuilder.breq.dev/",
  },
  {
    name: "Links",
    link: "https://links.breq.dev/",
  },
];

export default function Apps() {
  return (
    <Page className="bg-black text-white">
      <SEOHelmet title="App Launcher - breq.dev" />
      <div className="mx-auto my-8 max-w-2xl">
        <h1 className="text-center font-display text-5xl">app launcher</h1>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,8rem)] justify-center gap-8 p-8 sm:grid-cols-[repeat(auto-fill,16rem)]">
        {APPS.map(({ name, link, icon, invert }) => (
          <a href={link} key={name} className="flex flex-col gap-4">
            {icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="aspect-square"
                src={icon}
                alt={name}
                style={{ filter: invert ? "invert()" : undefined }}
              />
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-2xl bg-gray-200 font-display text-7xl text-black">
                {name[0].toLocaleUpperCase()}
              </div>
            )}
            <h2 className="text-center text-xl sm:text-3xl">{name}</h2>
          </a>
        ))}
      </div>
    </Page>
  );
}
