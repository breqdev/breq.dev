import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"

const colors = {
    blue: "#1bb3ff",
    pink: "#ff218c",
    gray: "#9CA3AF",
    purple: "#8B5CF6",
    dark: "#404040",
}

const theme = {
    plain: {
        color: colors.dark,
    },
    styles: [
        {
            types: ["changed"],
            style: {
                color: colors.purple,
                fontStyle: "italic",
            },
        },
        {
            types: ["deleted"],
            style: {
                color: colors.pink,
                fontStyle: "italic",
            },
        },
        {
            types: ["inserted", "attr-name"],
            style: {
                color: colors.blue,
                fontStyle: "italic",
            },
        },
        {
            types: ["comment"],
            style: {
                color: colors.gray,
                fontStyle: "italic",
            },
        },
        {
            types: ["string", "builtin", "char", "constant", "url"],
            style: {
                color: colors.blue,
            },
        },
        {
            types: ["variable"],
            style: {
                color: colors.pink,
            },
        },
        {
            types: ["number"],
            style: {
                color: colors.purple,
            },
        },
        {
            types: ["punctuation"],
            style: {
                color: colors.pink,
            },
        },
        {
            types: ["function", "selector", "doctype"],
            style: {
                color: colors.pink,
                fontStyle: "italic",
            },
        },
        {
            types: ["class-name"],
            style: {
                color: colors.dark,
            },
        },
        {
            types: ["tag"],
            style: {
                color: colors.pink,
            },
        },
        {
            types: ["operator", "property", "keyword", "namespace"],
            style: {
                color: colors.purple,
            },
        },
        {
            types: ["boolean"],
            style: {
                color: colors.purple,
            },
        },
    ],
}

export default function Code(props) {
    return (
        <Highlight
            {...defaultProps}
            theme={theme}
            code={props.children.trim()}
            language={props.className?.replace("language-", "")}
        >
            {({ tokens, getLineProps, getTokenProps }) => (
                <pre className="pl-4 pr-8 py-2 mx-auto my-2 rounded-2xl overflow-x-auto bg-[#fff5fc] text-lg font-mono max-w-full w-max min-w-[min(100%,42rem)]">
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })} className="">
                            {line.map((token, key) => (
                                <span
                                    {...getTokenProps({ token, key })}
                                    className=""
                                />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    )
}
