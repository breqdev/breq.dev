import React from "react"
import { graphql } from "gatsby"

import Page from "../components/Page"
import Markdown from "../components/markdown/Markdown"
import { Helmet } from "react-helmet"


function PostHeader({ data }) {
    const [year, month, day] = data.mdx.slug.split("-")

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const date = `${months[parseInt(month)]} ${day}, ${year}`

    return (
        <section className="bg-black text-white rounded-xl text-center font-display p-8">
            <Helmet>
                <title>{data.mdx.frontmatter.title}</title>
            </Helmet>
            <h1 className="text-4xl md:text-6xl">{data.mdx.frontmatter.title}</h1>
            <p className="text-2xl">{date}</p>
        </section>
    )
}


export default function Post({ data }) {
    return (
        <Page>
            <article className="max-w-6xl mx-auto p-4">
                <PostHeader data={data} />
                <Markdown>
                    {data.mdx.body}
                </Markdown>
            </article>
        </Page>
    )
}


export const query = graphql`
    query ($id: String) {
        mdx(id: {eq: $id}) {
            body
            slug
            frontmatter {
                title
            }
        }
    }
`
