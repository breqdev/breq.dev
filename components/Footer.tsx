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
  faKeybase,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Character from "./index/fursona/Fursona";

export default function Footer() {
  const contactLinks: [IconDefinition, string, string][] = [
    [faEnvelope, "breq@breq.dev", "mailto:breq@breq.dev"],
    [faTwitter, "breqdev", "https://twitter.com/breqdev"],
    [faKeybase, "breq", "https://keybase.io/breq"],
  ];

  const linkStyles =
    "hover:underline outline-none focus:underline focus:bg-panyellow";

  return (
    <footer className="relative z-10 bg-panblue font-display text-lg text-gray-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 md:pb-32">
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
          <a
            href="https://github.com/Breq16/breq.dev"
            className={linkStyles}
            target="_blank"
            rel="noreferrer"
          >
            Breq16/breq.dev
          </a>
        </p>
        <p>
          {contactLinks.map(([icon, text, href]) => (
            <React.Fragment key={text}>
              <FontAwesomeIcon icon={icon} />
              &nbsp;
              {href ? (
                <a
                  href={href}
                  className={linkStyles}
                  target="_blank"
                  rel="noreferrer"
                >
                  {text}
                </a>
              ) : (
                text
              )}
              {" • "}
            </React.Fragment>
          ))}
          <Link href="/contact">
            <a className={linkStyles}>
              more <span className="sr-only">ways to contact me </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </a>
          </Link>
        </p>
        <p className="hidden md:block">
          footer art by the wonderful <FontAwesomeIcon icon={faTwitter} />{" "}
          <a
            href="https://twitter.com/nyashidos"
            className={linkStyles}
            target="_blank"
            rel="noreferrer"
          >
            nyashidos
          </a>
          !
        </p>

        <Character />
      </div>
    </footer>
  );
}
