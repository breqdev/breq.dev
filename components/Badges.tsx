import React, { useEffect, useRef } from "react";
import { BADGES, Badge } from "../utils/badges";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function BadgeImage({
  badge,
  onChangeColor,
  useDarkText,
}: {
  badge: Badge;
  onChangeColor: (color: string) => void;
  useDarkText: boolean;
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

      image.addEventListener("oneko", listener);

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
      className="shrink-0 outline-4 outline-panpink focus-visible:outline"
      rel={badge.rel}
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
        <div
          className={
            "flex h-full items-center justify-center border-2 border-dashed " +
            (useDarkText ? "border-gray-800" : "border-white")
          }
        >
          <span className={useDarkText ? "text-gray-800" : "text-white"}>
            {badge.placeholder}
          </span>
        </div>
      )}
    </a>
  );
}

export default function Badges({
  onChangeColor,
  useDarkText,
}: {
  onChangeColor: (color: string) => void;
  useDarkText: boolean;
}) {
  return (
    <div className="flex flex-wrap items-start justify-center gap-2 sm:justify-start">
      {BADGES.map((badge) => (
        <BadgeImage
          key={badge.url}
          badge={badge}
          onChangeColor={onChangeColor}
          useDarkText={useDarkText}
        />
      ))}
      <Link
        className={
          "hidden h-[31px] w-[88px] cursor-pointer items-center justify-center whitespace-nowrap border-2 border-dashed px-2 py-0.5 text-base outline-4 outline-panpink focus-visible:outline sm:flex " +
          (useDarkText
            ? "border-gray-800 text-gray-800"
            : "border-white text-white")
        }
        href="/directory"
      >
        directory
        <FontAwesomeIcon className="ml-0.5" icon={faChevronRight} />
      </Link>
    </div>
  );
}
