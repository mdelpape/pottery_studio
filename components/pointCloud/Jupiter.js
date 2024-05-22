import { TextureLoader } from "three";
import { useMemo } from "react";

const Jupiter = () => {
  const jupiterTexture = useMemo(
    () => new TextureLoader().load("/assets/jupiter_map.jpeg"),
    []
  );

  return (
    <mesh>
      <meshStandardMaterial map={jupiterTexture} />
      <sphereGeometry args={[1, 100, 100]} />
    </mesh>
  );
};

export default Jupiter;
