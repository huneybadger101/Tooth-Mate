import '../../StyleSheets/MainWindow/PatientWarning.css';

function PatientWarning({patientData}) {
    const patientInfo = patientData && patientData.info && patientData.info[0];
    const otherInfo = patientData && patientData.otherInfo && patientData.otherInfo[0];

    console.log(patientInfo);
    return (
        <div className="grid-layout">
            <div className="patient-warning-container">
                <form>
                    <label> {patientInfo.salutation+patientInfo.first_name+" "+patientInfo.last_name+"("+otherInfo.nhi_c+")"}
                        <br/>
                        <a>{otherInfo.allergies_c}</a>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default PatientWarning;