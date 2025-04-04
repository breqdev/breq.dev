import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEnvelope,
  faChevronRight,
  faCode,
  IconDefinition,
  faRssSquare,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import {
  faBluesky,
  faGithub,
  faMastodon,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Badges from "./Badges";

import computerOn from "../public/drawings/computer-on.svg";
import computerOff from "../public/drawings/computer-off.svg";

// @ts-ignore
import oneko from "../utils/oneko.js";

// https://stackoverflow.com/a/41491220
export function useDarkText(bgColor: string) {
  var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179;
}

function lighten(color: string, amount: number) {
  color = color.slice(1);

  var num = parseInt(color, 16);
  var r = (num >> 16) * amount + 255 * (1 - amount);

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) * amount + 255 * (1 - amount);

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) * amount + 255 * (1 - amount);

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return "#" + (g | (b << 8) | (r << 16)).toString(16);
}

const LIGHTEN_AMOUNT = 0.705;
// tuned to match the amount of lightening between the normal and light shade of panblue
console.assert(
  lighten("#1bb3ff", LIGHTEN_AMOUNT) === "#5ec9ff",
  lighten("#1bb3ff", LIGHTEN_AMOUNT)
);

let ONEKO_HAS_LOADED: boolean = false;

function useLED() {
  const [siteUp, setSiteUp] = useState<boolean>();

  useEffect(() => {
    fetch("https://home.breq.dev/", { mode: "no-cors" })
      .then((r) => {
        setSiteUp(true);
      })
      .catch((e) => {
        setSiteUp(false);
      });
  }, []);

  const [ledOn, setLedOn] = useState(false);

  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      tick = (tick + 1) % 8;

      if (tick === 0) {
        setLedOn(true);
      } else {
        setLedOn(false);
      }
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return { siteUp, ledOn };
}

export default function Footer() {
  const contactLinks: [IconDefinition, string, string, string][] = [
    [
      faEnvelope,
      "breq@breq.dev",
      "mailto:breq@breq.dev",
      "hover:bg-panpink-light! focus:bg-panpink-light! hover:text-black focus:text-black",
    ],
    [
      faBluesky,
      "@breq.dev",
      "https://bsky.app/profile/breq.dev",
      "hover:bg-panblue-dark! hover:text-white focus:bg-panblue-dark! focus:text-white",
    ],
    [
      faMastodon,
      "@breq@tacobelllabs.net",
      "https://tacobelllabs.net/@breq",
      "hover:bg-brookepurple-light! focus:bg-brookepurple-light! hover:text-black focus:text-black",
    ],
    [
      faTwitter,
      "breqdev",
      "https://twitter.com/breqdev",
      "hover:bg-panyellow-light! focus:bg-panyellow-light! hover:text-black focus:text-black",
    ],
    [
      faRssSquare,
      "rss",
      "https://breq.dev/rss.xml",
      "hover:bg-brookeorange-light! focus:bg-brookeorange-light! hover:text-black focus:text-black",
    ],
    [
      faAddressCard,
      "vcf",
      "https://breq.dev/vcard/breq.vcf",
      "hover:bg-brookegreen-light! focus:bg-brookegreen-light! hover:text-black focus:text-black",
    ],
  ];

  const linkStyles =
    "outline-hidden whitespace-nowrap cursor-pointer px-2 py-0.5 rounded-lg transition-colors duration-300";

  const [backgroundColor, setBackgroundColor] = useState("#1BB3FF");
  const lightBackgroundColor = lighten(backgroundColor, LIGHTEN_AMOUNT);
  const textColor = useDarkText(backgroundColor)
    ? "text-gray-800"
    : "text-white";

  useEffect(() => {
    const url = new URL(window.location.href);
    if (
      url.searchParams.has("catx") &&
      url.searchParams.has("caty") &&
      url.searchParams.has("catdx") &&
      url.searchParams.has("catdy") &&
      !ONEKO_HAS_LOADED
    ) {
      document.querySelector<HTMLDivElement>("#oneko-trigger")!.style.display =
        "none";
      oneko(32, 32, false);
      ONEKO_HAS_LOADED = true;
    }
  }, []);

  const { siteUp, ledOn } = useLED();

  return (
    <footer
      className={
        "relative z-10 font-display text-lg transition-colors duration-500 " +
        textColor
      }
      style={{ backgroundColor }}
    >
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-16 pt-12 lg:grid-cols-[1fr_12rem]">
        <div className="flex flex-col gap-6">
          <p>
            made with <FontAwesomeIcon icon={faCode} />{" "}
            <span className="sr-only">code</span> and{" "}
            <FontAwesomeIcon icon={faHeart} />
            <span className="sr-only">love</span> by breq,{" "}
            <FontAwesomeIcon icon={faCopyright} />
            <span className="sr-only">copyright</span>&nbsp;
            {new Date().getFullYear()},{" "}
            <a
              href="https://github.com/breqdev/breq.dev"
              className={`${linkStyles} hover:bg-gray-800! hover:text-white focus:bg-gray-800! focus:text-white`}
              style={{ backgroundColor: lightBackgroundColor }}
            >
              <FontAwesomeIcon icon={faGithub} className="-ml-0.5 mr-1" />
              <span className="sr-only">github</span>
              breqdev/breq.dev
            </a>
          </p>
          <p className="flex flex-row flex-wrap gap-1">
            {contactLinks.map(([icon, text, href, colors]) => (
              <a
                href={href}
                key={text}
                className={`${linkStyles} ${colors}`}
                style={{ backgroundColor: lightBackgroundColor }}
              >
                <FontAwesomeIcon icon={icon} className="mr-1" />
                <span>{text}</span>
              </a>
            ))}
            <Link
              href="/contact"
              className={`${linkStyles} hover:bg-white! hover:text-gray-800 focus:bg-white! focus:text-gray-800`}
              style={{ backgroundColor: lightBackgroundColor }}
            >
              more<span className="sr-only"> ways to contact me </span>
              <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
            </Link>
          </p>
          <Badges
            onChangeColor={setBackgroundColor}
            useDarkText={useDarkText(backgroundColor)}
          />
        </div>

        <div className="hidden flex-row items-end justify-end gap-3 self-end lg:flex">
          {ONEKO_HAS_LOADED ? null : (
            <div
              className="h-[32px] w-[32px]"
              style={{
                imageRendering: "pixelated",
                backgroundImage: "url(/oneko.gif)",
                backgroundPosition: `${-3 * 32}px ${-3 * 32}px`,
              }}
              id="oneko-trigger"
              onClick={(e) => {
                const bbox = e.currentTarget.getBoundingClientRect();
                document.querySelector<HTMLDivElement>(
                  "#oneko-trigger"
                )!.style.display = "none";
                oneko(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2, true);
                ONEKO_HAS_LOADED = true;
              }}
            />
          )}

          <a className="max-w-20" href="https://home.breq.dev/">
            <Image
              src={siteUp && ledOn ? computerOn : computerOff}
              alt="computer"
              className=" transition-all duration-500"
              style={{
                filter:
                  "drop-shadow(0 0 3px rgba(0, 0, 0, .7)) " +
                  (siteUp ? "" : "grayscale(100%) brightness(110%)"),
              }}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
