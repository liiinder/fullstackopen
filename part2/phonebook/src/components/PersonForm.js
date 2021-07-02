import React from 'react'

const PersonForm = ({ onFormSubmit, name, onNameChange, number, onNumberChange }) => (
    <form onSubmit={onFormSubmit}>
        <div>
            name: <input 
                value={name}
                onChange={onNameChange}
            />
            <br />
            number: <input
                value={number}
                onChange={onNumberChange}
            />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm