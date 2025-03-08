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
      <a rel="me" href="https://tacobelllabs.net/@breq" className="hidden" />
      <a
        rel="me"
        href="https://discord.com/users/386352037723635712"
        className="hidden"
      />
      <a
        rel="me"
        href="https://signal.me/#eu/65D91kL+LwalfvCf/DWfyl1gpsswnqel4gW79DDNxcZJEJjLoe9AWoZF98GvTQaG"
        className="hidden"
      />
      <a rel="me" href="https://t.me/breqdev" className="hidden" />
      <a
        rel="me"
        href="https://wireless2.fcc.gov/UlsApp/UlsSearch/license.jsp?licKey=4768613"
        className="hidden"
      />
      <a rel="me" href="https://github.com/breqdev" className="hidden" />
      <a rel="me" href="https://gitlab.com/breq" className="hidden" />
      <a rel="me" href="https://bsky.app/profile/breqdev" className="hidden" />
      <a rel="me" href="https://instagram.com/breqdev" className="hidden" />
      <a
        rel="me"
        href="https://www.linkedin.com/in/breqdev"
        className="hidden"
      />
      <a rel="me" href="https://reddit.com/u/breqdev" className="hidden" />
      <a rel="me" href="https://www.youtube.com/@breqdev" className="hidden" />
      <a
        rel="me"
        href="https://account.venmo.com/u/breqdev"
        className="hidden"
      />
    </>
  );
}
