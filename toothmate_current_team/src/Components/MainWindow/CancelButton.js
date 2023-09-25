import '../../StyleSheets/MainWindow/CancelButton.css';
import { useNavigate } from 'react-router-dom';

function CancelButton({handleCancelChnage}) {

    return (

            <div className="cancel-button-container">
                <button type='button' className="cancel-button" onClick={()=>handleCancelChnage()}>Cancel</button>
            </div>

    );
}

export default CancelButton;