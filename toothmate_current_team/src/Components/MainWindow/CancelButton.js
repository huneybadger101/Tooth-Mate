import '../../StyleSheets/MainWindow/CancelButton.css';
import { useNavigate } from 'react-router-dom';

function CancelButton() {
    const navigate = useNavigate();

    const handleClick=()=>{
        navigate(`/`);
        window.location.reload();
    }
    return (

            <div className="cancel-button-container">
                <button type='button' className="cancel-button" onClick={()=>handleClick()}>Reset</button>
            </div>

    );
}

export default CancelButton;