import React, { useState } from 'react';
import '../../StyleSheets/PeridontalPopup/PeriPopup.css';

function PeriPopup() {
    const [isPopupVisible, setPopupVisible] = useState(false);

    return (
        <>
            <button onClick={() => setPopupVisible(true)}>Peri Chart Tooth</button>

            {/* && works the same as if statement in jsx*/}
            {isPopupVisible && (
                <div className="peri-popup-container">
                    
                        <div className="peri-popup-content">
                            <p>Peridontal View - Toothname</p>
                            <div className="peri-model">Peri Model</div>
                            <div className="peri-history">Peri History</div>
                            <div className="peri-info">Peri Info</div>
                            <img src='icons/x-square.svg' alt="Close Icon" onClick={() => setPopupVisible(false)} className='close' />
                        </div>
                   
                </div>
            )}

        </>
    );
}

export default PeriPopup;