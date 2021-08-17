import { Link } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

import Page from "../components/Page"

const NotFoundPage = () => {
    return (
        <Page>
            <Helmet>
                <title>oopsie. page not found.</title>
            </Helmet>
            <div className="flex mx-auto justify-center my-8 font-display gap-4">
                <h1 className="text-8xl">404</h1>
                <div className="my-2 text-2xl">
                    <p>page not found.</p>
                    <p>go <Link className="hover:underline text-panblue" to="/">home?</Link></p>
                </div>
            </div>
        </Page>
    )
}

export default NotFoundPage
