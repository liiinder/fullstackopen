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
    console.log(props);
    console.log('test');
    let part = props.parts.map((part, index) => <Part key={index} name={part.name} exercises={part.exercises}/>);

    return part
}

const Total = (props) => {
    let sum = props.exercises.reduce((a, b) => {
        return a + b;
    });

    return (
        <div>
            <p>Number of exercises: {sum}</p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header course={course} />
            <Content parts={[part1, part2, part3]} />
            <Total exercises={[part1.exercises, part2.exercises, part3.exercises]}/>
        </div>
    )
}

export default App