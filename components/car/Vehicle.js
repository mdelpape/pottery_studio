'use client'
import { useRef, forwardRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useRaycastVehicle } from "@react-three/cannon";
import { useControls } from "./utils/useControls";
import { useCamera } from "@react-three/drei";
import Drifter from "./Drifter";
import Wheel from "./Wheel";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

const RIGHT_BOUNDARY = 14;
const RIGHT_SPAWN_POINT = 12;
const LEFT_BOUNDARY = -14;
const LEFT_SPAWN_POINT = -12;
const FORWARD_BOUNDARY = 10;
const BACKWARD_BOUNDARY = -20;

const Vehicle = ({
  radius = 0.7,
  width = 1.2,
  height = 0.3,
  front = 1.3,
  back = -1.15,
  steer = 0.6,
  force = 3000,
  maxBrake = 1e5,
  position,
  ...props
}) => {

  const lerp = (a, b, amount) => {
    return (1 - amount) * a + amount * b;
  };

  const { camera } = useThree();

  const chassis = useRef();
  const wheel1 = useRef();
  const wheel2 = useRef();
  const wheel3 = useRef();
  const wheel4 = useRef();

  const controls = useControls();

  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0],
    suspensionStiffness: 30,
    suspensionRestLength: 0.3,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    dampingRelaxation: 10,
    dampingCompression: 4.4,
    axleLocal: [-1, 0, 0],
    chassisConnectionPointLocal: [1, 0, 1],
    useCustomSlidingRotationalSpeed: true,
    customSlidingRotationalSpeed: -30,
    frictionSlip: 10,
  };

  const wheelInfo1 = {
    ...wheelInfo,
    isFrontWheel: true,
    chassisConnectionPointLocal: [-width / 1.5, height, front],
  };
  const wheelInfo2 = {
    ...wheelInfo,
    isFrontWheel: true,
    chassisConnectionPointLocal: [width / 1.5, height, front],
  };
  const wheelInfo3 = {
    ...wheelInfo,
    isFrontWheel: false,
    chassisConnectionPointLocal: [-width / 1.5, height, back],
  };
  const wheelInfo4 = {
    ...wheelInfo,
    isFrontWheel: false,
    chassisConnectionPointLocal: [width / 1.5, height, back],
  };

  const [vehicle, api] = useRaycastVehicle(() => ({
    chassisBody: chassis,
    wheels: [wheel1, wheel2, wheel3, wheel4],
    wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
    indexForwardAxis: 2,
    indexRightAxis: 0,
    indexUpAxis: 1,
  }));

  // raycastVehicles, etc. (anything created in cannon) doesnt necessarily track position.
  const vehiclePos = useRef([0, 0, 0]);
  const vehicleQuaternion = useRef([0, 0, 0, 1]);

  useEffect(() => {
    chassis?.current?.api.position.subscribe((v) => (vehiclePos.current = v));
    chassis?.current?.api.quaternion.subscribe((q) => (vehicleQuaternion.current = q));
  }, [api]);

  const resetCar = () => {
    chassis.current.api.position.set(0, 0.5, 0);
    chassis.current.api.velocity.set(0, 0, 0);
    chassis.current.api.angularVelocity.set(0, 0.5, 0);
    chassis.current.api.rotation.set(0, -Math.PI / 4, 0);
  };

  const debugCar = () => {
    console.log(vehiclePos, "vehicle");
  };

  useFrame(() => {
    const { forward, backward, left, right, brake, reset, test } =
      controls.current;

    const forceMultiplier = forward && !backward ? -1 : 1;
    forward || backward
      ? api.applyEngineForce(force * forceMultiplier, 0)
      : api.applyEngineForce(0, 0);

    // S is referring to the front wheels
    for (let s = 0; s < 2; s++) {
      const steerMultiplier = left && !right ? 1 : -1;

      left || right
        ? api.setSteeringValue(steer * steerMultiplier, s)
        : api.setSteeringValue(0, s);
    }

    // B is referring to the back wheels
    for (let b = 2; b < 4; b++) {
      const brakeMultipler = brake ? maxBrake : 0;
      api.setBrake(brakeMultipler, b);
    }

    if (reset) {
      resetCar();
      return;
    }

    if (test) {
      debugCar();
      return;
    }

    if (!camera || !chassis.current) {
      console.warn("Camera or chassis not yet available. Skipping camera update.");
      return;
    }

    const lerpAmount = 0.01; // Adjust for smoothness (0 to 1)

    // Calculate a dynamic offset based on vehicle orientation and user input (optional)
    const baseOffset = new THREE.Vector3(0, 5, -10); // Initial offset for view and distance
    const offset = new THREE.Vector3().copy(baseOffset);

    // Adjust offset based on user input (optional)
    if (forward) {
      offset.z += 1; // Move camera closer when accelerating
    } else if (backward) {
      offset.z -= 1; // Move camera further when braking
    }
    if (left) {
      offset.x -= 0.5; // Move camera slightly left when turning left
    } else if (right) {
      offset.x += 0.5; // Move camera slightly right when turning right
    }

    const vehiclePostion = new THREE.Vector3(vehiclePos.current[0], vehiclePos.current[1], vehiclePos.current[2]);

    //convert quaternion
    const quaternion = new THREE.Quaternion(
      vehicleQuaternion.current[0],
      vehicleQuaternion.current[1],
      vehicleQuaternion.current[2],
      vehicleQuaternion.current[3]
    );

    offset.applyQuaternion(quaternion);
    // Target position for the camera behind the vehicle
    const cameraTarget = new THREE.Vector3().copy(vehiclePostion).add(offset);
    // Lerp the camera position towards the target position
    camera.position.lerp(cameraTarget, lerpAmount);
    // LookAt for a smoother tracking effect (optional)
    camera.lookAt(vehiclePostion);
  });

  return (
    <group ref={vehicle} position={[0, -0.3, 0]} name="vehicle">
      <Drifter
        ref={chassis}
        position={position}
        rotation={props.rotation}
        angularVelocity={props.angularVelocity}
      />
      <Wheel ref={wheel1} radius={radius} leftSide />
      <Wheel ref={wheel2} radius={radius} />
      <Wheel ref={wheel3} radius={radius} leftSide />
      <Wheel ref={wheel4} radius={radius} />
    </group>
  );
};

export default Vehicle;
