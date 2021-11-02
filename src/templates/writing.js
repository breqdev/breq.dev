import React from "react"
import Page from "../components/Page"
import { graphql } from "gatsby"
import Markdown from "../components/markdown/Markdown"

export default function Writing({ data }) {
    return (
        <Page>
            <div>
                <section className="h-screen flex flex-col items-center justify-center font-display bg-black text-white">
                    <h1 className="text-4xl md:text-7xl">
                        {data.mdx.frontmatter.title}
                    </h1>
                    <h2 className="text-xl">{data.mdx.frontmatter.date}</h2>
                </section>
                <article className="p-4">
                    <Markdown>{data.mdx.body}</Markdown>
                </article>
            </div>
        </Page>
    )
}

export const query = graphql`
    query ($id: String) {
        mdx(id: { eq: $id }) {
            body
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
            }
        }
    }
`
