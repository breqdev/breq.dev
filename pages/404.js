import Link from "next/link";
import React from "react";
import SEOHelmet from "../components/SEOHelmet";

import Page from "../components/Page";

const NotFoundPage = () => {
  return (
    <Page>
      <SEOHelmet title="oopsie. page not found." />
      <div className="mx-auto my-8 flex justify-center gap-4 font-display">
        <h1 className="text-8xl">404</h1>
        <div className="my-2 text-2xl">
          <p>page not found.</p>
          <p>
            go{" "}
            <Link href="/">
              <a className="text-panblue hover:underline">home?</a>
            </Link>
          </p>
        </div>
      </div>
    </Page>
  );
};

export default NotFoundPage;
