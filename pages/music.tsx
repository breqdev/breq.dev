import React from "react";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

export default function Music() {
  return (
    <Page className="flex items-center justify-center bg-black text-white">
      <SEOHelmet title="music, made with <3 by breq." />
      <div className="mx-auto my-8 flex max-w-xl flex-col gap-8 text-center font-display">
        <h1 className="text-7xl">music</h1>
        <h2 className="text-4xl">and miscellaneous sounds</h2>
        <p className="text-xl">coming soon...</p>
      </div>
    </Page>
  );
}
