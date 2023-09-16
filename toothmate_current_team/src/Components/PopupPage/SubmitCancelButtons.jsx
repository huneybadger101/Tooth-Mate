import './StyleSheets/SubmitCancelButtonStyles.css';

function SubmitCancelButtons() {
    return (
        <>
            <div className="treatment-submit-cancel-buttons-container">
                <button type="button" className="treatment-submit-button">Submit</button>
                <button type="button" className="treatment-cancel-button">Cancel</button>
            </div>
        </>
    );
}

export default SubmitCancelButtons;