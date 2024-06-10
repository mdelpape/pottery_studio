import React, { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCamera, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import RockBall from "./RockBall";
import Car from "./Car";
import { Physics, useBox } from '@react-three/cannon'


const coronaSafetyDistance = 0.3;

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

  const handleKeyDown = useCallback(
    (e) => {
      const key = e.code.replace("Key", "").toLowerCase();
      if (keys[key] !== undefined) {
        setKeys((prevKeys) => ({ ...prevKeys, [key]: true }));
      }
    },
    [keys]
  );

  const handleKeyUp = useCallback(
    (e) => {
      const key = e.code.replace("Key", "").toLowerCase();
      if (keys[key] !== undefined) {
        setKeys((prevKeys) => ({ ...prevKeys, [key]: false }));
      }
    },
    [keys]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useFrame(() => {
    const mesh = meshRef.current;
    const goal = goalRef.current;
    let speed = 0;
    const sprintMultiplier = keys.shiftleft ? 2 : 1;
    if (keys.w) speed = 0.04 * sprintMultiplier;
    else if (keys.s) speed = -0.04 * sprintMultiplier;

    //lean the car if the a or d are pressed
    let lean = 0;
    if (keys.a) lean = 0.05;
    else if (keys.d) lean = -0.05;

    setVelocity((prevVelocity) => prevVelocity + (speed - prevVelocity) * 0.01);
    mesh.translateZ(velocity);

    if (keys.a) mesh.rotateY(0.02);
    else if (keys.d) mesh.rotateY(-0.02);

    const a = new THREE.Vector3().lerpVectors(
      goal.position,
      mesh.position,
      0.4
    );

    const b = new THREE.Vector3().copy(goal.position);
    const dir = new THREE.Vector3().subVectors(a, b).normalize();
    const dis = a.distanceTo(b) - coronaSafetyDistance;
    goal.position.addScaledVector(dir, dis);

    // Calculate the offset based on the object's orientation
    const offset = new THREE.Vector3(0, 1, -2);
    offset.applyQuaternion(mesh.quaternion);

    // Target position for the camera behind the object
    const cameraTarget = new THREE.Vector3().copy(mesh.position).add(offset);

    // Lerp the camera position towards the target position
    camera.position.lerp(cameraTarget, 0.1);
    camera.lookAt(mesh.position);
  });

  return (
    <>
      <Car
        ref={meshRef}
        position={[0, 1, 0]}
        scale={[0.4, 0.4, 0.4]}
        keys={keys}
      />
      <gridHelper args={[40, 40]} />
    </>
  );
}

function App() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} decay={0.5} intensity={10} />
      <Scene />
    </Canvas>
  );
}

export default App;
