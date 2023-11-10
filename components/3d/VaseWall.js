'use strict';
import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import {
  MeshStandardMaterial,
  MeshPhongMaterial,
} from 'three';

export default function VaseWall({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  console.log('VaseWall - Position:', position);

  // The loaded OBJ model is expected to be a Promise
  const model = useLoader(OBJLoader, '/assets/vase_designs_obj.obj');

  // Create the material
  const material = new MeshStandardMaterial(
    {
      color: 'white',
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
        scale={0.5}
        position={position}
        rotation={rotation}
      >

      </primitive>
    </group>
  );
}