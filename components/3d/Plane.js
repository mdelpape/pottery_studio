import React from 'react';

export default function Plane() {
  return (
    <mesh position={
      [0, 0, -7]
    }
      receiveShadow
    >
      {/* Use 'planeBufferGeometry' as a JSX tag */}
      <planeGeometry args={[100, 100]}
      />
      {/* Use 'meshBasicMaterial' as a JSX tag */}
      <meshStandardMaterial color="#3d5467" />
    </mesh>
  );
}
