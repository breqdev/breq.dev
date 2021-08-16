import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"


export default function Project(props) {
    let media

    if (props.frontmatter.image) {
        const image = getImage(props.frontmatter.image)

        media = <GatsbyImage image={image} alt="Project image" objectFit="cover" />
    }

    return (
        <Link to={"/projects/" + props.slug} className="block bg-white text-black p-4 rounded-2xl">
            <section>
                <div className="font-display h-32 overflow-hidden">
                    <h1 className="text-3xl">{props.frontmatter.title}</h1>
                    <h2 className="mb-2">{props.frontmatter.subtitle}</h2>
                </div>
                <div className="w-full h-60 flex rounded-lg overflow-hidden">
                    {media}
                </div>
            </section>
        </Link>
    )
}
