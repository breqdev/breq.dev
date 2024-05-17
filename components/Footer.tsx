import React, { useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEnvelope,
  faChevronRight,
  faCode,
  IconDefinition,
  faRssSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import {
  faGithub,
  faMastodon,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Badges from "./Badges";

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

let ONEKO_HAS_LOADED: boolean = false;

export default function Footer() {
  const contactLinks: [IconDefinition, string, string][] = [
    [faEnvelope, "breq@breq.dev", "mailto:breq@breq.dev"],
    [faTwitter, "breqdev", "https://twitter.com/breqdev"],
    [faMastodon, "@breq@tacobelllabs.net", "https://tacobelllabs.net/@breq"],
    [faRssSquare, "rss", "https://breq.dev/rss.xml"],
  ];

  const linkStyles =
    "hover:underline outline-none focus:underline focus:bg-panyellow";

  const [backgroundColor, setBackgroundColor] = React.useState("#1BB3FF");
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

  return (
    <footer
      className={
        "relative z-10 font-display text-lg transition-colors duration-500 " +
        textColor
      }
      style={{ backgroundColor }}
    >
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-16 pt-12">
        <p>
          made with <FontAwesomeIcon icon={faCode} />{" "}
          <span className="sr-only">code</span> and{" "}
          <FontAwesomeIcon icon={faHeart} />
          <span className="sr-only">love</span> by breq,{" "}
          <FontAwesomeIcon icon={faCopyright} />
          <span className="sr-only">copyright</span>&nbsp;
          {new Date().getFullYear()}, <FontAwesomeIcon icon={faGithub} />
          &nbsp;
          <span className="sr-only">github</span>
          <a href="https://github.com/breqdev/breq.dev" className={linkStyles}>
            breqdev/breq.dev
          </a>
        </p>
        <p className="flex flex-row flex-wrap">
          {contactLinks.map(([icon, text, href]) => (
            <span key={text} className="whitespace-nowrap">
              <FontAwesomeIcon icon={icon} className="mx-1" />
              {href ? (
                <a href={href} className={linkStyles}>
                  {text}
                </a>
              ) : (
                text
              )}
              {" • "}
            </span>
          ))}
          <Link href="/contact" className={linkStyles}>
            <span className="ml-1" />
            more<span className="sr-only"> ways to contact me </span>
            <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
          </Link>
        </p>
        <Badges onChangeColor={setBackgroundColor} />

        {ONEKO_HAS_LOADED ? null : (
          <div
            className="absolute bottom-8 right-4 h-[32px] w-[32px]"
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
      </div>
    </footer>
  );
}
