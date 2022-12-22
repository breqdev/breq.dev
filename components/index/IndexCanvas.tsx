import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import useScroll from "../models/useScroll";

import Greeting from "./Greeting";
import Projects from "./Projects";
import About from "./About";

export default function Background() {
  const [scroll, setScroll] = useState(0);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useScroll(setScroll, { global: true });

  const sceneIndex = Math.floor(scroll / (window.innerHeight * 2));
  const onBoundary =
    (scroll / (window.innerHeight * 2)) % 1 < 0.05 ||
    (scroll / (window.innerHeight * 2)) % 1 > 0.95;
  const isTopOfPage = scroll < window.innerHeight;
  const activeScene = onBoundary && !isTopOfPage ? -1 : sceneIndex;
  const peekTo = Math.floor(scroll / (window.innerHeight * 2) + 1.5);

  const scenes = [Greeting, Projects, null, About];

  // This must be memo'd, since a change to the identity of the onLoad function
  // will trigger the Gltf component to recreate the GltfLoader with the "new"
  // onLoad function, causing an extra network request for the same model.
  const onLogoLoad = React.useCallback(() => {
    setLogoLoaded(true);
  }, []);

  return (
    <div
      className={
        "fixed inset-0 z-[-10] transition-opacity duration-500 motion-reduce:hidden " +
        (logoLoaded ? "opacity-100" : "opacity-0")
      }
    >
      <Canvas camera={{ fov: 10, near: 0.1, far: 1000, position: [0, 0, 50] }}>
        {scenes
          .slice(0, peekTo)
          .map((Scene, i) =>
            Scene ? (
              <Scene
                visible={i === activeScene}
                onLoad={i === 0 ? onLogoLoad : undefined}
              />
            ) : null
          )}
      </Canvas>
    </div>
  );
}
