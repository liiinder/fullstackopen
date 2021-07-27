import React from 'react'

const ListCountries = ({countries, handleFilter}) => {
    if ( countries.length === 1 ) {
        return <></>
    }
    else if ( countries.length > 10 ) {
        return <p>Too many matches, specify another filter</p>
    }
    return (
        <div>
            <h3>Countries</h3>
            <ul>
                { countries.map(country => (
                        <li key={country.name}>
                            <button value={country.name} onClick={handleFilter}>{country.name}</button>
                        </li>
                    )
                )}
            </ul>
        </div>
)}

export default ListCountries