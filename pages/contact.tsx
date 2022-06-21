import {
  faDiscord,
  faGithub,
  faInstagram,
  faKeybase,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

function ContactBadge(props) {
  const className =
    "block border-2 border-black dark:border-white rounded-xl px-4 outline-none";

  return <div className={className}>{props.children}</div>;
}

const ExtLink = ({ href, className = "", children }) => (
  <a
    href={href}
    className={
      "text-panblue-dark outline-none focus:bg-panyellow " + (className || "")
    }
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const RightArrow = () => (
  <FontAwesomeIcon icon={faArrowRight} className="mx-4" />
);

export default function Contact() {
  return (
    <Page>
      <SEOHelmet title="contact me. if you want to." />
      <div className="mx-auto my-8 flex max-w-2xl flex-col gap-8 px-4 text-center font-display">
        <h1 className="text-6xl">get in touch</h1>

        <ContactBadge>
          <h2 className="my-4 text-4xl italic">
            about my code?
            <RightArrow />
            <FontAwesomeIcon icon={faGithub} />
          </h2>
          <p className="my-4 font-body text-2xl">
            the best way to reach me with code-related questions is on{" "}
            <ExtLink href="https://github.com/Breq16">GitHub</ExtLink>. if
            you're having trouble, don't hesitate to open an issue in the
            relevant project repo!
          </p>
          <p className="my-4 mx-auto max-w-lg font-body text-2xl">
            <ExtLink
              href="https://twitter.com/breqdev/status/1457585797666848776"
              className="italic"
            >
              but please avoid contacting me through personal channels for stuff
              like this.
            </ExtLink>
          </p>
        </ContactBadge>

        <ContactBadge>
          <h2 className="my-4 text-4xl italic">
            sliding in my dms?
            <RightArrow />
            <FontAwesomeIcon icon={faTwitter} />
            <span className="mx-1" />
            <FontAwesomeIcon icon={faInstagram} />
          </h2>
          <p className="my-4 font-body text-2xl">
            my DM's are open to everyone on{" "}
            <ExtLink href="https://twitter.com/breqdev">
              twitter{"\u00A0"}@breqdev
            </ExtLink>{" "}
            and on{" "}
            <ExtLink href="https://instagram.com/breqdev">
              insta{"\u00A0"}@breqdev
            </ExtLink>
            .
          </p>
        </ContactBadge>

        <ContactBadge>
          <h2 className="my-4 text-4xl italic">
            encrypted channel?
            <RightArrow />
            <FontAwesomeIcon icon={faKeybase} />
          </h2>
          <p className="my-4 font-body text-2xl">
            i'm typically reachable on{" "}
            <ExtLink href="https://keybase.io/breq">
              keybase{"\u00A0"}@breq
            </ExtLink>
            , if old-school crypto is your jam.
          </p>
        </ContactBadge>

        <ContactBadge>
          <h2 className="my-4 text-4xl italic">
            voice or video call?
            <RightArrow />
            <FontAwesomeIcon icon={faDiscord} />
          </h2>
          <p className="my-4 font-body text-2xl">
            i don't always accept friend requests from people i don't know. if
            you'd like to reach out to me on discord, please fill out the 'about
            me' on your profile so i know who you are!
          </p>
          <p className="my-4 font-body text-2xl">
            <span className="font-mono">breq#8296</span>, by the way.
          </p>
        </ContactBadge>

        <ContactBadge>
          <h2 className="my-4 text-4xl italic">
            ol' reliable?
            <RightArrow />
            <FontAwesomeIcon icon={faEnvelope} />
          </h2>
          <p className="my-4 font-body text-2xl">
            when in doubt, you can always shoot me an email at{" "}
            <ExtLink href="mailto:breq@breq.dev">breq@breq.dev</ExtLink>.
          </p>
        </ContactBadge>
      </div>
    </Page>
  );
}
