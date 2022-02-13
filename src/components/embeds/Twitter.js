import React from "react";
import { Tweet } from "react-twitter-notrack";

export default function WrappedTweet(props) {
  console.log("rendering wrapped tweet");
  return (
    <Tweet
      className="my-4 mx-auto"
      id={props.id}
      apiUrl="https://twitter-proxy.breq.workers.dev"
    />
  );
}
