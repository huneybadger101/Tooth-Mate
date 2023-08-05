import '../../StyleSheets/NotesField.css';

//This field is for History and To Do List
function NotesField() {
    return (
        <>
            <form className='NotesField'>
                <label> History/ToDo
                    <br></br><input type="text" value="notes..." className='notes' style={{
                            width: '98%',
                            border: 'none',
                            height: '100%',
                        }} />
                </label>
                <br></br>
                <input type="button" value="History" style={{
                    verticalAlign: 'baseline',
                    margin: '1%',
                    backgroundColor: '#efefef',
                    borderRadius: '5px',
                    borderWidth: '1px',
                }} />
                <input type="button" value="To Do" style={{
                     verticalAlign: 'baseline',
                     margin: '1%',
                    backgroundColor: '#efefef',
                    borderRadius: '5px',
                    borderWidth: '1px',
                }} />
            </form>
        </>
    )
}

export default NotesField;