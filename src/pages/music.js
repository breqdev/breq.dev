import React from "react"
import Page from "../components/Page"
import SEOHelmet from "../components/SEOHelmet"

export default function Music() {
    return (
        <Page className="bg-black text-white flex justify-center items-center">
            <SEOHelmet title="music, made with <3 by breq." />
            <div className="mx-auto max-w-xl my-8 font-display text-center flex flex-col gap-8">
                <h1 className="text-7xl">music</h1>
                <h2 className="text-4xl">and miscellaneous sounds</h2>
                <p className="text-xl">coming soon...</p>
            </div>
        </Page>
    )
}
