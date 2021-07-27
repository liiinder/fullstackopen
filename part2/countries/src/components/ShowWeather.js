import React from 'react'

const ShowWeather = ({weather}) => {
    if (weather.length > 1) {
        return (
            <div>
                <h3>Weather in {weather.request.query}</h3>
                <b>temperature: </b> {weather.current.temperature}°C
                <br/>
                <img src={weather.current.weather_icons} alt='weather' />
                <br/>
                <b>wind: </b> {weather.current.wind_speed} m/s direction {weather.current.wind_dir}
            </div>
        )
    }
    return <></>
}

export default ShowWeather