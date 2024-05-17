'use client'
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef, useState, useEffect } from 'react';
import { OrbitControls, Stars, Sphere } from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three';

function UploadModel({ model }) {
  if (!model) return null;

  return (
    <group>
      <primitive object={model.scene}
        scale={[0.2, 0.2, 0.2]}
        rotation={[0, 2.2, 0]}
        position={[-0.5, 0, 0]}
      />
    </group>
  )
}

export default function UploadScene() {
  const [model, setModel] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const loader = new GLTFLoader();
        loader.parse(e.target.result, '', (gltf) => {
          setModel(gltf);
        }, undefined, (error) => {
          console.error('An error occurred while parsing the GLB file:', error);
        });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
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
        <UploadModel model={model} />
        <ambientLight intensity={2} />
        <pointLight position={[1, 16, 16]} intensity={200}
          decay={1} distance={20}
          color='#CC0047'
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
      <input
        type="file"
        accept=".glb"
        className="absolute top-0 right-0 m-5 p-2 bg-black text-white"
        onChange={handleFileUpload}
      />
    </>
  )
}
