import React, { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCamera, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import RockBall from "./RockBall";
import Car from "./Car";
import { Physics, useBox, Debug, usePlane, useSphere, useCylinder, useHingeConstraint } from "@react-three/cannon";

import Vehicle from "./Vehicle";
import Ramp from "./Ramp";

const coronaSafetyDistance = 0.3;

function PhysicsScene() {
  return (
    <Physics>
      <Debug color="green" scale={1.1}>
        <Vehicle />
        <PlaneComponent />
        <Ramp />
      </Debug>
    </Physics>
  );
}

function PlaneComponent(props) {
  const [ref, api] = usePlane(() => ({
    mass: 0,
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
    scale: [1, 1, 1],

  }));

  // Number of instances
  const numInstances = 1; // Adjust based on how many instances you need

  return (
    <instancedMesh ref={ref} args={[null, null, numInstances]} {...props}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color={'#1F58AE'} />
      <gridHelper />
    </instancedMesh>
  );
}

function Scene() {
  const meshRef = useRef();
  const { camera } = useThree();
  const goalRef = useRef(new THREE.Object3D());
  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
    shiftleft: false,
  });
  const [velocity, setVelocity] = useState(0);

  return (
    <>
    </>
  );
}

function App() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <PhysicsScene />
      <ambientLight />
      <pointLight position={[10, 10, 10]} decay={0.5} intensity={10} />
      <Scene />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}

export default App;
