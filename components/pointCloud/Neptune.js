import { TextureLoader } from "three";
import { useMemo } from "react";

const Neptune = () => {
  const neptuneTexture = useMemo(
    () => new TextureLoader().load("/assets/neptune_map.jpeg"),
    []
  );

  return (
    <mesh>
      <meshStandardMaterial map={neptuneTexture} />
      <sphereGeometry args={[1, 100, 100]} />
    </mesh>
  );
};

export default Neptune;
