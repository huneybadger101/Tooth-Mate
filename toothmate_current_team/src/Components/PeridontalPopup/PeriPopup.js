import React, { useState } from 'react';
import Draggable from 'react-draggable';
import '../../StyleSheets/PeridontalPopup/PeriPopup.css';

function PeriPopup() {
    const [isPopupVisible, setPopupVisible] = useState(false);

    return (
        <>
            <button onClick={() => setPopupVisible(true)}>Peri Chart Tooth</button>

            {/* && works the same as if statement in jsx*/}
            {isPopupVisible && (
                <div className="peri-popup-container">
                    <Draggable>
                        <div className="peri-popup-content">
                            <p>Peridontal View - Toothname</p>
                            <div className="peri-model">Peri Model</div>
                            <div className="peri-info">Peri History</div>
                            <div className="peri-history">Peri Info</div>
                            <img src='icons/x-square.svg' alt="Close Icon" onClick={() => setPopupVisible(false)} className='close' />
                        </div>
                    </Draggable>
                </div>
            )}

        </>
    );
}

export default PeriPopup;