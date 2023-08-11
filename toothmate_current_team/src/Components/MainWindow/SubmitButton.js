import '../../StyleSheets/MainWindow/SubmitButton.css';

function SubmitButton() {
    return (
        <div className='GridLayout'>
            <div className="SubmitButtonContainer">
            <button type='button' className="SubmitButton">Submit</button>
            </div>
        </div>
    );
}

export default SubmitButton;