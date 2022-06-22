import React, { useMemo, useState } from "react";
import { Object3D } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const Gltf = React.forwardRef<
  Object3D,
  { url: string; onLoad: (gltf: GLTF) => void } & any
>(function Gltf({ url, onLoad, ...props }, ref) {
  const [gltf, setGltf] = useState<GLTF>();
  useMemo(
    () =>
      new GLTFLoader().load(url, (gltf) => {
        setGltf(gltf);
        onLoad?.(gltf);
      }),
    [url, onLoad]
  );

  return gltf ? <primitive object={gltf.scene} ref={ref} {...props} /> : null;
});

export default Gltf;
