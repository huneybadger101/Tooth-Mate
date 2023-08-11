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
                <div className="PeriPopupContainer">
                    <Draggable>
                        <div className="PeriPopupContent">
                            <p>Peridontal View - Toothname</p>
                            <div className="popup">
                                <div className="flex-item-left">
                                    <div className="PeriModel">Peri Model</div>
                                </div>
                                <div className="flex-item-right">
                                    <div className="PeriInfo">Peri History</div>
                                    <div className="PeriHistory">Peri Info</div>
                                </div>
                            </div>
                            <img src='icons/x-square.svg' alt="Close Icon" onClick={() => setPopupVisible(false)} className='Close' />
                        </div>
                    </Draggable>
                </div>
            )}

        </>
    );
}

export default PeriPopup;