import Link from "next/link";
import React from "react";
import SEOHelmet from "../components/SEOHelmet";

import Page from "../components/Page";

const NotFoundPage = () => {
  return (
    <Page>
      <SEOHelmet title="page grrrr found." />
      <div className="mx-auto my-8 flex justify-center gap-4 font-display">
        <h1 className="text-8xl">404</h1>
        <div className="my-2 text-2xl">
          <p>page bark found.</p>
          <p>
            ruff{" "}
            <Link href="/" className="text-panblue hover:underline">
              home?
            </Link>
          </p>
        </div>
      </div>
    </Page>
  );
};

export default NotFoundPage;
