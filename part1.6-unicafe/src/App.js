import React, { useState } from "react";

// const Display = (props) => {

// }

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistics = (props) => (
    <div>
        <h2>Statistics</h2>
        <p>Good: {props.good}</p>
        <p>Neutral: {props.neutral}</p>
        <p>Bad: {props.bad}</p>
    </div>
)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const increaseGood = () => setGood(good + 1)
    const increaseNeutral = () => setNeutral(neutral + 1)
    const increaseBad = () => setBad(bad + 1)

    return (
        <div>
            <h1>Give feedback</h1>
            <Button onClick={increaseGood} text='Good'/>
            <Button onClick={increaseNeutral} text='Neutral'/>
            <Button onClick={increaseBad} text='Bad'/>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App;
