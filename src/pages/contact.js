import { faDiscord, faGithub, faKeybase, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import Page from "../components/Page"
import SEOHelmet  from "../components/SEOHelmet"


function ContactBadge(props) {
    const className = "block border-2 border-black focus:border-panpink focus:border-4 rounded-xl px-4 outline-none"

    if (props.href) {
        return (
            <a className={className} href={props.href}>
                {props.children}
            </a>
        )
    } else {
        return (
            <div className={className}>
                {props.children}
            </div>
        )
    }
}


const RightArrow = () => <FontAwesomeIcon icon={faArrowRight} className="mx-4" />


export default function Contact() {
    return (
        <Page>
            <SEOHelmet title="contact me. if you want to." />
            <div className="max-w-2xl mx-auto text-center font-display flex flex-col gap-8 px-4 my-4">
                <h1 className="text-6xl">get in touch</h1>

                <ContactBadge href="https://github.com/Breq16">
                    <h2 className="text-4xl my-4">
                        is it about my code?
                        <RightArrow />
                        <FontAwesomeIcon icon={faGithub} />
                    </h2>
                    <p className="text-2xl my-4 font-body">
                        the best way to reach me with code-related questions is
                        on GitHub. if you're having trouble, don't hesitate to open an issue!
                    </p>
                </ContactBadge>

                <ContactBadge href="https://keybase.io/breq">
                    <h2 className="text-4xl my-4">
                        sliding in my dms?
                        <RightArrow />
                        <FontAwesomeIcon icon={faKeybase} />
                    </h2>
                    <p className="text-2xl my-4 font-body">
                        i'm typically reachable on keybase, if encrypted messaging
                        is your jam.
                    </p>
                </ContactBadge>

                <ContactBadge href="https://twitter.com/breqdev">
                    <h2 className="text-4xl my-4">
                        prefer twitter?
                        <RightArrow />
                        <FontAwesomeIcon icon={faTwitter} />
                    </h2>
                    <p className="text-2xl my-4 font-body">
                        my DM's are open to everyone on twitter, but i might
                        not see them straight away.
                    </p>
                </ContactBadge>

                <ContactBadge>
                    <h2 className="text-4xl my-4">
                        discord more your vibe?
                        <RightArrow />
                        <FontAwesomeIcon icon={faDiscord} />
                    </h2>
                    <p className="text-2xl my-4 font-body">
                        i don't always accept friend requests from people i
                        don't know. if you'd like to reach out to me on discord,
                        please fill out the 'about me' on your profile so i
                        know who you are!
                    </p>
                </ContactBadge>

                <ContactBadge href="mailto:breq@breq.dev">
                    <h2 className="text-4xl my-4">
                        ol' reliable?
                        <RightArrow />
                        <FontAwesomeIcon icon={faEnvelope} />
                    </h2>
                    <p className="text-2xl my-4 font-body">
                        when in doubt, you can always shoot me an email at
                        breq@breq.dev.
                    </p>
                </ContactBadge>
            </div>
        </Page>
    )
}