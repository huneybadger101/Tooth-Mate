import '../../StyleSheets/MainWindow/TeethModel.css';
import Tooth from './Tooth.js';
import PeriPopup from '../PeridontalPopup/PeriPopup';

/**
 * This is an empty container to house the 3D Model.
 * 
 * @returns Teeth Model
 */
function TeethModel() {
    return (
        <div className='grid-layout'>
            <div className="teeth-model-container">
                {null}
                <Tooth />
                <PeriPopup />
            </div>
        </div>
    );
}

export default TeethModel;