import React, { useState } from 'react';
import '../../StyleSheets/MainWindow/NotesField.css';
import TreatmentPopup from '../TreatmentPopup/TreatmentPopup';
//This field is for History and To Do List
function NotesField({patientHistory, treatmentTodo, setTreatmentTodo, showTreatmentPopup,setshowTreatmentPopup}){
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [url,setUrl] = useState(null)

    const handleCloseClick = (e) => {
        console.log("Close button clicked");
        e.stopPropagation(); 
        setIsPopupOpen(false);
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const AppointmentPopup = ({ appointment }) => {
        return (
            <div className="popup-background">
                <div className="popup-content">
                    <h2>Appointment Details</h2>
                    <p>Date: {formatDate(appointment.DateOfAppointment)}</p>
                    <p>Treatment Plan: {appointment.TreatmentPlan}</p>
                    <p>Diagnoses: {appointment.Diagnoses}</p>
                    <p>Notes: {appointment.Notes}</p>
                    <button onClick={handleCloseClick}>Close</button>
                </div>
            </div>
        )
    }

    const history = () => (
        <>
            <form className="notes-field">
                <h3>Patient History</h3>
                    <ul>
                        {patientHistory && patientHistory.map((info) => (
                            <li key={info.appointmentID} onClick={() => handleAppointmentClick(info)}>
                                {formatDate(info.DateOfAppointment) + " " + info.TreatmentPlan}
                            </li>
                        ))}
                    </ul>
            </form>
        </>
    )
    
    const handleAppointmentClick = (appointmentInfo) => {
        setSelectedAppointment(appointmentInfo);
        setIsPopupOpen(true);
    }

    const todo = () => {
        // Log to see the content of treatmentTodo
        const handleEditClick=(key)=>{
            setshowTreatmentPopup(true)
            setUrl(key)
        }
    
        // Check if treatmentTodo is an object
        if (treatmentTodo && typeof treatmentTodo === 'object') {
            return (
                <>
                    <form className="notes-field">
                        <h3>Treatment Plan todo</h3>
                        <ul>
                        {Object.entries(treatmentTodo).map(([key, value], index) => {
                        // Extract the name from the key
                        let name = key.split("/").pop().split(".")[0]; // This will give "Left_Lower_Canine"

                        // Replace underscores with spaces
                        name = name.split("_").join(" ")

                        return (
                            <li key={index} onClick={()=>handleEditClick(key)}>{name}</li>
                        );
                        })}
                        </ul>
                    </form>
                </>
            )
        }
    
        // Handle the case where treatmentTodo is not an object
        console.error('treatmentTodo is not an object', treatmentTodo);
        return null; // or return some fallback UI
    }
    const [activeContent, setActiveContent] = useState('contentHistory');  // This is the default content that will be set as active.

    const handleContentChange = (contentKey) => {
        setActiveContent(contentKey);
    };

    const contentMap = {
        contentHistory: history,
        contentToDo: todo,
    };



    return (
        <div className ="notes-field-wider-container">
            <div className="notes-field-container">
                {contentMap[activeContent]()}
                <input type="button" value="Patient History" className="history-button" onClick={() => handleContentChange('contentHistory')} />
                <input type="button" value="Treatment Plan" className="todo-button" onClick={() => handleContentChange('contentToDo')} />
            </div>
            {showTreatmentPopup && <TreatmentPopup toothUrl={url} onClose={() => setshowTreatmentPopup(false)} setshowTreatmentPopup={setshowTreatmentPopup}  setTreatmentTodo={setTreatmentTodo} treatmentTodo={treatmentTodo}/>}

            {isPopupOpen && selectedAppointment && 
                <AppointmentPopup appointment={selectedAppointment} onClose={() => setIsPopupOpen(false)} />
            }
        </div>
    );
    
}

export default NotesField;