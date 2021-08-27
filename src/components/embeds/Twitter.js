import React from "react"
import { Tweet } from "react-twitter-widgets"

export default function WrappedTweet(props) {
    return (
        <div className="my-4 mx-auto" style={{ minHeight: "250px"}}>
            <Tweet tweetId={props.id} options={{ align: "center" }} />
        </div>
    )
}
