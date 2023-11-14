// Rotator.js
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const Rotator = ({ children }) => {
  const groupRef = useRef();
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  console.log(position)

  useEffect(() => {
    setPosition([
      Math.random() * 10 - 5,
      Math.random() * 20 - 10,
      Math.random() * 7 - 5,
    ]);
    setRotation([0, 0, 0]);
  }
    , []);

  useFrame(() => {
    if (groupRef.current) {
      // Rotate in random direction
      groupRef.current.rotation.y += 0.005;
      if (groupRef.current.position.y > -17) {
        groupRef.current.position.y -= 0.003
      } else {
        groupRef.current.position.y = 10;
      }
    }
  });

  // Wrap children with a group and apply the ref to the group
  return <group ref={groupRef} position={position} rotation={rotation}>{children}</group>;
};

export default Rotator;
