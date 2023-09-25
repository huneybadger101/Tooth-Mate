import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import TopHeaderToothName from "./TopHeaderToothName"
import IndividualModel from "./IndividualModel"
import UmbrellaTreatment from "./UmbrellaTreatment"
import './StyleSheets/TreatmentPopupStyles.css'
import SealOption from "./SealOption"
import TreatmentSummary from './TreatmentSummary';
import SubmitCancelButtons from './SubmitCancelButtons';

function TreatmentPopup({ toothUrl, onClose, setTreatmentTodo, treatmentTodo, setshowTreatmentPopup }) {
    const [surfaceOrder, setSurfaceOrder] = useState([]);
    const [treatmentList, settreatmentList] = useState([]);
    const [isRed, setIsRed] = useState(false);
    const [option, setOption]= useState([])
    
    useEffect(()=>{
        if(treatmentTodo[toothUrl]){
            console.log(treatmentTodo[toothUrl]);

            settreatmentList(treatmentTodo[toothUrl].TreatmentSummary)
        }
    },[treatmentTodo])
    

    const handleCloseClick = () => {
        onClose();
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
        setOption([])
        const formattedSurfaceOrder = surfaceOrder.length ? `(${surfaceOrder.join('')})` : '';
        const joinedOrder = `${option.join(', ')} ${formattedSurfaceOrder}`.trim();
        if (joinedOrder.trim() !== "") {
            settreatmentList(prevOrder => [...prevOrder, joinedOrder]);
        }

        console.log(treatmentList);
    }


    return (
        
                <div className="treatment-popup-container">
                    <Draggable handle=".handle">
                        <div className="treatment-popup-content">
                            {/* Draggable Handles Start*/}
                            <div className="handle handle-top"></div>
                            <div className="handle handle-bottom"></div>
                            <div className="handle handle-right"></div>
                            <div className="handle handle-left"></div>
                            {/* Draggable Handles End*/}
                            <TopHeaderToothName url={toothUrl}/>
                            <div className="content-container">
                                <IndividualModel  toothUrl={toothUrl}/>
                                <UmbrellaTreatment option={option} setOption={setOption}/>
                                <SealOption handleButtonClick={handleSurfaceClick} buttonOrder={surfaceOrder} handleAddToList={handleAddToList} url={toothUrl}/>
                                <TreatmentSummary treatmentList={treatmentList} onDelete={handleDeleteTreatment} />
                                <SubmitCancelButtons settreatmentList={settreatmentList} setshowTreatmentPopup={setshowTreatmentPopup} treatmentList={treatmentList} option={option} setTreatmentTodo={setTreatmentTodo} url={toothUrl}/>
                            </div>
                            <img src={isRed ? "icons/x-square-red.svg" : "icons/x-square-black.svg"} alt="Close Icon" className="close"
                                onClick={() => handleCloseClick()}
                                onMouseEnter={() => setIsRed(true)}
                                onMouseLeave={() => setIsRed(false)} />                            </div>
                    </Draggable>
                </div>
            
    );
}

export default TreatmentPopup