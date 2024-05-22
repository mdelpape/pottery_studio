import { TextureLoader } from 'three';
import { useMemo } from 'react';

const Mercury = () => {

  const mercuryTexture = useMemo(() => new TextureLoader().load('/assets/mercury_map.jpeg'), []);

  return (
    <mesh>
      <sphereGeometry args={[1, 100, 100]} />
      <meshStandardMaterial
        map={mercuryTexture}
      />
    </mesh>
  );
};

export default Mercury;
