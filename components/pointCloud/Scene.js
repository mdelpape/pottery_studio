"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useState, useEffect } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import ParticlePlane from "@/components/pointCloud/ParticlePlane.js";
import gsap from "gsap";

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
          console.log("Mercury");
          break;
        case "2":
          position = [-5, 2, -10];
          lookAt = [0, 0, -20];
          console.log("Venus");
          break;
        case "3":
          position = [5, 2, -20];
          lookAt = [10, 0, -30];
          console.log("Earth");
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
          <sphereGeometry args={[1, 100, 100]} />
          <meshPhongMaterial color="#416CF5" emissive="#fff" />
        </mesh>
        <pointLight position={[0, 0, 0]} intensity={400} decay={1.5} />
        <ambientLight intensity={0.05} />
        <mesh position={[0, 0, -20]} castShadow receiveShadow>
          <sphereGeometry args={[1, 100, 100]} />
          <meshPhongMaterial color="#416CF5" />
        </mesh>
        <mesh position={[10, 0, -30]} castShadow receiveShadow>
          <sphereGeometry args={[1, 100, 100]} />
          <meshPhongMaterial color="#416CF5" />
        </mesh>
        <LookAt cameraRef={cameraRef} ref={lookAtRef} />
        {/* <OrbitControls /> */}
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
        </select>
      </div>
    </>
  );
}
