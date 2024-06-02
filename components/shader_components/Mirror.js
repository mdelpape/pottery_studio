import {
  MeshReflectorMaterial,
  useTexture,
  Reflector,
} from "@react-three/drei";
import waterdudv from "@/public/assets/waterdudv.jpg";
import cyberpunkDistortion from "@/public/assets/cyberpunkDistortion.png";
import * as THREE from "three";
import { useThree } from "react-three-fiber";

function Ground(props) {
  const [floor, normal] = useTexture([
    "/assets/cyberpunkDistortion.png",
    "/assets/SurfaceImperfections003_1K_Normal.jpg",
  ]);

  // Set the wrap mode to RepeatWrapping
  floor.wrapS = floor.wrapT = THREE.RepeatWrapping;
  normal.wrapS = normal.wrapT = THREE.RepeatWrapping;

  // Define the number of times the texture should repeat
  const repeats = 10;
  floor.repeat.set(repeats, repeats);
  normal.repeat.set(repeats, repeats);

  return (
    <Reflector resolution={1024} args={[200, 200]} {...props}>
      {(Material, props) => (
        <Material
          roughness={0.1}
          color="#f0f0f0"
          metalness={0.5}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={[10, 10]}
          {...props}
        />
      )}
    </Reflector>
  );
}

export default function Mirror() {
  const { camera } = useThree();

  return (
    <Ground
      mirror={1}
      blur={[500, 100]}
      mixBlur={12}
      mixStrength={1.5}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      position-y={-3.5}
      camera={camera}
    />
  );
}
