import "../../StyleSheets/MainWindow/AppointmentEntry.css";

function EntryField({setNote, note}){
    return (
        <>
 <div className="entry-field-container">
            <form className="diagnoses-text-area" id="diagnoses">
                <textarea type="text" placeholder="Notes" rows="13" value={note} onChange={(e) => setNote(e.target.value)}/>
                 {/* Add the input field */}
            </form>
        </div>
        </>);
}
export default EntryField;