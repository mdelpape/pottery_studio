import React, { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {useCamera, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const coronaSafetyDistance = 0.3;

function Scene() {
  const meshRef = useRef();
  const { camera } = useThree();
  const goalRef = useRef(new THREE.Object3D());
  const [keys, setKeys] = useState({ w: false, a: false, s: false, d: false });
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

    if (keys.w) speed = 0.01;
    else if (keys.s) speed = -0.01;

    setVelocity((prevVelocity) => prevVelocity + (speed - prevVelocity) * 0.3);
    mesh.translateZ(velocity);

    if (keys.a) mesh.rotateY(0.05);
    else if (keys.d) mesh.rotateY(-0.05);

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
      <mesh ref={meshRef}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshNormalMaterial />
      </mesh>
      <gridHelper args={[40, 40]} />
      <axesHelper />
    </>
  );
}

function App() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <Scene />
    </Canvas>
  );
}

export default App;
