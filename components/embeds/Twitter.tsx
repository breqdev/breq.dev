import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

export default function WrappedTweet({ id }: { id: string }) {
  return (
    <div className="flex justify-center">
      <TwitterTweetEmbed tweetId={id} />
    </div>
  );
}
