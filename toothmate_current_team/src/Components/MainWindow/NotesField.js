import React, { useState } from 'react';
import '../../StyleSheets/MainWindow/NotesField.css';

//This field is for History and To Do List
function NotesField() {
    const history = () => (
        <>
            <form className="notes-field">
                <label>History
                    <br></br>
                    <input type="text" value="History notes..." className="notes" />
                </label>
            </form>
        </>
    )

    const todo = () => (
        <>
            <form className="notes-field">
                <label>To Do
                    <br></br>
                    <input type="text" value="Todo notes..." className="notes" />
                </label>
            </form>
        </>
    )
    const [activeContent, setActiveContent] = useState('contentHistory');  // This is the default content that will be set as active.

    const handleContentChange = (contentKey) => {
        setActiveContent(contentKey);
    };

    const contentMap = {
        contentHistory: history,
        contentToDo: todo,
    };



    return (
        <div className="grid-layout">
            <div className="notes-field-container">
                {contentMap[activeContent]()}
                <input type="button" value="History" className="history-button" onClick={() => handleContentChange('contentHistory')} />
                <input type="button" value="To Do" className="todo-button" onClick={() => handleContentChange('contentToDo')} />
            </div>
        </div>
    );
}

export default NotesField;