'use client';
import React from 'react';
import Scene from '@/components/3d/Scene'; // Correct import path for Scene
import Rotator from '@/components/3d/Rotator';

export default function Home() {

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Scene as background */}
      <div className="fixed top-0 left-0 w-full h-full z-[-1]">
          <Scene />
      </div>
      {/* Main content */}
      <main className="z-10 relative flex flex-col items-center justify-center py-2 min-h-screen">
        <h1 className="text-6xl font-bold">Home</h1>
        <p className="text-2xl">This is the home page.</p>
      </main>
    </div >
  );
}