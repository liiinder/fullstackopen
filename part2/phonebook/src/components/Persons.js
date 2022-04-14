import React from 'react'

const Persons = ({persons, filter, onClick}) => {
    const personsToShow = (filter === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
    <ul>
        { personsToShow.map(person => 
            <li key={person.id}>
                {person.id}: {person.name}: {person.number}
                <button id={person.id} onClick={onClick}>Delete</button>
            </li>
        )}
    </ul>
)}

export default Persons