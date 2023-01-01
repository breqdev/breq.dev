import React from "react";

type Badge = {
  name: string;
  url: string;
  image?: string;
  placeholder?: string;
};

const BADGES: Badge[] = [
  {
    name: "breq (brooke chalmers)",
    image: "/badges/breq.png",
    url: "https://breq.dev/",
  },
  {
    name: "quartz!",
    image: "/badges/quartz.png",
    url: "https://twitter.com/piezo_electric",
  },
  {
    name: "ava silver",
    image: "/badges/ava.png",
    url: "https://avasilver.dev/",
  },
  {
    name: "kel weaver",
    image: "/badges/kel.png",
    url: "https://weaverkel.com/",
  },
  {
    name: "eggy (ezgi bas)",
    image: "/badges/eggy.png",
    url: "https://twitter.com/ezgiburglar69",
  },
  {
    name: "ula bit (nyashidos!)",
    image: "/badges/ula.png",
    url: "https://ohjeezbees.carrd.co/",
  },
  {
    name: "vivi (vivian hafener)",
    image: "/badges/vivi.png",
    url: "https://www.vhafener.com/",
  },
  {
    name: "flaming_spork (philomena)",
    image: "/badges/philo.png",
    url: "https://philo.gay/",
  },
  {
    name: "nkizz (nathan kiesman)",
    image: "/badges/nkizz.png",
    url: "https://nkizz.com/",
  },
  {
    name: "dillydally (dillon scott)",
    image: "/badges/dillydally.png",
    url: "https://dillydally414.github.io/",
  },
  {
    name: "luke taylor",
    image: "/badges/luke.png",
    url: "https://lukefelixtaylor.com/",
  },
];

export default function Badges() {
  return (
    <div className="md:pr-60">
      <div className="flex flex-wrap items-start justify-center gap-2 sm:justify-start">
        {BADGES.map(({ name, image, url, placeholder }) => (
          <a
            href={url}
            key={name}
            style={{ imageRendering: "pixelated", width: 88, height: 31 }}
            className="flex-shrink-0 outline-4 outline-panpink focus-visible:outline"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {image && <img width={88} height={31} src={image} alt={name} />}
            {placeholder && (
              <div className="flex h-full items-center justify-center border-2 border-dashed border-white">
                <span className="text-white">{placeholder}</span>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
