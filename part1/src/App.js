import React from 'react';

// const Part = (props) => (
//     <div>
//         <p>{props.part} - {props.exercises}</p>
//     </div>
// )

// const Content = (props) => {
//     return (
//         <div>
//             <Part part='Fundamentals of React' exercises='10'/>
//             <Part part='Using props to pass data' exercises='7'/>
//             <Part part='State of a component' exercises='14'/>
//         </div>
//     )
// }
const Header = (props) => (
    <div>
        <h1>Course: {props.course}</h1>
    </div>
)

const Content = (props) => (
    <div>
        <p>{props.part} - {props.exercises} exercises</p>
    </div>
)

const Total = (props) => (
    <div>
        <p>Number of exercises: {props.exercises}</p>
    </div>
)

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14
  
    return (
        <div>
            <Header course={course} />
            <Content part={part1} exercises={exercises1} />
            <Content part={part2} exercises={exercises2} />
            <Content part={part3} exercises={exercises3} />
            <Total exercises={exercises1 + exercises2 + exercises3}/>
        </div>
    )
}

export default App