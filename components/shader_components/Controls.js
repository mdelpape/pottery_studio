import { OrbitControls } from "@react-three/drei";
import { useThree } from "react-three-fiber";


export default function Controls() {
  const { camera } = useThree();

  const minHeight = -1;

  return <OrbitControls
    enablePan={false}
    maxPolarAngle={Math.acos(minHeight / camera.position.length())}
  />;
}

