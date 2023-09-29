import '../../StyleSheets/MainWindow/SubmitButton.css';

function SubmitButton({addRecord,save}) {
    return (

            <div className="submit-button-container">
            <button type="button" className="submit-button" onClick={()=>{addRecord()}}>{save?"Update":"Save"}</button>
            </div>

    );
}

export default SubmitButton;