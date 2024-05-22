import { TextureLoader } from "three";
import { useMemo } from "react";

const Uranus = () => {
  const uranusTexture = useMemo(
    () => new TextureLoader().load("/assets/uranus_map.jpeg"),
    []
  );
  return (
    <mesh>
      <meshStandardMaterial map={uranusTexture} />
      <sphereGeometry args={[1, 100, 100]} />
    </mesh>
  );
};

export default Uranus;
