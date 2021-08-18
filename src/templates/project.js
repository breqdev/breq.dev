import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

import Page from "../components/Page"
import Markdown from "../components/markdown/Markdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt, faLaptopCode } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"


function ProjectInfoItem({ name, icon, value, link }) {
    return (
        <div className="flex gap-2 items-center">
            <span className="sr-only">{name}</span>
            <FontAwesomeIcon icon={icon} />
            <span>
                {link ? <a href={link} className="hover:underline" target="_blank" rel="noopener noreferrer">{value}</a> : value}
            </span>
        </div>
    )
}


function ProjectInfo({ data }) {
    const items = [
        {
            name: "created",
            icon: faCalendarAlt,
            value: data.mdx.frontmatter.created,
        },
        {
            name: "repo",
            icon: faGithub,
            value: data.mdx.frontmatter.repo,
            link: `https://github.com/${data.mdx.frontmatter.repo}`
        },
        {
            name: "demo",
            icon: faLaptopCode,
            value: data.mdx.frontmatter.demo,
            link: data.mdx.frontmatter.demo,
        }
    ]

    const infoItems = items.filter(item => item.value).map(item => <ProjectInfoItem key={item.name} {...item} />)

    return (
        <div className="flex justify-center text-lg gap-4 flex-wrap">
            {infoItems}
        </div>
    )
}


function ProjectHeader({ data }) {
    return (
        <section className="font-display text-center bg-black text-white rounded-xl p-8">
            <Helmet>
                <title>{data.mdx.frontmatter.title} - breq.dev</title>
                <meta name="og:title" content={data.mdx.frontmatter.title + " - breq.dev"} />
                <meta name="og:description" content={data.mdx.frontmatter.subtitle} />
            </Helmet>
            <h1 className="text-5xl">{data.mdx.frontmatter.title}</h1>
            <h2 className="text-3xl text-gray-300 mb-4">{data.mdx.frontmatter.subtitle}</h2>
            <ProjectInfo data={data} />
        </section>
    )
}


export default function Project({ data }) {
    return (
        <Page>
            <article className="max-w-6xl mx-auto p-4">
                <ProjectHeader data={data} />
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
            frontmatter {
                title
                subtitle
                created
                repo
                demo
            }
        }
    }
`
