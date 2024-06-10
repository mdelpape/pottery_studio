import { forwardRef, useState, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { Physics, useBox, Debug, usePlane, useSphere, useCylinder, useHingeConstraint, useVehicle } from "@react-three/cannon";


function Car() {
  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  // Event handlers for key presses
  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys((keys) => ({ ...keys, [e.key.toLowerCase()]: true }));
    };
    const handleKeyUp = (e) => {
      setKeys((keys) => ({ ...keys, [e.key.toLowerCase()]: false }));
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Car body
  const [bodyRef, bodyApi] = useBox(() => ({
    mass: 1,
    position: [0, 1, 0],
    args: [2, 0.5, 1], // Width, height, depth of the car body
  }));

  // Wheel positions
  const wheelPositions = [
    [-1, 0.5, 0.5], // Front left
    [1, 0.5, 0.5],  // Front right
    [-1, 0.5, -0.5], // Rear left
    [1, 0.5, -0.5], // Rear right
  ];

  // Wheels
  const wheels = wheelPositions.map((position) => {
    const [wheelRef] = useSphere(() => ({
      mass: 0.5,
      position,
      rotation: [Math.PI / 2, 0, 0],
      args: [0.3, 0.3, 0.3, 32], // Radius top, radius bottom, height, segments
    }));
    return { wheelRef, position };
  });

  // Attach wheels to the car body using hinge constraints
  wheels.forEach(({ wheelRef, position }) => {
    useHingeConstraint(bodyRef, wheelRef, {
      pivotA: [position[0], position[1] - 0.5, position[2]],
      pivotB: [0, 0, 0],
      axisA: [0, 0, 0], // Allow rotation around z-axis
      axisB: [0, 0, 0],
    });
  });

  // Apply forces based on key presses
  useEffect(() => {
    const force = 100;
    const torque = 1;
    if (keys.w) {
      bodyApi.applyForce([0, 0, -force], [0, 0, 0]);
    }
    if (keys.s) {
      bodyApi.applyForce([0, 0, force], [0, 0, 0]);
    }
    if (keys.a) {
      bodyApi.applyTorque([0, torque, 0]);
    }
    if (keys.d) {
      bodyApi.applyTorque([0, -torque, 0]);
    }
  }, [keys, bodyApi]);

  return (
    <>
      <mesh ref={bodyRef}>
      </mesh>
      {wheels.map(({ wheelRef }, index) => (
        <mesh key={index} ref={wheelRef}>
        </mesh>
      ))}
    </>
  );
}

export default Car;
