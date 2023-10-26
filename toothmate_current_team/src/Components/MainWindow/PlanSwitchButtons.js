import React, { useState } from 'react';
import '../../StyleSheets/MainWindow/PlanSwitchButtons.css';

function PlanSwitchButtons(props) {
    const { handleContentChange } = props;
    const [selectedPlan, setSelectedPlan] = useState('contentBase');

    const handlePlanChangeAndUpdateSelection = (plan) => { 
        handleContentChange(plan); // original handler
        setSelectedPlan(plan); // Used to highlight the selected plan button
    };

    return (
        <div className="plan-switch-container">
            <button
                onClick={() => handlePlanChangeAndUpdateSelection('contentBase')}
                className={selectedPlan === 'contentBase' ? 'selected' : ''}
            >
                Current
            </button>
            <button
                onClick={() => handlePlanChangeAndUpdateSelection('contentTreatment')}
                className={selectedPlan === 'contentTreatment' ? 'selected' : ''}
            >
                Treatment
            </button>
            <button
                onClick={() => handlePlanChangeAndUpdateSelection('contentPeri')}
                className={selectedPlan === 'contentPeri' ? 'selected' : ''}
            >
                Periodontal
            </button>
        </div>
    );
}

export default PlanSwitchButtons;
