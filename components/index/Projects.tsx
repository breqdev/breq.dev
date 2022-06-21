import React, { useRef } from "react";
import { Object3D } from "three";
import Gltf from "../models/Gltf";
import useScroll from "../models/useScroll";

function Arduino({ visible }) {
  const model = useRef<Object3D>();

  useScroll((scroll, height) => {
    if (model.current) {
      const x = -12 + (scroll / height) * 12;
      const y = -1 - (scroll / height) * 0.5;
      model.current.position.set(x, y, 0);

      model.current.rotation.x = scroll * -0.001;
      // model.current.rotation.y = scroll * 0.01
      model.current.rotation.z = scroll * 0.005;
    }
  });

  return (
    <Gltf
      url="/models/arduino.glb"
      scale={[0.05, 0.05, 0.05]}
      position={[-12, -1, 0]}
      ref={model}
      visible={visible}
    />
  );
}

function RasPi({ visible }) {
  const model = useRef<Object3D>();

  useScroll((scroll, height) => {
    if (model.current) {
      const x = 10 - (scroll / height) * 10;
      const y = 1 - (scroll / height) * 0.5;
      model.current.position.set(x, y, 0);

      model.current.rotation.x = scroll * -0.001;
      // model.current.rotation.y = scroll * 0.01
      model.current.rotation.z = scroll * 0.005;
    }
  });

  return (
    <Gltf
      url="/models/raspi.glb"
      scale={[0.05, 0.05, 0.05]}
      position={[10, 1, 0]}
      ref={model}
      visible={visible}
    />
  );
}

function Div({ visible }) {
  const model = useRef<Object3D>();

  useScroll((scroll, height) => {
    if (model.current) {
      const x = -10 + (scroll / height) * 10;
      const y = 6 - (scroll / height) * 6;
      model.current.position.set(x, y, -2);

      model.current.rotation.x = scroll * -0.0001;
      // model.current.rotation.y = scroll * 0.01
      model.current.rotation.z = scroll * 0.0005;
    }
  });

  return (
    <Gltf
      url="/models/div.glb"
      ref={model}
      position={[-10, 6, -2]}
      visible={visible}
    />
  );
}

function ProjectLight({ visible }) {
  const light = useRef();

  return (
    <spotLight
      color={0xffffff}
      position={[0, 0, 10]}
      ref={light}
      visible={visible}
    />
  );
}

export default function Projects({ visible }) {
  return (
    <>
      <Arduino visible={visible} />
      <Div visible={visible} />
      <RasPi visible={visible} />
      <ProjectLight visible={visible} />
    </>
  );
}
