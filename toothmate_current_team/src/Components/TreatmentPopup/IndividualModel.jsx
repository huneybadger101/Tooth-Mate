import React, { useState, useCallback } from 'react';
import './StyleSheets/IndividualModelStyles.css';

const IndividualModel = ({ toothUrl }) => {
    
    return (
        <div className="IndividualModel">
            <model-viewer
                src={toothUrl}
                alt="A 3D model of a tooth"
                auto-rotate
                camera-controls
                style={{ width: '100%', height: '400px' }}
            ></model-viewer>
        </div>
    );
};

export default IndividualModel;