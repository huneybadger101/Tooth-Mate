import React, { useState } from 'react';
import '../../StyleSheets/MainWindow/XrayHistory.css';

//This field is for History and To Do List
function XrayList({patientHistory}) {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

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
                <h3>XRay History</h3>
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

    const [activeContent, setActiveContent] = useState('contentHistory');  // This is the default content that will be set as active.

    const handleContentChange = (contentKey) => {
        setActiveContent(contentKey);
    };

    const contentMap = {
        contentHistory: history,
        
    };



    return (
        <div className="xray-container">
            <div className="notes-field-container">
                {contentMap[activeContent]()}
            </div>
            
            {isPopupOpen && selectedAppointment && 
                <AppointmentPopup appointment={selectedAppointment} onClose={() => setIsPopupOpen(false)} />
            }
        </div>
    );
    
}

export default XrayList;