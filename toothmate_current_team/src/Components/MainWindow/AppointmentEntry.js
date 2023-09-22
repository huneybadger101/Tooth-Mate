import "../../StyleSheets/MainWindow/AppointmentEntry.css";

function EntryField(){
    return (
        <>
 <div className="entry-field-container">
            <form className="diagnoses-text-area" id="diagnoses">
                <textarea type="text" placeholder="NHI" rows="13"/>
                 {/* Add the input field */}
            </form>
        </div>
        </>);
}
export default EntryField;