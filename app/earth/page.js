'use client'
import Scene from '../../components/earth/Scene'

export default function Earth() {
  const bodyStyle = {
    overflow: 'hidden',
    margin: 0,  // Remove default body margin
    padding: 0, // Remove default body padding
  };
  return (
    <main className="flex flex-col items-center justify-between  bg-black z-10" style={bodyStyle}>
      <Scene />
    </main>
  )
}
