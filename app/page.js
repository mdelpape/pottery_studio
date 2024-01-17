'use client';
import React, { useEffect } from 'react';
import Scene from '@/components/3d/Scene'; // Correct import path for Scene
import Rotator from '@/components/3d/Rotator';
import ProjectCard from '@/components/2d/ProjectCard.js';
import { redirect } from 'next/navigation'

export default function Home() {

  useEffect(() => {
    // Redirect to '/path-to-redirect' when the component renders
    redirect('/raining_pottery');
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Scene as background */}
      <div className="fixed top-0 left-0 w-full h-full z-[-1]">
        {/* <Scene /> */}
      </div>
      <main className="z-10 relative flex flex-col items-center py-2 h-[400vh] align-middle gap-10 pt-10 pb-10">
        {/* <div className="relative justify-center text-center top-[40vh] align-middle"> */}
        {/* <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard /> */}
        {/* <h1 className="text-6xl font-bold text-center" style={{ color: '#F1EDEE' }}>Potter's Paradise</h1>
          <p className="text-2xl" style={{ color: '#F1EDEE' }}>This is the home page.</p> */}
        {/* </div> */}
      </main>
    </div >
  );
}