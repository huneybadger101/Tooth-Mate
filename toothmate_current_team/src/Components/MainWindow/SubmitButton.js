import '../../StyleSheets/MainWindow/SubmitButton.css';

function SubmitButton({addRecord}) {
    return (

            <div className="submit-button-container">
            <button type="button" className="submit-button" onClick={()=>{addRecord()}}>Save</button>
            </div>

    );
}

export default SubmitButton;