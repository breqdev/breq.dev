import React from "react"
import { graphql, Link } from "gatsby"
import Page from "../components/Page"
import SEOHelmet from "../components/SEOHelmet"

export default function Tag({ data, pageContext }) {
    return (
        <Page className="bg-black text-white">
            <SEOHelmet title={`${pageContext.tag} - the archives of breq`} />
            <div className="text-center max-w-7xl mx-auto font-display">
                <h1 className="my-8 text-6xl">{pageContext.tag} - entries</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-stretch m-8">
                    {data.allMdx.edges.map(({ node }) => (
                        <Link
                            className="bg-white text-black rounded-3xl p-4 flex flex-col gap-2 border-2 border-black focus:border-panpink"
                            key={node.id}
                            to={node.fields.slug}
                        >
                            <h2 className="text-2xl">
                                {node.frontmatter.title}
                            </h2>
                            <p>{node.frontmatter.subtitle || node.excerpt}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </Page>
    )
}

export const query = graphql`
    query ($tag: String) {
        allMdx(
            filter: { frontmatter: { tags: { eq: $tag } } }
            sort: { fields: frontmatter___date, order: DESC }
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        subtitle
                    }
                    excerpt
                    fields {
                        slug
                        type
                    }
                }
            }
        }
    }
`
