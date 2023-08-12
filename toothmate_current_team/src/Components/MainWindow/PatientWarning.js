import '../../StyleSheets/MainWindow/PatientWarning.css';

function PatientWarning() {
    return (
        <div className="grid-layout">
            <div className="patient-warning-container">
                <form>
                    <label> "Name"
                        <input tupe="textarea" value="Name, NHI, allergies..." className="warnings"/>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default PatientWarning;