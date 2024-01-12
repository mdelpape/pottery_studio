'use client'
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef, useState, useEffect } from 'react';
import { OrbitControls, Stars, Clouds, Cloud } from "@react-three/drei";
import Globe from "./Globe";
import Moon from "./Moon";
import Sun from "./Sun";
import Camera from "./Camera";

export default function Scene() {

  return (
    <>
      <Canvas
        id="canvas"
        style={{
          position: 'relative',
          background: "black",
          width: "200%",
          height: "165vh",
          transform: 'translateX(12%) translateY(-20%)',
          pointerEvents: 'none',
        }}
        shadows
      >
        <Stars
          radius={10}
          depth={5}
          count={50000}
          factor={.8}
          saturation={0}
          fade={false}
          speed={0}
        />
        <ambientLight intensity={2} />
        <OrbitControls />
        <Globe />
        <Moon />
        <Sun />
        {/* <OrbitControls /> */}
        <Camera />
      </Canvas>
      <div style={{
        bottom: 500,
        left: 0,
        zIndex: 100,
        width: '100%',
        height: '20%',
        background: '#000',
      }} />
    </>
  )
}