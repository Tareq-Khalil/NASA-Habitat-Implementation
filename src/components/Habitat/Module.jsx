import React from 'react';

const Module = ({ moduleType, dimensions, position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={dimensions} />
      <meshStandardMaterial color={moduleType.color} />
    </mesh>
  );
};

export default Module;