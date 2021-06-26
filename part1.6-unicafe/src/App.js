import React, { useState } from "react";

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistic = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
    if (good === 0 && neutral === 0 && bad === 0){
        return (
            <p>No feedback given</p>
        )
    }

    const all = good + neutral + bad
    const avg = (good - bad)/all
    const positive = (good/all)*100

    return (
        <div>
            <h2>Statistics</h2>
            <table>
                <tbody>
                <Statistic text="Good" value={good} />
                <Statistic text="Neutral" value={neutral} />
                <Statistic text="Bad" value={bad} />
                <Statistic text="All" value={all} />
                <Statistic text="Average" value={avg} />
                <Statistic text="Positive" value={positive + "%"} />
                </tbody>
            </table>
        </div>
    )
}

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
