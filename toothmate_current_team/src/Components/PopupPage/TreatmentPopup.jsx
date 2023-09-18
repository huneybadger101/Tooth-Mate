import React, { useState } from 'react';
import Draggable from 'react-draggable';
import TopHeaderToothName from "./TopHeaderToothName"
import IndividualModel from "./IndividualModel"
import UmbrellaTreatment from "./UmbrellaTreatment"
import './StyleSheets/TreatmentPopupStyles.css'
import SealOption from "./SealOption"
import TreatmentSummary from './TreatmentSummary';
import SubmitCancelButtons from './SubmitCancelButtons';

function TreatmentPopup({ toothUrl }) {
    const [surfaceOrder, setSurfaceOrder] = useState([]);
    const [treatmentList, settreatmentList] = useState([]);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isRed, setIsRed] = useState(false);

    const handleCloseClick = () => {
        setPopupVisible(false);
        setIsRed(false);
    }


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
                                <IndividualModel  toothUrl={toothUrl}/>
                                <UmbrellaTreatment />
                                <SealOption handleButtonClick={handleSurfaceClick} buttonOrder={surfaceOrder} handleAddToList={handleAddToList} />
                                <TreatmentSummary treatmentList={treatmentList} onDelete={handleDeleteTreatment} />
                                <SubmitCancelButtons />
                            </div>
                            <img src={isRed ? "icons/x-square-red.svg" : "icons/x-square-black.svg"} alt="Close Icon" className="close"
                                onClick={() => handleCloseClick()}
                                onMouseEnter={() => setIsRed(true)}
                                onMouseLeave={() => setIsRed(false)} />                            </div>
                    </Draggable>
                </div>
            )}

        </>
    );
}

export default TreatmentPopup