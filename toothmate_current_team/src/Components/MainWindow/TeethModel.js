import React, { useState } from 'react';
import '../../StyleSheets/MainWindow/TeethModel.css';
import '../../StyleSheets/MainWindow/BasePlanButton.css';
import '../../StyleSheets/MainWindow/TreatmentPlanButton.css';
import '../../StyleSheets/MainWindow/PeriPlanButton.css';
import Tooth from './Tooth.js';
import PeriPopup from '../PeridontalPopup/PeriPopup';

/**
 * This is an empty container to house the 3D Model.
 * 
 * @returns Teeth Model
 */
function TeethModel() {
    const [activeContent, setActiveContent] = useState('contentBase');  // This is the default content that will be set as active.

    const handleContentChange = (contentKey) => {
        setActiveContent(contentKey);
    };

    const contentMap = {
        contentBase: <div><Tooth /></div>,
        contentTreatment: <div>Treatment Plan</div>,
        contentPeri: <div><PeriPopup /></div>,
    };

    return (
        <>
            <div className='grid-layout'>
                <div className="teeth-model-container" activeContent={activeContent} handleContentChange={handleContentChange}>
                    {contentMap[activeContent]}
                </div>
            </div>
            <div className="grid-layout">
                <div className="base-plan-button-container">
                    <button className="base-plan-button" onClick={() => handleContentChange('contentBase')}>B</button>
                </div>
            </div>
            <div className="grid-layout">
                <div className="treatmentplan-button-container">
                    <button className="treatmentplan-button" onClick={() => handleContentChange('contentTreatment')}>T</button>
                </div>
                <div className="grid-layout">
                    <div className="periplan-button-container">
                        <button className="periplan-button" onClick={() => handleContentChange('contentPeri')}>Peri</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeethModel;