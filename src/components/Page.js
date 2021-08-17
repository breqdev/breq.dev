import React from "react"

import Navbar from "./Navbar"
import Footer from "./Footer"
import { Helmet } from "react-helmet"


export default function Page({ children, className }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Helmet>
                <meta charSet="utf-8" />
                <link rel="canonical" href="https://breq.dev/" />
                <meta name="og:title" content="hey, i'm brooke." />
                <meta name="og:description" content="welcome to my little patch of internet. here you'll find my projects over the years." />
                <meta name="og:image" content="/opengraph/pansexual.jpg" />
            </Helmet>
            <Navbar />
            <article className={"flex-grow " + (className ? className : "")}>
                {children}
            </article>
            <Footer />
        </div>
    )
}

