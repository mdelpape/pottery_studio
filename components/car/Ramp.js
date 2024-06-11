import { useState } from "react";
import { useBox, useTrimesh } from "@react-three/cannon";

export default function Ramp() {
  const [ramp] = useBox(() => ({
    mass: 2,
    args: [2, 2, 2],
    position: [10, 10, 0],
  }));
  return (
    <mesh ref={ramp}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

