import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";

import Object from "./Object";

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
      <OrbitControls />
      <Object  key={color} color={color}/>
    </Canvas>
  );
}
