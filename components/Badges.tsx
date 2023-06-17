import React from "react";
import { BADGES } from "../utils/badges";

export default function Badges() {
  return (
    <div className="md:pr-60">
      <div className="flex flex-wrap items-start justify-center gap-2 sm:justify-start">
        {BADGES.map(({ name, image, url, placeholder, tag }) => (
          <a
            href={url}
            key={name}
            style={{ imageRendering: "pixelated", width: 88, height: 31 }}
            className="flex-shrink-0 outline-4 outline-panpink focus-visible:outline"
          >
            {image /* eslint-disable-next-line @next/next/no-img-element */ && (
              <img
                width={88}
                height={31}
                src={image}
                alt={tag ? `${tag} (${name})` : name}
              />
            )}
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
