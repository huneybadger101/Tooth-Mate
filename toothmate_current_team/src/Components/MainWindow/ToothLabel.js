import { Html } from '@react-three/drei';
import React from 'react';

const ToothLabel = ({ position, number }) => (
    <Html position={position} center>
        <div style={{color: 'black', fontSize: '12px'}}>
            {number}
        </div>
    </Html>
);

export { ToothLabel };