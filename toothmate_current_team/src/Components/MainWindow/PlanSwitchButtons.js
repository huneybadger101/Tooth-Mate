
import '../../StyleSheets/MainWindow/PlanSwitchButtons.css'


function PlanSwitchButtons(props) {
    const { handleContentChange } = props;

    return (
        <div className="plan-switch-container">
                    <button onClick={() => handleContentChange('contentBase')}>Current</button>
                    <button onClick={() => handleContentChange('contentTreatment')}>Treatment</button>
                    <button onClick={() => handleContentChange('contentPeri')}>Periodontal</button>
        </div>
    );
}

export default PlanSwitchButtons;