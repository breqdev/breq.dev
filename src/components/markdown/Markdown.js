import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import React from "react"

import YouTube from "../YouTube"


function Caption(props) {
    return (
        <p className="text-center font-body">
            {props.children}
        </p>
    )
}


function Paragraph(props) {
    return (
        <p className="my-4 text-lg font-body">
            {props.children}
        </p>
    )
}




const shortcodes = {
    p: Paragraph,

    YouTube,
    Caption,
}



export default function Markdown(props) {
    return (
        <MDXProvider components={shortcodes}>
            <MDXRenderer>
                {props.children}
            </MDXRenderer>
        </MDXProvider>
    )
}
