import { forwardRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

const Car = forwardRef((props, ref) => {
  const terrainTextures = useTexture({
    map: "/assets/textures/aerial_rocks_02_diff_4k.jpg",
    displacementMap: "/assets/textures/aerial_rocks_02_disp_4k.png",
    roughnessMap: "/assets/textures/aerial_rocks_02_rough_4k.jpg",
  });

  const { nodes, materials } = useGLTF(
    "/models/nissan_skyline_r35_gtr_nismo__free.glb"
  );

  return (
    <group ref={ref} {...props} dispose={null}>
       {Object.entries(nodes).map(([name, node]) => {
        if (node.isMesh) {
          node.material.map = terrainTextures.map;
          // node.material.displacementMap = terrainTextures.displacementMap;
          // node.material.roughnessMap = terrainTextures.roughnessMap;
          node.material.needsUpdate = true;
        }
        return (
          <mesh
            key={name}
            geometry={node.geometry}
            material={node.material}
            position={node.position}
            scale={node.scale}
            rotation={[
              props.keys.shiftleft ? -Math.PI/2 -0.05
              :
              -Math.PI / 2,
              props.keys.a ? -0.05 : props.keys.d ? 0.05 : 0,
              0,
            ]}
          />
        );
      })}
    </group>
  );
});

export default Car;
