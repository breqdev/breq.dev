import React from "react"
import Page from "../components/Page"
import SEOHelmet from "../components/SEOHelmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { StaticImage } from "gatsby-plugin-image"

const SPONSORS = ["EpocDotFr"]

export default function Sponsors() {
    return (
        <Page className="bg-black text-white">
            <SEOHelmet title="Sponsors" />
            <div className="max-w-xl mx-auto w-full py-8">
                <h1 className="text-6xl font-display text-center">Sponsors</h1>
                <p className="text-2xl my-4 font-body mt-8">
                    Generous contributions from these people help support my
                    work. Thank you!
                </p>
                <div className="grid place-items-center mt-16">
                    {SPONSORS.map((sponsor) => (
                        <a
                            key={sponsor}
                            target="_blank"
                            rel="noreferrer noopener"
                            href={`https://github.com/${sponsor}`}
                            className="bg-white text-black p-4 rounded-2xl flex flex-col items-center gap-4 text-lg"
                        >
                            <img
                                src={`https://github.com/${sponsor}.png`}
                                alt=""
                                className="w-32 h-32"
                            />
                            {sponsor}
                        </a>
                    ))}
                </div>
                <div className="flex mt-16 font-display text-2xl gap-4">
                    <a
                        href="https://github.com/sponsors/Breq16"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex-grow w-full text-center bg-gray-200 text-black py-4 px-6 rounded-full flex items-center"
                    >
                        <span className="flex-grow">GitHub Sponsors</span>
                        <FontAwesomeIcon icon={faHeart} />
                    </a>
                    <a
                        href="https://ko-fi.com/breq16"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex-grow w-full text-center bg-panblue text-black py-4 px-6 rounded-full flex items-center"
                    >
                        <span className="flex-grow">Ko-Fi</span>
                        <StaticImage
                            src="../images/logo/ko-fi.png"
                            className="w-12 -my-2"
                        />
                    </a>
                </div>
            </div>
        </Page>
    )
}
