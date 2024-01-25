'use client'

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Head(props) {
  const { nodes, materials } = useGLTF('/models/free_head-transformed.glb')

  materials.Head = new THREE.MeshPhongMaterial({
    color: 0x750000,      // Set the base color to white
    shininess: 700,        // Reduce the shininess for a smoother look
    // reflectivity: 200,    // Increase the reflectivity for a glossy effect
    combine: THREE.MixOperation, // Mix the base color with the environment map
  });

  return (
    <group {...props} dispose={null}
      position={[0, 0, -3]}
      scale={[20, 20, 20]}
    >
      <mesh geometry={nodes.eye_low_L_eyeball_mesh003.geometry} material={
        materials.Head
      }
        position={[0, -1.6, 0]}
      />
    </group>
  )
}

useGLTF.preload('/free_head-transformed.glb')
