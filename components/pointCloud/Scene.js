"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useState, useEffect } from "react";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import ParticlePlane from "@/components/pointCloud/ParticlePlane.js";
import gsap from "gsap";

import Mercury from "@/components/pointCloud/Mercury.js";
import Venus from "@/components/pointCloud/Venus.js";
import Earth from "@/components/pointCloud/Earth.js";
import Mars from "@/components/pointCloud/Mars.js";
import Jupiter from "@/components/pointCloud/Jupiter.js";
import Neptune from "@/components/pointCloud/Neptune.js";
import Saturn from "@/components/pointCloud/Saturn.js";
import Uranus from "@/components/pointCloud/Uranus.js";

const LookAt = React.forwardRef((props, ref) => {
  useFrame(() => {
    if (props.cameraRef.current && ref.current) {
      props.cameraRef.current.lookAt(ref.current.position);
    }
  });

  return <mesh ref={ref} position={[0, 0, 0]} visible={false} />;
});

export default function Scene() {
  const cameraRef = useRef();
  const lookAtRef = useRef();
  const [planet, setPlanet] = useState("");

  const handlePlanetChange = (event) => {
    setPlanet(event.target.value);
  };

  useEffect(() => {
    if (cameraRef.current) {
      let position, lookAt;
      switch (planet) {
        case "1":
          position = [10, 10, 10];
          lookAt = [0, 0, 0];
          break;
        case "2":
          //mercury
          position = [-8, 1, -35];
          lookAt = [-10, 0, -36.65];
          break;
        case "3":
          //venus
          position = [-7, 1, -69];
          lookAt = [-10, 0, -71.28];
          break;
        case "4":
          //eath
          position = [-7, 1, -95];
          lookAt = [-10, 0, -99.5];
          break;
        case "5":
          //mars
          position = [-9, 1, -145];
          lookAt = [-10, 0, -149.67];
          break;
        case "6":
          //jupitor
          position = [-50, 1, -450];
          lookAt = [-10, 0, -519.71];
          break;
        case "7":
          //saturn
          position = [-30, 2, -910];
          lookAt = [-10, 0, -949.47];
          break;
        case "8":
          //uranus
          position = [-20, 2, -1900];
          lookAt = [-10, 0, -1919.74];
          break;
        case "9":
          //neptune
          position = [-15, 2, -2990];
          lookAt = [-10, 0, -3009.83];
          break;
        default:
          position = [10, 10, 10];
          lookAt = [0, 0, 0];
          break;
      }
      // Animate camera position
      gsap.to(cameraRef.current.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (lookAtRef.current) {
            cameraRef.current.lookAt(...lookAt);
          }
        },
      });

      //animate the lookat position
      gsap.to(lookAtRef.current.position, {
        x: lookAt[0],
        y: lookAt[1],
        z: lookAt[2],
        duration: 2,
        ease: "power2.inOut",
      });
    }
  }, [planet]);

  return (
    <>
      <Canvas
        id="canvas"
        style={{
          position: "absolute",
          background: "black",
          width: "100%",
          height: "100%",
        }}
        shadows
      >
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={[10, 10, 10]}
          fov={75}
        />
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <sphereGeometry args={[5, 100, 100]} />
          <meshPhongMaterial color="#416CF5" emissive="#fff" />
        </mesh>
        <pointLight position={[0, 0, 0]} intensity={1} decay={0} />
        <ambientLight intensity={1} />
        <group
          position={[-10, 0, -36.65]}
          castShadow
          receiveShadow
          scale={0.376}
        >
          <Mercury />
        </group>
        <group
          position={[-10, 0, -71.28]}
          castShadow
          receiveShadow
          scale={0.949}
        >
          <Venus />
        </group>
        <group position={[-10, 0, -99.5]} castShadow receiveShadow scale={1}>
          <Earth />
        </group>
        <group
          position={[-10, 0, -149.67]}
          castShadow
          receiveShadow
          scale={0.533}
        >
          <Mars />
        </group>
        <group
          position={[-10, 0, -519.71]}
          castShadow
          receiveShadow
          scale={11.2}
        >
          <Jupiter />
        </group>
        <group
          position={[-10, 0, -949.47]}
          castShadow
          receiveShadow
          scale={9.46}
        >
          <Saturn />
        </group>
        <group
          position={[-10, 0, -1919.74]}
          castShadow
          receiveShadow
          scale={4.06}
        >
          <Uranus />
        </group>
        <group
          position={[-10, 0, -3009.83]}
          castShadow
          receiveShadow
          scale={3.88}
        >
          <Neptune />
        </group>
        <LookAt cameraRef={cameraRef} ref={lookAtRef} />
        <OrbitControls />
      </Canvas>
      <div className="absolute top-2 right-2 z-50">
        <select
          value={planet}
          onChange={handlePlanetChange}
          className="p-2 bg-gray-800 text-white rounded"
        >
          <option value="1">Sun</option>
          <option value="2">Mercury</option>
          <option value="3">Venus</option>
          <option value="4">Earth</option>
          <option value="5">Mars</option>
          <option value="6">Jupiter</option>
          <option value="7">Saturn</option>
          <option value="8">Uranus</option>
          <option value="9">Neptune</option>
        </select>
      </div>
    </>
  );
}
