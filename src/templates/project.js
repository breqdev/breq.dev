import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { graphql } from "gatsby"

import Page from "../components/Page"


export default function Project({ data }) {
    return (
        <Page>
            <h1>Project</h1>
            <MDXRenderer>
                {data.mdx.body}
            </MDXRenderer>
        </Page>
    )
}

export const query = graphql`
    query ($id: String) {
        mdx(id: {eq: $id}) {
            body
        }
    }
`
