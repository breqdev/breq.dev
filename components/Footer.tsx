import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEnvelope,
  faChevronRight,
  faCode,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import {
  faGithub,
  faMastodon,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Character from "./index/fursona/Fursona";
import Badges from "./Badges";

// https://stackoverflow.com/a/41491220
function useDarkText(bgColor: string) {
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

export default function Footer() {
  const contactLinks: [IconDefinition, string, string][] = [
    [faEnvelope, "breq@breq.dev", "mailto:breq@breq.dev"],
    [faTwitter, "breqdev", "https://twitter.com/breqdev"],
    [faMastodon, "@breq@tacobelllabs.net", "https://tacobelllabs.net/@breq"],
  ];

  const linkStyles =
    "hover:underline outline-none focus:underline focus:bg-panyellow";

  const [backgroundColor, setBackgroundColor] = React.useState("#1BB3FF");
  const textColor = useDarkText(backgroundColor)
    ? "text-gray-800"
    : "text-white";

  return (
    <footer
      className={
        "relative z-10 font-display text-lg transition-colors duration-500 " +
        textColor
      }
      style={{ backgroundColor }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pt-12 pb-16">
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
        <p>
          {contactLinks.map(([icon, text, href]) => (
            <React.Fragment key={text}>
              <FontAwesomeIcon icon={icon} />
              &nbsp;
              {href ? (
                <a href={href} className={linkStyles}>
                  {text}
                </a>
              ) : (
                text
              )}
              {" • "}
            </React.Fragment>
          ))}
          <Link href="/contact" className={linkStyles}>
            more<span className="sr-only">ways to contact me </span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </p>
        <p className="hidden md:block">
          footer art by the wonderful <FontAwesomeIcon icon={faTwitter} />{" "}
          <a href="https://twitter.com/nyashidos" className={linkStyles}>
            nyashidos
          </a>
          !
        </p>
        <Badges onChangeColor={setBackgroundColor} />

        <Character />
      </div>
    </footer>
  );
}
