import '../../StyleSheets/MainWindow/PatientWarning.css';

function PatientWarning({patientData}) {
    const patientInfo = patientData && patientData.info && patientData.info[0];
    const otherInfo = patientData && patientData.otherInfo && patientData.otherInfo[0];

    console.log(patientInfo);
    return (

            <div className="patient-warning-container">
                <form>
                    <label> {patientInfo !="N" && patientInfo ? patientInfo.salutation+patientInfo.first_name+" "+patientInfo.last_name:"Please Search the patient"}{otherInfo?"("+otherInfo.nhi_c+")":""}
                        <br/>
                        <a>{otherInfo?otherInfo.allergies_c:""}</a>
                    </label>
                </form>
            </div>

    )
}

export default PatientWarning;