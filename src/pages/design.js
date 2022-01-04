import React from "react";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import { Canvas } from "@react-three/fiber";

import Gltf from "../components/models/Gltf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

function InnerLogo(props) {
  const model = React.useRef();

  React.useEffect(() => {
    const listener = (event) => {
      if (model.current) {
        model.current.rotation.y = 2e-3 * window.scrollY;
      }
    };

    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <Gltf
      url="/models/inner_logo.glb"
      ref={model}
      scale={[0.8, 0.8, 0.8]}
      onLoad={props.onLoad}
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
        />
      ))}
    </>
  );
}

function Callout(props) {
  const [copied, setCopied] = React.useState(false);

  return (
    <button
      className={
        props.className +
        " relative group -my-2 px-2 py-0.5 rounded-xl border-4 border-transparent focus:border-panpink outline-none " +
        (props.dark ? "text-white" : "text-black")
      }
      style={{
        backgroundColor: props.color || "#ffffff",
      }}
      onClick={() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
        navigator.clipboard.writeText(props.children);
      }}
    >
      {props.children}
      <span className="absolute bg-white text-black text-sm left-0 right-0 bottom-0 z-20 border border-black rounded-full group-hover:opacity-90 group-focus:opacity-90 opacity-0 pointer-events-none transition duration-300 group-hover:translate-y-8 group-focus:translate-y-8">
        {copied ? "copied!" : "click to copy"}
      </span>
    </button>
  );
}

export default function Design() {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <Page className="flex flex-col bg-black">
      <SEOHelmet
        title="design language."
        description="colors, fonts, and logos that i use."
      />
      <div className="bg-black flex-grow max-w-6xl w-full mx-auto flex flex-col md:flex-row">
        <div
          className={
            "w-full transition-opacity duration-300 " +
            (loaded ? "opacity-100" : "opacity-0")
          }
        >
          <div className="sticky h-64 md:h-96 top-32 w-full">
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
        <div className="w-full text-white text-center py-16 pb-96 px-2 flex flex-col gap-64 font-body text-2xl">
          <section className="flex flex-col gap-8">
            <h1 className="font-display text-5xl">design language</h1>
            <p>i like to keep things consistent.</p>
            <p>
              these are the fonts and colors i tend to use across my projects
              and online presence, presented here for reference.
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
              <Callout className="font-mono">Ubuntu&nbsp;Mono</Callout> in code
              or other monospace text.
            </p>
            <p>
              both Nunito and Montserrat are licensed under the SIL Open Font
              License. Ubuntu Mono is licensed under the Ubuntu Font License,
              which is quite similar to the SIL Open Font License. All three are
              available from Google Fonts for free, and the licenses permit
              self-hosting.
            </p>
          </section>
          <section className="flex flex-col gap-8">
            <h1 className="font-display text-5xl">colors</h1>
            <p>
              the color scheme i use is based off of the pansexual pride flag.
              legally, the flag is the work of a tumblr user, but they have
              released it under the terms of "use as you see fit." regardless of
              the legal interpretation of those words, the use of the color
              scheme for an alternate purpose likely qualifies as an entirely
              separate work under copyright law. for what it's worth, wikipedia
              considers the flag to be public domain. that said, i am not a
              lawyer.
            </p>
            <p>
              originally, the pink color was{" "}
              <Callout color="#ff218c">#ff218c</Callout>, but in recent works,
              i've tweaked it up to <Callout color="#ff42a1">#ff42a1</Callout>{" "}
              instead to improve legibility and reduce the harshness.
            </p>
            <p>
              the blue color remains at{" "}
              <Callout color="#1bb3ff">#1bb3ff</Callout>. however, this blue
              does not meet a11y guidelines for contrast, so i use{" "}
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
              leave out the middle name, but you're welcome to include it.
              friends, strangers, and my Starbucks barista call me Brooke.
            </p>
            <p>
              previously, i went by a different name. it's not hard to find, but
              it's not my name anymore, so i see no reason to list it here. it
              is no longer my name, please do not use it.
            </p>
            <p>
              you might see the word{" "}
              <Callout className="font-mono">breq</Callout> used in my domain
              name, email address, and various online usernames. i use this
              handle online for brevity and uniqueness. it originates from the
              AVR assembly instruction BREQ, signifying branch-if-equal. feel
              free to credit me as{" "}
              <Callout className="font-mono">(c)&nbsp;breq</Callout> in source
              files and the like. you can also call me breq IRL if you'd like,
              although nobody else does. generally, stylizing "breq" in entirely
              lowercase is preferred, but entirely uppercase is acceptable. no
              canonical pronunciation exists, be creative.
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
              original pink instead of the lightened one). you can grab the{" "}
              <span className="font-mono">.glb</span> from this page for a GLTF
              format, or get some nice renders from my{" "}
              <a
                href="https://keybase.pub/breq/branding/"
                className="-my-2 px-2 py-0.5 rounded-xl bg-white text-black border-white border-4 focus:border-panpink outline-none"
              >
                keybase&nbsp;page&nbsp;
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </Page>
  );
}
