'use client';
import React, { useEffect } from 'react';
import Rotator from '@/components/3d/Rotator';
import ProjectCard from '@/components/2d/ProjectCard.js';
import { redirect } from 'next/navigation'

import Scene from '@/components/pointCloud/Scene.js'


export default function Home() {
  const bodyStyle = {
    overflow: 'hidden',
    margin: 0,
    padding: 0,
  };
  return (
    <main className="flex flex-col items-center justify-between  bg-black z-10" style={bodyStyle}>
      <Scene />
      <div style={{
        position: 'relative',
        bottom: 448,
        left: 0,
        width: '100%',
        height: 200,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 70%)',
      }} />
    </main>
  )
}