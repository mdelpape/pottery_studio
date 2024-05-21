"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useState, useEffect } from "react";
import { OrbitControls, Stars, Clouds, Cloud } from "@react-three/drei";
import ParticlePlane from "@/components/pointCloud/ParticlePlane.js";

export default function Scene() {
  return (
    <>
      <Canvas
        id="canvas"
        style={{
          position: "absolute",
          background: "black",
          width: "100%",
          height: "100%",
        }}
        shadows
      >
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <sphereGeometry position={[0, 0, 0]} args={[1, 100, 100]} />
          <meshPhongMaterial
            color='#416CF5'
          />
        </mesh>
        <group
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[1, 1, 1]}
        >
        <ParticlePlane />

        </group>
        <pointLight position={[5, 10, 5]} intensity={200} />
        <ambientLight intensity={0.05} />
        <OrbitControls />
      </Canvas>
    </>
  );
}
