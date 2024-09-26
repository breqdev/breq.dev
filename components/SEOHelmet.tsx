import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

type SEOProps = {
  title: string;
  description?: string;
  image?: string;
};

export default function SEOHelmet({ title, description, image }: SEOProps) {
  const { asPath } = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Brooke Chalmers" />
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://breq.dev${asPath}`} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        {image && <meta name="og:image" content={image} />}
        <meta name="og:url" content="https://breq.dev/" />
        <meta name="og:site_name" content="breq.dev" />
        <meta name="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@breqdev" />
        <meta name="twitter:creator" content="@breqdev" />
        {image && (
          <meta name="twitter:image" content={"https://breq.dev" + image} />
        )}
      </Head>
      <a rel="me" href="https://tacobelllabs.net/@breq" className="hidden"></a>
    </>
  );
}
