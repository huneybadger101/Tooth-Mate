import '../../StyleSheets/MainWindow/NotesField.css';
//import '../../StyleSheets/LayoutStyles.css';
//This field is for History and To Do List
function NotesField() {
    return (
        <div className='GridLayout'>
            <div className="NotesFieldContainer">
                <form className="NotesField">
                    <label> History/ToDo
                        <br></br><input type="text" value="notes..." className="Notes"/>
                    </label>
                    <br></br>
                    <input type="button" value="History" className="HistoryButton"/>
                    <input type="button" value="To Do" className="TodoButton" />
                </form>
            </div>
        </div>
    )
}

export default NotesField;