import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import React from "react"

import core, { PoemContext } from "./Core"
import artistic from "./Artistic"
import headings from "./Headings"
import lists from "./Lists"
import tables from "./Tables"
import embeds from "../embeds"

const shortcodes = {
    ...core,
    ...artistic,
    ...headings,
    ...lists,
    ...tables,
    ...embeds,
}

export default function Markdown(props) {
    return (
        <PoemContext.Provider value={{ poem: false }}>
            <MDXProvider components={shortcodes}>
                <div className="font-body">
                    <MDXRenderer>{props.children}</MDXRenderer>
                </div>
            </MDXProvider>
        </PoemContext.Provider>
    )
}
