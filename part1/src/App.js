import React from 'react';

const Header = (props) => {
    return <h1>Course: {props.course}</h1>
}

const Part = (props) => {
    return (
        <div>
            <p>{props.name} - {props.exercises} exercises</p>
        </div>
    )
}

const Content = (props) => {
    let part = props.parts.map((part, index) => <Part key={index} name={part.name} exercises={part.exercises}/>);

    return part
}

const Total = (props) => {
    let sum = 0;
    props.parts.map((part) => sum += part.exercises)

    return (
        <div>
            <p>Number of exercises: {sum}</p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }]

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts}/>
        </div>
    )
}

export default App