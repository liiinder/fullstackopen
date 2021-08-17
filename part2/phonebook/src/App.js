import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/Persons'
 
const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter] = useState ('')

    const handleAddName = (event) => setNewName(event.target.value)
    const handleAddNumber = (event) => setNewNumber(event.target.value)
    const handleFilter = (event) => setFilter(event.target.value)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to the phonebook`)
        }
        else {
            const newPerson = {
                name: newName,
                number: newNumber,
                id: persons[persons.length - 1].id + 1
            }
            personService
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const removePerson = event => {
        event.preventDefault()
        const soonRemoved = persons.find(person => person.id.toString() === event.target.id)
        const deleted = personService.remove(soonRemoved)
        if (deleted) {
            setPersons(persons.filter(x => x.id !== soonRemoved.id))
        }
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
                onClick={removePerson}
            />
        </div>
    )
}

export default App