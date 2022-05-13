import React from "react";
import useSWR from "swr";

const soundcloudFetcher = (url) => {
  const params = new URLSearchParams();
  params.set("url", url);
  params.set("format", "json");

  return fetch("https://soundcloud.com/oembed?" + params.toString()).then(
    (resp) => resp.json()
  );
};

export default function SoundCloud({ url }) {
  const { data } = useSWR(url, soundcloudFetcher);

  return <div dangerouslySetInnerHTML={{ __html: data?.html }} />;
}
