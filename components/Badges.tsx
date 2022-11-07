import Image from "next/image";
import React from "react";

const BADGES = [
  {
    name: "breq (brooke chalmers)",
    image: "/branding/88x31.png",
    url: "https://breq.dev/",
  },
];

export default function Badges() {
  return (
    <div className="flex">
      {BADGES.map(({ name, image, url }) => (
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={url}
          key={name}
          style={{ imageRendering: "pixelated", width: 88, height: 31 }}
          className="outline-4 outline-panpink focus:outline"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img width={88} height={31} src={image} alt={name} />
        </a>
      ))}
    </div>
  );
}
