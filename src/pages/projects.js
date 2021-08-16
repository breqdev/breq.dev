import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"

import Page from "../components/Page"


function Project(props) {
    let media

    if (props.frontmatter.image) {
        const image = getImage(props.frontmatter.image)

        media = <GatsbyImage image={image} alt="Project image" objectFit="cover" />
    }

    return (
        <Link to={"/projects/" + props.slug} className="block bg-white text-black p-4 rounded-2xl">
            <section className="font-display">
                <h1 className="text-3xl">{props.frontmatter.title}</h1>
                <h2 className="mb-2 h-12">{props.frontmatter.subtitle}</h2>
                <div className="w-full h-60 flex rounded-lg overflow-hidden">
                    {media}
                </div>
            </section>
        </Link>
    )
}

export default function Projects({ data }) {

    const projects = data.allMdx.edges.map(({ node }) => <Project key={node.id} {...node} />)

    return (
        <Page className="bg-black text-white">
            <div className="text-center max-w-7xl mx-auto font-display">
                <h1 className="my-8 text-6xl">Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-stretch m-8">
                    {projects}
                </div>
            </div>
        </Page>
    )
}

export const query = graphql`
    query {
        allMdx(filter: { fileAbsolutePath: { regex: "\\/projects/" } }) {
            edges {
                node {
                    id
                    slug
                    frontmatter {
                        title
                        subtitle
                        image {
                            childImageSharp {
                                gatsbyImageData(
                                    width: 1000
                                    placeholder: BLURRED
                                    formats: [AUTO, WEBP, AVIF]
                                )
                            }
                        }
                    }
                }
            }
        }
    }
`

