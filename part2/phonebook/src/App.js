import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
 
const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1},
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        { name: 'Dan Abramov', number: '12-43-234345', id: 3},
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter] = useState ('')

    const handleAddName = (event) => setNewName(event.target.value)
    const handleAddNumber = (event) => setNewNumber(event.target.value)
    const handleFilter = (event) => setFilter(event.target.value)

    const addPerson = (event) => {
        event.preventDefault()
        console.log('Kommer vi hit?');
        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to the phonebook`)
        }
        else {
            const newPerson = {
                name: newName,
                number: newNumber,
                id: persons.length + 1
            }
            setPersons(persons.concat(newPerson))
        } 
        setNewName('')
        setNewNumber('')
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter 
                filter={filter}
                onFilterChange={handleFilter}
            />
            <h2>Add new entry</h2>
            <PersonForm
                onFormSubmit={addPerson}
                name={newName}
                onNameChange={handleAddName}
                number={newNumber}
                onNumberChange={handleAddNumber}
            />
            <h2>Numbers</h2>
            <Persons
                persons={persons} 
                filter={filter}
            />
        </div>
    )
}

export default App