import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';

const useMouseCameraMove = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const getCameraPositionFromMouse = (mouseX, mouseY) => {
    // Translate mouseX and mouseY to 3D coordinates
    // This is a placeholder, adjust according to your scene setup
    return {
      x: mouseX * .2, // scaleFactor depends on your scene's scale
      y: mouseY * .2,
      z: camera.position.z // Keep the Z coordinate constant or adjust as needed
    };
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;

      mouse.current.x = (clientX - windowHalfX) / windowHalfX;
      mouse.current.y = (clientY - windowHalfY) / windowHalfY;

      const newPosition = getCameraPositionFromMouse(mouse.current.x, mouse.current.y);
      camera.position.x = newPosition.x;
      camera.position.y = newPosition.y;
      // Optionally use lerp for smoother movement
      // camera.position.lerp(newPosition, 0.05);

      camera.lookAt(0, 0, 0);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [camera]);

  return mouse;
};

export default useMouseCameraMove;

