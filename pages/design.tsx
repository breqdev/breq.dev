import React from "react";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import { Canvas } from "@react-three/fiber";

import Gltf from "../components/models/Gltf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import { Object3D } from "three";
import Link from "next/link";

function InnerLogo({ onLoad }: { onLoad: () => void }) {
  const model = React.useRef<Object3D>(null);

  const motionSafe = useMediaQuery({
    query: "(prefers-reduced-motion: no-preference)",
  });

  React.useEffect(() => {
    const listener = () => {
      if (model.current && motionSafe) {
        model.current.rotation.y = 2e-3 * window.scrollY;
      }
    };

    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [motionSafe]);

  return (
    <Gltf
      url="/models/inner_logo.glb"
      ref={model}
      scale={[0.8, 0.8, 0.8]}
      onLoad={onLoad}
    />
  );
}

function ThreeLights() {
  const angles = [3, 7, 11].map((i) => (i * Math.PI) / 6);
  const colors = [0xff1b8d, 0xffda00, 0x1bb3ff];

  return (
    <>
      {angles.map((angle, i) => (
        <spotLight
          color={colors[i]}
          angle={angle}
          position={[10 * Math.cos(angle), 10 * Math.sin(angle), 10]}
          intensity={1}
          key={i}
        />
      ))}
    </>
  );
}

function Callout({
  className,
  dark,
  color,
  children,
}: {
  className?: string;
  dark?: boolean;
  color?: string;
  children: string;
}) {
  const [copied, setCopied] = React.useState(false);

  return (
    <button
      className={
        (className || "") +
        " group relative -my-2 rounded-xl border-4 border-transparent px-2 py-0.5 outline-none focus:border-panpink " +
        (dark ? "text-white" : "text-black")
      }
      style={{
        backgroundColor: color || "#ffffff",
      }}
      onClick={() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
        navigator.clipboard.writeText(children);
      }}
    >
      {children}
      <span className="pointer-events-none absolute left-0 right-0 bottom-0 z-20 rounded-full border border-black bg-white text-sm text-black opacity-0 transition duration-300 group-hover:translate-y-8 group-hover:opacity-90 group-focus:translate-y-8 group-focus:opacity-90">
        {copied ? "copied!" : "click to copy"}
      </span>
    </button>
  );
}

function CubeArt() {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div
      className={
        "w-full transition-opacity duration-300 " +
        (loaded ? "opacity-100" : "opacity-0")
      }
    >
      <div className="sticky top-32 h-64 w-full md:h-96">
        <Canvas
          camera={{
            fov: 10,
            near: 0.1,
            far: 1000,
            position: [0, 0, 50],
          }}
        >
          <InnerLogo onLoad={() => setLoaded(true)} />
          <ThreeLights />
        </Canvas>
      </div>
    </div>
  );
}

function DesignFiles() {
  const files = [
    "cube.glb",
    "render.png",
    "cropped.png",
    "trans.png",
    "red_orange.png",
    "blue_green.png",
    "blue_yellow.png",
    "pink_green.png",
    "pink_purple.png",
  ];

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      {files.map((file) => (
        <a
          href={`/branding/${file}`}
          key={file}
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-xl border-4 border-white p-2 outline-none focus:border-panpink"
        >
          {file}
        </a>
      ))}
    </div>
  );
}

function DesignContent() {
  return (
    <div className="flex w-full flex-col gap-64 py-16 px-2 pb-96 text-center font-body text-2xl text-white">
      <section className="flex flex-col gap-8">
        <h1 className="font-display text-5xl">design language</h1>
        <p>i like to keep things consistent.</p>
        <p>
          these are the fonts and colors i tend to use across my projects and
          online presence, presented here for reference.
        </p>
      </section>
      <section className="flex flex-col gap-8">
        <h1 className="font-display text-5xl">fonts</h1>
        <p>
          <Callout className="font-display">Nunito</Callout> in titles,
          headings, decorative text, etc., for style.
        </p>
        <p>
          <Callout>Montserrat</Callout> in body text, for readability.
        </p>
        <p>
          <Callout className="font-mono">Ubuntu&nbsp;Mono</Callout> in code or
          other monospace text.
        </p>
        <p>
          both Nunito and Montserrat are licensed under the SIL Open Font
          License. Ubuntu Mono is licensed under the Ubuntu Font License, which
          is quite similar to the SIL Open Font License. All three are available
          from Google Fonts for free, and the licenses permit self-hosting.
        </p>
      </section>
      <section className="flex flex-col gap-8">
        <h1 className="font-display text-5xl">colors</h1>
        <p>
          the color scheme i use is based off of the pansexual pride flag.
          legally, the flag is the work of a tumblr user, but they have released
          it under the terms of "use as you see fit." regardless of the legal
          interpretation of those words, the use of the color scheme for an
          alternate purpose likely qualifies as an entirely separate work under
          copyright law. for what it's worth, wikipedia considers the flag to be
          public domain. that said, i am not a lawyer.
        </p>
        <p>
          originally, the pink color was{" "}
          <Callout color="#ff218c">#ff218c</Callout>, but in recent works, i've
          tweaked it up to <Callout color="#ff42a1">#ff42a1</Callout> instead to
          improve legibility and reduce the harshness.
        </p>
        <p>
          the blue color remains at <Callout color="#1bb3ff">#1bb3ff</Callout>.
          however, this blue does not meet a11y guidelines for contrast, so i
          use{" "}
          <Callout color="#0077b3" dark>
            #0077b3
          </Callout>{" "}
          for coloring text (such as links) on a white background.
        </p>
        <p>
          the yellow is unmodified from{" "}
          <Callout color="#ffda00">#ffda00</Callout>.
        </p>
      </section>
      <section className="flex flex-col gap-8">
        <h1 className="font-display text-5xl">names</h1>
        <p>
          my full name is Brooke Madeline Chalmers. in most common usage, i
          leave out the middle name, but you're welcome to include it. friends,
          strangers, and the barista at Starbucks call me Brooke.
        </p>
        <p>
          previously, i went by a different name. it's not hard to find, but
          it's not my name anymore, so i see no reason to list it here. it is no
          longer my name, please do not use it.
        </p>
        <p>
          you might see the word <Callout className="font-mono">breq</Callout>{" "}
          used in my domain name, email address, and various online usernames. i
          use this handle online for brevity and uniqueness. it originates from
          the AVR assembly instruction BREQ, signifying branch-if-equal. feel
          free to credit me as{" "}
          <Callout className="font-mono">(c)&nbsp;breq</Callout> in source files
          and the like. you can also call me breq in person if you'd like,
          although nobody else does. generally, stylizing "breq" in entirely
          lowercase is preferred, but entirely uppercase is acceptable. no
          canonical pronunciation exists, be creative. or don't.
        </p>
      </section>
      <section className="flex flex-col gap-8">
        <h1 className="font-display text-5xl">logos</h1>
        <p>
          the cube with logic gates serves as my logo. in case you didn't
          notice, it's a half-adder circuit.
        </p>
        <p>
          the cube is lit in the colors described above (notably, using the
          original pink instead of the lightened one). here are some files:
        </p>
        <DesignFiles />
      </section>
    </div>
  );
}

export default function Design() {
  return (
    <Page className="flex flex-col bg-black">
      <SEOHelmet
        title="design language."
        description="colors, fonts, and logos that i use."
      />
      <div className="mx-auto flex w-full max-w-6xl flex-grow flex-col bg-black md:flex-row">
        <CubeArt />
        <DesignContent />
      </div>
    </Page>
  );
}
