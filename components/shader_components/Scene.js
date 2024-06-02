import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  shaderMaterial,
  MeshTransmissionMaterial,
  Environment,
} from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { useControls } from "leva";

import waterdudv from "@/public/assets/waterdudv.jpg";
import cyberpunkDistortion from "@/public/assets/cyberpunkDistortion.png";

import Object from "./Object";
import Mirror from "./Mirror";
import Glass from "./Glass";

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
      camera={{ position: [0, 0, 15] }}
      style={{
        position: "absolute",
        background: "black",
        width: "100%",
        height: "100%",
      }}
    >
      <Mirror />
      <ambientLight intensity={2} />
      <Controls />
      <Object key={color} color={color} />
      <EffectComposer>
        <Bloom luminanceThreshold={1} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.05} />
      </EffectComposer>
    </Canvas>
  );
}
