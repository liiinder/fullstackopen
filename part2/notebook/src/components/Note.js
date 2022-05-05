import React from 'react'

const Note = ({ note, toggleImportance }) => {

    return (
        <li className='note'>
            <input onClick={toggleImportance} type="checkbox" id={note.id}
            checked={note.important} readOnly
            />
            {note.content}
        </li>
    )
}

export default Note