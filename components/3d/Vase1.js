'use-client'
import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MeshPhongMaterial, MeshStandardMaterial } from 'three';
import { DissolveMaterial } from './DissolveMaterial';

export default function Vase1() {
  // Load the OBJ model
  const model = useLoader(OBJLoader, '/assets/vase11.obj');

  // Create the material
  const baseMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#8AA29E',
  }), []);

  // Create a standard material (or use your custom material)
  const material = useMemo(() => new MeshStandardMaterial({ color: 'pink' }), []);

  const dissolveMaterial = useMemo(() => new DissolveMaterial({
    baseMaterial: material,
    // ...you might want to add additional properties depending on how DissolveMaterial is set up
  }), [material]);

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
      <primitive object={model} scale={0.08} rotation={[0, 0, 0.3]}
        castShadow
      />
      {/* <DissolveMaterial baseMaterial={baseMaterial} /> */}
    </group>
  );
}
