import React from 'react'

const Note = ({ note, toggleImportance }) => {
    // const label = note.important
    //     ? 'make not important' : 'make important'

    return (
        <li className='note'>
            <input onClick={toggleImportance} type="checkbox" id={note.id}
            checked={note.important} readOnly
            />
            {note.content + " " + note.id}
            {/* <button onClick={toggleImportance}>{label}</button> */}
        </li>
    )
}

export default Note