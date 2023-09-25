import '../../StyleSheets/MainWindow/PatientInfo.css';

function PatientInfo({ patientData, formatDate}) {
    //To to display the information just go to have a look at console in browser then have a look in json
    /*
        then chose the info that u want to pull for example the first_name it in the patientInfo so
        we will use any tag for example <a>{patientInfo.first_name}</a>
    */
    const patientInfo = patientData && patientData.info && patientData.info[0];
    const otherInfo = patientData && patientData.otherInfo && patientData.otherInfo[0];
    //console.log(otherInfo);
    return (

        <div className="patient-info-container">
            <h3>Patient Info</h3>
            <div className="info-field" >
                <p>Name: {patientInfo!=='N' && patientInfo?patientInfo.salutation+" "+patientInfo.first_name+" "+patientInfo.last_name:""}</p>
                <p>Date of Birth: {otherInfo? formatDate(otherInfo.dob_c):""}</p>
                <p>Address: {patientInfo?patientInfo.primary_address_street:""}, {patientInfo? patientInfo.primary_address_city:""}, {patientInfo? patientInfo.primary_address_country:""}</p>
                <p>Phone: {patientInfo? patientInfo.phone_mobile:""}</p>
            </div>
        </div>
    );
}

export default PatientInfo;