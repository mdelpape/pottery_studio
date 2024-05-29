import { MeshReflectorMaterial } from '@react-three/drei'

export default function Mirror() {

  return (
    <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3.5, 0]}
      >
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[0, 0]}
          resolution={2048}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={.1}
          maxDepthThreshold={2}
          color="#000035"
          metalness={0.5}
        />
      </mesh>
  )
};

