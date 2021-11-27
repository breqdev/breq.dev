import {
    faDiscord,
    faGithub,
    faInstagram,
    faKeybase,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import Page from "../components/Page"
import SEOHelmet from "../components/SEOHelmet"

function ContactBadge(props) {
    const className =
        "block border-2 border-black focus:border-panpink focus:border-4 rounded-xl px-4 outline-none"

    return <div className={className}>{props.children}</div>
}

const ExtLink = ({ href, className, children }) => (
    <a
        href={href}
        className={
            "text-panblue-dark focus:bg-panyellow outline-none " +
            (className || "")
        }
        target="_blank"
        rel="noopener noreferrer"
    >
        {children}
    </a>
)

const RightArrow = () => (
    <FontAwesomeIcon icon={faArrowRight} className="mx-4" />
)

export default function Contact() {
    return (
        <Page>
            <SEOHelmet title="contact me. if you want to." />
            <div className="max-w-2xl mx-auto text-center font-display flex flex-col gap-8 px-4 my-8">
                <h1 className="text-6xl">get in touch</h1>

                <ContactBadge>
                    <h2 className="text-4xl my-4 italic">
                        about my code?
                        <RightArrow />
                        <FontAwesomeIcon icon={faGithub} />
                    </h2>
                    <p className="text-2xl my-4 font-body">
                        the best way to reach me with code-related questions is
                        on{" "}
                        <ExtLink href="https://github.com/Breq16">
                            GitHub
                        </ExtLink>
                        . if you're having trouble, don't hesitate to open an
                        issue in the relevant project repo!
                    </p>
                    <p className="text-2xl my-4 font-body max-w-lg mx-auto">
                        <ExtLink
                            href="https://twitter.com/breqdev/status/1457585797666848776"
                            className="italic"
                        >
                            but please avoid contacting me through personal
                            channels for stuff like this.
                        </ExtLink>
                    </p>
                </ContactBadge>

                <ContactBadge>
                    <h2 className="text-4xl my-4 italic">
                        sliding in my dms?
                        <RightArrow />
                        <FontAwesomeIcon icon={faTwitter} />
                        <span className="mx-1" />
                        <FontAwesomeIcon icon={faInstagram} />
                    </h2>
                    <p className="text-2xl my-4 font-body">
                        my DM's are open to everyone on{" "}
                        <ExtLink href="https://twitter.com/breqdev">
                            twitter{"\u00A0"}@breqdev
                        </ExtLink>{" "}
                        and on{" "}
                        <ExtLink href="https://instagram.com/breq16">
                            insta{"\u00A0"}@breq16
                        </ExtLink>
                        .
                    </p>
                </ContactBadge>

                <ContactBadge>
                    <h2 className="text-4xl my-4 italic">
                        encrypted channel?
                        <RightArrow />
                        <FontAwesomeIcon icon={faKeybase} />
                    </h2>
                    <p className="text-2xl my-4 font-body">
                        i'm typically reachable on{" "}
                        <ExtLink href="https://keybase.io/breq">
                            keybase{"\u00A0"}@breq
                        </ExtLink>
                        , if old-school crypto is your jam.
                    </p>
                </ContactBadge>

                <ContactBadge>
                    <h2 className="text-4xl my-4 italic">
                        voice or video call?
                        <RightArrow />
                        <FontAwesomeIcon icon={faDiscord} />
                    </h2>
                    <p className="text-2xl my-4 font-body">
                        i don't always accept friend requests from people i
                        don't know. if you'd like to reach out to me on discord,
                        please fill out the 'about me' on your profile so i know
                        who you are!
                    </p>
                    <p className="text-2xl my-4 font-body">
                        <span className="font-mono">breq#8296</span>, by the
                        way.
                    </p>
                </ContactBadge>

                <ContactBadge>
                    <h2 className="text-4xl my-4 italic">
                        ol' reliable?
                        <RightArrow />
                        <FontAwesomeIcon icon={faEnvelope} />
                    </h2>
                    <p className="text-2xl my-4 font-body">
                        when in doubt, you can always shoot me an email at{" "}
                        <ExtLink href="mailto:breq@breq.dev">
                            breq@breq.dev
                        </ExtLink>
                        .
                    </p>
                </ContactBadge>
            </div>
        </Page>
    )
}
