'use client'
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef, useState, useEffect } from 'react';
import { OrbitControls, Stars, Clouds, Cloud } from "@react-three/drei";
import ParticlePlane from '@/components/pointCloud/ParticlePlane.js';

export default function Scene() {

  return (
    <>
      <Canvas
        id="canvas"
        style={{
          position: "absolute",
          background: "black",
          width: '100%',
          height: '100%',
        }}
        shadows
      >
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <sphereGeometry
            position={[0, 0, 0]}
            args={[.5, 100, 100]}
          />
          <meshStandardMaterial
          />
        </mesh>
        <ParticlePlane />
        {/* <Stars
          radius={20}
          depth={5}
          count={50000}
          factor={.5}
          saturation={0}
          fade={false}
          speed={0}
        /> */}
        <ambientLight intensity={10} />
        <OrbitControls />
      </Canvas>
    </>
  )
}