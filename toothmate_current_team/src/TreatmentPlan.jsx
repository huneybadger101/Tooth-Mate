import React, { useState } from 'react';
import TopHeaderToothName from "./Components/PopupPage/TopHeaderToothName"
import IndividualModel from "./Components/PopupPage/IndividualModel"
import UmbrellaTreatment from "./Components/PopupPage/UmbrellaTreatment"
import './TreatmentPlanStyles.css'
import SealOption from "./Components/PopupPage/SealOption"
import TreatmentSummary from './Components/PopupPage/TreatmentSummary';

const TreatmentPlan = (props) => {

    const [surfaceOrder, setSurfaceOrder] = useState([]);
    const [treatmentList, settreatmentList] = useState([]);

    const handleSurfaceClick = (char) => {
        // if character is already selected, remove it
        if (surfaceOrder.includes(char)) {
            setSurfaceOrder(prevOrder => prevOrder.filter(item => item !== char));
        } else {
            // otherwise, append it to the list
            setSurfaceOrder(prevOrder => [...prevOrder, char]);
        }
    }

    const handleDeleteTreatment = (index) => {
        const newTreatments = treatmentList.slice();
        newTreatments.splice(index, 1);
        settreatmentList(newTreatments);
    };

    const handleAddToList = () => {
        setSurfaceOrder([])
        const joinedOrder = surfaceOrder.join('');
        if (joinedOrder.trim() !== "") {
            settreatmentList(prevOrder => [...prevOrder, joinedOrder]);
        }
    
        console.log(treatmentList);
    }
    

    return(
        <div className="App">
            <TopHeaderToothName/>
            <div className="planningContainer">
                <IndividualModel toothUrl={props.toothUrl} /> 
                <UmbrellaTreatment/>
                <SealOption handleButtonClick={handleSurfaceClick} buttonOrder={surfaceOrder} handleAddToList={handleAddToList}/>
                <TreatmentSummary treatmentList={treatmentList} onDelete={handleDeleteTreatment}/>
            </div>
        </div>
    )
}

export default TreatmentPlan;
