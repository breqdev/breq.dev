import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faEnvelope, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { faCopyright } from "@fortawesome/free-regular-svg-icons"
import { faGithub, faDiscord, faKeybase } from "@fortawesome/free-brands-svg-icons"


export default function Footer() {

    const contactLinks = [
        [faEnvelope, "breq@breq.dev", "mailto:breq@breq.dev"],
        [faDiscord, "Breq#8296", null],
        [faKeybase, "breq", "https://keybase.io/breq"],
    ]


    return (
        <footer className="bg-panblue text-lg font-display z-10">
            <div className="max-w-7xl mx-auto px-4 py-16 md:pb-32 flex flex-col gap-8">
                <p>
                    made with <FontAwesomeIcon icon={faHeart} />
                    <span className="sr-only">love</span> by breq,{" "}

                    <FontAwesomeIcon icon={faCopyright} />
                    <span className="sr-only">copyright</span> 2021,{" "}

                    <FontAwesomeIcon icon={faGithub} />
                    <span className="sr-only">github</span>
                    <a href="https://github.com/Breq16/breq.dev" className="hover:underline" target="_blank" rel="noreferrer"> Breq16/breq.dev</a>
                </p>
                <p>
                    {contactLinks.map(([icon, text, href]) => (
                        <React.Fragment key={text}>
                            <FontAwesomeIcon icon={icon} />{" "}
                            {href ? <a href={href} className="hover:underline" target="_blank" rel="noreferrer">{text}</a> : text}
                            {" • "}
                        </React.Fragment>
                    ))}
                    <Link to="/contact" className="hover:underline">more <FontAwesomeIcon icon={faChevronRight} /></Link>
                </p>
            </div>
        </footer>
    )
}