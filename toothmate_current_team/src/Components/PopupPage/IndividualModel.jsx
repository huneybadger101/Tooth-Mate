import React, { useState, useCallback } from 'react';
import './StyleSheets/IndividualModelStyles.css';
import TreatmentPopup from './TreatmentPopup';

const IndividualModel = ({ toothUrl }) => {
    const [showTreatmentPopup, setshowTreatmentPopup] = useState(false);
    
    const handleToothDblClick = useCallback(() => {
        setshowTreatmentPopup(true);
    }, []);
    
    return (
        <div className="IndividualModel">
            <model-viewer
                src={toothUrl}
                alt="A 3D model of a tooth"
                auto-rotate
                camera-controls
                style={{ width: '100%', height: '400px' }}
                onDoubleClick={handleToothDblClick}
            ></model-viewer>
            
            {showTreatmentPopup && <TreatmentPopup toothUrl={toothUrl} onClose={() => setshowTreatmentPopup(false)} />}
        </div>
    );
};

export default IndividualModel;