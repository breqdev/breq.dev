import React from "react";
import { Tweet } from "react-twitter-notrack";

export default function WrappedTweet({ id }) {
  return (
    <Tweet
      className="my-4 mx-auto"
      id={id}
      apiUrl="https://twitter-proxy.breq.workers.dev"
    />
  );
}
