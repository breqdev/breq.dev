import React, { useState } from "react";
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

export default function Navbar() {
  const navLinks = {
    projects: "/projects",
    writing: "/writing",
    blog: "/blog",
    tags: "/tags",
    photos: "/photos",
    etc: "/etc",
  };

  const [expanded, setExpanded] = useState(false);

  const handleSelect = () => setExpanded(false);

  return (
    <nav className="sticky top-0 z-50 bg-panpink p-4 font-display">
      <SkipNavigation />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 lg:flex-row">
        <div className="flex w-full justify-between lg:w-max">
          <Link href="/">
            <a className="text-5xl text-black outline-none hover:text-white focus:text-white focus:underline">
              breq.dev
            </a>
          </Link>

          <button
            className="flex h-12 w-12 items-center justify-center rounded-xl border-4 border-black text-lg text-black lg:hidden"
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
            "absolute left-0 mt-16 w-full bg-panpink lg:static lg:mt-0 lg:flex " +
            (expanded ? "" : "hidden")
          }
        >
          <ul className="flex flex-col gap-2 p-4 lg:flex-row lg:p-0">
            {Object.entries(navLinks).map(([name, url]) => (
              <li className="text-lg" key={url}>
                <Link href={url} onClick={handleSelect}>
                  <a className="text-black outline-none hover:text-white focus:text-white focus:underline">
                    {name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex-grow" />

          {/* <Search onSelect={handleSelect} /> */}
        </div>
      </div>
    </nav>
  );
}
