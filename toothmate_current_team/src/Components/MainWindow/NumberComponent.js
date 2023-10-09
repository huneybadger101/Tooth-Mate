import React from 'react';
import { Text } from '@react-three/drei';

const NumberComponent = ({ position, number }) => {
  return (
    <Text
      position={position}
      fontSize={1.2} 
      color="black"
      anchorX="center" // Center the text horizontally
      anchorY="middle" // Center the text vertically
    >
      {number}
    </Text>
  );
};

export default NumberComponent;