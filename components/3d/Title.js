import { Text, useFont, Text3D, meshStandardMaterial } from '@react-three/drei';
import React from 'react';
import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import Font from '../../public/fonts/LilitaFoward.json'

export default function Title() {

  return (

    <>
      <Text3D font={Font} position={
        [-3.5, 0, -6]
      } castShadow
        scale={1.5}
        receiveShadow
      >
        Potter's
        <meshStandardMaterial attach="material" color="#FFECCC" />
      </Text3D>
      <Text3D font={Font} position={
        [-3.9, -2, -6]
      } castShadow
        scale={1.5}
        receiveShadow
      >
        Paradise
        <meshStandardMaterial attach="material" color="#FFECCC" />
      </Text3D>
    </>
  );
}