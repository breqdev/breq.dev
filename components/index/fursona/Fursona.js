import Image from "next/image";
import React from "react";
import fursona from "./fursona.png";

export default function Fursona() {
  return (
    <div className="absolute bottom-0 right-0 mb-5 mr-6 hidden w-48 transform overflow-hidden transition-transform duration-200 hover:-rotate-6 hover:scale-105 md:block">
      <a
        href="https://twitter.com/oh_jeez_bees/status/1493827383689809920"
        target="_blank"
        rel="noreferrer"
      >
        <Image src={fursona} alt="fursona" />
      </a>
    </div>
  );
}
