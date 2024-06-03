import { forwardRef } from "react";
import { meshStandardMaterial } from "@react-three/drei";
import { useTexture } from "@react-three/drei";

const RockBall = forwardRef((props, ref) => {
  const terrainTextures = useTexture({
    map: "/assets/textures/aerial_rocks_02_diff_4k.jpg",
    displacementMap: "/assets/textures/aerial_rocks_02_disp_4k.png",
    roughnessMap: "/assets/textures/aerial_rocks_02_rough_4k.jpg",
  });
  return (
    <mesh ref={ref} {...props}>
      <sphereGeometry args={[0.3, 100, 100]} />
      <meshStandardMaterial
        {...terrainTextures}
        displacementScale={0.1}
      />
    </mesh>
  );
});

export default RockBall;
