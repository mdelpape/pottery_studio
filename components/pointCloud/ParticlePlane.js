import { useFrame } from '@react-three/fiber';
import { instanced, Box } from '@react-three/drei';
import React, { useRef } from 'react';

const ParticlePlane = ({ count = 1000 }) => {
  const mesh = useRef();

  // Generate random positions for particles
  const particles = new Array(count).fill().map(() => ({
    position: [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5],
  }));

  // Update particle positions in the animation loop
  useFrame(() => {
    mesh.current.rotation.x += 0.005;
    mesh.current.rotation.y += 0.005;
  });

  return (
    <instanced ref={mesh} count={count} scale={[0.01, 0.01, 0.01]}>
      <Box args={[1, 1, 1]}>
        <instancedBufferAttribute
          attach="geometry"
          args={[new Float32Array(particles.flatMap(p => p.position)), 3]}
          args={particles.flatMap(p => p.position)}
          itemSize={3}
        />
        <meshBasicMaterial attach="material" color="white" />
      </Box>
    </instanced>
  );
};

export default ParticlePlane;
