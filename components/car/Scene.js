import React, { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCamera, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import RockBall from "./RockBall";
import Car from "./Car";
import { Physics, useBox, Debug, usePlane, useSphere, useCylinder, useHingeConstraint } from "@react-three/cannon";

import Vehicle from "./Vehicle";

const coronaSafetyDistance = 0.3;

function PhysicsScene() {
  return (
    <Physics>
      <Debug color="green" scale={1.1}>
        <Vehicle />
        <PlaneComponent />
      </Debug>
    </Physics>
  );
}

function CarComponent() {
  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
    shiftleft: false,
  });



  // Car body
  const [bodyRef, bodyApi] = useBox(() => ({
    mass: 1,
    position: [0, 1, 0],
    args: [2, 0.5, 1], // Width, height, depth of the car body
  }));

  // Wheel positions
  const wheelPositions = [
    [-1, 0.5, .5], // Front left
    [1, 0.5, .5],  // Front right
    [-1, 0.5, -.5], // Rear left
    [1, 0.5, -.5], // Rear right
  ];

  // Wheels
  const wheels = wheelPositions.map((position, index) => {
    const [wheelRef, wheelApi] = useCylinder(() => ({
      mass: 0.5,
      position,
      rotation: [Math.PI / 2, 0, 0],
      args: [0.3, 0.3, .3, 32], // Radius top, radius bottom, height, segments
    }));
    return { wheelRef, wheelApi, position };
  });

  // Attach wheels to the car body using hinge constraints
  wheels.forEach(({ wheelRef, wheelApi, position }) => {
    useHingeConstraint(bodyRef, wheelRef, {
      pivotA: [position[0], position[1] - 0.5, position[2]],
      pivotB: [0, 0, 0],
      axisA: [0, 0, 0],
      axisB: [0, 0, 0],
    });
  });

  return (
    <>
      <mesh ref={bodyRef}>
        {/* <boxBufferGeometry args={[1, 0.5, 2]} />
        <meshStandardMaterial color="blue" /> */}
      </mesh>
      {wheels.map(({ wheelRef }, index) => (
        <mesh key={index} ref={wheelRef}>
          {/* <cylinderBufferGeometry args={[0.3, 0.3, 0.1, 16]} />
          <meshStandardMaterial color="black" /> */}
        </mesh>
      ))}
    </>
  );
}

function PlaneComponent() {
  const [ref, api] = usePlane(() => ({
    mass: 0,
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
    scale: [1, 1, 1],
  }));
  return (
    <mesh ref={ref} scale={[20, 20, 20]}>
      <planeGeometry />
      <meshBasicMaterial color={'#1F58AE'} />
    </mesh>
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
      <OrbitControls />
    </Canvas>
  );
}

export default App;
