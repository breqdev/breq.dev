import { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { type Object3D, SpotLight } from "three";
import useScroll from "./useScroll";
import {
  type GLTF,
  GLTFLoader,
} from "three/examples/jsm/loaders/GLTFLoader.js";
import { Canvas } from "@react-three/fiber";

const Gltf = forwardRef<
  Object3D,
  { url: string; onLoad: (gltf: GLTF) => void } & any
>(function Gltf({ url, onLoad, ...props }, ref) {
  const [gltf, setGltf] = useState<GLTF>();
  useMemo(
    () =>
      new GLTFLoader().load(url, (gltf) => {
        console.log("Loaded GLTF at", url);
        setGltf(gltf);
        onLoad?.(gltf);
      }),
    [url, onLoad],
  );

  return gltf ? <primitive object={gltf.scene} ref={ref} {...props} /> : null;
});

function InnerLogo({ onLoad }: { onLoad: () => void }) {
  const model = useRef<Object3D>(null);

  useScroll((scroll, height) => {
    const movement_start = height * (0 / 6);
    const movement_end = height * (4 / 6);

    const final_position = -height / 400;

    if (model.current) {
      if (scroll < movement_start) {
        model.current.position.set(0, 0, 0);
      } else if (scroll < movement_end) {
        const movement_progress =
          (scroll - movement_start) / (movement_end - movement_start);

        const wave_position = movement_progress * Math.PI + Math.PI / 2;

        model.current.position.set(
          (final_position / 2) * -(Math.sin(wave_position) - 1),
          0,
          0,
        );
      } else {
        model.current.position.set(final_position, 0, 0);
      }

      model.current.rotation.y = 2e-3 * scroll;
    }
  });

  return (
    <Gltf
      url="/models/inner_logo.glb"
      ref={model}
      scale={[0.5, 0.5, 0.5]}
      onLoad={onLoad}
    />
  );
}

function DimmingLight({ color, angle }: { color: string; angle: number }) {
  const position: [number, number, number] = [
    10 * Math.cos(angle),
    10 * Math.sin(angle),
    10,
  ];
  const light = useRef<SpotLight>(null);

  const MAX_INTENSITY = 500;

  useScroll((scroll) => {
    if (light.current) {
      light.current.intensity =
        Math.max(1 - scroll / window.innerHeight, 0) * MAX_INTENSITY;
    }
  });

  return (
    <spotLight
      color={color}
      position={position}
      ref={light}
      intensity={MAX_INTENSITY}
    />
  );
}

export default function CubeLightsAnim() {
  const [logoLoaded, setLogoLoaded] = useState(false);

  // This must be memo'd, since a change to the identity of the onLoad function
  // will trigger the Gltf component to recreate the GltfLoader with the "new"
  // onLoad function, causing an extra network request for the same model.
  const onLogoLoad = useCallback(() => setLogoLoaded(true), []);

  return (
    <div
      className={
        "fixed inset-0 -z-10 transition-opacity duration-500 motion-reduce:hidden " +
        (logoLoaded ? "opacity-100" : "opacity-0")
      }
    >
      <Canvas camera={{ fov: 10, near: 0.1, far: 1000, position: [0, 0, 50] }}>
        <InnerLogo onLoad={onLogoLoad} />
        <DimmingLight color="#ff1b8d" angle={(Math.PI * 3) / 6} />
        <DimmingLight color="#ffda00" angle={(Math.PI * 7) / 6} />
        <DimmingLight color="#1bb3ff" angle={(Math.PI * 11) / 6} />
      </Canvas>
    </div>
  );
}
