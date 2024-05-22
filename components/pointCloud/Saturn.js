import { TextureLoader } from "three";
import { useMemo } from "react";

const Saturn = () => {
  const saturnTexture = useMemo(
    () => new TextureLoader().load("/assets/saturn_map.jpeg"),
    []
  );

  return (
    <mesh>
      <meshStandardMaterial map={saturnTexture} />
      <sphereGeometry args={[1, 100, 100]} />
    </mesh>
  );
};

export default Saturn;
