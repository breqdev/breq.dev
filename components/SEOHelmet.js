import React from "react";
import Head from "next/head";

export default function SEOHelmet(props) {
  return (
    <Head>
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

      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
