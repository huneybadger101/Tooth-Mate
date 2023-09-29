import React from 'react';
import './StyleSheets/BasePopupStyles.css';

const BaseHistory = ({patientHistory, toothUrl, formatDate}) => {
    return (
        <div className="base-history">
            <p>Base History</p>
            {patientHistory.map((historyItem, index) => {
                const treatmentSummary = historyItem.treatment_summary[toothUrl];
                
                // If treatmentSummary is an object
                if (treatmentSummary && typeof treatmentSummary === 'object') {
                    return (
                        <div key={index}>
                            <p>Date: {formatDate(historyItem.date)}</p>
                            {Object.entries(treatmentSummary).map(([key, value], i) => (
                                <p key={i}>{key}:{value.join(', ')}</p>
                            ))}
                            <hr/>
                        </div>
                    );
                } else return null;
            })}
        </div>
    );
};

export default BaseHistory;
