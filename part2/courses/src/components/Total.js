import React from 'react'

const Total = ({parts}) => {
    const sum = parts.reduce((a, b) => (a + b.exercises), 0)

    return (
        <div>
            <h3>Total of {sum} exercises</h3>
        </div>
    )
}

export default Total