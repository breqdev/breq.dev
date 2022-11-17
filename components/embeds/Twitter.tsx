import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

const dontPurge = "twitter-tweet";

export default function WrappedTweet({ id }: { id: string }) {
  return <TwitterTweetEmbed tweetId={id} />;
}
