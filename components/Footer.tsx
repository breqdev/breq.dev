import React, { RefObject, useEffect, useRef, useState } from "react";
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

// Intentional global variables, since we want these to persist across mounts
let TURTLE_MODE: boolean = false;
let ONEKO_ACTIVE: boolean = false;

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

function useTurtle(turtleRef: RefObject<HTMLImageElement>, visible: boolean) {
  const hasTurtle = useRef(false);
  const [isTouch, setIsTouch] = useState(false);
  const turtPosn = useRef({ x: 0, y: 0 });
  let turtSize = useRef(32);

  function mouseUp() {
    hasTurtle.current = false;
  }

  function moveTurtle(cx: number, cy: number) {
    const turtle = turtleRef.current;
    if (!turtle) return;

    turtle.style.position = "fixed";
    turtle.style.left = cx - turtPosn.current.x + "px";
    turtle.style.top = cy - turtPosn.current.y + "px";
    turtle.style.height = turtSize.current + "px";
    turtle.style.width = turtSize.current + "px";
    turtle.style.userSelect = "none";
  }

  function mouseMove(event: MouseEvent) {
    if (hasTurtle.current && (event.buttons & 1 || isTouch)) {
      moveTurtle(event.clientX, event.clientY);
      document.body.style.userSelect = "none";
      return false;
    } else {
      hasTurtle.current = false;
      document.body.style.userSelect = "initial";
    }
  }

  function touchMove(event: TouchEvent) {
    if (!hasTurtle.current) return;
    for (const touch of event.changedTouches) {
      moveTurtle(touch.screenX, touch.screenY);
      event.preventDefault();
      return false;
    }
  }

  function mouseDown(event: MouseEvent) {
    hasTurtle.current = true;
    turtPosn.current.x = event.offsetX;
    turtPosn.current.y = event.offsetY;
    event.preventDefault();
    return false;
  }

  function touchDown(event: TouchEvent) {
    setIsTouch(true);
    hasTurtle.current = true;

    for (const touch of event.touches) {
      const rect = turtleRef.current?.getBoundingClientRect();
      if (!rect) continue;
      turtPosn.current.x = touch.screenX - rect.x;
      turtPosn.current.y = touch.screenY - rect.y;
      event.preventDefault();
      return false;
    }
  }

  useEffect(() => {
    // URL params are like this:
    // ?turt[x]=476px&turt[y]=438px&turt[big]=2.651999999999998
    if (!visible) return;

    const url = new URL(window.location.href);
    const initialX = url.searchParams.get("turt[x]");
    const initialY = url.searchParams.get("turt[y]");
    const size = url.searchParams.get("turt[big]");

    if (size) {
      // scale factor is probably very wrong
      turtSize.current = parseFloat(size) * 18.666666666666668;
    }

    if (!initialX || !initialY) return;

    const turtle = turtleRef.current;
    if (!turtle) return;

    turtle.style.position = "fixed";
    turtle.style.left = parseFloat(initialX) - turtPosn.current.x + "px";
    turtle.style.top = parseFloat(initialY) - turtPosn.current.y + "px";
    turtle.style.height = turtSize.current + "px";
    turtle.style.width = turtSize.current + "px";
    turtle.style.userSelect = "none";
  }, [visible, turtleRef]);

  useEffect(() => {
    const turtle = turtleRef.current;
    if (!turtle) return;
    turtle.addEventListener("mousedown", mouseDown);
    turtle.addEventListener("touchstart", touchDown);
    document.body.addEventListener("mousemove", mouseMove);
    document.body.addEventListener("touchmove", touchMove);
    document.body.addEventListener("mouseup", mouseUp);
    document.body.addEventListener("touchend", mouseUp);

    return () => {
      turtle.removeEventListener("mousedown", mouseDown);
      turtle.removeEventListener("touchstart", touchDown);
      document.body.removeEventListener("mousemove", mouseMove);
      document.body.removeEventListener("touchmove", touchMove);
      document.body.removeEventListener("mouseup", mouseUp);
      document.body.removeEventListener("touchend", mouseUp);
    };
  });
}

