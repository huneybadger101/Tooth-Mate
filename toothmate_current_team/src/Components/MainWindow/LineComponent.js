import React from 'react';
import { Vector3, BufferGeometry, LineBasicMaterial, Line } from 'three';

const LineComponent = (props) => {
    const { orientation, y } = props; // y-coordinate for horizontal line, orientation to determine horizontal or vertical
    
    // Define the start and end points of the line
    let points;
    if (orientation === 'horizontal') {
        points = [
            new Vector3(-40, y, 0), // Start point for horizontal
            new Vector3(40, y, 0)  // End point for horizontal
        ];
    } else {
        points = [
            new Vector3(0, 20, 0), // Start point for vertical
            new Vector3(0, -20, 0) // End point for vertical
        ];
    }

    const geometry = new BufferGeometry().setFromPoints(points);
    const material = new LineBasicMaterial({ color: 0x0000ff, linewidth: 2, transparent: true, opacity: 0.9 })

    return (
        <line geometry={geometry} material={material} />
    );
};

export default LineComponent;
