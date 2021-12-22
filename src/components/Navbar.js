import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHamburger } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"
import Search from "./Search"

function SkipNavigation() {
    return (
        <a
            className="absolute left-0 top-0 ml-10 -translate-y-full focus:translate-y-0 transition-transform bg-panblue text-black underline border-black border-x-2 border-b-2 rounded-b-xl p-2"
            href="#main"
        >
            skip navigation
        </a>
    )
}

export default function Navbar() {
    const navLinks = {
        projects: "/projects",
        writing: "/writing",
        blog: "/blog",
        music: "/music",
        tags: "/tags",
        etc: "/etc",
    }

    const [expanded, setExpanded] = useState(false)

    const handleSelect = () => setExpanded(false)

    return (
        <nav className="sticky top-0 bg-panpink p-4 font-display z-50">
            <SkipNavigation />

            <div className="flex flex-col md:flex-row mx-auto w-full max-w-7xl gap-4">
                <div className="flex w-full md:w-max justify-between">
                    <Link
                        className="text-5xl hover:text-white outline-none focus:text-white focus:underline"
                        to="/"
                    >
                        breq.dev
                    </Link>

                    <button
                        className="border-4 border-black rounded-xl p-2 md:hidden text-lg"
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
                        "md:flex absolute md:static left-0 mt-16 md:mt-0 w-full bg-panpink " +
                        (expanded ? "" : "hidden")
                    }
                >
                    <ul className="flex gap-2 p-4 md:p-0 flex-col md:flex-row">
                        {Object.entries(navLinks).map(([name, url]) => (
                            <li className="text-lg" key={url}>
                                <Link
                                    className="hover:text-white outline-none focus:text-white focus:underline"
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
    )
}
