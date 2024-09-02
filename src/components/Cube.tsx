const Cube = () => {
  return (
    <mesh position-x={2} castShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={"mediumpurple"} />
    </mesh>
  );
};

export { Cube };
