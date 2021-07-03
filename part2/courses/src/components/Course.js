import React from 'react'
import Header from './Header'
import Part from './Part'
import Total from './Total'

const Course = ({course}) => (
    <div>
        <Header key={course.id} name={course.name} />
        {course.parts.map(part => 
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
        <Total parts={course.parts} />
    </div>
)

export default Course