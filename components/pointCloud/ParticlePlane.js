import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

const ParticlePlane = ({ count = 1000, outerRadius = 4, innerRadius = 3 }) => {
  const mesh = useRef();

  const speed = 0.0001;
  const amplitude = 0.0;
  // Generate random positions for particles within a circular area
  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * (outerRadius - innerRadius) + innerRadius;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    particles.push({ position: [x, Math.random() * amplitude - .05, z] });
  }

  // Animate the particles
  useFrame(() => {
    mesh.current.rotation.y += speed;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position} >
          <sphereGeometry args={[0.005, 32, 32]} />
          <meshStandardMaterial attach="material" color="white" />
        </mesh>
      ))}
    </mesh>
  );
};

export default ParticlePlane;
