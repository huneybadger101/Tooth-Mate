import './StyleSheets/SubmitCancelButtonStyles.css';

function SubmitCancelButtons() {
    return (
        <>
            <div className="submit-cancel-buttons-container">
                <button type="button" className="submit-button">Submit</button>
                <button type="button" className="cancel-button">Cancel</button>
            </div>
        </>
    );
}

export default SubmitCancelButtons;