import React from "react"
import Page from "../components/Page"
import SEOHelmet from "../components/SEOHelmet"

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
                                className="w-32"
                            />
                            {sponsor}
                        </a>
                    ))}
                </div>
            </div>
        </Page>
    )
}
