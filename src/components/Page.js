import React from "react"

import Navbar from "./Navbar"
import Footer from "./Footer"


export default function Page({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    )
}

