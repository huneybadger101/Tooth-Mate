import '../../StyleSheets/PeridontalPopup/SubmitCancelButtonStyles.css';

function SubmitCancelButtons() {
    return (
        <>
            <div className="peri-submit-cancel-buttons-container">
                <button type="button" className="peri-submit-button">Submit</button>
                <button type="button" className="peri-cancel-button">Cancel</button>
            </div>
        </>
    );
}

export default SubmitCancelButtons;