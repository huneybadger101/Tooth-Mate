import '../../StyleSheets/MainWindow/TeethModel.css';
import Tooth from './Tooth.js';

/**
 * This is an empty container to house the 3D Model.
 * 
 * @returns Teeth Model
 */
function TeethModel() {
    return (
        <div className='GridLayout'>
            <div className="TeethModelContainer">
                {null}
                <Tooth />
            </div>
        </div>

    );
}

export default TeethModel;