import React from "react"
import Helmet from "react-helmet"


export default function SEOHelmet(props) {
    return (
        <Helmet htmlAttributes={{ lang: "en" }}>
            <meta charSet="utf-8" />

            <link rel="canonical" href="https://breq.dev/" />

            <title>{props.title}</title>
            <meta name="description" content={props.description} />

            <meta name="og:title" content={props.title} />
            <meta name="og:description" content={props.description} />
            <meta name="og:image" content="/opengraph/pansexual.jpg" />
            <meta name="og:url" content="https://breq.dev/" />
            <meta name="og:site_name" content="breq.dev" />
            <meta name="og:type" content="website" />
        </Helmet>
    )
}