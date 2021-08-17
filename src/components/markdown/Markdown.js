import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import React from "react"
import { Link } from "gatsby"

import YouTube from "../YouTube"


function Caption(props) {
    return (
        <p className="text-center font-body">
            {props.children}
        </p>
    )
}


function Paragraph(props) {
    // Detect if we're wrapping a Gatsby image
    if (props.children?.props?.className?.startsWith?.("gatsby-resp-image")) {
        return (
            <p className="my-4">
                {props.children}
            </p>
        )
    }

    return (
        <p className="my-4 text-lg font-body max-w-4xl mx-auto">
            {props.children}
        </p>
    )
}


function List(props) {
    return (
        <ul className="list-disc max-w-3xl mx-auto">
            {props.children}
        </ul>
    )
}

function IntLink(props) {
    return (
        <Link to={props.to} className="text-panblue hover:underline">
            {props.children}
        </Link>
    )
}

function ExtLink(props) {
    return (
        <a href={props.href} className="text-panblue hover:underline" target="_blank" rel="noopener noreferrer">
            {props.children}
        </a>
    )
}


function Heading(props) {
    return (
        <h1 className="text-4xl font-display text-center mt-8">
            {props.children}
        </h1>
    )
}


function SubHeading(props) {
    return (
        <h2 className="text-3xl font-display text-center mt-8 italic">
            {props.children}
        </h2>
    )
}


function SubSubHeading(props) {
    return (
        <h3 className="text-2xl font-display text-center mt-8 -mb-2 underline">
            {props.children}
        </h3>
    )
}


function Table(props) {
    return (
        <table className="mx-auto border-black border-2 rounded-xl border-separate border-spacing-0 overflow-hidden">
            {props.children}
        </table>
    )
}

function Th(props) {
    return (
        <th className="border-black border p-2">
            {props.children}
        </th>
    )
}


function Td(props) {
    return (
        <td className="border-gray-500 border p-2">
            {props.children}
        </td>
    )
}


const shortcodes = {
    p: Paragraph,
    ul: List,
    a: ExtLink,
    h1: Heading,
    h2: SubHeading,
    h3: SubSubHeading,
    table: Table,
    th: Th,
    td: Td,


    YouTube,
    Caption,
    Link: IntLink,
}



export default function Markdown(props) {
    return (
        <MDXProvider components={shortcodes}>
            <div className="font-body">
                <MDXRenderer>
                    {props.children}
                </MDXRenderer>
            </div>
        </MDXProvider>
    )
}
