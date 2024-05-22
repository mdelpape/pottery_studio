import { TextureLoader } from "three";
import { useMemo } from "react";

const Earth = () => {
  const earthTexture = useMemo(
    () => new TextureLoader().load("/assets/earth.jpg"),
    []
  );
  return (
    <mesh>
      <sphereGeometry args={[1, 100, 100]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
};

export default Earth;