export default function Footer() {
  const contactLinks: [IconDefinition, string, string, string][] = [
    [
      faEnvelope,
      "breq@breq.dev",
      "mailto:breq@breq.dev",
      "hover:!bg-panpink-light focus:!bg-panpink-light hover:text-black focus:text-black",
    ],
    [
      faBluesky,
      "@breq.dev",
      "https://bsky.app/profile/breq.dev",
      "hover:!bg-panyellow-light focus:!bg-panyellow-light hover:text-black focus:text-black",
    ],
    [
      faMastodon,
      "@breq@tacobelllabs.net",
      "https://tacobelllabs.net/@breq",
      "hover:!bg-brookepurple-light focus:!bg-brookepurple-light hover:text-black focus:text-black",
    ],
    [
      faRssSquare,
      "rss",
      "https://breq.dev/rss.xml",
      "hover:!bg-brookeorange-light focus:!bg-brookeorange-light hover:text-black focus:text-black",
    ],
    [
      faAddressCard,
      "vcf",
      "https://breq.dev/vcard/breq.vcf",
      "hover:!bg-brookegreen-light focus:!bg-brookegreen-light hover:text-black focus:text-black",
    ],
  ];

  const linkStyles =
    "outline-none whitespace-nowrap cursor-pointer px-2 py-0.5 rounded-lg transition-colors duration-300";

  const [backgroundColor, setBackgroundColor] = useState("#1BB3FF");
  const lightBackgroundColor = lighten(backgroundColor, LIGHTEN_AMOUNT);
  const textColor = useDarkText(backgroundColor)
    ? "text-gray-800"
    : "text-white";

  useEffect(() => {
    try {
      const referer = new URL(document.referrer);
      if (referer.origin === "https://tris.fyi") {
        TURTLE_MODE = true;
        setTurtleVisible(true);
      }
    } catch (e) {
      console.log(e);
    }

    const url = new URL(window.location.href);

    if (
      url.searchParams.has("catx") &&
      url.searchParams.has("caty") &&
      url.searchParams.has("catdx") &&
      url.searchParams.has("catdy") &&
      !ONEKO_ACTIVE
    ) {
      document.querySelector<HTMLDivElement>("#oneko-trigger")!.style.display =
        "none";
      oneko(32, 32, false);
      ONEKO_ACTIVE = true;
    }
  }, []);

  const { siteUp, ledOn } = useLED();

  const turtleRef = useRef<HTMLImageElement>(null);
  const [turtleVisible, setTurtleVisible] = useState(TURTLE_MODE);
  useTurtle(turtleRef, turtleVisible);

  return (
    <footer
      className={
        "z-10 font-display text-lg transition-colors duration-500 print:hidden " +
        textColor
      }
      style={{ backgroundColor }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-16 pt-12 lg:grid-cols-[1fr,12rem]">
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
              className={`${linkStyles} hover:!bg-gray-800 hover:text-white focus:!bg-gray-800 focus:text-white`}
              style={{ backgroundColor: lightBackgroundColor }}
            >
              <FontAwesomeIcon icon={faGithub} className="-ml-0.5 mr-1" />
              <span className="sr-only">github.com/</span>
              breqdev/breq.dev
            </a>
          </p>
          <ul className="flex list-none flex-row flex-wrap gap-1">
            {contactLinks.map(([icon, text, href, colors]) => (
              <li key={text} className="contents">
                <a
                  href={href}
                  className={`${linkStyles} ${colors}`}
                  style={{ backgroundColor: lightBackgroundColor }}
                >
                  <FontAwesomeIcon icon={icon} className="mr-1" />
                  <span>{text}</span>
                </a>
              </li>
            ))}
            <li className="contents">
              <Link
                href="/contact"
                className={`${linkStyles} hover:!bg-white hover:text-gray-800 focus:!bg-white focus:text-gray-800`}
                style={{ backgroundColor: lightBackgroundColor }}
              >
                more<span className="sr-only"> ways to contact me </span>
                <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
              </Link>
            </li>
          </ul>
          <Badges
            onChangeColor={setBackgroundColor}
            useDarkText={useDarkText(backgroundColor)}
          />
        </div>

        <div className="hidden flex-row items-end justify-end gap-3 self-end lg:flex">
          {TURTLE_MODE ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              draggable="false"
              id="turtle"
              src="https://tris.fyi/static/turtlesbian.png"
              className="z-[60] h-[32px] w-[32px] cursor-grabbing"
              ref={turtleRef}
              alt=""
            />
          ) : ONEKO_ACTIVE ? (
            <div className="h-[32px] w-[32px]" />
          ) : (
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
                ONEKO_ACTIVE = true;
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
