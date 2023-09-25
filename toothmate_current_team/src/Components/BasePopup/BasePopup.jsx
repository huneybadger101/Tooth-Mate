import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './StyleSheets/BasePopupStyles.css';
import BaseModel from './BaseModel';
import BaseHistory from './BaseHistory';

function BasePopup({ toothUrl, onClose }) {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isRed, setIsRed] = useState(false);
    const handleCloseClick = () => {
        //setPopupVisible(false);
        onClose();
        setIsRed(false);
    }

    return (
        <>
        {/*<button onClick={() => setPopupVisible(true)}>BasePopup</button>*/}
            {/* && works the same as if statement in jsx*/}
            {/*isPopupVisible && (*/}
                <div className="base-popup-container">
                    <Draggable handle=".handle">
                        <div className="base-popup-content">
                            {/* Draggable Handles Start*/}
                            <div className="handle handle-top"></div>
                            <div className="handle handle-bottom"></div>
                            <div className="handle handle-right"></div>
                            <div className="handle handle-left"></div>
                            {/* Draggable Handles End*/}
                            <p>Peridontal View - Toothname</p>
                            <div className="base-popup-components">
                                <BaseModel toothUrl={toothUrl}/>
                                <div className="base-text-content">
                                    <BaseHistory />
                                </div>
                            </div>
                            <img src={isRed ? "icons/x-square-red.svg" : "icons/x-square-black.svg"} alt="Close Icon" className="close"
                                onClick={() => handleCloseClick()}
                                onMouseEnter={() => setIsRed(true)}
                                onMouseLeave={() => setIsRed(false)} />
                        </div>
                    </Draggable>
                </div>
            {/*( )*/}

        </>
    );
}

export default BasePopup;