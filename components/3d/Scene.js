// Scene.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Rotator from './Rotator';
import Bowl from './Bowl';

const Scene = () => {
  return (
    <Canvas className="w-full h-full bg-black">
      <ambientLight
        intensity={0.05}
      />
      <pointLight position={[10, 10, 10]}
        intensity={500}
      />
      <pointLight position={[0, 1, 0]} />
      {/* <Rotator>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Rotator> */}
      <Rotator >
        <Bowl />
      </Rotator>
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
