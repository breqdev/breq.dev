import React, { useEffect, useRef } from "react";
import { BADGES, Badge } from "../utils/badges";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function BadgeImage({
  badge,
  onChangeColor,
}: {
  badge: Badge;
  onChangeColor: (color: string) => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imgRef.current;

    if (image) {
      const listener = () => {
        if (badge.alt) {
          image.src = badge.alt;
        }
      };

      imgRef.current.addEventListener("oneko", listener);

      return () => {
        image.removeEventListener("oneko", listener);
      };
    }
  }, [badge.alt]);

  return (
    <a
      href={badge.url}
      onMouseOver={() => onChangeColor(badge.color)}
      key={badge.name}
      style={{ imageRendering: "pixelated", width: 88, height: 31 }}
      className="flex-shrink-0 outline-4 outline-panpink focus-visible:outline"
    >
      {badge.image /* eslint-disable-next-line @next/next/no-img-element */ && (
        <img
          width={88}
          height={31}
          src={badge.image}
          alt={badge.tag ? `${badge.tag} (${badge.name})` : badge.name}
          className="oneko-hitbox"
          ref={imgRef}
        />
      )}
      {badge.placeholder && (
        <div className="flex h-full items-center justify-center border-2 border-dashed border-white">
          <span className="text-white">{badge.placeholder}</span>
        </div>
      )}
    </a>
  );
}

export default function Badges({
  onChangeColor,
}: {
  onChangeColor: (color: string) => void;
}) {
  return (
    <div className="md:pr-60">
      <div className="flex flex-wrap items-start justify-center gap-2 sm:justify-start">
        {BADGES.map((badge) => (
          <BadgeImage
            key={badge.url}
            badge={badge}
            onChangeColor={onChangeColor}
          />
        ))}
        <Link
          className="hidden h-[31px] w-[88px] items-center justify-center outline-none hover:underline focus:bg-panyellow focus:underline sm:flex"
          href="/directory"
        >
          directory
          <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
        </Link>
      </div>
    </div>
  );
}
