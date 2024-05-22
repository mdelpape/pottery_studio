
const Earth = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 100, 100]} />
      <meshStandardMaterial color="#fff" />
    </mesh>
  );
};

export default Earth;
