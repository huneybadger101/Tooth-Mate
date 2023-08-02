import TopHeaderToothName from "./Components/PopupPage/TopHeaderToothName"
import IndividualModel from "./Components/PopupPage/IndividualModel"
import UmbrellaTreatment from "./Components/PopupPage/UmbrellaTreatment"
import './TreatmentPlanStyles.css'
import SealOption from "./Components/PopupPage/SealOption"

const TreatmentPlan=()=>{
    return(
        <div className="App">
            <TopHeaderToothName/>
            <div className="planningContainer">
                <IndividualModel/>
                <UmbrellaTreatment/>
                <SealOption/>
            </div>
        </div>
    )
}

export default TreatmentPlan