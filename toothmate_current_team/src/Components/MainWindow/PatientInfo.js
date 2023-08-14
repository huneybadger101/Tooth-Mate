import '../../StyleSheets/MainWindow/PatientInfo.css';

function PatientInfo() {
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