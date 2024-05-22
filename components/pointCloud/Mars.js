import { TextureLoader } from "three";
import { useMemo } from "react";

const Mars = () => {
  const marsTexture = useMemo(
    () => new TextureLoader().load("/assets/mars_map.jpg"),
    []
  );
  return (
    <mesh>
      <meshStandardMaterial map={marsTexture} />
      <sphereGeometry args={[1, 100, 100]} />
    </mesh>
  );
};

export default Mars;
