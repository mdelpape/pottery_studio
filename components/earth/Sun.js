import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Sun() {

  const objectRef = useRef();

  const orbitRadius = 30;
  const speed = .5;
  const earthPosition = [0, 0, 0];

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    objectRef.current.position.z = earthPosition[1] + orbitRadius * Math.cos(elapsedTime * speed);
    objectRef.current.position.x = earthPosition[2] + orbitRadius * Math.sin(elapsedTime * speed);
  });

  return (
    <group
      position={[0, 0, 30]}
      ref={objectRef}
    >
      <pointLight
        intensity={2000}
        color="white"
        decay={1.5}
        castShadow
      />
      <mesh>
        <sphereGeometry
          attach="geometry"
          args={[1, 64, 64]}
        />
        <meshPhongMaterial
          shininess={200}
          displacementScale={.5}
          displacementBias={2}
        />
      </mesh>
    </group>
  )
}