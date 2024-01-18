import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react';

export default function Camera() {
  const groupRef = useRef();
  const ref = useRef();
  const [time, setTime] = useState(0);

  useFrame(() => {
    // Adjust the rotation speed as needed
    const rotationSpeed = 0.0005;

    // Update the time state to rotate the camera
    setTime((prevTime) => prevTime + rotationSpeed);

    // Calculate new camera position based on time
    const x = Math.sin(time) * 25;
    const z = Math.cos(time) * 25;

    // Set the new camera position
    groupRef.current.position.set(x, 5, z);

    // Set the camera lookAt to the center of the scene (globe)
    ref.current.lookAt(0, 0, 0);
  });
  return (
    <group
      ref={groupRef}
    >
      <PerspectiveCamera
        ref={ref}
        makeDefault
        position={[0, 0, 0]}
        fov={120}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
        focus={.001}
      />
      <pointLight
        intensity={500}
        position={[0, -3, 0]}
        color="white"
        decay={1}
        castShadow
        shadow-radius={2}
        shadow-mapSize-width={2500}
        shadow-mapSize-height={2500}
      />
    </group>
  );
}