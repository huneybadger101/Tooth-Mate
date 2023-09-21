import React, { useState } from 'react';
import Draggable from 'react-draggable';
import SubmitCancelButtons from './SubmitCancelButtons';
import '../../StyleSheets/PeridontalPopup/PeriPopup.css';

function PeriPopup() {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isRed, setIsRed] = useState(false);
    const handleCloseClick = () => {
        setPopupVisible(false);
        setIsRed(false);
    }

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
                            <div className="peri-popup-components">
                                <div className="peri-model">Peri Model</div>
                                <div className="peri-text-content">
                                    <div className="peri-info">Peri Info</div>
                                    <div className="peri-history">Peri History</div>
                                </div>
                                <SubmitCancelButtons />
                            </div>
                            <img src={isRed ? "icons/x-square-red.svg" : "icons/x-square-black.svg"} alt="Close Icon" className="close"
                                onClick={() => handleCloseClick()}
                                onMouseEnter={() => setIsRed(true)}
                                onMouseLeave={() => setIsRed(false)} />
                        </div>
                    </Draggable>
                </div>
            )}

        </>
    );
}

export default PeriPopup;