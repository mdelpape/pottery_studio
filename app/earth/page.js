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
