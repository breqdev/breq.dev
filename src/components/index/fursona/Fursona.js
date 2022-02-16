import { StaticImage } from "gatsby-plugin-image";
import React from "react";

export default function Fursona() {
  return (
    <div className="hidden md:block absolute bottom-0 right-0 w-48 mb-5 mr-6 transform hover:-rotate-6 hover:scale-105 overflow-hidden transition-transform duration-200">
      <a
        href="https://twitter.com/oh_jeez_bees/status/1493827383689809920"
        target="_blank"
        rel="noreferrer"
      >
        <StaticImage src="./fursona.png" alt="fursona" />
      </a>
    </div>
  );
}
