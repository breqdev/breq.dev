import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHamburger } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"


export default function Navbar() {

    const navLinks = {
        projects: "/projects",
        hacks: "/hacks",
        archives: "/archives",
        featured: "/featured",
        blog: "/blog",
        apps: "/apps",
        contact: "/contact",
    }

    const [expanded, setExpanded] = useState(false)


    return (
        <div className="sticky top-0 bg-pink-500 p-4 font-display">

            <div className="flex flex-col md:flex-row mx-auto w-full max-w-7xl gap-4">

                <div className="flex w-full md:w-max justify-between">
                    <a className="text-5xl hover:text-white" href="/">breq.dev</a>

                    <button className="border-4 border-black rounded-xl p-2 md:hidden text-lg" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setExpanded(!expanded)}>
                        <FontAwesomeIcon icon={faHamburger} />
                    </button>
                </div>

                <div className={"md:block absolute md:static left-0 mt-16 md:mt-0 w-full " + (expanded ? "" : "hidden")}>
                    <ul className="flex gap-2 p-4 md:p-0 flex-col md:flex-row bg-pink-500">
                        {Object.entries(navLinks).map(([name, url]) => (
                            <li className="text-lg" key={url}>
                                <Link className={false ? "text-white hover:text-black" : "hover:text-white"} to={url}>{ name }</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    )
}