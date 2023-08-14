import React from 'react';
import './StylesSheets/TreatmentSummaryStyles.css'

const TreatmentSummary = ({treatmentList, onDelete}) => {

    const handleDelete = (index) => {
        if(onDelete) {
            onDelete(index);
        }
    };

    return (
        <div className="TreatmentSummaryContainer">
            <a>Treatment Summary</a>
            <ul>
                {treatmentList.map((treatment, index) => (
                    <li key={index}>
                        {treatment} 
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TreatmentSummary;
