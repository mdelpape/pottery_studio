'use client'
import React, { useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function City(props) {
  const isMobile = window.innerWidth < 768;
  const { nodes, materials } = useGLTF('/models/uploads_files_3248566_miniNY-transformed.glb')

  const defaultMaterial = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: 0x750000, // Set the base color to white
    });
  }, []);

  return (
    <>
      <group position={[
        0, 0, -2
      ]}>
        <group {...props} dispose={null}
          position={[3, -2, -1]}
          scale={[0.01, 0.01, 0.01]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
        >

          <mesh geometry={nodes.Plane.geometry} material={
            defaultMaterial
          }
            castShadow={true}
            receiveShadow
          />


        </group>
        <mesh position={[0, 0, -1]}
          receiveShadow
        >
          <planeGeometry args={[40, 40]} />
          <meshPhongMaterial color={0x750000}
            shininess={1000}
          />
        </mesh>
      </group>
    </>
  )
}

useGLTF.preload('/uploads_files_3248566_miniNY-transformed.glb')
