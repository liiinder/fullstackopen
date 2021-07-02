import React, { useState } from 'react'

const Person = ({name}) => {
    return (
        <li>{name}</li>
    )
}
 
const App = () => {
    const [ persons, setPersons ] = useState([{ name: 'Arto Hellas', id: 1}]) 
    const [ newName, setNewName ] = useState('')

    const addName = (event) => {
        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to the phonebook`)
        }
        else {
            event.preventDefault()
            const nameObject = {
                name: newName,
                id: persons.length + 1
            }
            setPersons(persons.concat(nameObject))
            setNewName('')
        } 
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input 
                        value={newName}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
            {persons.map(person =>
                <Person key={person.id} name={person.name} />
            )}
            </ul>
            {/* <div>debug: {newName}</div> */}
        </div>
    )
}

export default App