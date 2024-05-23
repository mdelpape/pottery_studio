import { TextureLoader } from "three";
import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { meshStandardMaterial } from "@react-three/drei";
import * as THREE from "three";

const Sun = () => {
  const sunTexture = useMemo(
    () => new TextureLoader().load("/assets/sun_map.jpeg"),
    []
  );

  return (
    <mesh>
          <meshStandardMaterial
        map={sunTexture}
        emissive={new THREE.Color(0xffffff)}
        emissiveMap={sunTexture}
        emissiveIntensity={1.5}
      />
      <sphereGeometry args={[20, 100, 100]} />
    </mesh>
  );
};

export default Sun;
