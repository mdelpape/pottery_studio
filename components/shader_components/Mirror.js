import { MeshReflectorMaterial } from '@react-three/drei'

export default function Mirror() {

  return (
    <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3.5, 0]}
      >
        <planeGeometry args={[200, 200]} />
        <MeshReflectorMaterial
          mirror={1}
          blur={[0, 0]}
          resolution={2048}
          mixBlur={1}
          roughness={0}
          depthScale={0}
          minDepthThreshold={.1}
          maxDepthThreshold={2}
          color="white"
          metalness={0}
        />
      </mesh>
  )
};

