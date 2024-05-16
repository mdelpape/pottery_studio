'use client'
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef, useState, useEffect } from 'react';
import { OrbitControls, Stars, Clouds, Cloud, Sphere } from "@react-three/drei";
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three';

function HouseModel() {
  const gltf = useLoader(GLTFLoader, '/models/chunk154.glb')


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

export default function Chunk() {

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

      <HouseModel />
      <ambientLight intensity={2} />
      <pointLight position={[1, 16, 16]} intensity={200}
        decay={1} distance={20}
        color='{#CC0047'
      />
      <Sphere args={[1, 16, 16]} position={[0, 7, 4]} receiveShadow castShadow={false}>
        <meshStandardMaterial attach="material" color="white"
          emissive="white" // Set emissive color to white for glowing effect
        />
      </Sphere>
      <OrbitControls />
      <Stars
        radius={20}
        depth={5}
        count={200}
        factor={3}
        saturation={0}
        fade={false}
        speed={0}
      />
    </Canvas>
  )
}