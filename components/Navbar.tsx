import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function SkipNavigation() {
  return (
    <a
      className="absolute left-0 top-0 ml-10 -translate-y-full rounded-b-xl border-x-2 border-b-2 border-black bg-panblue p-2 text-black underline transition-transform focus:translate-y-0"
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
          "inline-block transition-transform " +
          (flipped ? "translate-y-2 rotate-180" : "")
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
    photos: "/photos",
    writing: "/writing",
    contact: "/contact",
    etc: "/etc",
  };

  const [flipped, setFlipped] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [onHomepage, setOnHomepage] = useState(false);

  useEffect(() => {
    setOnHomepage(window.location.pathname === "/");
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-panpink p-4 font-display">
      <SkipNavigation />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 md:flex-row md:gap-2">
        <div className="flex w-full justify-between md:w-max">
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
            "absolute left-0 mt-16 w-full overflow-hidden bg-panpink transition-[max-height] duration-500 md:static md:mt-0 md:flex " +
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

          <div className="flex-grow" />
        </div>
      </div>
    </nav>
  );
}
