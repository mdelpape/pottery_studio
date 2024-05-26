"use client";
import { useRef, useState, useEffect } from "react";
import { useFrame, useThree, Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  ScrollControls,
  useScroll,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";
import { Head } from "./Head";
import { City } from "./City";

const Experience = () => {
  const pointLightRef = useRef();

  const updateLightPosition = (e) => {
    // Calculate the normalized mouse coordinates
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

    // Adjust the scale factor as needed to control the light's movement
    const scaleFactorx = 12;
    const scaleFactory = 6;

    // Apply the scale factor to the mouse coordinates
    const x = mouseX * scaleFactorx;
    const y = mouseY * scaleFactory;

    // Set the light positions
    if (pointLightRef.current) {
      pointLightRef.current.position.set(x, y, 0);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateLightPosition);
    window.addEventListener("touchmove", updateLightPosition);
    return () => {
      window.removeEventListener("touchmove", updateLightPosition);
      window.removeEventListener("mousemove", updateLightPosition);
    };
  });

  return (
    <Canvas
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <pointLight
        ref={pointLightRef}
        position={[0, 0, 0]}
        intensity={400}
        color={new THREE.Color(0x57cce6)}
        castShadow={true}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        distance={100}
      />

      {/* <pointLight position={[0, 0, ]} intensity={200} color={
        new THREE.Color(0x57CCE6)
      }
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        distance={100}
      /> */}
      <ambientLight intensity={0.5} />
      <group
        position={[0, 0, -2]}
      >
        <City />
        <Head />
      </group>
    </Canvas>
  );
};

export default Experience;
