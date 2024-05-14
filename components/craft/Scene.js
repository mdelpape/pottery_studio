'use client'
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef, useState, useEffect } from 'react';
import { OrbitControls, Stars, Clouds, Cloud } from "@react-three/drei";
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three';

function HouseModel() {
  const gltf = useLoader(GLTFLoader, '/models/house.glb')


  return (
    <group>
      <primitive object={gltf.scene}
        scale={[0.2, 0.2, 0.2]}
        rotation={[0, 2.2, 0]}
        position={[-.5, 0, 0]}
      />
    </group>
  )
}

export default function House() {

  return (
    <Canvas
      id="canvas"
      style={{
        position: "absolute",
        background: "black",
        width: '100vw',
        height: '100vh',
      }}
      shadows
    >
      <pointLight position={[0, -.5, .5]}
        intensity={7}
      />
      <HouseModel />
      <ambientLight intensity={1} />
      <pointLight position={[200, 100, 500]} intensity={100}
        decay={.5} distance={1000}
      />
      <OrbitControls />
      <Stars
        radius={20}
        depth={5}
        count={20000}
        factor={.9}
        saturation={0}
        fade={false}
        speed={0}
      />
    </Canvas>
  )
}