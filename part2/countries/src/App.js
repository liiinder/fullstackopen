import React, { useState, useEffect} from 'react'
import axios from 'axios'
import ShowCountry from './components/ShowCountry'
import ListCountries from './components/ListCountries'

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ filter, setFilter ] = useState('')

    const handleFilter = (event) => setFilter(event.target.value)

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }

    useEffect(hook, [])

    const countriesToShow = (filter === '')
        ? countries
        : countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            Find countries <input value={filter} onChange={handleFilter} />
            <ListCountries countries={countriesToShow} handleFilter={handleFilter}/>
            {countriesToShow.length === 1 ? <ShowCountry countriesToShow={countriesToShow} /> : <></>}
        </div>
    )
}

export default App