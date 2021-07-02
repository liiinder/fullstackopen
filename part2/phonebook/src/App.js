import React, { useState } from 'react'

const Person = ({name, number}) => {
    return (
        <li>{name}: {number}</li>
    )
}
 
const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1},
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        { name: 'Dan Abramov', number: '12-43-234345', id: 3},
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter] = useState ('')

    const personsToShow = (newFilter === '')
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    const addName = (event) => {
        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to the phonebook`)
        }
        else if (newName === '') {
            alert(`You have to enter a name`)
        }
        else if (newNumber === '') {
            alert('You have to enter a number')
        }
        else {
            event.preventDefault()
            const nameObject = {
                name: newName,
                number: newNumber,
                id: persons.length + 1
            }
            setPersons(persons.concat(nameObject))
            setNewName('')
            setNewNumber('')
        } 
    }

    const handleAddName = (event) => {
        setNewName(event.target.value)
    }

    const handleAddNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            filter shown with <input
                value={newFilter}
                onChange={handleFilter}
            />
            <form onSubmit={addName}>
                <div>
                <h2>Add new entry</h2>
                name: <input 
                    value={newName}
                    onChange={handleAddName}
                />
                <br />
                number: <input
                    value={newNumber}
                    onChange={handleAddNumber}
                />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
            {personsToShow.map(person =>
                <Person key={person.id} name={person.name} number={person.number}/>
            )}
            </ul>
        </div>
    )
}

export default App