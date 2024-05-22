import { TextureLoader } from "three";
import { useMemo } from "react";

const Venus = () => {
  const venusTexture = useMemo(
    () => new TextureLoader().load("/assets/venus_map.jpeg"),
    []
  );

  return (
    <mesh>
      <sphereGeometry args={[1, 100, 100]} />
      <meshStandardMaterial map={venusTexture} />
    </mesh>
  );
};

export default Venus;
