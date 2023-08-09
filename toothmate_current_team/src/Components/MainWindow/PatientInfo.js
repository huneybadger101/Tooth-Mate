import '../../StyleSheets/MainWindow/PatientInfo.css';

function PatientInfo() {
    return (
        <div className='GridLayout'>
            <div className="PatientInfoContainer">
                <form>
                    <label> Patient Info
                        <input tupe="text" value="info..." className="InfoField" />
                    </label>
                </form>
            </div>
        </div>
    );
}

export default PatientInfo;