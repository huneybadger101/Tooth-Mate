import React from 'react';
import { Text } from '@react-three/drei';

const NumberComponent = ({ position, number }) => {
  return (
    <Text
      position={position}
      fontSize={1.2} // Adjust the font size as needed
      color="black" // Text color
      anchorX="center" // Center the text horizontally
      anchorY="middle" // Center the text vertically
    >
      {number}
    </Text>
  );
};

export default NumberComponent;