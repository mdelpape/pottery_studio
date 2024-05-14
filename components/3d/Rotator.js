// Rotator.js
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const Rotator = ({ children }) => {
  const groupRef = useRef();
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);

  const rotationSpeed = 0.005;
  const linearSpeed = 0.005;
  const minimumY = -34;
  const maximumY = 10;
  const minimumX = -15;
  const maximumX = 10;
  const minimumZ = -5;
  const maximumZ = 2;

  useEffect(() => {
    //Initial the position of the group in a random position within the specified range
    setPosition([
      Math.random() * (maximumX - minimumX) + minimumX,
      Math.random() * (maximumY - minimumY) + minimumY,
      Math.random() * (maximumZ - minimumZ) + minimumZ
    ]);
  }
    , []);

  // Update the position and rotation of the group
  useFrame(() => {

    if (groupRef.current) {

      // Rotate in random direction
      groupRef.current.rotation.y += rotationSpeed;

      if (groupRef.current.position.y > minimumY) {

        // move down if not at the minimum
        groupRef.current.position.y -= linearSpeed;

      } else {

        // reset to maximum if at the minimum
        groupRef.current.position.y = maximumY;

      }
    }
  });

  // Wrap children with a group and apply the ref to the group
  return
  (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}>
      {children}
    </group>
  )
};

export default Rotator;