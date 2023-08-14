import '../../StyleSheets/MainWindow/CancelButton.css';

function CancelButton() {
    return (
        <div className='grid-layout'>
            <div className="cancel-button-container">
                <button type='button' className="cancel-button">Cancel</button>
            </div>
        </div>
    );
}

export default CancelButton;