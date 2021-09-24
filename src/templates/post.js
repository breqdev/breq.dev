import React from "react"
import { graphql } from "gatsby"

import Page from "../components/Page"
import Markdown from "../components/markdown/Markdown"
import SEOHelmet from "../components/SEOHelmet"
import Comments from "../components/Comments"
import parseDate from "../utils/parseDate"

function PostHeader({ data }) {
    const date = parseDate(data.mdx.slug)

    return (
        <section className="bg-black text-white rounded-xl text-center font-display p-8">
            <SEOHelmet
                title={data.mdx.frontmatter.title + " - breq.dev"}
                description={data.mdx.excerpt.replace("\n", " ")}
            />
            <h1 className="text-4xl md:text-6xl">
                {data.mdx.frontmatter.title}
            </h1>
            <p className="text-2xl">{date}</p>
        </section>
    )
}

export default function Post({ data }) {
    return (
        <Page>
            <article className="max-w-6xl mx-auto p-4">
                <PostHeader data={data} />
                <Markdown>{data.mdx.body}</Markdown>
            </article>
            <Comments />
        </Page>
    )
}

export const query = graphql`
    query ($id: String) {
        mdx(id: { eq: $id }) {
            body
            slug
            excerpt
            frontmatter {
                title
            }
        }
    }
`
