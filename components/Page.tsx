import React, { useEffect } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import SEOHelmet from "./SEOHelmet";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

export default function Page({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black dark:text-white">
      <SEOHelmet
        title="Hey, I'm Brooke."
        description="Welcome to my little patch of internet. Here you'll find my projects over the years."
      />
      <Navbar />
      <article
        className={
          "flex-grow selection:bg-panyellow/75 " + (className ? className : "")
        }
        id="main"
      >
        {children}
      </article>
      <Footer />
      <Script
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "e735a672f6cc409684d4fcc9df92b84c"}'
      />
      <Analytics />
    </div>
  );
}
