
import '../../StyleSheets/MainWindow/BasePlanButton.css'


function PlanSwitchButtons(props) {
    const { handleContentChange } = props
    return (
        <div className="planSwitchContainer">


                    <button className="baseplan-button" onClick={() => handleContentChange('contentBase')}>B</button>




                    <button className="treatmentplan-button" onClick={() => handleContentChange('contentTreatment')}>T</button>



                    <button className="periplan-button" onClick={() => handleContentChange('contentPeri')}>Peri</button>


        </div>
    );
}

export default PlanSwitchButtons;