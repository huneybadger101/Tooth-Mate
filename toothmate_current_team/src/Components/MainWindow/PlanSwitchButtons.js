
import '../../StyleSheets/MainWindow/BasePlanButton.css'


function PlanSwitchButtons(props) {
    const { handleContentChange } = props
    return (
        <div className="planSwitchContainer">


                    <button className="baseplan-button" onClick={() => handleContentChange('contentBase')}>Current</button>




                    <button className="treatmentplan-button" onClick={() => handleContentChange('contentTreatment')}>Treatment</button>



                    <button className="periplan-button" onClick={() => handleContentChange('contentPeri')}>Periodontal</button>


        </div>
    );
}

export default PlanSwitchButtons;