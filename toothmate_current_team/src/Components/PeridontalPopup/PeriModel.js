import React, { useState, useCallback } from 'react';
import '../../StyleSheets/PeridontalPopup/PeriPopup.css';
import PeriPopup from './PeriPopup.js';

const PeriModel = ({ toothUrl }) => {
    const [showPeriPopup, setshowPeriPopup] = useState(false);
    
    const handleToothDblClick = useCallback(() => {
        setshowPeriPopup(true);
    }, []);
    
    return (
        <div className="peri-model">
            <model-viewer
                src={toothUrl}
                alt="A 3D model of a tooth"
                auto-rotate
                camera-controls
                style={{ width: '100%', height: '400px' }}
                onDoubleClick={handleToothDblClick}
            ></model-viewer>
            
            {showPeriPopup && <PeriPopup toothUrl={toothUrl} onClose={() => setshowPeriPopup(false)} />}
        </div>
    );
};

export default PeriModel;