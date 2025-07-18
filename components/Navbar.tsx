import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import flags from "public/flags.svg";
import Image from "next/image";

function SkipNavigation() {
  return (
    <a
      className="absolute left-0 top-0 ml-10 -translate-y-full rounded-b-xl border-x-2 border-b-2 border-black bg-panblue p-2 text-black underline focus:translate-y-0 motion-safe:transition-transform"
      href="#main"
    >
      skip navigation
    </a>
  );
}

function Wordmark({
  flipped,
  onClick,
}: {
  flipped: boolean;
  onClick?: () => void;
}) {
  const className =
    "flex text-5xl text-black outline-none " +
    (onClick ? "" : "hover:text-white focus:text-white focus:underline");

  const inner = (
    <>
      <span
        className={
          "inline-block motion-safe:transition-transform " +
          (flipped ? "motion-safe:translate-y-2 motion-safe:rotate-180" : "")
        }
      >
        breq
      </span>
      .dev
    </>
  );

  if (onClick) {
    return (
      <button className={className} onClick={onClick}>
        {inner}
      </button>
    );
  } else {
    return (
      <Link href="/" className={className}>
        {inner}
      </Link>
    );
  }
}

export default function Navbar() {
  const navLinks = {
    projects: "/projects",
    blog: "/blog",
    contact: "/contact",
    directory: "/directory",
    etc: "/etc",
  };

  const [flipped, setFlipped] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [onHomepage, setOnHomepage] = useState(false);

  useEffect(() => {
    setOnHomepage(window.location.pathname === "/");
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 bg-panpink p-4 font-display print:hidden"
      id="navbarNav"
    >
      <SkipNavigation />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 md:flex-row md:gap-2">
        <div className="flex w-full flex-row justify-between md:w-max">
          <Wordmark
            onClick={onHomepage ? () => setFlipped(!flipped) : undefined}
            flipped={flipped && onHomepage}
          />

          <button
            className="flex h-12 w-12 items-center justify-center rounded-xl border-4 border-black text-lg text-black md:hidden"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setExpanded(!expanded)}
          >
            <FontAwesomeIcon icon={faHamburger} />
          </button>
        </div>

        <div
          className={
            "absolute left-0 mt-16 w-full overflow-hidden bg-panpink duration-500 motion-safe:transition-[max-height] md:static md:mt-0 md:flex " +
            (expanded ? "max-h-96" : " max-h-0 md:max-h-96")
          }
        >
          <ul className="flex flex-col gap-2 p-4 md:flex-row md:p-0">
            {Object.entries(navLinks).map(([name, url]) => (
              <li className="text-lg" key={url}>
                <Link
                  href={url}
                  className="text-black outline-none hover:text-white focus:text-white focus:underline"
                  onClick={() => setExpanded(false)}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative -my-4 mr-8 hidden aspect-[390/120] h-20 lg:block">
          <Image
            src={flags}
            alt="lesbian, transgender, and polyamorous pride flags combined with maine state flag"
            fill
          />
        </div>
      </div>
    </nav>
  );
}
