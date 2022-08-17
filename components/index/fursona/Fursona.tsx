import Image from "next/image";
import React from "react";
import fursona from "./fursona.png";
import tamagotchi from "./tamagotchi.png";

function Fursona() {
  return <Image src={fursona} alt="Fursona" />;
}

function Tamagotchi() {
  return <Image src={tamagotchi} alt="Tamagotchi" />;
}

const CHARACTERS = [
  {
    image: Fursona,
    source: "https://twitter.com/oh_jeez_bees/status/1493827383689809920",
    marginBottom: "20px",
  },
  {
    image: Tamagotchi,
    source: "https://twitter.com/oh_jeez_bees/status/1559740306890919939",
    marginBottom: "48px",
  },
];

export default function Character() {
  let [index, setIndex] = React.useState<number>(1);

  let character = CHARACTERS[index];
  let CharacterImage = character.image;

  return (
    <div
      className="absolute bottom-0 right-0 mr-6 hidden w-48 transform overflow-hidden transition-transform duration-200 hover:-rotate-6 hover:scale-105 md:block"
      style={{ marginBottom: character.marginBottom }}
    >
      <button onClick={() => setIndex((index + 1) % CHARACTERS.length)}>
        <CharacterImage />
      </button>
    </div>
  );
}
