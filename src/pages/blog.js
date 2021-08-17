import { graphql, Link } from "gatsby"
import React from "react"

import Page from "../components/Page"


function Post(props) {
    return (
        <Link to={"/" + props.slug.replaceAll("-", "/")} className="block bg-white text-black p-4 rounded-2xl">
            <section className="flex flex-col h-full">
                <h1 className="text-2xl flex-grow">{props.frontmatter.title}</h1>
                <hr className="my-2 border-black" />
                <p>{props.excerpt}</p>
            </section>
        </Link>
    )
}


export default function Posts({ data }) {
    const posts = data.allMdx.edges.map(({ node }) => <Post key={node.id} {...node} />)

    return (
        <Page className="bg-black text-white">
            <div className="text-center max-w-7xl mx-auto font-display">
                <h1 className="my-8 text-6xl">Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-stretch m-8">
                    {posts}
                </div>
            </div>
        </Page>
    )
}

export const query = graphql`
    query {
        allMdx(filter: { fileAbsolutePath: { regex: "\\/posts/" } }) {
            edges {
                node {
                    id
                    slug
                    excerpt
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`