import '../../StyleSheets/MainWindow/PatientInfo.css';

function PatientInfo({ patientData }) {
    //To to display the information just go to have a look at console in browser then have a look in json
    /*
        then chose the info that u want to pull for example the first_name it in the patientInfo so
        we will use any tag for example <a>{patientInfo.first_name}</a>
    */
    const patientInfo = patientData && patientData.info && patientData.info[0];
    const otherInfo = patientData && patientData.otherInfo && patientData.otherInfo[0];
    console.log(otherInfo);
    return (

        <div className="patient-info-container">
            <h3>Patient Info</h3>
            <div className="info-field" >
                <p>Name: {patientInfo.salutation} {patientInfo.first_name} {patientInfo.last_name}</p>
                <p>Address: {patientInfo.primary_address_street}, {patientInfo.primary_address_city}, {patientInfo.primary_address_country}</p>
                <p>Contact: {patientInfo.phone_mobile}</p>
                <p>Medical History:</p>
                <p>Dental History:</p>
                <p>Oral Health Info:</p>
                <p>Medical History:</p>
                <p>Medical Preferences:</p>
            </div>
        </div>
    );
}

export default PatientInfo;