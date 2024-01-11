import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export default function Globe() {

  const displacementTexture = useLoader(TextureLoader, '/assets/World_elevation_map.png');
  const texture = useLoader(TextureLoader, '/assets/earth.jpg');
  texture.anisotropy = 16;
  console.log(texture)
  console.log(displacementTexture)
  return (
    <mesh
      scale={[.5, .5, .5]}
      recieveShadow
    >
      <sphereGeometry
        attach="geometry"
        args={[1, 64, 64]}
      />
      <meshPhongMaterial
        shininess={200}
        displacementMap={displacementTexture}
        displacementScale={.5}
        displacementBias={2}
        map={texture}
      />
    </mesh>
  )
}