import React from "react"

function Ul(props) {
    return (
        <p className="max-w-3xl mx-auto">
            <ul className="list-disc">{props.children}</ul>
        </p>
    )
}

function Ol(props) {
    return (
        <p className="max-w-3xl mx-auto">
            <ol className="list-decimal">{props.children}</ol>
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
