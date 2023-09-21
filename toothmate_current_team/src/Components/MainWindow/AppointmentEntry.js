import "../../StyleSheets/MainWindow/AppointmentEntry.css";

function EntryField(){
    return (
        <>
 <div className="entry-field-container">
            <form className="diagnoses-text-area" id="diagnoses">
                <textarea type="text" placeholder="NHI" rows="11"/>
                 {/* Add the input field */}
                 <button type="submit" > Submit </button>
                 <button type="submit"> Cancel</button>
            </form>
        </div>
        </>);
}
export default EntryField;