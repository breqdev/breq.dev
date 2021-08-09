import * as React from "react"
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
        <div class="bg-blue-400 text-lg">
            <div class="max-w-7xl mx-auto px-4 py-16 md:pb-32 flex flex-col gap-8">
                <p>
                    made with <FontAwesomeIcon icon={faHeart} />
                    <span class="sr-only">love</span> by breq,{" "}

                    <FontAwesomeIcon icon={faCopyright} />
                    <span class="sr-only">copyright</span> 2021,{" "}

                    <FontAwesomeIcon icon={faGithub} />
                    <span class="sr-only">github</span>
                    <a href="https://github.com/Breq16/breq.dev" target="_blank"> Breq16/breq.dev</a>
                </p>
        <p>
            {contactLinks.map(([icon, text, href]) => (
                <React.Fragment key={text}>
                    <FontAwesomeIcon icon={icon} />{" "}
                    {href ? <a href={href} target="_blank">{text}</a> : text}
                    {" • "}
                </React.Fragment>
            ))}
            <a href="{{ site.contact }}" target="_blank">{"more "}
            <FontAwesomeIcon icon={faChevronRight} /></a>
        </p>
    </div>
</div>

    )
}