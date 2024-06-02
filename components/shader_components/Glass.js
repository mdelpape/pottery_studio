import { useThree } from "react-three-fiber";
import waterdudv from "@/public/assets/waterdudv.jpg";
import {
  useTexture,
  MeshTransmissionMaterial,
  MeshPortalMaterial,
} from "@react-three/drei";

export default function Glass() {
  return (
    <mesh position={[0, 0, 10]}>
      <boxGeometry args={[5, 2, 1]} />
      {/* <MeshPortalMaterial>
      <ambientLight intensity={0.5} />

      </MeshPortalMaterial> */}
      <MeshTransmissionMaterial
        transmission={1}
        thickness={0.1}
        roughness={0}
        chromaticAberration={1}
        anistropicBlue={0}
        distortionScale={1}
      />
    </mesh>
  );
}
