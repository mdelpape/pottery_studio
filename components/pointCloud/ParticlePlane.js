import { useFrame } from '@react-three/fiber';
import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

const ParticlePlane = ({ count = 10000, outerRadius = 4, innerRadius = 3 }) => {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * (outerRadius - innerRadius) + innerRadius;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      temp.push({ position: [x, 0, z] });
    }
    return temp;
  }, [count, outerRadius, innerRadius]);

  useFrame(() => {
    meshRef.current.rotation.y += 0.0001;
  });

  useFrame(() => {
    particles.forEach((particle, i) => {
      dummy.position.set(...particle.position);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} castShadow receiveShadow>
      <sphereGeometry args={[0.005, 8, 8]} />
      <meshStandardMaterial attach="material" color="white" />
    </instancedMesh>
  );
};

export default ParticlePlane;