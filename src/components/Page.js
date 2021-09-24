import React from "react"

import Navbar from "./Navbar"
import Footer from "./Footer"
import SEOHelmet from "./SEOHelmet"

export default function Page({ children, className }) {
    return (
        <div className="min-h-screen flex flex-col">
            <SEOHelmet
                title="hey, i'm brooke."
                description="welcome to my little patch of internet. here you'll find my projects over the years."
            />
            <Navbar />
            <article className={"flex-grow " + (className ? className : "")}>
                {children}
            </article>
            <Footer />
        </div>
    )
}
