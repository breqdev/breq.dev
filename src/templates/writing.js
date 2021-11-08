import React from "react"
import Page from "../components/Page"
import { graphql } from "gatsby"
import Markdown from "../components/markdown/Markdown"
import SEOHelmet from "../components/SEOHelmet"

export default function Writing({ data }) {
    return (
        <Page>
            <SEOHelmet
                title={data.mdx.frontmatter.title + " - breq.dev"}
                description={data.mdx.frontmatter.description}
            />
            <div>
                <section className="h-screen flex flex-col items-center justify-center font-display bg-black text-white">
                    <h1 className="text-5xl md:text-7xl text-center p-8">
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
