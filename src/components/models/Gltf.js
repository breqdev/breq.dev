import React, { useMemo, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const Gltf = React.forwardRef(({ url, onLoad, ...props }, ref) => {
  const [gltf, setGltf] = useState();
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
