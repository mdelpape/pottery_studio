import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MeshPhongMaterial } from 'three';

export default function Bowl() {
  // Load the OBJ model
  const originalModel = useLoader(OBJLoader, '/assets/uploads_files_3175414_SG_Ceramics_FlatWhite01_LOD2.obj');

  // Clone the model for each instance of Bowl
  const model = useMemo(() => originalModel.clone(), [originalModel]);

  // Create the material
  const material = useMemo(() => new MeshPhongMaterial({
    color: 'white',
    metalness: 0.5,
    shininess: 2000,
  }), []);

  // Apply the material to the cloned model
  useMemo(() => model.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
      child.castShadow = true;
    }
  }), [model, material]);

  return (
    <group
    castShadow
    >
      <primitive object={model} scale={0.2} rotation={[0, 0, 0.3]}
        castShadow
      />
    </group>
  );
}
