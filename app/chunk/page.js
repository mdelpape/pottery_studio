'use client'
import Scene from '@/components/craft/Scene.js'
import { useGLTF } from '@react-three/drei'
import Chunk from '@/components/craft/Chunk.js'

export default function House() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black">
      <Chunk />
    </main>
  )
}
