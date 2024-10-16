import { useState } from "react";
import { useDarkText } from "../components/Footer";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScaleBalanced } from "@fortawesome/free-solid-svg-icons";

const COLORGRID = [
  ["#ff8ac4", "#b0e4ff", "#ffeb7a", "#fa9f75", "#e0a1ff", "#a1ffd0"],
  [null, "#5ec9ff", null, null, null, null],
  ["#ff42a1", "#1bb3ff", "#ffda00", "#ff6b26", "#c757ff", null],
  ["#ff218c", "#0077b3", null, null, null, null],
];

function Color({ hex }: { hex: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      className="group relative grid h-32 w-32 place-content-end px-1 py-0.5 font-mono text-lg"
      style={{
        backgroundColor: hex,
        color: useDarkText(hex) ? "#000" : "#fff",
      }}
      onClick={() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
        navigator.clipboard.writeText(hex);
      }}
    >
      {hex}
      <span className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 rounded-full border border-black bg-white text-sm text-black opacity-0 group-hover:translate-y-6 group-hover:opacity-90 group-focus:translate-y-6 group-focus:opacity-90 motion-safe:transition motion-safe:duration-300">
        {copied ? "copied!" : "click to copy"}
      </span>
    </button>
  );
}

function ColorGrid() {
  return (
    <>
      <div
        className="my-8 hidden justify-center gap-4 md:grid"
        style={{ gridTemplateColumns: `repeat(${COLORGRID[0].length}, 8rem)` }}
      >
        {COLORGRID.flat().map((color, i) =>
          color === null ? <span key={i} /> : <Color hex={color} key={i} />
        )}
      </div>
      <div
        className="my-8 grid justify-center gap-4 md:hidden"
        style={{ gridTemplateColumns: `repeat(auto-fill, 8rem)` }}
      >
        {COLORGRID.flat()
          .filter((c) => c !== null)
          .map((color, i) => (
            <Color hex={color!} key={i} />
          ))}
      </div>
    </>
  );
}

function Font({ name, comment }: { name: string; comment: string }) {
  return (
    <div
      className="group relative w-full"
      style={{
        fontFamily: `var(--${name.replaceAll(" ", "-").toLowerCase()})`,
      }}
    >
      <p className="overflow-y-hidden overflow-x-scroll whitespace-nowrap p-2 text-8xl text-gray-400 transition-colors duration-300 group-hover:text-white md:overflow-x-hidden md:text-ellipsis">
        The quick brown fox jumps over the lazy dog
      </p>
      <div
        className="mx-auto w-full max-w-md p-8 md:absolute md:bottom-0 md:right-40 md:top-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0))",
        }}
      >
        <p className="text-center text-4xl">{name}</p>
        <p className="text-center font-body italic">{comment}</p>
        <p className="text-center font-body">
          <FontAwesomeIcon icon={faScaleBalanced} /> OFL •{" "}
          <a
            className="underline"
            href={
              "https://fonts.google.com/specimen/" + name.replaceAll(" ", "+")
            }
          >
            Google Fonts
          </a>
        </p>
      </div>
    </div>
  );
}

export default function Design() {
  return (
    <Page className="flex flex-col gap-16 bg-black text-white">
      <SEOHelmet
        title="breq.dev design language"
        description="colors, fonts, and logos to stay consistent."
      />
      <div className="mx-auto my-8 max-w-lg text-center">
        <h1 className="font-display text-6xl">design language</h1>
      </div>

      <div>
        <h2 className="text-center font-display text-6xl">colors</h2>
        <ColorGrid />
      </div>

      <div>
        <h2 className="text-center font-display text-6xl">fonts</h2>
        <div className="my-16 flex flex-col gap-8">
          <Font name="Nunito" comment="for display text" />
          <Font name="Libre Franklin" comment="for body text" />
          <Font name="Fira Code" comment="for code" />
          <Font name="Nunito Sans" comment="for formal settings" />
        </div>
      </div>
    </Page>
  );
}
