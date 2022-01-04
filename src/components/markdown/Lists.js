import React from "react"

function Ul(props) {
    return (
        <p className="max-w-prose mx-auto text-lg">
            <ul className="list-disc ml-8">{props.children}</ul>
        </p>
    )
}

function Ol(props) {
    return (
        <p className="max-w-prose mx-auto text-lg">
            <ol className="list-decimal ml-8">{props.children}</ol>
        </p>
    )
}

function Li(props) {
    return <li className="my-2 pl-2">{props.children}</li>
}

const shortcodes = {
    ul: Ul,
    ol: Ol,
    li: Li,
}

export default shortcodes
