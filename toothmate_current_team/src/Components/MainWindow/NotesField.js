//This field is for History and To Do List
function NotesField() {
    return (

        <div style={{
            width: '100%',
            height: '100%',
            background: 'white',
            border: '1px solid black',
        }}>
            <form>
                <label> History/ToDo
                    <input tupe="text" value="notes..."
                        style={{
                            width: '98%',
                            border: 'none',
                            height: '100%',
                        }} />
                </label>
                <br></br>
                <input type="button" value="History" style={{
                    verticalAlign: 'baseline',
                    margin: '1%'
                }} />
                <input type="button" value="To Do" style={{
                     verticalAlign: 'baseline',
                     margin: '1%'
                }} />
            </form>
        </div>
    )
}

export default NotesField;