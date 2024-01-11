import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react';

export default function Camera() {
  const ref = useRef();
  const [time, setTime] = useState(0);

  useFrame(() => {
    // Adjust the rotation speed as needed
    const rotationSpeed = 0.001;

    // Update the time state to rotate the camera
    setTime((prevTime) => prevTime + rotationSpeed);

    // Calculate new camera position based on time
    const x = Math.sin(time) * 10;
    const z = Math.cos(time) * 10;

    // Set the new camera position
    ref.current.position.set(x, 0, z);

    // Set the camera lookAt to the center of the scene (globe)
    ref.current.lookAt(0, 0, 0);
  });
  return (
    <PerspectiveCamera
      ref={ref}
      makeDefault
      position={[0, 0, 10]}
      fov={75}
      aspect={window.innerWidth / window.innerHeight}
      near={0.1}
      far={1000}
    />
  );
}