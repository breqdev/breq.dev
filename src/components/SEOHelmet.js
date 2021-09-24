import React from "react"
import Helmet from "react-helmet"

export default function SEOHelmet(props) {
    return (
        <Helmet htmlAttributes={{ lang: "en" }}>
            <meta charSet="utf-8" />

            <title>{props.title}</title>
            <meta name="description" content={props.description} />

            <meta name="og:title" content={props.title} />
            <meta name="og:description" content={props.description} />
            <meta
                name="og:image"
                content={props.image || "/opengraph/pansexual.jpg"}
            />
            <meta name="og:url" content="https://breq.dev/" />
            <meta name="og:site_name" content="breq.dev" />
            <meta name="og:type" content="website" />

            <script
                defer
                src="https://static.cloudflareinsights.com/beacon.min.js"
                data-cf-beacon='{"token": "e735a672f6cc409684d4fcc9df92b84c"}'
            ></script>
        </Helmet>
    )
}
