'use client'
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { OrbitControls, Stars, Clouds, Cloud } from "@react-three/drei";
import Globe from "./Globe";
import Moon from "./Moon";
import Sun from "./Sun";
import Camera from "./Camera";

export default function Scene() {

  return (
    <Canvas
      style={{
        background: "black",
        width: "200%",
        position: "absolute",
        transform: 'translateX(10%)',
      }}
      shadows
    >
      <Stars
        radius={300}
        depth={60}
        count={100000}
        factor={12}
        saturation={0}
        fade={false}
        speed={0}
      />
      <ambientLight intensity={2} />
      <OrbitControls />
      <Globe />
      <Moon />
      <Sun />
      <Camera />
    </Canvas>
  )
}