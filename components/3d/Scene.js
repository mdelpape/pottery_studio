// Scene.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, shaderMaterial, Text3D, useFont } from '@react-three/drei';
import Rotator from './Rotator';
import Bowl from './Bowl';
import VaseWall from './VaseWall';
import Doughnut from './Doughnut';
import useMouseCameraMove from './UseMouseCameraMove';
import Plane from './Plane';
import { SoftShadows } from "@react-three/drei"
import Vase1 from './Vase1';
import Vase2 from './Vase2';
import Vase3 from './Vase3';
import Vase4 from './Vase4';
import Vase5 from './Vase5';
import * as THREE from 'three';
import { DissolveMaterial } from './DissolveMaterial';

import Title from './Title';

const boxMaterial = new THREE.MeshStandardMaterial({ color: "white" });

const Scene = () => {
  const groupRef = React.useRef();

  const MouseCameraMoveWrapper = () => {
    useMouseCameraMove();
    return null; // This component doesn't render anything itself
  };

  // move the groupRef when scrolling
  React.useEffect(() => {
    const handler = () => {
      groupRef.current.position.y = window.scrollY / 100;
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <Canvas className="w-full h-full z-50"
      shadows

    >
      {/* <Title /> */}
      <MouseCameraMoveWrapper />
      <ambientLight
        intensity={.5}
      />
      <pointLight
        position={[10, 10, 10]}
        intensity={1000}
        color="white"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-radius={10}
      />
      <group ref={groupRef}>
        {Array.from({ length: 25 }).map((_, index) => (
          <group key={index}>
            <Rotator>
              <Vase2 />
            </Rotator>
            <Rotator>
              <Vase3 />
            </Rotator>
            <Rotator>
              <Vase4 />
            </Rotator>
            <Rotator>
              <Vase5 />
            </Rotator>
          </group>
        ))}
      </group>
      <OrbitControls />
      <Plane />
    </Canvas>
  );
};

export default Scene;