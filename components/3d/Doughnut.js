import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MeshPhongMaterial } from 'three';

export default function Doughnut() {
  // Load the OBJ model
  const originalModel = useLoader(OBJLoader, '/assets/uploads_files_2890936_Vaso+1.obj');

  // Clone the model for each instance of Bowl
  const model = useMemo(() => originalModel.clone(), [originalModel]);

  // Create the material
  const material = useMemo(() => new MeshPhongMaterial({
    color: 'white',
    shininess: 1000,
  }), []);

  // Apply the material to the cloned model
  useMemo(() => model.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
    }
  }), [model, material]);

  return (
    <group>
      <primitive object={model} scale={0.007} rotation={[0, 0, 0]} />
    </group>
  );
}
