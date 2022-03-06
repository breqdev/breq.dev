import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import { Link } from "gatsby";
import Search from "./Search";

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
    music: "/music",
    tags: "/tags",
    friends: "/friends",
    etc: "/etc",
  };

  const [expanded, setExpanded] = useState(false);

  const handleSelect = () => setExpanded(false);

  return (
    <nav className="sticky top-0 z-50 bg-panpink p-4 font-display">
      <SkipNavigation />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 md:flex-row">
        <div className="flex w-full justify-between md:w-max">
          <Link
            className="text-5xl text-black outline-none hover:text-white focus:text-white focus:underline"
            to="/"
          >
            breq.dev
          </Link>

          <button
            className="rounded-xl border-4 border-black p-2 text-lg text-black md:hidden"
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
            "absolute left-0 mt-16 w-full bg-panpink md:static md:mt-0 md:flex " +
            (expanded ? "" : "hidden")
          }
        >
          <ul className="flex flex-col gap-2 p-4 md:flex-row md:p-0">
            {Object.entries(navLinks).map(([name, url]) => (
              <li className="text-lg" key={url}>
                <Link
                  className="text-black outline-none hover:text-white focus:text-white focus:underline"
                  to={url}
                  onClick={handleSelect}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex-grow" />

          <Search onSelect={handleSelect} />
        </div>
      </div>
    </nav>
  );
}
