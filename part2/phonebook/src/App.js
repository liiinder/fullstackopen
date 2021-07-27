import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
 
const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter] = useState ('')

    const handleAddName = (event) => setNewName(event.target.value)
    const handleAddNumber = (event) => setNewNumber(event.target.value)
    const handleFilter = (event) => setFilter(event.target.value)

    const hook = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }

    useEffect(hook, [])


    const addPerson = (event) => {
        event.preventDefault()
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