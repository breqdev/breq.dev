import * as React from "react"

import Navbar from "./Navbar"


export default function Page({ children }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

