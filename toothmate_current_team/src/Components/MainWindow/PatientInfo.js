import '../../StyleSheets/MainWindow/PatientInfo.css';

function PatientInfo({patientData}) {
    //To to display the information just go to have a look at console in browser then have a look in json
    /*
        then chose the info that u want to pull for example the first_name it in the patientInfo so
        we will use any tag for example <a>{patientInfo.first_name}</a>
    */
    const patientInfo = patientData && patientData.info && patientData.info[0];
    const otherInfo = patientData && patientData.otherInfo && patientData.otherInfo[0];
    return (
        <div className="grid-layout">
            <div className="patient-info-container">
                <form>
                    <label> Patient Info
                        <input tupe="text" value="info..." className="info-field" />
                    </label>
                </form>
            </div>
        </div>
    );
}

export default PatientInfo;