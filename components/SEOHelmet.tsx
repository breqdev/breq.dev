import React from "react";
import Head from "next/head";

type SEOProps = {
  title: string;
  description?: string;
  image?: string;
};

export default function SEOHelmet({ title, description, image }: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={image || "/opengraph/pansexual.jpg"} />
      <meta name="og:url" content="https://breq.dev/" />
      <meta name="og:site_name" content="breq.dev" />
      <meta name="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:image"
        content={image || "https://breq.dev/opengraph/pansexual.jpg"}
      />
    </Head>
  );
}
