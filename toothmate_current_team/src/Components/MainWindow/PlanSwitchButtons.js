import '../../StyleSheets/MainWindow/SubmitButton.css';
import '../../StyleSheets/MainWindow/BasePlanButton.css'
import '../../StyleSheets/MainWindow/TreatmentPlanButton.css'
import '../../StyleSheets/MainWindow/PeriPlanButton.css'

function PlanSwitchButtons(props) {
    const { handleContentChange } = props
    return (
        <>
            <div className="grid-layout">
                <div className="baseplan-button-container">
                    <button className="baseplan-button" onClick={() => handleContentChange('contentBase')}>B</button>
                </div>
            </div>
            <div className="grid-layout">
                <div className="treatmentplan-button-container">
                    <button className="treatmentplan-button" onClick={() => handleContentChange('contentTreatment')}>T</button>
                </div>
            </div>
            <div className="grid-layout">
                <div className="periplan-button-container">
                    <button className="periplan-button" onClick={() => handleContentChange('contentPeri')}>Peri</button>
                </div>
            </div>
        </>
    );
}

export default PlanSwitchButtons;