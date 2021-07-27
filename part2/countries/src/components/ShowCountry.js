import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ShowWeather from './ShowWeather'

const ShowCountry = ({countriesToShow}) => {
    const country = countriesToShow[0]

    const [ weather, setWeather ] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    
    useEffect(() => {
        axios
            .get(`
                http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [api_key, country])

    console.log(weather)

    return (
        <div>
            <h1>{country.name}</h1>
            <p>
                Capital: {country.capital}<br/>
                Population: {country.population}
            </p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt={`Flag of ${country.name}`} id='flag'/>
            <ShowWeather weather={weather} />
        </div>
    )
}

export default ShowCountry