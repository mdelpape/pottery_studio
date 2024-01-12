'use client'
import { useRef, useState, useEffect } from "react";
import { useFrame, useThree, Canvas } from "@react-three/fiber";
import { OrbitControls, ScrollControls, useScroll, Stars } from "@react-three/drei";
import * as THREE from "three";
import { Head } from "./Head";
import { City } from "./City";

const Experience = () => {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100vh",
      }}
    >

      <pointLight position={[0, 0, 0]} intensity={400} color={
        new THREE.Color(0x57CCE6)
      }
        castShadow={true}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        distance={100}

      />
      <ambientLight intensity={0.5} />

      <City />
      <Head />
    </Canvas>
  );
};

export default Experience;