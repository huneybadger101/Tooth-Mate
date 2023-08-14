import '../../StyleSheets/MainWindow/NotesField.css';
//import '../../StyleSheets/LayoutStyles.css';
//This field is for History and To Do List
function NotesField() {
    return (
        <div className="grid-layout">
            <div className="notes-field-container">
                <form className="notes-field ">
                    <label> History/ToDo
                        <br></br><input type="text" value="notes..." className="notes"/>
                    </label>
                    <br></br>
                    <input type="button" value="History" className="history-button"/>
                    <input type="button" value="To Do" className="todo-button" />
                </form>
            </div>
        </div>
    )
}

export default NotesField;