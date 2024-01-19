import { useFrame } from '@react-three/fiber';
import { Box, Plane } from '@react-three/drei';
import React, { useRef } from 'react';

const ParticlePlane = ({ count = 1000 }) => {
  const mesh = useRef();

  // Generate random positions for particles
  const particles = new Array(count).fill().map(() => ({
    position: [Math.random() * 10 - 5, Math.random() * .1 - .05, Math.random() * 10 - 5],
  }));

  // Animate the particles
  useFrame((state, delta) => {
    // mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.001;
    // mesh.current.rotation.z += 0.01;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position} >
          <sphereGeometry args={[0.01, 32, 32]} />
          <meshStandardMaterial attach="material" color="white" />
        </mesh>
      ))}
    </mesh>
  );
};

export default ParticlePlane;
