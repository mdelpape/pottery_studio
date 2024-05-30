import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";

import Object from "./Object";
import Mirror from "./Mirror";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";

import Controls from "./Controls";

export default function Scene() {
  const { color } = useControls({
    color: { value: "#427278", label: "Color" },
  });

  return (
    <Canvas
      id="irid"
      camera={{ position: [0, 0, 10] }}
      style={{
        position: "absolute",
        background: "black",
        width: "100%",
        height: "100%",
      }}
    >
      <Mirror />
      <ambientLight intensity={0.5} />
      <Controls />
      <Object key={color} color={color} />
    </Canvas>
  );
}
