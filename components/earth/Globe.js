import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export default function Globe() {

  const displacementTexture = useLoader(TextureLoader, '/assets/World_elevation_map.png');

  const texture = useLoader(TextureLoader, '/assets/earth.jpg');
  texture.anisotropy = 16;

  return (
    <mesh
      scale={[.5, .5, .5]}
      receiveShadow
    >
      <sphereGeometry
        attach="geometry"
        args={[2, 100, 100]}
      />
      <meshPhongMaterial
        shininess={200}
        displacementMap={displacementTexture}
        displacementScale={.3}
        displacementBias={2}
        map={texture}
      />
    </mesh>
  )
}