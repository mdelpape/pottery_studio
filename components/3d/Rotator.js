// Rotator.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Rotator = ({ children }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      // Rotate in random direction
      groupRef.current.rotation.y += 0.01;
    }
  });

  // Wrap children with a group and apply the ref to the group
  return <group ref={groupRef}>{children}</group>;
};

export default Rotator;
