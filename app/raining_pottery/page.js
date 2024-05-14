'use client';
import Scene from '@/components/3d/Scene'; // Correct import path for Scene

export default function RainingPottery() {

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full z-[-1]">
        <Scene />
      </div>
      <main className="z-10 relative flex flex-col items-center py-2 h-[400vh] align-middle gap-10 pt-10 pb-10">
      </main>
    </div >
  );
}