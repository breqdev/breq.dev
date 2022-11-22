import React from "react";

const BADGES = [
  {
    name: "breq (brooke chalmers)",
    image: "/branding/88x31.png",
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
    url: "https://twitter.com/oh_jeez_bees",
  },
  {
    name: "vivi (vivian hafener)",
    image: "/badges/vivi.png",
    url: "https://www.vhafener.com/",
  },
];

export default function Badges() {
  return (
    <div className="md:pr-60">
      <div className="flex flex-wrap items-start justify-center gap-2 sm:justify-start">
        {BADGES.map(({ name, image, url }) => (
          <a
            href={url}
            key={name}
            style={{ imageRendering: "pixelated", width: 88, height: 31 }}
            className="flex-shrink-0 outline-4 outline-panpink focus-visible:outline"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img width={88} height={31} src={image} alt={name} />
          </a>
        ))}
      </div>
    </div>
  );
}
