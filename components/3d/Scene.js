// Scene.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
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
    <Canvas className="w-full h-full bg-red-950"
      shadows
    >
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
        {/* <Rotator >
          <Bowl />
        </Rotator> */}
        {/* <Rotator >
          <Doughnut />
        </Rotator>
        <Rotator >
          <Doughnut />
        </Rotator> */}
        <Rotator >
          <Vase1 />
        </Rotator>
        <Rotator >
          <Vase2 />
        </Rotator>
        <Rotator >
          <Vase1 />
        </Rotator>
        <Rotator >
          <Vase2 />
        </Rotator>
        <Rotator >
          <Vase5 />
        </Rotator>
        <Rotator >
          <Vase1 />
        </Rotator>
        <Rotator >
          <Vase2 />
        </Rotator>
        <Rotator >
          <Vase1 />
        </Rotator>
        <Rotator >
          <Vase2 />
        </Rotator>
        <Rotator >
          <Vase5 />
        </Rotator>
      </group>
      <OrbitControls />
      <Plane />
    </Canvas>
  );
};

export default Scene;