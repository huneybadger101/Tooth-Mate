import React, { useState } from 'react';
import '../../StyleSheets/PeridontalPopup/PeriPopup.css';

function PeriPopup() {
    const [isPopupVisible, setPopupVisible] = useState(false);

    return (
        <>
            <button onClick={() => setPopupVisible(true)}>Peri Chart Tooth</button>

            {/* && works the same as if statement in jsx*/}
            {isPopupVisible && (
                <div className="PeriPopupContainer">
                    <div className="PeriPopupContent">
                        <p>Content</p>
                        <button onClick={() => setPopupVisible(false)}>Close</button>
                    </div>
                </div>
            )}

        </>
    );
}

export default PeriPopup;