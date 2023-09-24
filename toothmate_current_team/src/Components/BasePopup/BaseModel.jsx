import React, { useState, useCallback } from 'react';
import './StyleSheets/BasePopupStyles.css';
import BasePopup from './BasePopup';

const BaseModel = ({ toothUrl }) => {
    const [showBasePopup, setshowBasePopup] = useState(false);
    
    const handleToothDblClick = useCallback(() => {
        setshowBasePopup(true);
    }, []);
    
    return (
        <div className="base-model">
            <model-viewer
                src={toothUrl}
                alt="A 3D model of a tooth"
                auto-rotate
                camera-controls
                style={{ width: '100%', height: '400px' }}
                onDoubleClick={handleToothDblClick}
            ></model-viewer>
            
            {showBasePopup && <BasePopup toothUrl={toothUrl} onClose={() => setshowBasePopup(false)} />}
        </div>
    );
};

export default BaseModel;