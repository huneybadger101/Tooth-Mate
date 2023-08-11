import '../../StyleSheets/MainWindow/CancelButton.css';

function CancelButton() {
    return (
        <div className='GridLayout'>
            <div className="CancelButtonContainer">
                <button type='button' className="CancelButton">Cancel</button>
            </div>
        </div>
    );
}

export default CancelButton;