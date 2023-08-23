import React, { useState } from 'react';
import '../../StyleSheets/MainWindow/TeethModel.css';
import Tooth from './Tooth.js';
import PeriPopup from '../PeridontalPopup/PeriPopup';

/**
 * This is an empty container to house the 3D Model.
 * 
 * @returns Teeth Model
 */
function TeethModel(props) {
    const {activeContent} = props

    const contentMap = {
        contentBase: <div><Tooth /></div>,
        contentTreatment: <div>Treatment Plan</div>,
        contentPeri: <div><PeriPopup /></div>,
    };

    return (
        <div>
            
            <div className='grid-layout'>
                <div className="teeth-model-container">
                    {contentMap[activeContent]}
                </div>
            </div>
        </div>
    );
}

export default TeethModel;