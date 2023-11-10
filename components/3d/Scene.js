// Scene.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Rotator from './Rotator';
import Bowl from './Bowl';
import VaseWall from './VaseWall';
import Doughnut from './Doughnut';

const Scene = () => {
  return (
    <Canvas className="w-full h-full bg-slate-500">
      <ambientLight
        intensity={.5}
      />
      <pointLight position={[10, 10, 10]}
        intensity={1000}
        color="white"
      />
      <Rotator >
        <Bowl />
      </Rotator>
      <Rotator >
        <Doughnut />
      </Rotator>
      <Rotator >
        <Doughnut />
      </Rotator>
      <Rotator >
        <Doughnut />
      </Rotator>
      <Rotator >
        <Bowl />
      </Rotator>
      <Rotator >
        <Bowl />
      </Rotator>
      <Rotator >
        <Bowl />
      </Rotator>
      <Rotator >
        <Bowl />
      </Rotator>
      <Rotator >
        <Doughnut />
      </Rotator>
      <Rotator >
        <Doughnut />
      </Rotator>
      <Rotator >
        <Doughnut />
      </Rotator>
      <Rotator >
        <Bowl />
      </Rotator>
      <Rotator >
        <Bowl />
      </Rotator>
      <Rotator >
        <Bowl />
      </Rotator>
      {/* <VaseWall position={[-5, -3, -5]} rotation={[0, Math.PI / 2, 0]} /> */}
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;