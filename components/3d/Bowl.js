import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MeshStandardMaterial,
  MeshPhongMaterial,
} from 'three';

export default function Bowl() {
  // Use useMemo to ensure the OBJ file is only loaded once

  // The loaded OBJ model is expected to be a Promise
  const model = useLoader(OBJLoader, '/assets/uploads_files_3175414_SG_Ceramics_FlatWhite01_LOD2.obj');

  // Create the material
  const material = new MeshPhongMaterial(
    {
      color: 'white',
      metalness: 0.5,
      shininess: 100,
    });

  // Apply the material to the model
  model.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
    }
  });

  return (
    <group>
      <primitive object={model}
        scale={0.2}
        rotation={[0, 0, .3]}
      >

      </primitive>
    </group>
  );
}
