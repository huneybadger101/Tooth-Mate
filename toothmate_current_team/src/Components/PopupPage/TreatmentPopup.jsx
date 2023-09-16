import React, { useState } from 'react';
import Draggable from 'react-draggable';
import TopHeaderToothName from "./TopHeaderToothName"
import IndividualModel from "./IndividualModel"
import UmbrellaTreatment from "./UmbrellaTreatment"
import './StyleSheets/TreatmentPopupStyles.css'
import SealOption from "./SealOption"
import TreatmentSummary from './TreatmentSummary';
import SubmitCancelButtons from './SubmitCancelButtons';

function TreatmentPopup() {
    const [isPopupVisible, setPopupVisible] = useState(false);
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


    return (
        <>
            <button onClick={() => setPopupVisible(true)}>Treatment Tooth Popup</button>

            {isPopupVisible && (
                    <div className="treatment-popup-container">
                        <Draggable handle=".handle">
                            <div className="treatment-popup-content">
                                {/* Draggable Handles Start*/}
                                <div className="handle handle-top"></div>
                                <div className="handle handle-bottom"></div>
                                <div className="handle handle-right"></div>
                                <div className="handle handle-left"></div>
                                {/* Draggable Handles End*/}
                                <TopHeaderToothName />
                                <div className="content-container">
                                    <IndividualModel />
                                    <UmbrellaTreatment />
                                    <SealOption handleButtonClick={handleSurfaceClick} buttonOrder={surfaceOrder} handleAddToList={handleAddToList} />
                                    <TreatmentSummary treatmentList={treatmentList} onDelete={handleDeleteTreatment} />
                                    <div className="submit-cancel-button-container">
                                    <SubmitCancelButtons />
                                    </div>
                                </div>
                                <img src='icons/x-square.svg' alt="Close Icon" onClick={() => setPopupVisible(false)} className='close' />
                            </div>
                        </Draggable>
                    </div>
            )}

        </>
    );
}

export default TreatmentPopup