import React from "react"

import Navbar from "./Navbar"
import Footer from "./Footer"


export default function Page({ children, className }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <article className={"flex-grow " + (className ? className : "")}>
                {children}
            </article>
            <Footer />
        </div>
    )
}

