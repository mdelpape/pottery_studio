import { useState } from "react";
import { useBox, useTrimesh } from "@react-three/cannon";

export default function Ramp() {
  const [ramp] = useBox(() => ({
    mass: 2,
    args: [2, 2, 2],
    position: [0, 10, 10],
    material: { friction: 0, restitution: 0.5 }
  }));
  return (
    <mesh ref={ramp}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

