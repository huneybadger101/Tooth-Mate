import React, { useState } from 'react';
import Draggable from 'react-draggable';
import SubmitCancelButtons from './SubmitCancelButtons';
import './StyleSheets/PeriPopupStyles.css';
import PeriModel from './PeriModel';
import PeriInfo from './PeriInfo';
import PeriHistory from './PeriHistory';

function PeriPopup({ toothUrl, onClose }) {
    const [isRed, setIsRed] = useState(false);
    const handleCloseClick = () => {
        onClose();
        setIsRed(false);
    }

    return (
        <>
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
                                <PeriModel toothUrl={toothUrl}/>
                                <div className="peri-text-content">
                                    <PeriInfo />
                                    <PeriHistory />
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
        </>
    );
}

export default PeriPopup;