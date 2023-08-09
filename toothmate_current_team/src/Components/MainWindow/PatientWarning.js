import '../../StyleSheets/MainWindow/PatientWarning.css';

function PatientWarning() {
    return (
        <div className="GridLayout">
            <div className="PatientWarningContainer">
                <form>
                    <label> "Name"
                        <input tupe="textarea" value="Name, NHI, allergies..." className="Warnings"/>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default PatientWarning;