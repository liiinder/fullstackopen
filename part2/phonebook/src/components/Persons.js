import React from 'react'

const Persons = ({persons, filter}) => {
    const personsToShow = (filter === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
    <ul>
        { personsToShow.map(person => 
            <li key={person.id}>{person.name}: {person.number}</li>
        )}
    </ul>
)}

export default Persons