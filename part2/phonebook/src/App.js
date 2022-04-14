import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/Persons'
 
const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter] = useState ('')
    const [ message, setMessage] = useState(null)

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
        const search = persons.find(person => person.name === newName)
        if (search) {
            window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
                search.number = newNumber;
                personService
                    .update(search)
                    .then(
                        setNewName(''),
                        setNewNumber(''),
                        setMessage(`Changed ${search.name} number`, 'message'),
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    )
        }
        else {
            const newPerson = {
                name: newName,
                number: newNumber,
                id: persons.length > 0 ? persons[persons.length - 1].id + 1 : 1
            }
            personService
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setMessage([
                        `Added ${newPerson.name}`,
                        'message'
                    ])
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
    }

    const removePerson = event => {
        event.preventDefault()
        const soonRemoved = persons.find(person => person.id.toString() === event.target.id)
        personService
            .remove(soonRemoved)
            .then(returned => {
                setPersons(persons.filter(x => x.id !== soonRemoved.id))
                setMessage([`Information about ${soonRemoved.name} is removed`, 'message'])
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
            .catch(error => {
                setMessage([`Information about ${soonRemoved.name} is already removed`, 'message error'])
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
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