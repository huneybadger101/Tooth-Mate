import Tooth from './Tooth.js';

/**
 * This is an empty container to house the 3D Model.
 * 
 * @returns Teeth Model
 */
function TeethModel() {
    return (
        <div
            style={{
              //  width: '800px',
             //   height: '600px',
             width: '100%',
             height: '100%',
                border: '1px solid black',
                background: 'blue'
            }}>
            {null}
            <Tooth />
        </div>

    );
}

export default TeethModel;