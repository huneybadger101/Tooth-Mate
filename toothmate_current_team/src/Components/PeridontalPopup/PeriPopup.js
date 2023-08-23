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
                    <Draggable handle=".handle">
                        <div className="peri-popup-content">
                            {/* Draggable Handles Start*/}
                            <div className="handle handle-top"></div>
                            <div className="handle handle-bottom"></div>
                            <div className="handle handle-right"></div>
                            <div className="handle handle-left"></div>
                            {/* Draggable Handles End*/}
                            <p>Peridontal View - Toothname</p>
                            <div className="peri-model">Peri Model</div>
                            <div className="peri-history">Peri History</div>
                            <div className="peri-info">Peri Info</div>
                            <img src='icons/x-square.svg' alt="Close Icon" onClick={() => setPopupVisible(false)} className='close' />
                        </div>
                    </Draggable>
                </div>
            )}

        </>
    );
}

export default PeriPopup;