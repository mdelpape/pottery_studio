'use client';
import React, { useEffect } from 'react';
import Scene from '@/components/3d/Scene'; // Correct import path for Scene
import Rotator from '@/components/3d/Rotator';
import ProjectCard from '@/components/2d/ProjectCard.js';
import { redirect } from 'next/navigation'

export default function Home() {

  useEffect(() => {
    // Redirect to '/the_main_path' when the component renders
    redirect('/earth');
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full z-[-1]">
      </div>
      <main className="z-10 relative flex flex-col items-center py-2 h-[400vh] align-middle gap-10 pt-10 pb-10">
      </main>
    </div >
  );
}