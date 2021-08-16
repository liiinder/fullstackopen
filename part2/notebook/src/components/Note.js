import React from 'react'

const Note = ({ note, toggleImportance }) => {
    // const label = note.important
    //     ? 'make not important' : 'make important'

    return (
        <li>
            <input onClick={toggleImportance} type="checkbox" id={note.id}
            checked={note.important} readOnly
            />
            {note.content}
            {/* <button onClick={toggleImportance}>{label}</button> */}
        </li>
    )
}

export default Note